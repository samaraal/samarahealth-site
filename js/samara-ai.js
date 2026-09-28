/* Samara AI Assistant — public website, no patient/ERP access. */
(function(){
'use strict';
var CFG=window.SAMARA_SITE_CONFIG||{};
// Per-site settings (samaraassistedliving.com sets its own in js/samara-ai-config.js).
var SITE=Object.assign({
 mark:'assets/samara-mark.png',
 rooms:[['assets/photos/care-room-single.webp','Private / single care room'],['assets/photos/care-room.webp','Care room at Samara'],['assets/photos/care-room-triple.webp','Triple-sharing care room']],
 gallery:['centre-building','reception','welcome-wall','care-team','ribbon-cutting','lamp-lighting'].map(function(n){return['assets/photos/'+n+'.webp','Samara Assisted Living']}),
 video:'assets/video/samara-opening.mp4',poster:'assets/photos/video-poster.jpg',
 enquiryUrl:'contact.html#enquiry',
 phone:'919976735577',whatsapp:CFG.whatsapp||'917395961616',
 source:location.hostname||'website',
 directors:['assets/photos/dr-krishnan-chellammal-profile.webp','assets/photos/dr-maneesha-boominathan.webp'],
 pages:{about:'about.html',services:'services.html',admission:'contact.html#enquiry',pricing:'contact.html#enquiry'},
 qr:''
},window.SAMARA_AI_SITE||{});
var L={
 auto:{name:'Auto',locale:'',hello:'Hello! I am your Samara AI. You can speak with me. Speak naturally in English, தமிழ், తెలుగు, हिन्दी, ಕನ್ನಡ or മലയാളം. I will detect the language automatically.',ph:'Ask Samara…',rooms:'Rooms',gallery:'Gallery',video:'Video',enquiry:'Enquiry',noVoice:'Microphone recording is not available on this browser/device.'},
 en:{name:'English',locale:'en-IN',hello:'Hello! I am Samara AI. You can type or speak. I can show our rooms, gallery and opening video, or help you make an enquiry.',ph:'Ask Samara…',rooms:'Show rooms',gallery:'Gallery',video:'Video',enquiry:'Enquiry',listen:'Listening…',noVoice:'Voice input is not supported by this browser. Please type your question.',fallback:'I can help with Samara Assisted Living, rooms, gallery, video and enquiries. For detailed questions, our secure AI service will be enabled next.'},
 ta:{name:'தமிழ்',locale:'ta-IN',hello:'வணக்கம்! நான் Samara AI. நீங்கள் தமிழில் பேசலாம் அல்லது தட்டச்சு செய்யலாம். அறைகள், கேலரி, வீடியோ மற்றும் விசாரணைக்கு உதவுகிறேன்.',ph:'Samara-விடம் கேளுங்கள்…',rooms:'அறைகள்',gallery:'கேலரி',video:'வீடியோ',enquiry:'விசாரணை',listen:'கேட்கிறேன்…',noVoice:'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.',fallback:'Samara Assisted Living பற்றிய தகவல், அறைகள், கேலரி, வீடியோ மற்றும் விசாரணைக்கு நான் உதவ முடியும்.'},
 te:{name:'తెలుగు',locale:'te-IN',hello:'నమస్కారం! నేను Samara AI. మీరు తెలుగులో మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు. గదులు, గ్యాలరీ, వీడియో మరియు విచారణలో సహాయం చేస్తాను.',ph:'Samaraని అడగండి…',rooms:'గదులు',gallery:'గ్యాలరీ',video:'వీడియో',enquiry:'విచారణ',listen:'వింటున్నాను…',noVoice:'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.',fallback:'Samara Assisted Living, గదులు, గ్యాలరీ, వీడియో మరియు విచారణ గురించి నేను సహాయం చేయగలను.'},
 hi:{name:'हिन्दी',locale:'hi-IN',hello:'नमस्ते! मैं Samara AI हूँ। आप हिन्दी में बोल या टाइप कर सकते हैं। मैं कमरे, गैलरी, वीडियो और पूछताछ में मदद कर सकता हूँ।',ph:'Samara से पूछें…',rooms:'कमरे',gallery:'गैलरी',video:'वीडियो',enquiry:'पूछताछ',listen:'सुन रहा हूँ…',noVoice:'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें।',fallback:'मैं Samara Assisted Living, कमरे, गैलरी, वीडियो और पूछताछ के बारे में मदद कर सकता हूँ।'},
 kn:{name:'ಕನ್ನಡ',locale:'kn-IN',hello:'ನಮಸ್ಕಾರ! ನಾನು Samara AI. ನೀವು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬಹುದು ಅಥವಾ ಟೈಪ್ ಮಾಡಬಹುದು. ಕೊಠಡಿಗಳು, ಗ್ಯಾಲರಿ, ವೀಡಿಯೊ ಮತ್ತು ವಿಚಾರಣೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',ph:'Samaraಗೆ ಕೇಳಿ…',rooms:'ಕೊಠಡಿಗಳು',gallery:'ಗ್ಯಾಲರಿ',video:'ವೀಡಿಯೊ',enquiry:'ವಿಚಾರಣೆ',listen:'ಕೇಳುತ್ತಿದ್ದೇನೆ…',noVoice:'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.',fallback:'Samara Assisted Living, ಕೊಠಡಿಗಳು, ಗ್ಯಾಲರಿ, ವೀಡಿಯೊ ಮತ್ತು ವಿಚಾರಣೆಯ ಬಗ್ಗೆ ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು.'},
 ml:{name:'മലയാളം',locale:'ml-IN',hello:'നമസ്കാരം! ഞാൻ Samara AI. നിങ്ങൾക്ക് മലയാളത്തിൽ സംസാരിക്കാം അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യാം. മുറികൾ, ഗാലറി, വീഡിയോ, അന്വേഷണം എന്നിവയിൽ സഹായിക്കാം.',ph:'Samara-യോട് ചോദിക്കൂ…',rooms:'മുറികൾ',gallery:'ഗാലറി',video:'വീഡിയോ',enquiry:'അന്വേഷണം',listen:'കേൾക്കുന്നു…',noVoice:'ഈ ബ്രൗസറിൽ വോയ്സ് ഇൻപുട്ട് ലഭ്യമല്ല. ദയവായി ടൈപ്പ് ചെയ്യുക.',fallback:'Samara Assisted Living, മുറികൾ, ഗാലറി, വീഡിയോ, അന്വേഷണം എന്നിവയെക്കുറിച്ച് എനിക്ക് സഹായിക്കാം.'}
};
// Contact buttons and the in-chat visit / call-back form (28-09-2026).
var V={
 en:{visit:'Book a visit',call:'Call',wa:'WhatsApp',title:'Book a visit or call back',you:'Your name',mobile:'Mobile number (10 digits)',who:'Person needing care (name)',day:'Preferred day',time:'Preferred time',morning:'Morning',afternoon:'Afternoon',evening:'Evening',anytime:'Any time',consent:'I agree that Samara may call or WhatsApp me about this request.',send:'Send request',sending:'Sending…',ok:'Thank you. Your request has reached the Samara care team; they will call you to confirm the visit time.',fail:'Sorry, the request could not be sent. Please send it on WhatsApp instead:',many:'Too many requests from this device. Please call or WhatsApp us.',errName:'Please enter your name.',errMobile:'Please enter a valid 10-digit mobile number.',errConsent:'Please tick the consent box.',today:'Today',tomorrow:'Tomorrow'},
 ta:{visit:'வருகை பதிவு',call:'அழைக்க',wa:'WhatsApp',title:'வருகை / திரும்ப அழைப்பு பதிவு',you:'உங்கள் பெயர்',mobile:'மொபைல் எண் (10 இலக்கம்)',who:'பராமரிப்பு தேவைப்படுபவர் (பெயர்)',day:'விரும்பும் நாள்',time:'விரும்பும் நேரம்',morning:'காலை',afternoon:'மதியம்',evening:'மாலை',anytime:'எந்த நேரமும்',consent:'இந்தக் கோரிக்கை பற்றி சமரா என்னை அழைக்கவோ WhatsApp செய்யவோ ஒப்புக்கொள்கிறேன்.',send:'கோரிக்கை அனுப்பு',sending:'அனுப்புகிறது…',ok:'நன்றி. உங்கள் கோரிக்கை சமரா பராமரிப்புக் குழுவுக்குச் சென்றுவிட்டது; வருகை நேரத்தை உறுதிசெய்ய அவர்கள் உங்களை அழைப்பார்கள்.',fail:'மன்னிக்கவும், கோரிக்கையை அனுப்ப முடியவில்லை. WhatsApp-ல் அனுப்பவும்:',many:'இந்தச் சாதனத்திலிருந்து அதிகமான கோரிக்கைகள். தயவுசெய்து அழைக்கவும் அல்லது WhatsApp செய்யவும்.',errName:'உங்கள் பெயரை உள்ளிடவும்.',errMobile:'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.',errConsent:'ஒப்புதல் பெட்டியைத் தேர்வு செய்யவும்.',today:'இன்று',tomorrow:'நாளை'},
 te:{visit:'సందర్శన బుక్',call:'కాల్',wa:'WhatsApp',title:'సందర్శన / తిరిగి కాల్ బుక్ చేయండి',you:'మీ పేరు',mobile:'మొబైల్ నంబర్ (10 అంకెలు)',who:'సంరక్షణ అవసరమైన వ్యక్తి (పేరు)',day:'ఇష్టమైన రోజు',time:'ఇష్టమైన సమయం',morning:'ఉదయం',afternoon:'మధ్యాహ్నం',evening:'సాయంత్రం',anytime:'ఏ సమయమైనా',consent:'ఈ అభ్యర్థన గురించి సమరా నాకు కాల్ లేదా WhatsApp చేయడానికి అంగీకరిస్తున్నాను.',send:'అభ్యర్థన పంపండి',sending:'పంపుతోంది…',ok:'ధన్యవాదాలు. మీ అభ్యర్థన సమరా సంరక్షణ బృందానికి చేరింది; సందర్శన సమయం నిర్ధారించడానికి వారు మీకు కాల్ చేస్తారు.',fail:'క్షమించండి, అభ్యర్థన పంపలేకపోయాము. దయచేసి WhatsApp ద్వారా పంపండి:',many:'ఈ పరికరం నుండి చాలా అభ్యర్థనలు వచ్చాయి. దయచేసి కాల్ లేదా WhatsApp చేయండి.',errName:'దయచేసి మీ పేరు నమోదు చేయండి.',errMobile:'సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',errConsent:'దయచేసి అంగీకార పెట్టెను ఎంచుకోండి.',today:'ఈరోజు',tomorrow:'రేపు'},
 hi:{visit:'विज़िट बुक करें',call:'कॉल',wa:'WhatsApp',title:'विज़िट / कॉल बैक बुक करें',you:'आपका नाम',mobile:'मोबाइल नंबर (10 अंक)',who:'जिन्हें देखभाल चाहिए (नाम)',day:'पसंदीदा दिन',time:'पसंदीदा समय',morning:'सुबह',afternoon:'दोपहर',evening:'शाम',anytime:'कभी भी',consent:'मैं सहमत हूँ कि इस अनुरोध के बारे में समारा मुझे कॉल या WhatsApp कर सकता है।',send:'अनुरोध भेजें',sending:'भेजा जा रहा है…',ok:'धन्यवाद। आपका अनुरोध समारा केयर टीम तक पहुँच गया है; विज़िट का समय पक्का करने के लिए वे आपको कॉल करेंगे।',fail:'क्षमा करें, अनुरोध नहीं भेजा जा सका। कृपया WhatsApp पर भेजें:',many:'इस डिवाइस से बहुत अधिक अनुरोध। कृपया कॉल या WhatsApp करें।',errName:'कृपया अपना नाम लिखें।',errMobile:'कृपया सही 10 अंकों का मोबाइल नंबर लिखें।',errConsent:'कृपया सहमति बॉक्स चुनें।',today:'आज',tomorrow:'कल'},
 kn:{visit:'ಭೇಟಿ ಬುಕ್',call:'ಕರೆ',wa:'WhatsApp',title:'ಭೇಟಿ / ಮರಳಿ ಕರೆ ಬುಕ್ ಮಾಡಿ',you:'ನಿಮ್ಮ ಹೆಸರು',mobile:'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (10 ಅಂಕಿ)',who:'ಆರೈಕೆ ಬೇಕಾದವರು (ಹೆಸರು)',day:'ಇಷ್ಟದ ದಿನ',time:'ಇಷ್ಟದ ಸಮಯ',morning:'ಬೆಳಿಗ್ಗೆ',afternoon:'ಮಧ್ಯಾಹ್ನ',evening:'ಸಂಜೆ',anytime:'ಯಾವಾಗಲಾದರೂ',consent:'ಈ ವಿನಂತಿಯ ಬಗ್ಗೆ ಸಮರಾ ನನಗೆ ಕರೆ ಅಥವಾ WhatsApp ಮಾಡಲು ಒಪ್ಪುತ್ತೇನೆ.',send:'ವಿನಂತಿ ಕಳುಹಿಸಿ',sending:'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…',ok:'ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿನಂತಿ ಸಮರಾ ಆರೈಕೆ ತಂಡಕ್ಕೆ ತಲುಪಿದೆ; ಭೇಟಿಯ ಸಮಯ ದೃಢಪಡಿಸಲು ಅವರು ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.',fail:'ಕ್ಷಮಿಸಿ, ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು WhatsApp ಮೂಲಕ ಕಳುಹಿಸಿ:',many:'ಈ ಸಾಧನದಿಂದ ಹೆಚ್ಚು ವಿನಂತಿಗಳು. ದಯವಿಟ್ಟು ಕರೆ ಅಥವಾ WhatsApp ಮಾಡಿ.',errName:'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ.',errMobile:'ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',errConsent:'ದಯವಿಟ್ಟು ಒಪ್ಪಿಗೆ ಪೆಟ್ಟಿಗೆ ಆಯ್ಕೆಮಾಡಿ.',today:'ಇಂದು',tomorrow:'ನಾಳೆ'},
 ml:{visit:'സന്ദർശനം ബുക്ക്',call:'വിളിക്കുക',wa:'WhatsApp',title:'സന്ദർശനം / തിരികെ വിളി ബുക്ക് ചെയ്യുക',you:'നിങ്ങളുടെ പേര്',mobile:'മൊബൈൽ നമ്പർ (10 അക്കം)',who:'പരിചരണം ആവശ്യമുള്ള ആൾ (പേര്)',day:'ഇഷ്ടമുള്ള ദിവസം',time:'ഇഷ്ടമുള്ള സമയം',morning:'രാവിലെ',afternoon:'ഉച്ചയ്ക്ക്',evening:'വൈകുന്നേരം',anytime:'ഏതു സമയവും',consent:'ഈ അഭ്യർത്ഥനയെക്കുറിച്ച് സമര എന്നെ വിളിക്കാനോ WhatsApp ചെയ്യാനോ ഞാൻ സമ്മതിക്കുന്നു.',send:'അഭ്യർത്ഥന അയയ്ക്കുക',sending:'അയയ്ക്കുന്നു…',ok:'നന്ദി. നിങ്ങളുടെ അഭ്യർത്ഥന സമര കെയർ ടീമിന് ലഭിച്ചു; സന്ദർശന സമയം ഉറപ്പാക്കാൻ അവർ നിങ്ങളെ വിളിക്കും.',fail:'ക്ഷമിക്കണം, അഭ്യർത്ഥന അയയ്ക്കാനായില്ല. ദയവായി WhatsApp വഴി അയയ്ക്കുക:',many:'ഈ ഉപകരണത്തിൽ നിന്ന് അധികം അഭ്യർത്ഥനകൾ. ദയവായി വിളിക്കുകയോ WhatsApp ചെയ്യുകയോ ചെയ്യുക.',errName:'ദയവായി നിങ്ങളുടെ പേര് നൽകുക.',errMobile:'ശരിയായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.',errConsent:'ദയവായി സമ്മത ബോക്സ് തിരഞ്ഞെടുക്കുക.',today:'ഇന്ന്',tomorrow:'നാളെ'}
};
function vt(k){var x=V[activeLang()]||V.en;return x[k]||V.en[k]}
function pretty(n){return '+91 '+String(n).slice(-10,-5)+' '+String(n).slice(-5)}
function contactButtons(){
 var d=document.createElement('div');d.className='sai-contact';
 var c=document.createElement('a');c.href='tel:+'+SITE.phone;c.className='sai-contact-call';c.textContent='📞 '+vt('call')+' '+pretty(SITE.phone);
 var w=document.createElement('a');w.href='https://wa.me/'+SITE.whatsapp;w.target='_blank';w.rel='noopener noreferrer';w.className='sai-contact-wa';w.textContent='💬 '+vt('wa')+' '+pretty(SITE.whatsapp);
 d.appendChild(c);d.appendChild(w);document.getElementById('sai-msgs').appendChild(d);scroll();
}
function contactQuestion(t){return /phone|number|call|whats\s*app|contact|mobile|reach you|தொலைபேசி|போன்|நம்பர்|எண்|அழை|தொடர்பு|ఫోన్|నంబర్|సంప్రదించ|फ़ोन|फोन|नंबर|संपर्क|ಫೋನ್|ನಂಬರ್|ಸಂಪರ್ಕ|ഫോൺ|നമ്പർ|ബന്ധപ്പെട|വിളിക്ക/i.test(String(t||''))}
function dmy(d){return ('0'+d.getDate()).slice(-2)+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+d.getFullYear()}
function visitForm(){
 var old=document.getElementById('sai-visit');if(old){old.scrollIntoView({block:'nearest'});return}
 var f=document.createElement('form');f.className='sai-msg sai-visit';f.id='sai-visit';f.noValidate=true;
 var days='',now=new Date(),wk=new Intl.DateTimeFormat((L[activeLang()]||L.en).locale||'en-IN',{weekday:'short'});
 for(var i=0;i<8;i++){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);var label=(i===0?vt('today'):i===1?vt('tomorrow'):wk.format(d))+', '+dmy(d);days+='<option value="'+dmy(d)+'"'+(i===1?' selected':'')+'>'+esc(label)+'</option>'}
 f.innerHTML='<strong>'+esc(vt('title'))+'</strong>'+
  '<label>'+esc(vt('you'))+'<input name="contact" autocomplete="name" maxlength="80" required></label>'+
  '<label>'+esc(vt('mobile'))+'<input name="mobile" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" required></label>'+
  '<label>'+esc(vt('who'))+'<input name="resident" maxlength="80"></label>'+
  '<div class="sai-visit-row"><label>'+esc(vt('day'))+'<select name="day">'+days+'</select></label>'+
  '<label>'+esc(vt('time'))+'<select name="time"><option>'+esc(vt('morning'))+'</option><option>'+esc(vt('afternoon'))+'</option><option>'+esc(vt('evening'))+'</option><option selected>'+esc(vt('anytime'))+'</option></select></label></div>'+
  '<input name="website" tabindex="-1" autocomplete="off" class="sai-hp" aria-hidden="true">'+
  '<label class="sai-visit-consent"><input type="checkbox" name="consent"> <span>'+esc(vt('consent'))+'</span></label>'+
  '<p class="sai-visit-msg" role="status"></p><button type="submit" class="sai-visit-send">'+esc(vt('send'))+'</button>';
 document.getElementById('sai-msgs').appendChild(f);scroll();
 var msg=f.querySelector('.sai-visit-msg'),btn=f.querySelector('.sai-visit-send');
 f.onsubmit=function(e){
  e.preventDefault();
  var v={contact:f.contact.value.trim(),mobile:f.mobile.value.replace(/\D/g,'').replace(/^(?:91|0)(?=[6-9]\d{9}$)/,''),resident:f.resident.value.trim(),day:f.day.value,time:f.time.value};
  msg.className='sai-visit-msg';
  if(v.contact.length<2){msg.textContent=vt('errName');f.contact.focus();return}
  if(!/^[6-9]\d{9}$/.test(v.mobile)){msg.textContent=vt('errMobile');f.mobile.focus();return}
  if(!f.consent.checked){msg.textContent=vt('errConsent');return}
  if(f.website.value){msg.className='sai-visit-msg ok';msg.textContent=vt('ok');f.querySelectorAll('input,select,button').forEach(function(x){x.disabled=true});return}
  var note='Visit / call-back request via Samara AI ('+SITE.source+'). Preferred day: '+v.day+', '+v.time+'. Chat language: '+((L[activeLang()]||L.en).name)+'.';
  var wa='https://wa.me/'+SITE.whatsapp+'?text='+encodeURIComponent(note+'\nName: '+v.contact+'\nMobile: +91 '+v.mobile+(v.resident?'\nPerson needing care: '+v.resident:''));
  function fail(text){msg.className='sai-visit-msg err';msg.textContent=text+' ';var a=document.createElement('a');a.href=wa;a.target='_blank';a.rel='noopener noreferrer';a.textContent='WhatsApp ↗';msg.appendChild(a);btn.disabled=false;btn.textContent=vt('send')}
  btn.disabled=true;btn.textContent=vt('sending');msg.textContent='';
  fetch((CFG.supabaseUrl||'').replace(/\/$/,'')+'/rest/v1/rpc/website_submit_enquiry',{method:'POST',headers:{'Content-Type':'application/json',apikey:CFG.supabaseKey},
   body:JSON.stringify({p_resident_name:v.resident||v.contact,p_contact_name:v.contact,p_mobile:v.mobile,p_age:null,p_care_type:'Something else',p_message:note,p_consent:true,p_language:activeLang()==='ta'?'ta':'en'})})
  .then(function(r){return r.json().catch(function(){return{}}).then(function(d){return{ok:r.ok,d:d}})})
  .then(function(r){if(r.ok&&r.d&&r.d.ok){msg.className='sai-visit-msg ok';msg.textContent=vt('ok');f.querySelectorAll('input,select,button').forEach(function(x){x.disabled=true});btn.textContent='✓';return}
   fail(/too many/i.test(String((r.d&&(r.d.message||r.d.error))||''))?vt('many'):vt('fail'))})
  .catch(function(){fail(vt('fail'))});
 };
}
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
function inferLang(s){s=String(s||'');if(/[\u0D00-\u0D7F]/.test(s))return'ml';if(/[\u0B80-\u0BFF]/.test(s))return'ta';if(/[\u0C00-\u0C7F]/.test(s))return'te';if(/[\u0900-\u097F]/.test(s))return'hi';if(/[\u0C80-\u0CFF]/.test(s))return'kn';return'en'}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function ui(){var root=document.createElement('div');root.innerHTML='<button class="sai-launch" id="sai-launch" aria-label="Ask Samara AI"><span>✦</span><span>Ask Samara AI</span></button><section class="sai-panel" id="sai-panel" aria-label="Samara AI assistant"><div class="sai-head"><img src="'+esc(SITE.mark)+'" alt=""><div class="sai-title"><strong>Samara AI</strong><small>Voice • Text • Rooms • Gallery</small></div><button class="sai-close" id="sai-close" aria-label="Close">×</button></div><div class="sai-langs" id="sai-langs"></div><div class="sai-conversation"><button type="button" id="sai-conversation-toggle" aria-pressed="false">Start conversation</button><small id="sai-conversation-help">Talk hands-free. Pause briefly to send; Samara listens again after replying.</small></div><div class="sai-msgs" id="sai-msgs" aria-live="polite"></div><div class="sai-progress" id="sai-progress" role="status" aria-live="polite" hidden><span class="sai-progress-dots" aria-hidden="true"><i></i><i></i><i></i></span><span id="sai-progress-text"></span></div><div class="sai-quick" id="sai-quick"></div><form class="sai-compose" id="sai-form"><button type="button" class="sai-mic" id="sai-mic" aria-label="Voice input">🎙</button><input id="sai-input" autocomplete="off"><button class="sai-send" aria-label="Send">➤</button></form><div id="sai-awake" class="sai-awake" role="status" hidden></div><div class="sai-note">Auto detects English • தமிழ் • తెలుగు • हिन्दी • ಕನ್ನಡ • മലയാളം. Tap 🎙 to start, tap ■ to stop.</div></section>';document.body.appendChild(root);renderLangs();setLang('auto');bind()}
function add(text,who){var d=document.createElement('div');d.className='sai-msg '+(who==='user'?'sai-user':'sai-bot');d.textContent=String(text||'').replace(/https:\/\/maps\.app\.goo\.gl\/NwdW9T6WFnosJg8V7(?:\?g_st=iw)?/g,'Google Maps navigation');document.getElementById('sai-msgs').appendChild(d);scroll()}
function progress(text){var p=document.getElementById('sai-progress');p.hidden=!text;document.getElementById('sai-progress-text').textContent=text||'';document.querySelectorAll('.sai-send,#sai-input,#sai-mic,.sai-quick button,.sai-lang').forEach(function(e){e.disabled=e.id==='sai-mic'?busy||startingVoice:busy||startingVoice||!!recorder});conversationUI();}
function navigationQuestion(text){return /direction|navigat|google.?map|map link|location|address|how.*reach|வழி|முகவரி|இருப்பிடம்|చిరునామా|దారి|నావిగే|पता|रास्ता|दिशा|लोकेशन|ವಿಳಾಸ|ದಾರಿ|ಸ್ಥಳ/i.test(String(text||''))}
function navigationLink(){var a=document.createElement('a');a.href=MAP_URL;a.target='_blank';a.rel='noopener noreferrer';a.className='sai-map-link';a.textContent='📍 Open Google Maps navigation ↗';document.getElementById('sai-msgs').appendChild(a);scroll();}
function referenceLinks(text){
 [['https://samaraassistedliving.com/faq.html','Read Samara’s official FAQ ↗'],['https://family.samaraassistedliving.com','Open secure Family Portal ↗']].forEach(function(item){
  if(!String(text||'').includes(item[0]))return;
  var a=document.createElement('a');a.href=item[0];a.target='_blank';a.rel='noopener noreferrer';a.className='sai-map-link';a.textContent=item[1];document.getElementById('sai-msgs').appendChild(a);scroll();
 });
}
function requestAI(options){var controller=new AbortController(),epoch=requestEpoch,timer=setTimeout(function(){controller.abort()},90000);requestController=controller;options.signal=controller.signal;return fetch(endpoint(),options).then(readAIResponse).then(function(x){if(epoch!==requestEpoch){var e=new Error('Cancelled');e.name='AbortError';throw e}return x}).catch(function(e){if(e.name==='AbortError'&&epoch===requestEpoch){var timeout=new Error('Request timed out');timeout.name='TimeoutError';throw timeout}throw e}).finally(function(){clearTimeout(timer);if(requestController===controller)requestController=null})}
function media(src,cap,video){var d=document.createElement('div');d.className='sai-msg sai-media';d.innerHTML=video?'<video controls playsinline preload="none" poster="'+esc(SITE.poster)+'"><source src="'+src+'" type="video/mp4"></video><p>'+esc(cap)+'</p>':'<img src="'+src+'" alt="'+esc(cap)+'" loading="lazy"><p>'+esc(cap)+'</p>';document.getElementById('sai-msgs').appendChild(d);scroll()}
function scroll(){var m=document.getElementById('sai-msgs');m.scrollTop=m.scrollHeight}
function renderLangs(){var x=document.getElementById('sai-langs');Object.keys(L).forEach(function(k){var b=document.createElement('button');b.className='sai-lang';b.type='button';b.dataset.lang=k;b.textContent=L[k].name;b.onclick=function(){setLang(k)};x.appendChild(b)})}
function setLang(k){if(conversation)endConversation();awaitingAddress=false;if(window.SamaraSpeech)window.SamaraSpeech.stop();lang=L[k]?k:'auto';document.querySelectorAll('.sai-lang').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang)});var a=L[activeLang()]||L.en;document.getElementById('sai-input').placeholder=(L[lang]||a).ph;var q=document.getElementById('sai-quick');q.innerHTML='';[['visit','visit'],['rooms','rooms'],['gallery','gallery'],['video','video'],['enquiry','enquiry']].forEach(function(a){var b=document.createElement('button');b.type='button';if(a[0]==='visit')b.className='sai-quick-visit';b.textContent=a[0]==='visit'?'📅 '+vt('visit'):(L[activeLang()]||L.en)[a[0]];b.onclick=function(){intent(a[1],true)};q.appendChild(b)});if(opened)add((L[lang]||L[activeLang()]||L.en).hello,'bot')}
// 28-09-2026: photos and video open in a large pop-up viewer; the chat keeps small thumbnails.
var VW={en:'Tap a photo to view it large',ta:'பெரிதாகப் பார்க்க படத்தைத் தட்டவும்',te:'పెద్దగా చూడటానికి ఫోటోను తాకండి',hi:'बड़ा देखने के लिए फ़ोटो पर टैप करें',kn:'ದೊಡ್ಡದಾಗಿ ನೋಡಲು ಫೋಟೋ ಒತ್ತಿ',ml:'വലുതായി കാണാൻ ഫോട്ടോയിൽ തൊടുക'};
var viewerEl=null;
// 28-09-2026: topic cards shown in the side window during the conversation (verified / published facts only).
var BIO={"intro": {"en": "Samara Health Care LLP is led by its two directors, who are closely involved in the care, quality and day-to-day running of the centre.", "ta": "சமரா ஹெல்த் கேர் எல்எல்பி அதன் இரண்டு இயக்குநர்களால் வழிநடத்தப்படுகிறது; அவர்கள் மையத்தின் பராமரிப்பு, தரம் மற்றும் அன்றாட நடவடிக்கைகளில் நேரடியாக ஈடுபடுகின்றனர்."}, "aka": {"en": "Fondly known as Mrs. Chella Boomi", "ta": "திருமதி செல்லா பூமி என அனைவராலும் அன்புடன் அழைக்கப்படுபவர்"}, "c": [{"en": "Dr. Krishnan Chellammal is a senior nursing and healthcare leader whose career spans more than 35 years of clinical care, nursing administration and hospital management.", "ta": "டாக்டர் கிருஷ்ணன் செல்லம்மாள் அவர்கள், செவிலியர் மற்றும் சுகாதார மேலாண்மைத் துறையில் 35 ஆண்டுகளுக்கும் மேலான அனுபவம் கொண்ட மூத்த தலைவர். நோயாளர் பராமரிப்பு, செவிலியர் நிர்வாகம், மருத்துவமனை மேலாண்மை ஆகிய மூன்றிலும் நீண்ட பணி அனுபவம் பெற்றவர்."}, {"en": "As Chief Nursing Officer and Group Head – Nursing at KMCH, she led a team of nearly 1,500 nursing professionals across the group. Earlier, as Nursing Director and Chief Nursing Officer at Kauvery Hospital, Chennai, she helped build its nursing services from the ground up, beginning at the project stage.", "ta": "KMCH மருத்துவமனைக் குழுமத்தில் தலைமைச் செவிலியர் அலுவலராகவும், செவிலியர் பிரிவின் குழுமத் தலைவராகவும் பணியாற்றி, சுமார் 1,500 செவிலியர்களை வழிநடத்தினார். அதற்கு முன்பு, சென்னை காவேரி மருத்துவமனையில் செவிலியர் இயக்குநராகவும் தலைமைச் செவிலியர் அலுவலராகவும் இருந்து, மருத்துவமனை தொடங்கப்பட்ட காலத்திலிருந்தே அதன் செவிலியர் சேவைகளைக் கட்டியெழுப்பியதில் முக்கியப் பங்காற்றினார்."}, {"en": "She holds an M.Sc. (Nursing), an MBA in Health Care Services from Anna University and a Ph.D. in Hospital Management from Bharathiar University. Her contribution to the profession has been recognised with the Excellence in Nursing Award from the Association of Healthcare Providers (India) – AHPI.", "ta": "செவிலியத்தில் முதுநிலைப் பட்டம் (M.Sc. Nursing), அண்ணா பல்கலைக்கழகத்தில் சுகாதாரச் சேவைகள் பிரிவில் எம்.பி.ஏ., பாரதியார் பல்கலைக்கழகத்தில் மருத்துவமனை மேலாண்மையில் முனைவர் பட்டம் (Ph.D.) ஆகியவற்றைப் பெற்றவர். செவிலியர் துறையில் அவர் ஆற்றிய சிறந்த பணிக்காக, இந்திய சுகாதார சேவை வழங்குநர்கள் சங்கம் (AHPI) அவருக்கு ‘செவிலியர் சேவைச் சிறப்பு விருது’ வழங்கிக் கௌரவித்துள்ளது."}, {"en": "At Samara, she brings these decades of experience to a single purpose — care that is safe, compassionate and dignified, where professional healthcare standards meet the warmth and personal attention of a caring environment.", "ta": "இத்தனை ஆண்டுகால அனுபவத்துடன், சமராவில் அவர் ஒரே இலக்கை நோக்கிப் பணியாற்றுகிறார் — ஒவ்வொருவருக்கும் பாதுகாப்பான, கருணை நிறைந்த, கண்ணியமான பராமரிப்பு. உயர்ந்த மருத்துவத் தரத்துடன், அக்கறை நிறைந்த சூழலின் அரவணைப்பையும் தனிப்பட்ட கவனிப்பையும் இணைப்பதே அவரது நோக்கம்."}], "m_k": {"en": "A Note from Our Director", "ta": "எங்கள் இயக்குநரின் குறிப்பு"}, "m": [{"en": "When we envisioned Samara Health Care LLP, the goal was never just to offer treatments; it was to build a sanctuary of trust and genuine care. Entering the medical field has given me both the scientific foundation and the moral clarity to realize that sustainable well-being must be inclusive and accessible.", "ta": "சமரா ஹெல்த் கேர் எல்எல்பி-யை நாங்கள் கனவு கண்டபோது, வெறும் சிகிச்சை அளிப்பது மட்டும் எங்கள் நோக்கமாக இருக்கவில்லை; நம்பிக்கையும் உண்மையான அக்கறையும் நிறைந்த ஒரு புகலிடத்தை உருவாக்குவதே எங்கள் இலக்கு. மருத்துவத் துறையில் நான் அடியெடுத்து வைத்தது, எனக்கு அறிவியல் அடித்தளத்தையும், நீடித்த நல்வாழ்வு அனைவரையும் உள்ளடக்கியதாகவும் அனைவருக்கும் எட்டக்கூடியதாகவும் இருக்க வேண்டும் என்ற தெளிவையும் தந்தது."}, {"en": "My promise to every individual who walks through our doors is simple: compassionate listening, uncompromising quality, and an unwavering commitment to your health. Together with our dedicated team, I look forward to serving our community with grace, purpose, and heart.", "ta": "எங்கள் வாசலைக் கடந்து வரும் ஒவ்வொருவருக்கும் நான் அளிக்கும் வாக்குறுதி எளிமையானது: கனிவுடன் செவிமடுத்தல், சமரசமில்லாத தரம், உங்கள் உடல்நலனில் தளராத அர்ப்பணிப்பு. எங்கள் அர்ப்பணிப்புள்ள குழுவுடன் இணைந்து, கண்ணியத்துடனும், நோக்கத்துடனும், முழு மனதுடனும் நம் சமூகத்திற்குச் சேவை செய்ய ஆவலுடன் இருக்கிறேன்."}]};
var CARD={
 en:{open:'Open page ↗',callback:'📞 Request a call back',visit:'📅 Book a visit',view:'View details',
  directors:{t:'Our Leadership',c:'Dr. Krishnan Chellammal',m:'Dr. Maneesha Boominathan',role:'Director, Samara Health Care LLP'},
  location:{t:'How to reach us',addr:'Samara Assisted Living, RBK VILLA, No. 23-A, Reddipalayam Road, Jeswant Nagar Phase 1, Mogappair West, Chennai – 600 037',land:'Landmark: about 300 m opposite Decathlon, Chennai Bypass Road. Chennai Corporation Park – Phase 1 is nearby.',maps:'📍 Open in Google Maps',qr:'Scan for directions'},
  admission:{t:'Admission at Samara',steps:'Steps',s:['Talk to us about the person’s needs','Health and care assessment','Choose an available room','Share medical information and documents','Confirm care plan, charges and terms','Complete admission formalities'],docs:'Documents to keep ready',d:['Resident’s ID and address proof','Family member / guardian ID and contact details','Recent medical records / discharge summary','Current prescriptions and medicine list','Allergies and existing conditions','Treating doctor’s name and contact','Emergency contacts']},
  pricing:{t:'Charges & visiting hours',dep:'The monthly charge depends on',depl:['Preferred room: Private / Single, Twin-Sharing or Triple-Sharing','Care and nursing needs','Length of stay'],inc:'Basic package includes',incl:['Room rent','Nursing care','Food'],ext:'Charged separately (unless in your package)',extl:['Medicines and consumables','Laboratory tests and doctor consultations','Physiotherapy','Ambulance and hospital charges'],vis:'Visiting hours',vist:'Generally 10 AM – 5 PM, subject to residents’ rest, health and safety. Visits to see the centre are welcome, preferably by appointment.',note:'Share your number and our team will call you with the exact estimate.'},
  services:{t:'Care at Samara',l:['24×7 trained nursing support','Medication management and records','Vitals monitoring and doctor coordination','Wound care and clinical procedures','Oxygen support for residents who need it (as advised by the doctor)','Physiotherapy and rehabilitation','Diet support and regular meals','Help with bathing, dressing, toileting, feeding and mobility','Post-hospital / step-down care','Short stay, respite and long-term stay'],note:'Samara is not a hospital — emergencies are referred to hospital care.'},
  portal:{t:'Family Portal',p:'Authorised relatives receive secure Family Portal log-in details at admission. It can show:',l:['Approved daily care updates','Medication information','Vital signs and clinical summaries','Physiotherapy progress','Bills and receipts','Secure documents'],open:'Open Family Portal ↗'}},
 ta:{open:'பக்கத்தைத் திற ↗',callback:'📞 திரும்ப அழைக்கக் கோருங்கள்',visit:'📅 வருகை பதிவு',view:'விவரங்களைப் பார்க்க',
  directors:{t:'எங்கள் தலைமை',c:'டாக்டர் கிருஷ்ணன் செல்லம்மாள்',m:'டாக்டர் மணீஷா பூமிநாதன்',role:'இயக்குநர், சமரா ஹெல்த் கேர் எல்எல்பி'},
  location:{t:'எங்களை அடையும் வழி',addr:'சமரா அசிஸ்டட் லிவிங், RBK VILLA, எண் 23-A, ரெட்டிபாளையம் சாலை, ஜெஸ்வந்த் நகர் பேஸ் 1, முகப்பேர் மேற்கு, சென்னை – 600 037',land:'அடையாளம்: சென்னை பைபாஸ் சாலையில் உள்ள Decathlon-க்கு எதிர்ப்புறம் சுமார் 300 மீட்டர். Chennai Corporation Park – Phase 1 அருகில் உள்ளது.',maps:'📍 Google Maps-ல் திற',qr:'வழிக்கு ஸ்கேன் செய்யவும்'},
  admission:{t:'சமராவில் சேர்க்கை',steps:'படிகள்',s:['தேவைகளைப் பற்றி எங்களுடன் பேசுங்கள்','உடல்நலம் மற்றும் பராமரிப்பு மதிப்பீடு','கிடைக்கும் அறையைத் தேர்வு செய்தல்','மருத்துவத் தகவல்கள் மற்றும் ஆவணங்கள்','பராமரிப்புத் திட்டம், கட்டணம், விதிமுறைகள் உறுதி','சேர்க்கை நடைமுறைகளை நிறைவு செய்தல்'],docs:'தயாராக வைக்க வேண்டிய ஆவணங்கள்',d:['தங்குபவரின் அடையாள மற்றும் முகவரிச் சான்று','குடும்ப உறுப்பினர் / பாதுகாவலர் அடையாளம் மற்றும் தொடர்பு விவரம்','சமீபத்திய மருத்துவப் பதிவுகள் / டிஸ்சார்ஜ் சுருக்கம்','தற்போதைய மருந்துச் சீட்டு மற்றும் மருந்துப் பட்டியல்','ஒவ்வாமைகள் மற்றும் உள்ள நோய்கள்','சிகிச்சை அளிக்கும் மருத்துவரின் பெயர், தொடர்பு','அவசரத் தொடர்பு எண்கள்']},
  pricing:{t:'கட்டணம் & பார்வை நேரம்',dep:'மாதக் கட்டணம் இவற்றைப் பொறுத்தது',depl:['விரும்பும் அறை: தனி அறை, இருவர் பகிர்வு அல்லது மூவர் பகிர்வு','பராமரிப்பு மற்றும் நர்சிங் தேவைகள்','தங்கும் காலம்'],inc:'அடிப்படைத் தொகுப்பில் அடங்குபவை',incl:['அறை வாடகை','நர்சிங் பராமரிப்பு','உணவு'],ext:'தனிக் கட்டணம் (தொகுப்பில் இல்லையெனில்)',extl:['மருந்துகள் மற்றும் நுகர்பொருட்கள்','பரிசோதனைகள் மற்றும் மருத்துவர் ஆலோசனை','இயன்முறை சிகிச்சை (Physiotherapy)','ஆம்புலன்ஸ் மற்றும் மருத்துவமனைக் கட்டணங்கள்'],vis:'பார்வை நேரம்',vist:'பொதுவாக காலை 10 முதல் மாலை 5 மணி வரை; தங்குபவர்களின் ஓய்வு, உடல்நலம், பாதுகாப்பைப் பொறுத்து. மையத்தைப் பார்வையிட வரவேற்கிறோம் — முன்பதிவு செய்து வருவது நல்லது.',note:'உங்கள் எண்ணைப் பகிருங்கள்; சரியான கட்டணத்தை எங்கள் குழு அழைத்துச் சொல்லும்.'},
  services:{t:'சமராவில் பராமரிப்பு',l:['24×7 பயிற்சி பெற்ற நர்சிங் ஆதரவு','மருந்து மேலாண்மை மற்றும் பதிவுகள்','உடல்நிலைக் கண்காணிப்பு மற்றும் மருத்துவர் ஒருங்கிணைப்பு','காயப் பராமரிப்பு மற்றும் மருத்துவ நடைமுறைகள்','தேவைப்படுவோருக்கு ஆக்ஸிஜன் ஆதரவு (மருத்துவர் அறிவுரைப்படி)','இயன்முறை சிகிச்சை மற்றும் மறுவாழ்வு','உணவு ஆதரவு மற்றும் வழக்கமான உணவு','குளியல், உடை, கழிப்பறை, உணவு, நடமாட்டத்திற்கு உதவி','மருத்துவமனைக்குப் பிந்தைய / இடைநிலைப் பராமரிப்பு','குறுகிய கால, ஓய்வுக்கால மற்றும் நீண்ட கால தங்குதல்'],note:'சமரா மருத்துவமனை அல்ல — அவசர நிலைகள் மருத்துவமனைக்குப் பரிந்துரைக்கப்படும்.'},
  portal:{t:'குடும்ப இணையதளம் (Family Portal)',p:'சேர்க்கையின் போது அங்கீகரிக்கப்பட்ட உறவினர்களுக்குப் பாதுகாப்பான உள்நுழைவு விவரங்கள் வழங்கப்படும். இதில் பார்க்கலாம்:',l:['அங்கீகரிக்கப்பட்ட தினசரி பராமரிப்புத் தகவல்கள்','மருந்துத் தகவல்கள்','உடல்நிலை அளவீடுகள் மற்றும் மருத்துவச் சுருக்கம்','இயன்முறை சிகிச்சை முன்னேற்றம்','பில்கள் மற்றும் ரசீதுகள்','பாதுகாப்பான ஆவணங்கள்'],open:'Family Portal-ஐத் திற ↗'}}
};
function ct(){return /^ta/.test(activeLang())||(lang==='auto'&&/^ta/i.test(document.documentElement.lang||''))?CARD.ta:CARD.en}
function bl(o){return (/^ta/.test(activeLang())?o.ta:o.en)||o.en}
function topicOf(t){t=String(t||'').toLowerCase();
 if(/in ?charge|head of (samara|the (centre|center))|director|founder|found(ed|er)|start(ed)? (samara|this|the (centre|center))|who (is |are )?(running|runs|run|owns|owned|manages|managing|behind|started|heads?)|\bowner|management|managed by|leadership|leader|chairman|\bceo\b|\bmd\b|chellammal|maneesha|chella boomi|இயக்குந|நிறுவன|நிர்வாக|உரிமையாளர்|யார் நடத்த|நடத்துபவர்|தொடங்கிய|செல்லம்மாள்|மணீஷா|డైరెక్టర్|యజమాని|निदेशक|डायरेक्टर|मालिक|संस्थापक|ನಿರ್ದೇಶಕ|ಮಾಲೀಕ|ഡയറക്ടർ|ഉടമ/.test(t))return'directors';
 if(/family portal|portal|\bapp\b|online (update|report)|daily update|updates? (of|on|about) my|see (my|the) (mother|father|parent|amma|appa)|track (my|the)|குடும்ப இணைய|போர்ட்டல்|ஆப்|அப்டேட்|పోర్టల్|पोर्टल|ऐप|ಪೋರ್ಟಲ್|പോർട്ടൽ/.test(t))return'portal';
 if(/admission|admit|document|join samara|how (do|can) (i|we) (join|admit|start|apply|enrol)|procedure|joining|new resident|சேர்க்கை|சேர்ப்ப|சேர்க்க|அட்மிஷன்|ஆவண|அனுமதி|అడ్మిషన్|చేర్చ|दाखिल|भर्ती|दस्तावेज|ಪ್ರವೇಶ|ದಾಖಲೆ|ಸೇರಿಸ|പ്രവേശന|രേഖ|ചേർക്ക/.test(t))return'admission';
 if(/how much|price|pric|cost|charge|package|fee|rate|tariff|rent|monthly|per month|budget|afford|visiting (hour|time)|visit(ing)? timing|visitors? (allowed|time)|எவ்வளவு|கட்டணம்|விலை|பணம்|செலவு|வாடகை|பேக்கேஜ்|பார்வை நேரம்|பார்க்க வர|ధర|ఛార్జ|ఖర్చు|कितना|कीमत|शुल्क|खर्च|पैकेज|ಎಷ್ಟು|ಬೆಲೆ|ಶುಲ್ಕ|ಖರ್ಚು|നിരക്ക്|എത്ര|ഫീസ്|ചെലവ്/.test(t))return'pricing';
 if(navigationQuestion(t)||/address|landmark|decathlon|where (is|are) (it|you|samara|the (centre|center|place))|where is it|how (to|do i|can i) (come|reach|get there|find)|located|location|எங்கே|எங்கு|எப்படி வருவது|అడ్రస్|ఎక్కడ|कहाँ|कहां|ಎಲ್ಲಿ|എവിടെ/.test(t))return'location';
 if(/services|facilit|nursing|physio|oxygen|o2|what (care|services)|care (do|you)|what do you (do|offer|provide)|doctor|medical support|wound|diet|daily care|bathing|feeding|சேவை|வசதி|என்ன பராமரிப்பு|நர்சிங்|சிகிச்சை|ஆக்ஸிஜன்|సేవ|సౌకర్య|सेवा|सुविधा|ಸೇವೆ|ಸೌಲಭ್ಯ|സേവന|സൗകര്യ/.test(t))return'services';
 return null}
// Strong signals in the assistant's own reply, used when the question itself did not name a topic.
function topicOfReply(r){r=String(r||'');
 if(/chellammal|செல்லம்மாள்/i.test(r)&&/maneesha|மணீஷா/i.test(r))return'directors';
 if(/RBK VILLA|Reddipalayam|ரெட்டிபாளையம்|Decathlon/i.test(r))return'location';
 if(/family\.samaraassistedliving\.com|Family Portal/i.test(r))return'portal';
 if(/room rent|அறை வாடகை/i.test(r)&&/food|உணவு/i.test(r))return'pricing';
 if(/discharge summary|டிஸ்சார்ஜ் சுருக்கம்/i.test(r))return'admission';
 return null}
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
function list(items,ordered){var l=el(ordered?'ol':'ul');items.forEach(function(x){l.appendChild(el('li',null,x))});return l}
function btn(text,fn,cls){var b=el('button','sai-card-btn'+(cls?' '+cls:''),text);b.type='button';b.onclick=fn;return b}
function link(text,href,cls){var a=el('a','sai-card-btn'+(cls?' '+cls:''),text);a.href=href;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer'}return a}
function buildCard(topic){
 var T=ct(),c=T[topic],body=el('div','sai-card-body'),acts=el('div','sai-card-actions');
 if(topic==='directors'){
  body.appendChild(el('p','sai-card-lead',bl(BIO.intro)));
  [[SITE.directors[0],T.directors.c,bl(BIO.aka),BIO.c.map(bl)],[SITE.directors[1],T.directors.m,bl(BIO.m_k),BIO.m.map(bl)]].forEach(function(d){
   var f=el('section','sai-person'),img=el('img');img.src=d[0];img.alt=d[1];img.loading='lazy';f.appendChild(img);
   var h=el('div','sai-person-head');h.appendChild(el('strong',null,d[1]));h.appendChild(el('span',null,T.directors.role));h.appendChild(el('em',null,d[2]));f.appendChild(h);
   d[3].forEach(function(x){f.appendChild(el('p',null,x))});body.appendChild(f)});
  if(SITE.pages.about)acts.appendChild(link(T.open,SITE.pages.about));
 }else if(topic==='location'){
  body.appendChild(el('p','sai-card-lead',c.addr));body.appendChild(el('p',null,c.land));
  if(SITE.qr){var q=el('figure','sai-card-qr'),qi=el('img');qi.src=SITE.qr;qi.alt=c.qr;q.appendChild(qi);q.appendChild(el('figcaption',null,c.qr));body.appendChild(q)}
  acts.appendChild(link(c.maps,MAP_URL,'primary'));acts.appendChild(link('📞 '+pretty(SITE.phone),'tel:+'+SITE.phone));
 }else if(topic==='admission'){
  body.appendChild(el('h4',null,c.steps));body.appendChild(list(c.s,true));body.appendChild(el('h4',null,c.docs));body.appendChild(list(c.d));
  acts.appendChild(btn(T.visit,function(){visitForm()},'primary'));if(SITE.pages.admission)acts.appendChild(link(T.open,SITE.pages.admission));
 }else if(topic==='pricing'){
  var inc=el('div','sai-card-hl');inc.appendChild(el('h4',null,c.inc));inc.appendChild(list(c.incl));body.appendChild(inc);
  body.appendChild(el('h4',null,c.dep));body.appendChild(list(c.depl));body.appendChild(el('h4',null,c.ext));body.appendChild(list(c.extl));
  body.appendChild(el('h4',null,'🕙 '+c.vis));body.appendChild(el('p',null,c.vist));body.appendChild(el('p','sai-card-note',c.note));
  acts.appendChild(btn(T.callback,function(){visitForm()},'primary'));if(SITE.pages.pricing)acts.appendChild(link(T.open,SITE.pages.pricing));
 }else if(topic==='services'){
  body.appendChild(list(c.l));body.appendChild(el('p','sai-card-note',c.note));if(SITE.pages.services)acts.appendChild(link(T.open,SITE.pages.services));
 }else if(topic==='portal'){
  body.appendChild(el('p','sai-card-lead',c.p));body.appendChild(list(c.l));acts.appendChild(link(c.open,'https://family.samaraassistedliving.com','primary'));
 }
 return {title:c.t,body:body,actions:acts};
}
var lastTopic=null;
function sideCard(topic){
 closeViewer();var card=buildCard(topic),back=document.activeElement;
 var v=el('div','sai-viewer sai-card-view');v.setAttribute('role','dialog');v.setAttribute('aria-label',card.title);
 var head=el('div','sai-card-title',card.title),x=el('button','sai-v-close','×');x.type='button';x.setAttribute('aria-label','Close');x.onclick=closeViewer;
 v.appendChild(head);v.appendChild(x);v.appendChild(card.body);if(card.actions.children.length)v.appendChild(card.actions);
 function key(e){if(e.key==='Escape'){e.preventDefault();closeViewer()}}
 document.addEventListener('keydown',key,true);v._cleanup=function(){document.removeEventListener('keydown',key,true);try{back&&back.focus&&back.focus()}catch(e){}};
 document.body.appendChild(v);viewerEl=v;
}
function topicChip(topic){
 var T=ct(),b=el('button','sai-chip','📄 '+T[topic].t+' — '+T.view);b.type='button';b.onclick=function(){sideCard(topic)};
 document.getElementById('sai-msgs').appendChild(b);scroll();
}
function maybeTopic(text,reply){
 var t=topicOf(text)||topicOfReply(reply);if(!t)return;
 topicChip(t);
 // Always open the details window (beside the chat on wide screens, over the chat on narrow ones).
 setTimeout(function(){sideCard(t)},150);
 lastTopic=t;
}
function viewer(items,start){
 closeViewer();
 var i=Math.max(0,Math.min(start||0,items.length-1)),back=document.activeElement,tx=null;
 var v=document.createElement('div');v.className='sai-viewer';v.setAttribute('role','dialog');v.setAttribute('aria-label','Samara photos');
 v.innerHTML='<button type="button" class="sai-v-close" aria-label="Close">×</button><button type="button" class="sai-v-prev" aria-label="Previous">‹</button><figure class="sai-v-stage"><div class="sai-v-media"></div><figcaption><span class="sai-v-cap"></span><span class="sai-v-count"></span></figcaption></figure><button type="button" class="sai-v-next" aria-label="Next">›</button>';
 var stage=v.querySelector('.sai-v-media'),cap=v.querySelector('.sai-v-cap'),count=v.querySelector('.sai-v-count'),prev=v.querySelector('.sai-v-prev'),next=v.querySelector('.sai-v-next');
 function show(n){
  i=(n+items.length)%items.length;var it=items[i];stage.innerHTML='';
  if(it.video){var vid=document.createElement('video');vid.controls=true;vid.playsInline=true;vid.preload='metadata';vid.poster=SITE.poster;var so=document.createElement('source');so.src=it.src;so.type='video/mp4';vid.appendChild(so);stage.appendChild(vid);try{if(window.SamaraSpeech)window.SamaraSpeech.stop()}catch(e){}vid.play&&vid.play().catch(function(){})}
  else{var im=document.createElement('img');im.src=it.src;im.alt=it.cap||'';stage.appendChild(im)}
  cap.textContent=it.cap||'';count.textContent=items.length>1?(i+1)+' / '+items.length:'';
  prev.hidden=next.hidden=items.length<2;
 }
 function key(e){if(e.key==='Escape'){e.preventDefault();closeViewer()}else if(e.key==='ArrowLeft'&&items.length>1)show(i-1);else if(e.key==='ArrowRight'&&items.length>1)show(i+1)}
 prev.onclick=function(){show(i-1)};next.onclick=function(){show(i+1)};
 v.querySelector('.sai-v-close').onclick=closeViewer;
 v.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
 v.addEventListener('touchend',function(e){if(tx===null||items.length<2)return;var dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>45)show(dx<0?i+1:i-1)},{passive:true});
 document.addEventListener('keydown',key,true);
 v._cleanup=function(){document.removeEventListener('keydown',key,true);try{back&&back.focus&&back.focus()}catch(e){}};
 document.body.appendChild(v);viewerEl=v;show(i);
 setTimeout(function(){var c=v.querySelector('.sai-v-close');c&&c.focus()},30);
}
function closeViewer(){if(!viewerEl)return;var v=viewerEl;viewerEl=null;var vid=v.querySelector('video');if(vid)try{vid.pause()}catch(e){}v._cleanup&&v._cleanup();v.remove()}
function album(items){
 var d=document.createElement('div');d.className='sai-msg sai-album'+(items.length===1?' sai-album-one':'');
 items.forEach(function(it,n){var b=document.createElement('button');b.type='button';b.className='sai-thumb'+(it.video?' sai-thumb-video':'');b.setAttribute('aria-label',(it.cap||'Photo')+' — view large');
  var im=document.createElement('img');im.src=it.video?SITE.poster:it.src;im.alt='';im.loading='lazy';b.appendChild(im);b.onclick=function(){viewer(items,n)};d.appendChild(b)});
 var hint=document.createElement('p');hint.textContent=VW[activeLang()]||VW.en;d.appendChild(hint);
 document.getElementById('sai-msgs').appendChild(d);scroll();
 viewer(items,0);
}
function showRooms(){album(SITE.rooms.map(function(x){return{src:x[0],cap:x[1]}}))}
function showGallery(){album(SITE.gallery.map(function(x){return{src:x[0],cap:x[1]}}))}
function intent(text,quick){
 if(busy||startingVoice||recorder)return;
 if(conversation)endConversation();if(window.SamaraSpeech)window.SamaraSpeech.stop();
 var raw=String(text||'');
 if(!quick){add(raw,'user');if(lang==='auto'&&!awaitingAddress)detectedLang=inferLang(raw);askAI(raw);return}
 awaitingAddress=false;
 if(raw==='rooms'){showRooms();return}
 if(raw==='gallery'){showGallery();return}
 if(raw==='video'){album([{src:SITE.video,cap:'Samara Assisted Living — opening video',video:true}]);return}
 if(raw==='visit'){visitForm();return}
 if(raw==='enquiry'){location.href=SITE.enquiryUrl;return}
 askAI(raw);
}
function localReply(q){var s=String(q||'').toLowerCase();
 function say(x){var k=activeLang();return x[k]||x.en}
 var R={
 who:{en:'Samara is suitable for elders who need daily support, people discharged from hospital who still need nursing care, people recovering after surgery, stroke, fractures or long illness, and families needing short-stay or respite care. We first assess the person’s health and care needs before admission.',ta:'தினசரி உதவி தேவைப்படும் முதியவர்கள், மருத்துவமனையிலிருந்து discharge ஆன பிறகும் nursing care தேவைப்படுபவர்கள், surgery, stroke, fracture அல்லது நீண்டநாள் நோய்க்குப் பிறகு மீண்டு வருபவர்கள், மற்றும் short-stay / respite care தேவைப்படுபவர்கள் Samara-வில் தங்கலாம். Admissionக்கு முன் உடல்நிலை மற்றும் care needs-ஐ மதிப்பீடு செய்கிறோம்.',te:'రోజువారీ సహాయం అవసరమైన వృద్ధులు, hospital discharge తర్వాత nursing care అవసరమైన వారు, surgery, stroke, fracture లేదా దీర్ఘకాల అనారోగ్యం తర్వాత కోలుకుంటున్న వారు, short-stay / respite care అవసరమైన వారు Samaraలో ఉండవచ్చు. Admissionకు ముందు health మరియు care needs‌ను పరిశీలిస్తాము.',hi:'Samara उन बुज़ुर्गों के लिए है जिन्हें रोज़मर्रा की सहायता चाहिए, hospital discharge के बाद nursing care चाहने वालों के लिए, surgery, stroke, fracture या लंबी बीमारी के बाद recovery करने वालों के लिए, और short-stay / respite care के लिए। Admission से पहले health और care needs का assessment किया जाता है।',kn:'ದೈನಂದಿನ ಸಹಾಯ ಬೇಕಿರುವ ಹಿರಿಯರು, hospital discharge ನಂತರ nursing care ಅಗತ್ಯವಿರುವವರು, surgery, stroke, fracture ಅಥವಾ ದೀರ್ಘಕಾಲದ ಅನಾರೋಗ್ಯದ ನಂತರ ಚೇತರಿಸಿಕೊಳ್ಳುವವರು ಹಾಗೂ short-stay / respite care ಬೇಕಿರುವವರು Samaraದಲ್ಲಿ ಉಳಿಯಬಹುದು. Admissionಗೆ ಮೊದಲು health ಮತ್ತು care needs ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.'},
 care:{en:'We provide 24×7 skilled nursing, medication management, regular vitals and doctor coordination, wound care and clinical procedures, physiotherapy and rehabilitation, diet support, and help with bathing, dressing, toileting, feeding and mobility. Care is planned around each resident.',ta:'24×7 skilled nursing, மருந்து மேலாண்மை, vitals மற்றும் doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support, மேலும் bathing, dressing, toileting, feeding மற்றும் mobility உதவி வழங்குகிறோம். ஒவ்வொரு resident-க்கும் அவர்களின் தேவைக்கேற்ப care plan செய்யப்படுகிறது.',te:'24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support మరియు bathing, dressing, toileting, feeding, mobility సహాయం అందిస్తాము.',hi:'हम 24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support तथा bathing, dressing, toileting, feeding और mobility में सहायता देते हैं।',kn:'ನಾವು 24×7 skilled nursing, medication management, vitals, doctor coordination, wound care, clinical procedures, physiotherapy & rehabilitation, diet support ಹಾಗೂ bathing, dressing, toileting, feeding ಮತ್ತು mobility ಸಹಾಯ ನೀಡುತ್ತೇವೆ.'},
 cost:{en:'The charge depends on the preferred room, the care and nursing needed and the length of stay. The basic package includes room rent, nursing care and food; medicines, tests, doctor visits and other services are extra. Please share your contact number below and our Samara team will call you and explain the options and exact charges.',ta:'கட்டணம் நீங்கள் விரும்பும் அறை, தேவையான பராமரிப்பு மற்றும் நர்சிங், தங்கும் காலம் ஆகியவற்றைப் பொறுத்தது. அடிப்படை தொகுப்பில் அறை வாடகை, நர்சிங் பராமரிப்பு மற்றும் உணவு அடங்கும்; மருந்துகள், பரிசோதனைகள், மருத்துவர் வருகை போன்றவை தனி. கீழே உங்கள் தொடர்பு எண்ணைப் பகிருங்கள்; சமரா குழு உங்களை அழைத்து விவரங்களையும் சரியான கட்டணத்தையும் விளக்குவார்கள்.',te:'ఛార్జీలు మీరు కోరుకునే గది, అవసరమైన సంరక్షణ మరియు నర్సింగ్, ఉండే కాలంపై ఆధారపడి ఉంటాయి. ప్రాథమిక ప్యాకేజీలో గది అద్దె, నర్సింగ్ సంరక్షణ మరియు భోజనం ఉంటాయి; మందులు, పరీక్షలు, డాక్టర్ సందర్శనలు విడిగా. కింద మీ ఫోన్ నంబర్ ఇవ్వండి; సమరా బృందం మీకు కాల్ చేసి వివరాలు మరియు ఖచ్చితమైన ఛార్జీలు తెలియజేస్తుంది.',hi:'शुल्क पसंदीदा कमरे, ज़रूरी देखभाल व नर्सिंग और रहने की अवधि पर निर्भर करता है। बेसिक पैकेज में कमरे का किराया, नर्सिंग देखभाल और भोजन शामिल है; दवाइयाँ, जाँचें, डॉक्टर विज़िट आदि अलग से। कृपया नीचे अपना संपर्क नंबर दें; समारा टीम आपको कॉल करके विकल्प और सही शुल्क बताएगी।',kn:'ಶುಲ್ಕವು ನೀವು ಬಯಸುವ ಕೊಠಡಿ, ಅಗತ್ಯವಿರುವ ಆರೈಕೆ ಮತ್ತು ನರ್ಸಿಂಗ್, ಉಳಿಯುವ ಅವಧಿಯನ್ನು ಅವಲಂಬಿಸಿದೆ. ಮೂಲ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಕೊಠಡಿ ಬಾಡಿಗೆ, ನರ್ಸಿಂಗ್ ಆರೈಕೆ ಮತ್ತು ಊಟ ಸೇರಿದೆ; ಔಷಧಗಳು, ಪರೀಕ್ಷೆಗಳು, ವೈದ್ಯರ ಭೇಟಿ ಪ್ರತ್ಯೇಕ. ಕೆಳಗೆ ನಿಮ್ಮ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ ನೀಡಿ; ಸಮರಾ ತಂಡ ನಿಮಗೆ ಕರೆ ಮಾಡಿ ವಿವರಗಳು ಮತ್ತು ನಿಖರ ಶುಲ್ಕ ತಿಳಿಸುತ್ತದೆ.',ml:'നിരക്ക് ഇഷ്ടമുള്ള മുറി, ആവശ്യമായ പരിചരണവും നഴ്സിംഗും, താമസ കാലാവധി എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു. അടിസ്ഥാന പാക്കേജിൽ മുറി വാടക, നഴ്സിംഗ് പരിചരണം, ഭക്ഷണം എന്നിവ ഉൾപ്പെടുന്നു; മരുന്നുകൾ, പരിശോധനകൾ, ഡോക്ടർ സന്ദർശനം എന്നിവ പ്രത്യേകം. താഴെ നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകൂ; സമര ടീം നിങ്ങളെ വിളിച്ച് വിവരങ്ങളും കൃത്യമായ നിരക്കും വിശദീകരിക്കും.'},
 mobility:{en:'Yes. Samara provides mobility assistance, daily-living support and planned physiotherapy when appropriate. If the person cannot walk or is largely bed-bound, we first need to understand the medical condition, transfer, feeding and toileting needs, and the doctor’s advice so our care team can confirm the right support.',ta:'ஆம். Samara-வில் mobility assistance, தினசரி செயல்களுக்கு உதவி மற்றும் தேவைக்கேற்ப physiotherapy வழங்க முடியும். நடக்க முடியாதவர் அல்லது பெரும்பாலும் படுக்கையிலேயே இருப்பவர் என்றால், medical condition, transfer, feeding/toileting needs மற்றும் doctor advice-ஐ முதலில் தெரிந்துகொண்டு சரியான care level-ஐ எங்கள் குழு உறுதிப்படுத்தும்.',te:'అవును. Mobility assistance, daily-living support మరియు అవసరానికి అనుగుణంగా physiotherapy అందించవచ్చు. నడవలేని లేదా bed-bound వ్యక్తికి medical condition, transfer, feeding/toileting needs మరియు doctor advice తెలుసుకున్న తర్వాత care team సరైన support‌ను నిర్ధారిస్తుంది.',hi:'हाँ। Mobility assistance, daily-living support और आवश्यकता के अनुसार physiotherapy दी जा सकती है। जो व्यक्ति चल नहीं सकता या bed-bound है, उसके medical condition, transfer, feeding/toileting needs और doctor advice को समझकर care team सही support की पुष्टि करेगी।',kn:'ಹೌದು. Mobility assistance, daily-living support ಮತ್ತು ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ physiotherapy ನೀಡಬಹುದು. ನಡೆಯಲು ಆಗದ ಅಥವಾ bed-bound ವ್ಯಕ್ತಿಯ medical condition, transfer, feeding/toileting needs ಮತ್ತು doctor advice ತಿಳಿದು care team ಸರಿಯಾದ support ದೃಢಪಡಿಸುತ್ತದೆ.'},
 post:{en:'Yes. Post-hospital and step-down care is one of Samara’s core services. We support recovery after surgery, stroke, fractures or long illness with nursing, medication safety, monitoring, doctor coordination and planned physiotherapy.',ta:'ஆம். Post-hospital / step-down care Samara-வின் முக்கிய சேவைகளில் ஒன்று. Surgery, stroke, fracture அல்லது நீண்டநாள் நோய்க்குப் பிறகு nursing, medication safety, monitoring, doctor coordination மற்றும் planned physiotherapy மூலம் recovery-க்கு உதவுகிறோம்.',te:'అవును. Post-hospital / step-down care Samara ప్రధాన సేవల్లో ఒకటి. Surgery, stroke, fracture లేదా దీర్ఘకాల అనారోగ్యం తర్వాత nursing, medication safety, monitoring, doctor coordination మరియు physiotherapyతో recoveryకు సహాయం చేస్తాము.',hi:'हाँ। Post-hospital / step-down care Samara की मुख्य सेवाओं में से एक है। Surgery, stroke, fracture या लंबी बीमारी के बाद nursing, medication safety, monitoring, doctor coordination और physiotherapy के साथ recovery में सहायता दी जाती है।',kn:'ಹೌದು. Post-hospital / step-down care Samaraದ ಪ್ರಮುಖ ಸೇವೆಗಳಲ್ಲಿ ಒಂದು. Surgery, stroke, fracture ಅಥವಾ ದೀರ್ಘಕಾಲದ ಅನಾರೋಗ್ಯದ ನಂತರ nursing, medication safety, monitoring, doctor coordination ಮತ್ತು physiotherapy ಮೂಲಕ recoveryಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.'},
 admission:{en:'For admission, we first do a health assessment. Please keep recent medical records, current prescriptions, allergy information and the treating doctor’s details ready. We also encourage families to visit Samara before admission.',ta:'Admissionக்கு முதலில் health assessment செய்வோம். Recent medical records, current prescriptions, allergy information மற்றும் treating doctor details தயாராக வைத்திருக்கவும். Admissionக்கு முன் குடும்பத்தினர் Samara-வை நேரில் வந்து பார்க்கவும் பரிந்துரைக்கிறோம்.',te:'Admissionకు ముందు health assessment చేస్తాము. Recent medical records, current prescriptions, allergy information మరియు treating doctor details సిద్ధంగా ఉంచండి. Admissionకు ముందు కుటుంబం Samaraను సందర్శించాలని సూచిస్తాము.',hi:'Admission के लिए पहले health assessment किया जाता है। Recent medical records, current prescriptions, allergy information और treating doctor details तैयार रखें। Admission से पहले परिवार को Samara देखने के लिए भी प्रोत्साहित किया जाता है।',kn:'Admissionಗೆ ಮೊದಲು health assessment ಮಾಡಲಾಗುತ್ತದೆ. Recent medical records, current prescriptions, allergy information ಮತ್ತು treating doctor details ಸಿದ್ಧವಾಗಿರಲಿ. Admissionಗೆ ಮೊದಲು ಕುಟುಂಬ Samaraಗೆ ಭೇಟಿ ನೀಡುವುದನ್ನೂ ನಾವು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ.'}
 };
 if(/hospital|ஹாஸ்பிடல்|மருத்துவமனை|ఆసుపత్రి|హాస్పిటల్|अस्पताल|हॉस्पिटल|ಆಸ್ಪತ್ರೆ|ಹಾಸ್ಪಿಟಲ್/.test(s))return say({en:'No. Samara is not a hospital. It is an assisted-living and supportive-care centre with trained nurses available 24×7, for people who need more than home care but do not need to remain in hospital. In an emergency, our nurses respond and arrange hospital transfer when needed. Would you like to see our rooms or know who can stay here?',ta:'இல்லை. Samara ஒரு ஹாஸ்பிடல் அல்ல. இது 24×7 பயிற்சி பெற்ற செவிலியர்கள் உள்ள Assisted Living மற்றும் supportive-care centre. வீட்டில் கிடைக்கும் பராமரிப்பை விட அதிக உதவி தேவைப்படுபவர்கள், ஆனால் மருத்துவமனையில் தொடர்ந்து தங்க வேண்டிய அவசியமில்லாதவர்களுக்காக இது அமைக்கப்பட்டுள்ளது. அவசரநிலையில் தேவையானால் மருத்துவமனைக்கு மாற்ற ஏற்பாடு செய்வோம். அறைகளைப் பார்க்க வேண்டுமா, அல்லது யார் இங்கு தங்கலாம் என்று தெரிந்துகொள்ள வேண்டுமா?',te:'కాదు. Samara హాస్పిటల్ కాదు. ఇది 24×7 trained nurses ఉన్న Assisted Living మరియు supportive-care centre. ఇంటి సంరక్షణకంటే ఎక్కువ సహాయం అవసరమైనా hospitalలో ఉండాల్సిన అవసరం లేని వారికి ఇది అనుకూలం.',hi:'नहीं। Samara अस्पताल नहीं है। यह 24×7 trained nurses वाला Assisted Living और supportive-care centre है, उन लोगों के लिए जिन्हें home care से अधिक सहायता चाहिए लेकिन hospital में रहने की आवश्यकता नहीं है।',kn:'ಇಲ್ಲ. Samara ಆಸ್ಪತ್ರೆಯಲ್ಲ. ಇದು 24×7 trained nurses ಇರುವ Assisted Living ಮತ್ತು supportive-care centre. ಮನೆಯ ಆರೈಕೆಯಿಗಿಂತ ಹೆಚ್ಚಿನ ಸಹಾಯ ಬೇಕಾದರೂ hospitalನಲ್ಲಿ ಉಳಿಯುವ ಅಗತ್ಯವಿಲ್ಲದವರಿಗೆ ಇದು ಸೂಕ್ತ.'});
 if(/who can stay|suitable|eligible|யார்.*(தங்க|சேர)|யாருக்கு|ఎవరు.*ఉండ|कौन.*रह|ಯಾರು.*ಉಳಿಯ/.test(s))return say(R.who);
 if(/what care|services|provide|என்ன.*(care|பராமரிப்பு|சேவை)|சேவைகள்|సేవ|देखभाल|सेवा|ಆರೈಕೆ|ಸೇವೆ/.test(s))return say(R.care);
 if(/how much|price|cost|charge|package|fees|rate|எவ்வளவு|கட்டணம்|விலை|பேக்கேஜ்|ధర|ఛార్జ|कितना|कीमत|शुल्क|पैकेज|ಎಷ್ಟು|ಬೆಲೆ|ಶುಲ್ಕ|നിരക്ക്|എത്ര|ഫീസ്|പാക്കേജ്/.test(s))return say(R.cost);
 if(/cannot walk|can't walk|bedridden|wheelchair|mobility|நடக்க முடிய|படுக்கை|வீல்சேர்|నడవలే|व्हीलचेयर|चल नहीं|बिस्तर|ನಡೆಯಲು ಆಗ|ವೀಲ್/.test(s))return say(R.mobility);
 if(/after hospital|discharg|after surgery|stroke|fracture|டிஸ்சார்ஜ்|அறுவை|ஸ்ட்ரோக்|ఫ్రాక్చర్|डिस्चार्ज|सर्जरी|स्ट्रोक|ಡಿಸ್ಚಾರ್ಜ್|ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ/.test(s))return say(R.post);
 if(/admission.*need|documents|what.*admission|அட்மிஷன்.*(என்ன|தேவை)|ஆவண|అడ్మిషన్|दाखिले|दस्तावेज|ದಾಖಲೆ/.test(s))return say(R.admission);
 if(/what is samara|about samara|சமரா.*(என்ன|பற்றி)|సమరా.*(ఏమి|గురించి)|समारा.*(क्या|बारे)|ಸಮಾರಾ.*(ಏನು|ಬಗ್ಗೆ)/.test(s))return say({en:'Samara Assisted Living is a residential care centre for elders and people who need assistance, supervision or continued support in daily life. It is designed as a place between hospital and home, with 24×7 nursing support.',ta:'Samara Assisted Living என்பது முதியவர்கள் மற்றும் தினசரி வாழ்க்கையில் உதவி, கண்காணிப்பு அல்லது தொடர்ச்சியான பராமரிப்பு தேவைப்படுபவர்களுக்கான residential care centre. Hospital மற்றும் home-க்கு இடைப்பட்ட பாதுகாப்பான care setting ஆக, 24×7 nursing support உடன் செயல்படுகிறது.',te:'Samara Assisted Living వృద్ధులు మరియు రోజువారీ సహాయం లేదా కొనసాగింపు care అవసరమైనవారికి residential care centre. Hospital మరియు home మధ్య 24×7 nursing supportతో care అందిస్తుంది.',hi:'Samara Assisted Living बुज़ुर्गों और रोज़मर्रा की सहायता या continued care की आवश्यकता वाले लोगों के लिए residential care centre है, जहाँ 24×7 nursing support उपलब्ध है।',kn:'Samara Assisted Living ಹಿರಿಯರು ಮತ್ತು ದೈನಂದಿನ ಸಹಾಯ ಅಥವಾ continued care ಅಗತ್ಯವಿರುವವರಿಗೆ residential care centre ಆಗಿದ್ದು, 24×7 nursing support ಲಭ್ಯವಿದೆ.'});
 return null}
function endpoint(){return CFG.aiEndpoint||((CFG.supabaseUrl||'').replace(/\/$/,'')+'/functions/v1/samara-public-ai')}
function aiHeaders(json){var h={};if(CFG.supabaseKey){h.apikey=CFG.supabaseKey;if(!CFG.supabaseKey.startsWith('sb_publishable_'))h.Authorization='Bearer '+CFG.supabaseKey}if(json)h['Content-Type']='application/json';return h}
function handleAI(x,q){if(!awakeVisible())return;progress('');if(x&&x.reply){history.push({role:'user',content:String(x.transcript||q||'').slice(0,3000)},{role:'assistant',content:x.reply.slice(0,3000)});history=history.slice(-8);}if(x&&L[x.language])detectedLang=x.language;if(x&&x.transcript)add(x.transcript,'user');if(x&&x.reply){add(x.reply,'bot');if(window.SamaraSpeech&&(x.transcript||conversation))window.SamaraSpeech.reply(x.reply,x.language||activeLang())}else{var local=localReply(q||'');if(local)add(local,'bot')}if(!(x&&(x.action==='contact'||x.action==='book_visit'))&&contactQuestion(q||(x&&x.transcript)))contactButtons();maybeTopic((x&&x.transcript)||q,x&&x.reply);referenceLinks(x&&x.reply);awaitingAddress=!!(x&&x.awaiting_address);if((x&&x.show_map)||String(x&&x.reply).includes('maps.app.goo.gl/NwdW9T6WFnosJg8V7'))navigationLink();var qTopic=topicOf((x&&x.transcript)||q);if(x&&x.action&&qTopic==='directors'&&/^(gallery|rooms|video)$/.test(x.action))x.action=null;
if(x&&x.action){if(x.action==='rooms')showRooms();else if(x.action==='gallery')showGallery();else if(x.action==='video')album([{src:SITE.video,cap:'Samara Assisted Living — opening video',video:true}]);else if(x.action==='contact')contactButtons();else if(x.action==='book_visit'){contactButtons();visitForm()}else if(x.action==='enquiry'){var a=document.createElement('a');a.href=SITE.enquiryUrl;a.textContent='Open enquiry form';a.className='sai-enquiry-link';document.getElementById('sai-msgs').appendChild(a);scroll()}}}
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
function askAI(q){if(busy)return;if(window.SamaraSpeech)window.SamaraSpeech.stop();busy=true;holdWake('request');progress('Preparing your reply…');requestAI({method:'POST',headers:aiHeaders(true),body:JSON.stringify({message:q,language:lang==='auto'?(awaitingAddress?activeLang():'auto'):lang,awaiting_address:awaitingAddress,history:history,page:location.pathname})}).then(function(x){handleAI(x,q)}).catch(function(e){if(e.name==='AbortError')return;if(conversation)endConversation('Conversation paused. Please try again.');var local=localReply(q);add(local||'Please try again, or call / WhatsApp the Samara care team: '+pretty(SITE.phone)+' / '+pretty(SITE.whatsapp)+'.','bot');if(!local||contactQuestion(q))contactButtons();maybeTopic(q);if(local&&local===localReply(q)&&/how much|price|cost|charge|package|fees|rate|எவ்வளவு|கட்டணம்|விலை|ధర|कितना|कीमत|शुल्क|ಎಷ್ಟು|ಬೆಲೆ|ನಿರಕ್ಕ|നിരക്ക്|എത്ര/i.test(String(q||'').toLowerCase()))visitForm()}).finally(function(){busy=false;releaseWake('request');progress('');conversationUI();resumeConversation()})}
function bestMime(){var a=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];for(var i=0;i<a.length;i++){try{if(window.MediaRecorder&&MediaRecorder.isTypeSupported(a[i]))return a[i]}catch(e){}}return''}
// Explicitly started, turn-based conversation; never listen over Samara's speech.
var conversation=false,voiceToken=0,vadContext=null,vadSource=null,vadTimer=null,nextListenTimer=null;
function conversationUI(){var b=document.getElementById('sai-conversation-toggle');if(!b)return;b.textContent=conversation?'■ End conversation':'Start conversation';b.setAttribute('aria-pressed',String(conversation));b.disabled=!conversation&&(busy||startingVoice||!!recorder);}
function clearVAD(){if(vadTimer){clearInterval(vadTimer);vadTimer=null}if(vadSource){vadSource.disconnect();vadSource=null}}
function closeMic(st){if(st)st.getTracks().forEach(function(t){t.onended=null;t.stop()})}
function endConversation(message){
 var wasOn=conversation;conversation=false;clearTimeout(nextListenTimer);nextListenTimer=null;
 stopVoice(true);
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
 if(discard){closeMic(stream);stream=null;recorder=null;if(window.SamaraSpeech&&window.SamaraSpeech.endCapture)window.SamaraSpeech.endCapture();var mic=document.getElementById('sai-mic');if(mic){mic.classList.remove('listening');mic.textContent='🎙';mic.setAttribute('aria-label','Voice input')}progress('');conversationUI()}
 releaseWake('recording');
}
function voice(){
 if(busy||startingVoice)return;
 clearTimeout(nextListenTimer);nextListenTimer=null;
 if(window.SamaraSpeech)window.SamaraSpeech.stop();
 if(recorder&&recorder.state==='recording'){stopVoice();return}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){endConversation();add((L[activeLang()]||L.en).noVoice,'bot');return}
 var token=++voiceToken;startingVoice=true;holdWake('recording');progress('Opening microphone…');conversationUI();
 if(window.SamaraSpeech&&window.SamaraSpeech.beginCapture)window.SamaraSpeech.beginCapture();
 var input=navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
 input.then(function(st){
  if(token!==voiceToken||!awakeVisible()){closeMic(st);if(!recorder&&!startingVoice&&window.SamaraSpeech&&window.SamaraSpeech.endCapture)window.SamaraSpeech.endCapture();return}
  stream=st;st.getAudioTracks().forEach(function(t){t.enabled=true;t.onended=function(){endConversation('Microphone disconnected. Tap Start conversation to try again.')}});
  var parts=[],mime=bestMime(),rec=mime?new MediaRecorder(st,{mimeType:mime}):new MediaRecorder(st);recorder=rec;
  var mic=document.getElementById('sai-mic'),note=document.querySelector('.sai-note');
  rec.ondataavailable=function(e){if(e.data?.size)parts.push(e.data)};
  rec.onerror=function(){if(token===voiceToken){endConversation('Recording stopped. Please try again.');add('Microphone recording was interrupted. Please try again.','bot')}};
  rec.onstop=function(){
   if(token!==voiceToken||rec.samaraDiscard){closeMic(st);return}
   clearVAD();clearTimeout(recordingTimer);recordingTimer=null;
   var type=rec.mimeType||(parts[0]?.type)||'audio/webm',blob=new Blob(parts,{type:type});parts=[];
   // Muting a live track keeps mobile audio in recording mode and can lower reply volume.
   closeMic(st);if(window.SamaraSpeech&&window.SamaraSpeech.endCapture)window.SamaraSpeech.endCapture();
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
function bind(){var p=document.getElementById('sai-panel');document.getElementById('sai-launch').onclick=function(){p.classList.add('open');requestWake();if(!opened){opened=true;add(L[lang].hello,'bot')}setTimeout(function(){document.getElementById('sai-input').focus()},50)};document.getElementById('sai-conversation-toggle').onclick=startConversation;document.getElementById('sai-close').onclick=function(){closeViewer();endConversation();requestEpoch++;if(requestController)requestController.abort();if(window.SamaraSpeech)window.SamaraSpeech.stop();stopVoice(true);releaseWake();p.classList.remove('open')};document.getElementById('sai-mic').onclick=voice;document.getElementById('sai-form').onsubmit=function(e){e.preventDefault();if(busy||startingVoice||recorder)return;var i=document.getElementById('sai-input'),v=i.value.trim();if(v){i.value='';intent(v,false)}}}
// 28-09-2026: the floating bubble is the entry point to Samara AI (the old "Ask Samara AI" pill is hidden).
// × shrinks it to a small round Samara icon for the rest of the visit; it returns whenever the chat is closed.
var TEASE={
 en:{hi:'👋 Hi! I\'m Samara AI.',body:'Ask me anything — rooms, care, charges or directions. Type or just speak, in English, தமிழ், తెలుగు, हिन्दी, ಕನ್ನಡ or മലയാളം.',go:'Ask now',close:'Minimise',mini:'Open Samara AI'},
 ta:{hi:'👋 வணக்கம்! நான் சமரா AI.',body:'அறைகள், பராமரிப்பு, கட்டணம், வழி — எதையும் கேளுங்கள். தமிழில் பேசலாம் அல்லது தட்டச்சு செய்யலாம்.',go:'இப்போது கேளுங்கள்',close:'சிறிதாக்கு',mini:'சமரா AI-ஐத் திற'}
};
var teaserEl=null;
function teaserText(){return TEASE[/^ta/i.test(document.documentElement.lang||'')?'ta':'en']}
function isMini(){try{return sessionStorage.getItem('samara-ai-teaser')==='min'}catch(e){return false}}
function setMini(){try{sessionStorage.setItem('samara-ai-teaser','min')}catch(e){}}
function panelOpen(){var p=document.getElementById('sai-panel');return !!(p&&p.classList.contains('open'))}
function openChat(){var l=document.getElementById('sai-launch');removeTeaser();if(l)l.click()}
function removeTeaser(){if(teaserEl){teaserEl.remove();teaserEl=null}}
function showTeaser(){
 removeTeaser();if(panelOpen())return;
 var t=teaserText(),b;
 if(isMini()){
  b=document.createElement('button');b.type='button';b.className='sai-mini';b.setAttribute('aria-label',t.mini);b.title=t.mini;
  b.innerHTML='<img src="'+esc(SITE.mark)+'" alt=""><span aria-hidden="true">AI</span>';b.onclick=openChat;
 }else{
  b=document.createElement('div');b.className='sai-teaser';b.setAttribute('role','region');b.setAttribute('aria-label','Samara AI');
  b.innerHTML='<button type="button" class="sai-teaser-x" aria-label="'+esc(t.close)+'" title="'+esc(t.close)+'">×</button><strong>'+esc(t.hi)+'</strong><p>'+esc(t.body)+'</p><button type="button" class="sai-teaser-go">'+esc(t.go)+' ➤</button>';
  b.querySelector('.sai-teaser-x').onclick=function(e){e.stopPropagation();setMini();showTeaser()};
  b.querySelector('.sai-teaser-go').onclick=function(e){e.stopPropagation();openChat()};
  b.onclick=openChat;
 }
 document.body.appendChild(b);teaserEl=b;
 requestAnimationFrame(function(){b.classList.add('show')});
}
function startTeaser(){
 document.documentElement.classList.add('sai-bubble-launcher');
 var c=document.getElementById('sai-close');if(c)c.addEventListener('click',function(){setTimeout(showTeaser,250)});
 // Follow the site's English / Tamil switch.
 try{new MutationObserver(function(){if(teaserEl)showTeaser()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}catch(e){}
 setTimeout(showTeaser,isMini()?0:1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){ui();startTeaser()});else{ui();startTeaser()}
})();
