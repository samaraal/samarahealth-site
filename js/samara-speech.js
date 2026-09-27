/* Spoken replies: gesture-unlocked mobile audio and incremental PCM playback. */
(function(){
'use strict';
var cfg=window.SAMARA_SITE_CONFIG||{},enabled=true,serial=0,pending=null;
var player=null,cached=null,last=null,activeButton=null,state='idle';
var context=null,sources=[],nextTime=0,downloadDone=false;
try{enabled=localStorage.getItem('samara-spoken-replies')!=='off'}catch(e){}
function el(id){return document.getElementById(id)}
function status(text){var x=el('sai-speech-status');if(x)x.textContent=text}
function render(){var t=el('sai-sound-toggle'),s=el('sai-sound-stop');if(t){t.textContent=enabled?'🔊 Voice on':'🔇 Voice off';t.setAttribute('aria-pressed',String(enabled))}if(s)s.disabled=state==='idle'}
// Run synchronously from a real tap, before microphone/network promises lose activation.
function unlock(){
 if(!enabled)return;
 try{
  var C=window.AudioContext||window.webkitAudioContext;
  if(C){if(!context||context.state==='closed')context=new C();if(context.state!=='running')context.resume().catch(function(){});
   var silent=context.createBufferSource();silent.buffer=context.createBuffer(1,1,context.sampleRate);silent.connect(context.destination);silent.onended=function(){silent.disconnect()};silent.start(0);
  }
 }catch(e){}
}
function stop(){
 if(window.SamaraWake)window.SamaraWake.release('speech');
 serial++;if(pending){pending.abort();pending=null}
 sources.forEach(function(s){s.onended=null;try{s.stop();s.disconnect()}catch(e){}});sources=[];nextTime=0;downloadDone=false;
 if(player){player.onended=null;player.onerror=null;player.pause()}
 if(activeButton){activeButton.textContent='▶ Listen';activeButton=null}
 state='idle';status('AI-generated voice');render();
}
function completed(){stop();if(window.SamaraConversation)window.SamaraConversation.speechEnded()}
function endConversation(){if(window.SamaraConversation)window.SamaraConversation.end()}
function release(){if(cached&&cached.url)URL.revokeObjectURL(cached.url);cached=null}
function available(){return el('sai-panel')&&el('sai-panel').classList.contains('open')}
function schedule(bytes,id){
 if(id!==serial||!available()||!bytes.length)return;
 if(!context||context.state!=='running'){var e=new Error('Audio needs a tap');e.name='NotAllowedError';throw e}
 var count=bytes.length/2,buffer=context.createBuffer(1,count,24000),samples=buffer.getChannelData(0),view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 for(var i=0;i<count;i++)samples[i]=view.getInt16(i*2,true)/32768;
 var source=context.createBufferSource();source.buffer=buffer;source.connect(context.destination);sources.push(source);
 source.onended=function(){source.disconnect();sources=sources.filter(function(s){return s!==source});if(id===serial&&downloadDone&&!sources.length)completed()};
 var when=Math.max(context.currentTime+0.08,nextTime);source.start(when);nextTime=when+buffer.duration;
 state='playing';status('Speaking · AI-generated voice');render();
}
async function streamPCM(response,reply,id){
 var reader=response.body.getReader(),parts=[],total=0,carry=new Uint8Array(0);
 try{
  while(true){
   var part=await reader.read();if(id!==serial||!available()){await reader.cancel();return}if(part.done)break;
   parts.push(part.value);total+=part.value.length;
   var joined=new Uint8Array(carry.length+part.value.length);joined.set(carry);joined.set(part.value,carry.length);
   var even=joined.length-(joined.length%2);
   if(even>=4800){schedule(joined.subarray(0,even),id);carry=joined.slice(even)}else carry=joined;
  }
  if(!total||carry.length%2)throw new Error('Incomplete audio');
  if(carry.length)schedule(carry,id);
  if(id!==serial)return;
  var pcm=new Uint8Array(total),offset=0;parts.forEach(function(p){pcm.set(p,offset);offset+=p.length});
  release();cached={text:reply.text,language:reply.language,pcm:pcm};downloadDone=true;
  if(!sources.length)completed();
 }catch(e){await reader.cancel().catch(function(){});throw e}finally{reader.releaseLock()}
}
function playReply(reply){
 stop();if(!available())return;if(window.SamaraWake)window.SamaraWake.hold('speech');var id=serial;
 activeButton=reply.button;state='loading';reply.button.textContent='■ Stop';status('Preparing voice…');render();
 function failed(e){if(id!==serial)return;stop();if(window.SamaraConversation)window.SamaraConversation.speechFailed();status(e&&e.name==='NotAllowedError'?'Tap Listen once to enable voice on this device.':'Voice unavailable. Tap Listen to retry; your text reply is ready.')}
 function start(url){
  if(id!==serial||!available())return;
  if(!player)player=new Audio();player.src=url;player.onended=function(){if(id===serial)completed()};player.onerror=failed;
  Promise.resolve(player.play()).then(function(){if(id===serial){state='playing';status('Speaking · AI-generated voice');render()}}).catch(failed);
 }
 if(cached&&cached.text===reply.text&&cached.language===reply.language){try{if(cached.pcm){schedule(cached.pcm,id);downloadDone=true}else start(cached.url)}catch(e){failed(e)}return}
 var controller=new AbortController();pending=controller;var timer=setTimeout(function(){controller.abort()},50000);
 var url=cfg.aiEndpoint||((cfg.supabaseUrl||'').replace(/\/$/,'')+'/functions/v1/samara-public-ai');
 var headers={'Content-Type':'application/json'};
 if(cfg.supabaseKey){headers.apikey=cfg.supabaseKey;if(!cfg.supabaseKey.startsWith('sb_publishable_'))headers.Authorization='Bearer '+cfg.supabaseKey}
 var format=context&&context.state==='running'?'pcm':'mp3';
 fetch(url,{method:'POST',headers:headers,signal:controller.signal,body:JSON.stringify({mode:'speech',text:reply.text,language:reply.language,format:format})}).then(async function(r){
  if(!r.ok||!(r.headers.get('content-type')||'').includes('audio/'))throw new Error('Speech unavailable');
  if(format==='pcm'&&(r.headers.get('content-type')||'').includes('audio/pcm')&&r.body&&r.body.getReader)return streamPCM(r,reply,id);
  var blob=await r.blob();if(id!==serial||!available())return;if(!blob.size)throw new Error('Empty audio');
  release();cached={text:reply.text,language:reply.language,url:URL.createObjectURL(blob)};start(cached.url);
 }).catch(failed).finally(function(){clearTimeout(timer);if(id===serial)pending=null});
}
function reply(text,language){
 stop();release();
 var messages=el('sai-msgs'),bubble=messages&&messages.lastElementChild;
 if(!bubble)return;
 var button=document.createElement('button');button.type='button';button.className='sai-listen';button.textContent='▶ Listen';button.setAttribute('aria-label','Listen to this reply');
 var item={text:String(text).replace(/https?:\/\/[^\s)]+/g,function(url){return url.includes('maps.app.goo.gl')?'the Google Maps link shown in chat':url.includes('/faq.html')?'the FAQ link shown in chat':url.includes('family.samaraassistedliving.com')?'the Family Portal link shown in chat':'the website link shown in chat'}),language:language||'en',button:button};
 button.onclick=function(){endConversation();unlock();if(activeButton===button&&state!=='idle')stop();else playReply(item)};
 bubble.appendChild(button);last=item;
 if(enabled&&available())playReply(item);
 messages.scrollTop=messages.scrollHeight;
}
function init(){
 var panel=el('sai-panel');if(!panel)return;
 var style=document.createElement('style');style.textContent='.sai-speech{padding:6px 10px;border-bottom:1px solid #eee;flex-shrink:0}.sai-speech-row{display:flex;gap:7px;align-items:center}.sai-speech button,.sai-listen{border:1px solid #dcbac9;border-radius:999px;background:#fff;color:#7d143f;padding:5px 10px;font-family:inherit;font-size:12px;font-weight:600;line-height:1.3;cursor:pointer}.sai-speech button:disabled{opacity:.45;cursor:default}.sai-speech small{display:block;color:#76636c;font-size:11px;margin-top:4px}.sai-listen{display:block;margin-top:8px}.sai-enquiry-link{display:block;margin:8px 0;color:#9c0040}.sai-speech button:focus-visible,.sai-listen:focus-visible{outline:2px solid #9c0040;outline-offset:2px}';document.head.appendChild(style);
 var controls=document.createElement('div');controls.className='sai-speech';controls.innerHTML='<div class="sai-speech-row"><button type="button" id="sai-sound-toggle" aria-label="Spoken replies" aria-pressed="true"></button><button type="button" id="sai-sound-stop" disabled>■ Stop voice</button></div><small id="sai-speech-status" role="status">AI-generated voice</small>';
 panel.insertBefore(controls,el('sai-msgs'));
 el('sai-sound-toggle').onclick=function(){endConversation();enabled=!enabled;try{localStorage.setItem('samara-spoken-replies',enabled?'on':'off')}catch(e){}if(!enabled)stop();else{unlock();if(last)playReply(last)}render()};
 el('sai-sound-stop').onclick=function(){endConversation();stop()};
 panel.addEventListener('click',unlock,true);
 panel.addEventListener('submit',unlock,true);
 panel.addEventListener('keydown',function(e){if(e.key==='Enter')unlock()},true);
 el('sai-launch').addEventListener('click',unlock,true);
 panel.addEventListener('play',function(e){if(e.target.tagName==='VIDEO'){endConversation();stop()}},true);
 document.addEventListener('visibilitychange',function(){if(document.hidden)stop()});
 window.addEventListener('pagehide',function(){stop();release()});render();
}
window.SamaraSpeech={reply:reply,stop:stop,unlock:unlock,active:function(){return state!=='idle'},enable:function(){enabled=true;try{localStorage.setItem('samara-spoken-replies','on')}catch(e){}unlock();render()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
