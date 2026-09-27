/* Spoken replies for Samara AI. Text remains usable if audio is unavailable. */
(function(){
'use strict';
var cfg=window.SAMARA_SITE_CONFIG||{}, enabled=true, serial=0, pending=null;
var player=null, cached=null, last=null, activeButton=null, state='idle';
try{enabled=localStorage.getItem('samara-spoken-replies')!=='off'}catch(e){}
function el(id){return document.getElementById(id)}
function status(text){var x=el('sai-speech-status');if(x)x.textContent=text}
function render(){
 var toggle=el('sai-sound-toggle'),stopper=el('sai-sound-stop');
 if(toggle){toggle.textContent=enabled?'🔊 Voice on':'🔇 Voice off';toggle.setAttribute('aria-pressed',String(enabled))}
 if(stopper)stopper.disabled=state==='idle';
}
function stop(){
 serial++;
 if(pending){pending.abort();pending=null}
 if(player){player.onended=null;player.onerror=null;player.pause();player.removeAttribute('src');player.load();player=null}
 if(activeButton){activeButton.textContent='▶ Listen';activeButton=null}
 state='idle';status('AI-generated voice');render();
}
function release(){if(cached){URL.revokeObjectURL(cached.url);cached=null}}
function available(){return el('sai-panel')&&el('sai-panel').classList.contains('open')}
function playReply(reply){
 stop();
 if(!available())return;
 var id=serial;
 activeButton=reply.button;
 state='loading';reply.button.textContent='■ Stop';status('Preparing voice…');render();
 function start(url){
  if(id!==serial||!available())return;
  player=new Audio(url);
  player.onended=function(){if(id===serial)stop()};
  player.onerror=function(){if(id===serial){stop();status('Audio unavailable. You can still read the reply.')}};
  var attempt=player.play();
  Promise.resolve(attempt).then(function(){if(id===serial){state='playing';status('Speaking · AI-generated voice');render()}}).catch(function(e){
   if(id!==serial)return;
   stop();status(e&&e.name==='NotAllowedError'?'Tap Listen on the reply to play audio.':'Audio unavailable. Tap Listen to retry.');
  });
 }
 if(cached&&cached.text===reply.text&&cached.language===reply.language){start(cached.url);return}
 var controller=new AbortController();pending=controller;
 var timer=setTimeout(function(){controller.abort()},50000);
 var url=cfg.aiEndpoint||((cfg.supabaseUrl||'').replace(/\/$/,'')+'/functions/v1/samara-public-ai');
 var headers={'Content-Type':'application/json'};
 if(cfg.supabaseKey){headers.apikey=cfg.supabaseKey;if(!cfg.supabaseKey.startsWith('sb_publishable_'))headers.Authorization='Bearer '+cfg.supabaseKey}
 fetch(url,{method:'POST',headers:headers,signal:controller.signal,body:JSON.stringify({mode:'speech',text:reply.text,language:reply.language})}).then(function(r){
  if(!r.ok||!(r.headers.get('content-type')||'').includes('audio/'))throw new Error('Speech unavailable');
  return r.blob();
 }).then(function(blob){
  if(id!==serial||!available())return;
  if(!blob.size)throw new Error('Empty audio');
  pending=null;release();cached={text:reply.text,language:reply.language,url:URL.createObjectURL(blob)};start(cached.url);
 }).catch(function(){if(id===serial){stop();status('Voice unavailable. Tap Listen to retry; your text reply is ready.')}}).finally(function(){clearTimeout(timer);if(id===serial)pending=null});
}
function reply(text,language){
 stop();release();
 var messages=el('sai-msgs'),bubble=messages&&messages.lastElementChild;
 if(!bubble)return;
 var button=document.createElement('button');button.type='button';button.className='sai-listen';button.textContent='▶ Listen';button.setAttribute('aria-label','Listen to this reply');
 var item={text:String(text).replace(/https?:\/\/[^\s)]+/g,'the Google Maps link shown in chat'),language:language||'en',button:button};
 button.onclick=function(){if(activeButton===button&&state!=='idle')stop();else playReply(item)};
 bubble.appendChild(button);last=item;
 if(enabled&&available())playReply(item);
 messages.scrollTop=messages.scrollHeight;
}
function init(){
 var panel=el('sai-panel');if(!panel)return;
 var style=document.createElement('style');style.textContent='.sai-speech{padding:6px 10px;border-bottom:1px solid #eee;flex-shrink:0}.sai-speech-row{display:flex;gap:7px;align-items:center}.sai-speech button,.sai-listen{border:1px solid #dcbac9;border-radius:999px;background:#fff;color:#7d143f;padding:5px 10px;font-family:inherit;font-size:12px;font-weight:600;line-height:1.3;cursor:pointer}.sai-speech button:disabled{opacity:.45;cursor:default}.sai-speech small{display:block;color:#76636c;font-size:11px;margin-top:4px}.sai-listen{display:block;margin-top:8px}.sai-enquiry-link{display:block;margin:8px 0;color:#9c0040}.sai-speech button:focus-visible,.sai-listen:focus-visible{outline:2px solid #9c0040;outline-offset:2px}';document.head.appendChild(style);
 var controls=document.createElement('div');controls.className='sai-speech';controls.innerHTML='<div class="sai-speech-row"><button type="button" id="sai-sound-toggle" aria-label="Spoken replies" aria-pressed="true"></button><button type="button" id="sai-sound-stop" disabled>■ Stop voice</button></div><small id="sai-speech-status" role="status">AI-generated voice</small>';
 panel.insertBefore(controls,el('sai-msgs'));
 el('sai-sound-toggle').onclick=function(){enabled=!enabled;try{localStorage.setItem('samara-spoken-replies',enabled?'on':'off')}catch(e){}if(!enabled)stop();else if(last)playReply(last);render()};
 el('sai-sound-stop').onclick=stop;
 panel.addEventListener('play',function(e){if(e.target.tagName==='VIDEO')stop()},true);
 document.addEventListener('visibilitychange',function(){if(document.hidden)stop()});
 window.addEventListener('pagehide',function(){stop();release()});render();
}
window.SamaraSpeech={reply:reply,stop:stop};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
