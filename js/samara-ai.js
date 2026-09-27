/* Samara AI Assistant — public website, no patient/ERP access. */
(function(){
'use strict';
var CFG=window.SAMARA_SITE_CONFIG||{};
var L={
 auto:{name:'Auto',locale:'',hello:'Hello! Speak naturally in English, தமிழ், తెలుగు, हिन्दी or ಕನ್ನಡ. I will detect the language automatically.',ph:'Ask Samara…',rooms:'Rooms',gallery:'Gallery',video:'Video',enquiry:'Enquiry',noVoice:'Microphone recording is not available on this browser/device.'},
 en:{name:'English',locale:'en-IN',hello:'Hello! I am Samara AI. You can type or speak. I can show our rooms, gallery and opening video, or help you make an enquiry.',ph:'Ask Samara…',rooms:'Show rooms',gallery:'Gallery',video:'Video',enquiry:'Enquiry',listen:'Listening…',noVoice:'Voice input is not supported by this browser. Please type your question.',fallback:'I can help with Samara Assisted Living, rooms, gallery, video and enquiries. For detailed questions, our secure AI service will be enabled next.'},
 ta:{name:'தமிழ்',locale:'ta-IN',hello:'வணக்கம்! நான் Samara AI. நீங்கள் தமிழில் பேசலாம் அல்லது தட்டச்சு செய்யலாம். அறைகள், கேலரி, வீடியோ மற்றும் விசாரணைக்கு உதவுகிறேன்.',ph:'Samara-விடம் கேளுங்கள்…',rooms:'அறைகள்',gallery:'கேலரி',video:'வீடியோ',enquiry:'விசாரணை',listen:'கேட்கிறேன்…',noVoice:'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.',fallback:'Samara Assisted Living பற்றிய தகவல், அறைகள், கேலரி, வீடியோ மற்றும் விசாரணைக்கு நான் உதவ முடியும்.'},
 te:{name:'తెలుగు',locale:'te-IN',hello:'నమస్కారం! నేను Samara AI. మీరు తెలుగులో మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు. గదులు, గ్యాలరీ, వీడియో మరియు విచారణలో సహాయం చేస్తాను.',ph:'Samaraని అడగండి…',rooms:'గదులు',gallery:'గ్యాలరీ',video:'వీడియో',enquiry:'విచారణ',listen:'వింటున్నాను…',noVoice:'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.',fallback:'Samara Assisted Living, గదులు, గ్యాలరీ, వీడియో మరియు విచారణ గురించి నేను సహాయం చేయగలను.'},
 hi:{name:'हिन्दी',locale:'hi-IN',hello:'नमस्ते! मैं Samara AI हूँ। आप हिन्दी में बोल या टाइप कर सकते हैं। मैं कमरे, गैलरी, वीडियो और पूछताछ में मदद कर सकता हूँ।',ph:'Samara से पूछें…',rooms:'कमरे',gallery:'गैलरी',video:'वीडियो',enquiry:'पूछताछ',listen:'सुन रहा हूँ…',noVoice:'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें।',fallback:'मैं Samara Assisted Living, कमरे, गैलरी, वीडियो और पूछताछ के बारे में मदद कर सकता हूँ।'},
 kn:{name:'ಕನ್ನಡ',locale:'kn-IN',hello:'ನಮಸ್ಕಾರ! ನಾನು Samara AI. ನೀವು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬಹುದು ಅಥವಾ ಟೈಪ್ ಮಾಡಬಹುದು. ಕೊಠಡಿಗಳು, ಗ್ಯಾಲರಿ, ವೀಡಿಯೊ ಮತ್ತು ವಿಚಾರಣೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',ph:'Samaraಗೆ ಕೇಳಿ…',rooms:'ಕೊಠಡಿಗಳು',gallery:'ಗ್ಯಾಲರಿ',video:'ವೀಡಿಯೊ',enquiry:'ವಿಚಾರಣೆ',listen:'ಕೇಳುತ್ತಿದ್ದೇನೆ…',noVoice:'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.',fallback:'Samara Assisted Living, ಕೊಠಡಿಗಳು, ಗ್ಯಾಲರಿ, ವೀಡಿಯೊ ಮತ್ತು ವಿಚಾರಣೆಯ ಬಗ್ಗೆ ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು.'}
};
var MAP_URL='https://maps.app.goo.gl/NwdW9T6WFnosJg8V7?g_st=iw';
var awaitingAddress=false,history=[],requestController=null,requestEpoch=0;
var lang='auto', detectedLang='en', opened=false, recorder=null, stream=null, chunks=[], recordingTimer=null, busy=false, startingVoice=false;

// Shared screen wake lock for the active voice interaction only.
var awakeReasons=new Set(),screenLock=null,wakePending=null,wakeEpoch=0;
function awakeVisible(){var p=document.getElementById('sai-panel');return document.visibilityState==='visible'&&p&&p.classList.contains('open')}
function wakeStatus(text){var e=document.getElementById('sai-awake');if(e){e.textContent=text||'';e.hidden=!text}}
function requestWake(){
 if(!awakeReasons.size||!awakeVisible()||screenLock||wakePending)return;
 if(!navigator.wakeLock||!navigator.wakeLock.request){wakeStatus('Keep your screen on while using voice.');return}
 var epoch=wakeEpoch;
 wakePending=navigator.wakeLock.request('screen').then(function(lock){
  if(epoch!==wakeEpoch||!awakeReasons.size||!awakeVisible()){return lock.release()}
  screenLock=lock;wakeStatus('Screen stays awake during voice.');
  lock.addEventListener('release',function(){if(screenLock===lock){screenLock=null;wakeStatus(awakeReasons.size?'Keep your screen on while using voice.':'')}});
 }).catch(function(){if(epoch===wakeEpoch&&awakeReasons.size)wakeStatus('Keep your screen on while using voice.')}).finally(function(){wakePending=null;if(epoch!==wakeEpoch&&awakeReasons.size)requestWake()});
}
function holdWake(reason){awakeReasons.add(reason);requestWake()}
function releaseWake(reason){
 if(reason)awakeReasons.delete(reason);else awakeReasons.clear();
 if(awakeReasons.size)return;
 wakeEpoch++;wakeStatus('');var lock=screenLock;screenLock=null;if(lock)lock.release().catch(function(){});
}
window.SamaraWake={hold:holdWake,release:releaseWake};
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')requestWake()});
window.addEventListener('pagehide',function(){releaseWake()});

function activeLang(){return lang==='auto'?(detectedLang||'en'):lang}
function inferLang(s){s=String(s||'');if(/[\u0B80-\u0BFF]/.test(s))return'ta';if(/[\u0C00-\u0C7F]/.test(s))return'te';if(/[\u0900-\u097F]/.test(s))return'hi';if(/[\u0C80-\u0CFF]/.test(s))return'kn';return'en'}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function ui(){var root=document.createElement('div');root.innerHTML='<button class="sai-launch" id="sai-launch" aria-label="Ask Samara AI"><span>✦</span><span>Ask Samara AI</span></button><section class="sai-panel" id="sai-panel" aria-label="Samara AI assistant"><div class="sai-head"><img src="assets/samara-mark.png" alt=""><div class="sai-title"><strong>Samara AI</strong><small>Voice • Text • Rooms • Gallery</small></div><button class="sai-close" id="sai-close" aria-label="Close">×</button></div><div class="sai-langs" id="sai-langs"></div><div class="sai-conversation"><button type="button" id="sai-conversation-toggle" aria-pressed="false">Start conversation</button><small id="sai-conversation-help">Talk hands-free. Pause briefly to send; Samara listens again after replying.</small></div><div class="sai-msgs" id="sai-msgs" aria-live="polite"></div><div class="sai-progress" id="sai-progress" role="status" aria-live="polite" hidden><span class="sai-progress-dots" aria-hidden="true"><i></i><i></i><i></i></span><span id="sai-progress-text"></span></div><div class="sai-quick" id="sai-quick"></div><form class="sai-compose" id="sai-form"><button type="button" class="sai-mic" id="sai-mic" aria-label="Voice input">🎙</button><input id="sai-input" autocomplete="off"><button class="sai-send" aria-label="Send">➤</button></form><div id="sai-awake" class="sai-awake" role="status" hidden></div><div class="sai-note">Auto detects English • தமிழ் • తెలుగు • हिन्दी • ಕನ್ನಡ. Tap 🎙 to start, tap ■ to stop.</div></section>';document.body.appendChild(root);renderLangs();setLang('auto');bind()}
function add(text,who){var d=document.createElement('div');d.className='sai-msg '+(who==='user'?'sai-user':'sai-bot');d.textContent=String(text||'').replace(/https:\/\/maps\.app\.goo\.gl\/NwdW9T6WFnosJg8V7(?:\?g_st=iw)?/g,'Google Maps navigation');document.getElementById('sai-msgs').appendChild(d);scroll()}
function progress(text){var p=document.getElementById('sai-progress');p.hidden=!text;document.getElementById('sai-progress-text').textContent=text||'';document.querySelectorAll('.sai-send,#sai-input,#sai-mic,.sai-quick button,.sai-lang').forEach(function(e){e.disabled=e.id==='sai-mic'?busy||startingVoice:busy||startingVoice||!!recorder});conversationUI();}
function navigationQuestion(text){return /direction|navigat|google.?map|map link|location|address|how.*reach|வழி|முகவரி|இருப்பிடம்|చిరునామా|దారి|నావిగే|पता|रास्ता|दिशा|लोकेशन|ವಿಳಾಸ|ದಾರಿ|ಸ್ಥಳ/i.test(String(text||''))}
function navigationLink(){var a=document.createElement('a');a.href=MAP_URL;a.target='_blank';a.rel='noopener noreferrer';a.className='sai-map-link';a.textContent='📍 Open Google Maps navigation ↗';document.getElementById('sai-msgs').appendChild(a);scroll();}
function requestAI(options){var controller=new AbortController(),epoch=requestEpoch,timer=setTimeout(function(){controller.abort()},90000);requestController=controller;options.signal=controller.signal;return fetch(endpoint(),options).then(readAIResponse).then(function(x){if(epoch!==requestEpoch){var e=new Error('Cancelled');e.name='AbortError';throw e}return x}).catch(function(e){if(e.name==='AbortError'&&epoch===requestEpoch){var timeout=new Error('Request timed out');timeout.name='TimeoutError';throw timeout}throw e}).finally(function(){clearTimeout(timer);if(requestController===controller)requestController=null})}
function media(src,cap,video){var d=document.createElement('div');d.className='sai-msg sai-media';d.innerHTML=video?'<video controls playsinline poster="assets/photos/video-poster.jpg"><source src="'+src+'" type="video/mp4"></video><p>'+esc(cap)+'</p>':'<img src="'+src+'" alt="'+esc(cap)+'" loading="lazy"><p>'+esc(cap)+'</p>';document.getElementById('sai-msgs').appendChild(d);scroll()}
function scroll(){var m=document.getElementById('sai-msgs');m.scrollTop=m.scrollHeight}
function renderLangs(){var x=document.getElementById('sai-langs');Object.keys(L).forEach(function(k){var b=document.createElement('button');b.className='sai-lang';b.type='button';b.dataset.lang=k;b.textContent=L[k].name;b.onclick=function(){setLang(k)};x.appendChild(b)})}
function setLang(k){if(conversation)endConversation();awaitingAddress=false;if(window.SamaraSpeech)window.SamaraSpeech.stop();lang=L[k]?k:'auto';document.querySelectorAll('.sai-lang').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang)});var a=L[activeLang()]||L.en;document.getElementById('sai-input').placeholder=(L[lang]||a).ph;var q=document.getElementById('sai-quick');q.innerHTML='';[['rooms','rooms'],['gallery','gallery'],['video','video'],['enquiry','enquiry']].forEach(function(a){var b=document.createElement('button');b.type='button';b.textContent=(L[activeLang()]||L.en)[a[0]];b.onclick=function(){intent(a[1],true)};q.appendChild(b)});if(opened)add((L[lang]||L[activeLang()]||L.en).hello,'bot')}
function showRooms(){media('assets/photos/care-room-single.webp','Private / single care room');media('assets/photos/care-room.webp','Care room at Samara');media('assets/photos/care-room-triple.webp','Triple-sharing care room')}
function showGallery(){['centre-building','reception','welcome-wall','care-team','ribbon-cutting','lamp-lighting'].forEach(function(n){media('assets/photos/'+n+'.webp','Samara Assisted Living')})}
function intent(text,quick){if(busy||startingVoice||recorder)return;if(conversation)endConversation();if(window.SamaraSpeech)window.SamaraSpeech.stop();var raw=String(text||''),s=raw.toLowerCase();if(!quick){add(raw,'user');if(lang==='auto'&&!awaitingAddress)detectedLang=inferLang(raw);}
 if(quick)awaitingAddress=false;
 if(navigationQuestion(raw)){askAI(raw);return}
 if(s==='rooms'||/room|rooms|single|triple|அறை|ரூம்|గది|గదులు|कमरा|कमरे|ಕೊಠಡಿ|ರೂಮ್/.test(s)){showRooms();return}
 if(s==='gallery'||/gallery|photo|photos|picture|கேலரி|பட|గ్యాలరీ|ఫోటో|गैलरी|फोटो|ಗ್ಯಾಲರಿ|ಫೋಟೋ/.test(s)){showGallery();return}
 if(s==='video'||/video|reel|வீடியோ|వీడియో|वीडियो|ವೀಡಿಯೊ/.test(s)){media('assets/video/samara-opening.mp4','Samara Assisted Living — opening video',true);return}
 if(s==='enquiry'||/enquir|admission|contact|விசாரணை|அட்மிஷன்|చేర్పు|पूछताछ|प्रवेश|ವಿಚಾರಣೆ|ದಾಖಲಾತಿ/.test(s)){add(lang==='en'?'Certainly. I will take you to our care enquiry form.':L[lang].fallback,'bot');setTimeout(function(){location.href='contact.html#enquiry'},650);return}
 askAI(raw)}
function localReply(q){var s=String(q||'').toLowerCase();
 function say(x){var k=activeLang();return x[k]||x.en}
 var R={
 who:{en:'Samara is suitable for elders who need daily support, people discharged from hospital who still need nursing care, people recovering after surgery, stroke, fractures or long illness, and families needing short-stay or respite care. We first assess the person’s health and care needs before admission.',ta:'தினசரி உதவி தேவைப்படும் முதியவர்கள், மருத்துவமனையிலிருந்து discharge ஆன பிறகும் nursing care தேவைப்படுபவர்கள், surgery, stroke, fracture அல்லது நீண்டநாள் நோய்க்குப் பிறகு மீண்டு வருபவர்கள், மற்றும் short-stay / respite care தேவைப்படுபவர்கள் Samara-வில் தங்கலாம். Admissionக்கு முன் உடல்நிலை மற்றும் care needs-ஐ மதிப்பீடு செய்கிறோம்.',te:'రోజువారీ సహాయం అవసరమైన వృద్ధులు, hospital discharge తర్వాత nursing care అవసరమైన వారు, surgery, stroke, fracture లేదా దీర్ఘకాల అనారోగ్యం తర్వాత కోలుకుంటున్న వారు, short-stay / respite care అవసరమైన వారు Samaraలో ఉండవచ్చు. Admissionకు ముందు health మరియు care needs‌ను పరిశీలిస్తాము.',hi:'Samara उन बुज़ुर्गों के लिए है जिन्हें रोज़मर्रा की सहायता चाहिए, hospital discharge के बाद nursing care चाहने वालों के लिए, surgery, stroke, fracture या लंबी बीमारी के बाद recovery करने वालों के लिए, और short-stay / respite care के लिए। Admission से पहले health और care needs का assessment किया जाता है।',kn:'ದೈನಂದಿನ ಸಹಾಯ ಬೇಕಿರುವ ಹಿರಿಯರು, hospital discharge ನಂತರ nursing care ಅಗತ್ಯವಿರುವವರು, surgery, stroke, fracture ಅಥವಾ ದೀರ್ಘಕಾಲದ ಅನಾರೋಗ್ಯದ ನಂತರ ಚೇತರಿಸಿಕೊಳ್ಳುವವರು ಹಾಗೂ short-stay / respite care ಬೇಕಿರುವವರು Samaraದಲ್ಲಿ ಉಳಿಯಬಹುದು. Admissionಗೆ ಮೊದಲು health ಮತ್ತು care needs ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.'},
 care:{en:'We provide 24×7 skilled nursing, medication management, regular vitals and doctor coordination, wound care and clinical procedures, physiotherapy and rehabilitation, diet support, and help with bathing, dressing, toileting, feeding and mobility. Care is planned around each resident.',ta:'24×7 skilled nursing, மருந்து மேலாண்மை, vitals மற்றும் doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support, மேலும் bathing, dressing, toileting, feeding மற்றும் mobility உதவி வழங்குகிறோம். ஒவ்வொரு resident-க்கும் அவர்களின் தேவைக்கேற்ப care plan செய்யப்படுகிறது.',te:'24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support మరియు bathing, dressing, toileting, feeding, mobility సహాయం అందిస్తాము.',hi:'हम 24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support तथा bathing, dressing, toileting, feeding और mobility में सहायता देते हैं।',kn:'ನಾವು 24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support ಹಾಗೂ bathing, dressing, toileting, feeding ಮತ್ತು mobility ಸಹಾಯ ನೀಡುತ್ತೇವೆ.'},
 cost:{en:'Charges depend on the room type, length of stay and level of care required. Medicines, investigations and hospital expenses are generally separate unless included in a package. I do not want to quote an incorrect amount; please send an enquiry and our care team will confirm the current package and exact estimate.',ta:'கட்டணம் room type, தங்கும் காலம் மற்றும் தேவையான care level-ஐப் பொறுத்து மாறும். Medicines, investigations மற்றும் hospital expenses package-ல் சேர்க்கப்படாவிட்டால் பொதுவாக தனியாக bill செய்யப்படும். தவறான தொகையைச் சொல்ல விரும்பவில்லை; enquiry அனுப்பினால் தற்போதைய package மற்றும் சரியான estimate-ஐ care team உறுதிப்படுத்துவார்கள்.',te:'Charges room type, stay కాలం మరియు care level‌పై ఆధారపడి ఉంటాయి. Medicines, investigations మరియు hospital expenses packageలో లేకపోతే విడిగా bill చేస్తారు. తప్పు మొత్తం చెప్పకుండా, enquiry పంపితే current package మరియు exact estimate‌ను care team నిర్ధారిస్తుంది.',hi:'Charges room type, रहने की अवधि और care level पर निर्भर करते हैं। Medicines, investigations और hospital expenses package में शामिल न हों तो अलग bill होते हैं। सही current package और estimate के लिए enquiry भेजें; care team पुष्टि करेगी।',kn:'Charges room type, ಉಳಿಯುವ ಅವಧಿ ಮತ್ತು care level ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತವೆ. Medicines, investigations ಮತ್ತು hospital expenses packageನಲ್ಲಿ ಸೇರಿರದಿದ್ದರೆ ಪ್ರತ್ಯೇಕವಾಗಿ bill ಮಾಡಲಾಗುತ್ತದೆ. current package ಮತ್ತು exact estimateಗಾಗಿ enquiry ಕಳುಹಿಸಿ; care team ದೃಢಪಡಿಸುತ್ತದೆ.'},
 mobility:{en:'Yes. Samara provides mobility assistance, daily-living support and planned physiotherapy when appropriate. If the person cannot walk or is largely bed-bound, we first need to understand the medical condition, transfer, feeding and toileting needs, and the doctor’s advice so our care team can confirm the right support.',ta:'ஆம். Samara-வில் mobility assistance, தினசரி செயல்களுக்கு உதவி மற்றும் தேவைக்கேற்ப physiotherapy வழங்க முடியும். நடக்க முடியாதவர் அல்லது பெரும்பாலும் படுக்கையிலேயே இருப்பவர் என்றால், medical condition, transfer, feeding/toileting needs மற்றும் doctor advice-ஐ முதலில் தெரிந்துகொண்டு சரியான care level-ஐ எங்கள் குழு உறுதிப்படுத்தும்.',te:'అవును. Mobility assistance, daily-living support మరియు అవసరానికి అనుగుణంగా physiotherapy అందించవచ్చు. నడవలేని లేదా bed-bound వ్యక్తికి medical condition, transfer, feeding/toileting needs మరియు doctor advice తెలుసుకున్న తర్వాత care team సరైన support‌ను నిర్ధారిస్తుంది.',hi:'हाँ। Mobility assistance, daily-living support और आवश्यकता के अनुसार physiotherapy दी जा सकती है। जो व्यक्ति चल नहीं सकता या bed-bound है, उसके medical condition, transfer, feeding/toileting needs और doctor advice को समझकर care team सही support की पुष्टि करेगी।',kn:'ಹೌದು. Mobility assistance, daily-living support ಮತ್ತು ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ physiotherapy ನೀಡಬಹುದು. ನಡೆಯಲು ಆಗದ ಅಥವಾ bed-bound ವ್ಯಕ್ತಿಯ medical condition, transfer, feeding/toileting needs ಮತ್ತು doctor advice ತಿಳಿದು care team ಸರಿಯಾದ support ದೃಢಪಡಿಸುತ್ತದೆ.'},
 post:{en:'Yes. Post-hospital and step-down care is one of Samara’s core services. We support recovery after surgery, stroke, fractures or long illness with nursing, medication safety, monitoring, doctor coordination and planned physiotherapy.',ta:'ஆம். Post-hospital / step-down care Samara-வின் முக்கிய சேவைகளில் ஒன்று. Surgery, stroke, fracture அல்லது நீண்டநாள் நோய்க்குப் பிறகு nursing, medication safety, monitoring, doctor coordination மற்றும் planned physiotherapy மூலம் recovery-க்கு உதவுகிறோம்.',te:'అవును. Post-hospital / step-down care Samara ప్రధాన సేవల్లో ఒకటి. Surgery, stroke, fracture లేదా దీర్ఘకాల అనారోగ్యం తర్వాత nursing, medication safety, monitoring, doctor coordination మరియు physiotherapyతో recoveryకు సహాయం చేస్తాము.',hi:'हाँ। Post-hospital / step-down care Samara की मुख्य सेवाओं में से एक है। Surgery, stroke, fracture या लंबी बीमारी के बाद nursing, medication safety, monitoring, doctor coordination और physiotherapy के साथ recovery में सहायता दी जाती है।',kn:'ಹೌದು. Post-hospital / step-down care Samaraದ ಪ್ರಮುಖ ಸೇವೆಗಳಲ್ಲಿ ಒಂದು. Surgery, stroke, fracture ಅಥವಾ ದೀರ್ಘಕಾಲದ ಅನಾರೋಗ್ಯದ ನಂತರ nursing, medication safety, monitoring, doctor coordination ಮತ್ತು physiotherapy ಮೂಲಕ recoveryಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.'},
 admission:{en:'For admission, we first do a health assessment. Please keep recent medical records, current prescriptions, allergy information and the treating doctor’s details ready. We also encourage families to visit Samara before admission.',ta:'Admissionக்கு முதலில் health assessment செய்வோம். Recent medical records, current prescriptions, allergy information மற்றும் treating doctor details தயாராக வைத்திருக்கவும். Admissionக்கு முன் குடும்பத்தினர் Samara-வை நேரில் வந்து பார்க்கவும் பரிந்துரைக்கிறோம்.',te:'Admissionకు ముందు health assessment చేస్తాము. Recent medical records, current prescriptions, allergy information మరియు treating doctor details సిద్ధంగా ఉంచండి. Admissionకు ముందు కుటుంబం Samaraను సందర్శించాలని సూచిస్తాము.',hi:'Admission के लिए पहले health assessment किया जाता है। Recent medical records, current prescriptions, allergy information और treating doctor details तैयार रखें। Admission से पहले परिवार को Samara देखने के लिए भी प्रोत्साहित किया जाता है।',kn:'Admissionಗೆ ಮೊದಲು health assessment ಮಾಡಲಾಗುತ್ತದೆ. Recent medical records, current prescriptions, allergy information ಮತ್ತು treating doctor details ಸಿದ್ಧವಾಗಿರಲಿ. Admissionಗೆ ಮೊದಲು ಕುಟುಂಬ Samaraಗೆ ಭೇಟಿ ನೀಡುವುದನ್ನೂ ನಾವು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ.'}
 };
 if(/hospital|ஹாஸ்பிடல்|மருத்துவமனை|ఆసుపత్రి|హాస్పిటల్|अस्पताल|हॉस्पिटल|ಆಸ್ಪತ್ರೆ|ಹಾಸ್ಪಿಟಲ್/.test(s))return say({en:'No. Samara is not a hospital. It is an assisted-living and supportive-care centre with trained nurses available 24×7, for people who need more than home care but do not need to remain in hospital. In an emergency, our nurses respond and arrange hospital transfer when needed. Would you like to see our rooms or know who can stay here?',ta:'இல்லை. Samara ஒரு ஹாஸ்பிடல் அல்ல. இது 24×7 பயிற்சி பெற்ற செவிலியர்கள் உள்ள Assisted Living மற்றும் supportive-care centre. வீட்டில் கிடைக்கும் பராமரிப்பை விட அதிக உதவி தேவைப்படுபவர்கள், ஆனால் மருத்துவமனையில் தொடர்ந்து தங்க வேண்டிய அவசியமில்லாதவர்களுக்காக இது அமைக்கப்பட்டுள்ளது. அவசரநிலையில் தேவையானால் மருத்துவமனைக்கு மாற்ற ஏற்பாடு செய்வோம். அறைகளைப் பார்க்க வேண்டுமா, அல்லது யார் இங்கு தங்கலாம் என்று தெரிந்துகொள்ள வேண்டுமா?',te:'కాదు. Samara హాస్పిటల్ కాదు. ఇది 24×7 trained nurses ఉన్న Assisted Living మరియు supportive-care centre. ఇంటి సంరక్షణకంటే ఎక్కువ సహాయం అవసరమైనా hospitalలో ఉండాల్సిన అవసరం లేని వారికి ఇది అనుకూలం.',hi:'नहीं। Samara अस्पताल नहीं है। यह 24×7 trained nurses वाला Assisted Living और supportive-care centre है, उन लोगों के लिए जिन्हें home care से अधिक सहायता चाहिए लेकिन hospital में रहने की आवश्यकता नहीं है।',kn:'ಇಲ್ಲ. Samara ಆಸ್ಪತ್ರೆಯಲ್ಲ. ಇದು 24×7 trained nurses ಇರುವ Assisted Living ಮತ್ತು supportive-care centre. ಮನೆಯ ಆರೈಕೆಯಿಗಿಂತ ಹೆಚ್ಚಿನ ಸಹಾಯ ಬೇಕಾದರೂ hospitalನಲ್ಲಿ ಉಳಿಯುವ ಅಗತ್ಯವಿಲ್ಲದವರಿಗೆ ಇದು ಸೂಕ್ತ.'});
 if(/who can stay|suitable|eligible|யார்.*(தங்க|சேர)|யாருக்கு|ఎవరు.*ఉండ|कौन.*रह|ಯಾರು.*ಉಳಿಯ/.test(s))return R.who;
 if(/what care|services|provide|என்ன.*(care|பராமரிப்பு|சேவை)|சேவைகள்|సేవ|देखभाल|सेवा|ಆರೈಕೆ|ಸೇವೆ/.test(s))return R.care;
 if(/how much|price|cost|charge|package|fees|rate|எவ்வளவு|கட்டணம்|விலை|பேக்கேஜ்|ధర|ఛార్జ|कितना|कीमत|शुल्क|पैकेज|ಎಷ್ಟು|ಬೆಲೆ|ಶುಲ್ಕ/.test(s))return R.cost;
 if(/cannot walk|can't walk|bedridden|wheelchair|mobility|நடக்க முடிய|படுக்கை|வீல்சேர்|నడవలే|व्हीलचेयर|चल नहीं|बिस्तर|ನಡೆಯಲು ಆಗ|ವೀಲ್/.test(s))return R.mobility;
 if(/after hospital|discharg|after surgery|stroke|fracture|டிஸ்சார்ஜ்|அறுவை|ஸ்ட்ரோக்|ఫ్రాక్చర్|डिस्चार्ज|सर्जरी|स्ट्रोक|ಡಿಸ್ಚಾರ್ಜ್|ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ/.test(s))return R.post;
 if(/admission.*need|documents|what.*admission|அட்மிஷன்.*(என்ன|தேவை)|ஆவண|అడ్మిషన్|दाखिले|दस्तावेज|ದಾಖಲೆ/.test(s))return R.admission;
 if(/what is samara|about samara|சமரா.*(என்ன|பற்றி)|సమరా.*(ఏమి|గురించి)|समारा.*(क्या|बारे)|ಸಮಾರಾ.*(ಏನು|ಬಗ್ಗೆ)/.test(s))return say({en:'Samara Assisted Living is a residential care centre for elders and people who need assistance, supervision or continued support in daily life. It is designed as a place between hospital and home, with 24×7 nursing support.',ta:'Samara Assisted Living என்பது முதியவர்கள் மற்றும் தினசரி வாழ்க்கையில் உதவி, கண்காணிப்பு அல்லது தொடர்ச்சியான பராமரிப்பு தேவைப்படுபவர்களுக்கான residential care centre. Hospital மற்றும் home-க்கு இடைப்பட்ட பாதுகாப்பான care setting ஆக, 24×7 nursing support உடன் செயல்படுகிறது.',te:'Samara Assisted Living వృద్ధులు మరియు రోజువారీ సహాయం లేదా కొనసాగింపు care అవసరమైనవారికి residential care centre. Hospital మరియు home మధ్య 24×7 nursing supportతో care అందిస్తుంది.',hi:'Samara Assisted Living बुज़ुर्गों और रोज़मर्रा की सहायता या continued care की आवश्यकता वाले लोगों के लिए residential care centre है, जहाँ 24×7 nursing support उपलब्ध है।',kn:'Samara Assisted Living ಹಿರಿಯರು ಮತ್ತು ದೈನಂದಿನ ಸಹಾಯ ಅಥವಾ continued care ಅಗತ್ಯವಿರುವವರಿಗೆ residential care centre ಆಗಿದ್ದು, 24×7 nursing support ಲಭ್ಯವಿದೆ.'});
 return null}
function endpoint(){return CFG.aiEndpoint||((CFG.supabaseUrl||'').replace(/\/$/,'')+'/functions/v1/samara-public-ai')}
function aiHeaders(json){var h={};if(CFG.supabaseKey){h.apikey=CFG.supabaseKey;if(!CFG.supabaseKey.startsWith('sb_publishable_'))h.Authorization='Bearer '+CFG.supabaseKey}if(json)h['Content-Type']='application/json';return h}
function handleAI(x,q){if(!awakeVisible())return;progress('');if(x&&x.reply){history.push({role:'user',content:String(x.transcript||q||'').slice(0,3000)},{role:'assistant',content:x.reply.slice(0,3000)});history=history.slice(-8);}if(x&&L[x.language])detectedLang=x.language;if(x&&x.transcript)add(x.transcript,'user');if(x&&x.reply){add(x.reply,'bot');if(window.SamaraSpeech)window.SamaraSpeech.reply(x.reply,x.language||activeLang())}else{var local=localReply(q||'');if(local)add(local,'bot')}awaitingAddress=!!(x&&x.awaiting_address);if((x&&x.show_map)||String(x&&x.reply).includes('maps.app.goo.gl/NwdW9T6WFnosJg8V7'))navigationLink();if(x&&x.action){if(x.action==='rooms')showRooms();else if(x.action==='gallery')showGallery();else if(x.action==='video')media('assets/video/samara-opening.mp4','Samara Assisted Living — opening video',true);else if(x.action==='enquiry'){var a=document.createElement('a');a.href='contact.html#enquiry';a.textContent='Open enquiry form';a.className='sai-enquiry-link';document.getElementById('sai-msgs').appendChild(a);scroll()}}}
function readAIResponse(r){return r.json().catch(function(){return null}).then(function(x){
 if(!r.ok||!x||x.error){var e=new Error('AI request failed');e.status=r.status;e.code=x&&typeof x.code==='string'?x.code:'';throw e}
 if(typeof x.reply!=='string'||!x.reply.trim()){var e=new Error('Empty AI response');e.status=502;throw e}
 return x;
})}
function voiceError(e){
 var status=e&&e.status;
 console.warn('Samara voice request failed',{status:status||0});
 if(e&&e.code==='NO_SPEECH')return 'No speech was detected. Please speak clearly and try again.';
 if(status===401||status===403)return 'Voice service access is unavailable. Please type your question or use Enquiry.';
 if(status===413)return 'That recording is too large. Please try a shorter recording.';
 if(status===429)return 'The voice service is busy. Please wait a moment and try again.';
 if(status>=500)return 'The voice service is temporarily unavailable. Please try again shortly or type your question.';
 if(!status)return 'Could not connect to the voice service. Please check your connection and try again.';
 return 'I could not process that recording. Please try again or type your question.';
}
function askAI(q){if(busy)return;if(window.SamaraSpeech)window.SamaraSpeech.stop();busy=true;holdWake('request');progress('Preparing your reply…');requestAI({method:'POST',headers:aiHeaders(true),body:JSON.stringify({message:q,language:lang==='auto'?(awaitingAddress?activeLang():'auto'):lang,awaiting_address:awaitingAddress,history:history,page:location.pathname})}).then(function(x){handleAI(x,q)}).catch(function(e){if(e.name==='AbortError')return;if(conversation)endConversation('Conversation paused. Please try again.');var local=localReply(q);add(local||'Please try again, or use Enquiry to contact the Samara care team.','bot')}).finally(function(){busy=false;releaseWake('request');progress('');conversationUI();resumeConversation()})}
function bestMime(){var a=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];for(var i=0;i<a.length;i++){try{if(window.MediaRecorder&&MediaRecorder.isTypeSupported(a[i]))return a[i]}catch(e){}}return''}
// Explicitly started, turn-based conversation; never listen over Samara's speech.
var conversation=false,voiceToken=0,retainedMic=null,vadContext=null,vadSource=null,vadTimer=null,nextListenTimer=null;
function conversationUI(){var b=document.getElementById('sai-conversation-toggle');if(!b)return;b.textContent=conversation?'■ End conversation':'Start conversation';b.setAttribute('aria-pressed',String(conversation));b.disabled=!conversation&&(busy||startingVoice||!!recorder);}
function clearVAD(){if(vadTimer){clearInterval(vadTimer);vadTimer=null}if(vadSource){vadSource.disconnect();vadSource=null}}
function closeMic(st){if(st)st.getTracks().forEach(function(t){t.onended=null;t.stop()})}
function endConversation(message){
 var wasOn=conversation;conversation=false;clearTimeout(nextListenTimer);nextListenTimer=null;
 stopVoice(true);closeMic(retainedMic);retainedMic=null;
 if(vadContext){vadContext.close().catch(function(){});vadContext=null}
 releaseWake('conversation');
 if(wasOn){requestEpoch++;if(requestController)requestController.abort();if(window.SamaraSpeech)window.SamaraSpeech.stop()}
 conversationUI();if(message){var note=document.querySelector('.sai-note');if(note)note.textContent=message}
}
function resumeConversation(){
 clearTimeout(nextListenTimer);nextListenTimer=null;
 if(!conversation||busy||startingVoice||recorder||!awakeVisible()||(window.SamaraSpeech&&window.SamaraSpeech.active()))return;
 nextListenTimer=setTimeout(function(){nextListenTimer=null;if(conversation&&!busy&&!recorder&&awakeVisible())voice()},450);
}
function startConversation(){
 if(conversation){endConversation('Conversation ended. Tap Start conversation whenever you are ready.');return}
 if(busy||startingVoice||recorder)return;
 var C=window.AudioContext||window.webkitAudioContext;
 if(!C||!window.SamaraSpeech){add('Hands-free conversation is unavailable in this browser. Please use the microphone button.','bot');return}
 try{vadContext=new C();var resumed=vadContext.resume();conversation=true;holdWake('conversation');window.SamaraSpeech.enable();conversationUI();Promise.resolve(resumed).then(function(){if(conversation)voice()}).catch(function(){endConversation('Please tap Start conversation to enable the microphone again.')})}catch(e){endConversation('Please use the microphone button on this browser.')}
}
function watchSilence(st,rec){
 if(!conversation)return;
 if(!vadContext||vadContext.state!=='running')throw new Error('Voice detector unavailable');
 var analyser=vadContext.createAnalyser();analyser.fftSize=2048;vadSource=vadContext.createMediaStreamSource(st);vadSource.connect(analyser);
 var samples=new Uint8Array(analyser.fftSize),began=Date.now(),lastSound=began,voiced=0;
 vadTimer=setInterval(function(){
  if(!conversation||recorder!==rec||rec.state!=='recording'){clearVAD();return}
  if(vadContext.state!=='running'){endConversation('Conversation paused. Tap Start conversation to continue.');return}
  analyser.getByteTimeDomainData(samples);var energy=0;
  for(var i=0;i<samples.length;i++){var v=(samples[i]-128)/128;energy+=v*v}
  var now=Date.now();if(Math.sqrt(energy/samples.length)>.018){voiced+=100;lastSound=now}
  if(voiced>=200&&now-lastSound>=1600){stopVoice();return}
  if(now-began>=20000&&voiced<200)endConversation('Conversation paused after no speech. Tap Start conversation when ready.');
 },100);
}
function stopVoice(discard){
 clearVAD();if(recordingTimer){clearTimeout(recordingTimer);recordingTimer=null}
 if(discard){voiceToken++;startingVoice=false;if(recorder)recorder.samaraDiscard=true}
 if(recorder&&recorder.state!=='inactive')recorder.stop();
 if(discard){closeMic(stream);stream=null;recorder=null;var mic=document.getElementById('sai-mic');if(mic){mic.classList.remove('listening');mic.textContent='🎙';mic.setAttribute('aria-label','Voice input')}progress('');conversationUI()}
 releaseWake('recording');
}
function voice(){
 if(busy||startingVoice)return;
 clearTimeout(nextListenTimer);nextListenTimer=null;
 if(window.SamaraSpeech)window.SamaraSpeech.stop();
 if(recorder&&recorder.state==='recording'){stopVoice();return}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){endConversation();add((L[activeLang()]||L.en).noVoice,'bot');return}
 var token=++voiceToken;startingVoice=true;holdWake('recording');progress('Opening microphone…');conversationUI();
 var input=retainedMic&&retainedMic.getAudioTracks().every(function(t){return t.readyState==='live'})?Promise.resolve(retainedMic):navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
 input.then(function(st){
  if(token!==voiceToken||!awakeVisible()){closeMic(st);return}
  stream=st;if(conversation)retainedMic=st;st.getAudioTracks().forEach(function(t){t.enabled=true;t.onended=function(){endConversation('Microphone disconnected. Tap Start conversation to try again.')}});
  var parts=[],mime=bestMime(),rec=mime?new MediaRecorder(st,{mimeType:mime}):new MediaRecorder(st);recorder=rec;
  var mic=document.getElementById('sai-mic'),note=document.querySelector('.sai-note');
  rec.ondataavailable=function(e){if(e.data?.size)parts.push(e.data)};
  rec.onerror=function(){if(token===voiceToken){endConversation('Recording stopped. Please try again.');add('Microphone recording was interrupted. Please try again.','bot')}};
  rec.onstop=function(){
   if(token!==voiceToken||rec.samaraDiscard){closeMic(st);return}
   clearVAD();clearTimeout(recordingTimer);recordingTimer=null;
   var type=rec.mimeType||(parts[0]?.type)||'audio/webm',blob=new Blob(parts,{type:type});parts=[];
   if(conversation)st.getAudioTracks().forEach(function(t){t.enabled=false});else closeMic(st);
   stream=null;recorder=null;mic.classList.remove('listening');mic.textContent='🎙';mic.setAttribute('aria-label','Voice input');
   if(blob.size<1000){releaseWake('recording');endConversation('No useful speech was captured. Please try again.');return}
   note.textContent=conversation?'Mic paused while Samara replies. It will listen again automatically.':'Processing voice and detecting language…';
   sendAudio(blob,type);releaseWake('recording');conversationUI();
  };
  rec.start();startingVoice=false;watchSilence(st,rec);
  progress(conversation?'Listening… pause briefly to send.':'Listening… tap ■ when finished.');mic.classList.add('listening');mic.textContent='■';mic.setAttribute('aria-label','Send recording');
  note.textContent=conversation?'Listening hands-free. Tap End conversation to finish.':'Recording… speak naturally. Tap ■ when finished.';conversationUI();recordingTimer=setTimeout(function(){stopVoice()},60000);
 }).catch(function(e){if(token!==voiceToken)return;endConversation();add(e?.name==='NotAllowedError'?'Please allow microphone access and try again.':(L[activeLang()]||L.en).noVoice,'bot')});
}
window.SamaraConversation={speechEnded:resumeConversation,speechFailed:function(){if(conversation)endConversation('Voice playback stopped. Tap Start conversation to try again.')},end:function(){if(conversation)endConversation('Conversation ended. Tap Start conversation to continue.')}};
document.addEventListener('visibilitychange',function(){if(document.hidden)endConversation('Conversation paused while the page was hidden. Tap Start conversation to continue.')});
window.addEventListener('pagehide',function(){endConversation()});
function sendAudio(blob,type){if(busy)return;busy=true;holdWake('request');progress('Processing your voice and preparing your reply…');var fd=new FormData(),ext=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm';fd.append('audio',blob,'samara-public-voice.'+ext);fd.append('language',lang==='auto'?(awaitingAddress?activeLang():'auto'):lang);fd.append('awaiting_address',String(awaitingAddress));fd.append('history',JSON.stringify(history));fd.append('page',location.pathname);requestAI({method:'POST',headers:aiHeaders(false),body:fd}).then(function(x){handleAI(x,'')}).catch(function(e){if(e.name==='AbortError')return;if(conversation)endConversation('Conversation paused. Please try again.');add(voiceError(e),'bot')}).finally(function(){busy=false;releaseWake('request');progress('');conversationUI();resumeConversation();document.querySelector('.sai-note').textContent=conversation?'Mic paused while Samara replies. It will listen again automatically.':'Tap Start conversation for hands-free replies, or use the mic for one question.'})}
function bind(){var p=document.getElementById('sai-panel');document.getElementById('sai-launch').onclick=function(){p.classList.add('open');requestWake();if(!opened){opened=true;add(L[lang].hello,'bot')}setTimeout(function(){document.getElementById('sai-input').focus()},50)};document.getElementById('sai-conversation-toggle').onclick=startConversation;document.getElementById('sai-close').onclick=function(){endConversation();requestEpoch++;if(requestController)requestController.abort();if(window.SamaraSpeech)window.SamaraSpeech.stop();stopVoice(true);releaseWake();p.classList.remove('open')};document.getElementById('sai-mic').onclick=voice;document.getElementById('sai-form').onsubmit=function(e){e.preventDefault();if(busy||startingVoice||recorder)return;var i=document.getElementById('sai-input'),v=i.value.trim();if(v){i.value='';intent(v,false)}}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();
