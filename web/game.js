(()=>{
const $=s=>document.querySelector(s),menu=$('#menu'),game=$('#game'),toast=$('#toast');
let he3=0,moonScanned=false,lunaBase=false;
function show(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(show.t);show.t=setTimeout(()=>toast.classList.remove('show'),1800)}
function mission(t,d){const el=$('#mission');if(el)el.innerHTML='<span>MISSION UPDATE</span><b>'+t+'</b><small>'+d+'</small>'}
function hideSpace(){['#orbitPanel','#moonPanel','#lunaSurface'].forEach(s=>$(s)?.classList.add('hidden'))}
function updateHe3(){const el=$('#he3');if(el)el.textContent=he3}

// Earth mobile movement. Initialize only when joystick markup exists.
const player=$('#player'),stick=$('#stick'),knob=$('#knob');
let px=50,py=55,drag=false,pointerId=null;
function movePlayer(dx,dy){if(!player)return;px=Math.max(12,Math.min(88,px+dx));py=Math.max(25,Math.min(78,py+dy));player.style.left=px+'%';player.style.top=py+'%'}
function stickMove(e){if(!drag||!stick||!knob)return;const r=stick.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy;const max=r.width*.32,len=Math.hypot(dx,dy)||1;if(len>max){dx=dx/len*max;dy=dy/len*max}knob.style.transform=`translate(${dx}px,${dy}px)`;movePlayer(dx*.018,dy*.018)}
if(stick&&knob){
 stick.addEventListener('pointerdown',e=>{drag=true;pointerId=e.pointerId;stick.setPointerCapture?.(e.pointerId);stickMove(e);e.preventDefault()});
 stick.addEventListener('pointermove',e=>{if(drag&&e.pointerId===pointerId){stickMove(e);e.preventDefault()}});
 const stopStick=e=>{if(pointerId!==null&&e.pointerId!==pointerId)return;drag=false;pointerId=null;knob.style.transform='translate(0,0)'};
 stick.addEventListener('pointerup',stopStick);stick.addEventListener('pointercancel',stopStick);
}

if($('#play'))$('#play').onclick=()=>{menu?.classList.remove('active');game?.classList.add('active');mission('MISSION 02 AVAILABLE','Explore Aurora Island or use FLY TO MOON.');show('BUILD 0.6.1 • WORLD ONLINE')};
if($('#moonQuick'))$('#moonQuick').onclick=()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');if($('#locationLabel'))$('#locationLabel').textContent='EARTH ORBIT • NXR-01';show('NXR-01 • EARTH ORBIT')};
if($('#moonMission'))$('#moonMission').onclick=()=>{$('#orbitPanel')?.classList.add('hidden');$('#moonPanel')?.classList.remove('hidden');if($('#locationLabel'))$('#locationLabel').textContent='LUNAR ORBIT • NXR-L1';show('LUNAR ORBIT REACHED')};
if($('#landMoon'))$('#landMoon').onclick=()=>{$('#moonPanel')?.classList.add('hidden');$('#lunaSurface')?.classList.remove('hidden');if($('#locationLabel'))$('#locationLabel').textContent='LUNA • SOUTH REGION';$('#he3Hud')?.classList.remove('hidden');mission('LUNAR FRONTIER','Scan the lunar surface for Helium-3.');show('🌕 TOUCHDOWN CONFIRMED')};
if($('#scanMoon'))$('#scanMoon').onclick=()=>{if(moonScanned)return show('HE-3 DEPOSIT ALREADY LOCATED');moonScanned=true;$('#he3Deposit')?.classList.add('found');if($('#mineMoon'))$('#mineMoon').disabled=false;if($('#lunaTitle'))$('#lunaTitle').textContent='HELIUM-3 LOCATED';if($('#lunaText'))$('#lunaText').textContent='Mine 30 HE-3 to power the first lunar outpost.';mission('RESOURCE SIGNAL FOUND','Mine 30 Helium-3 for LUNA-01.');show('☢ HE-3 DEPOSIT LOCATED')};
if($('#mineMoon'))$('#mineMoon').onclick=()=>{if(!moonScanned)return;he3+=10;updateHe3();$('#he3Deposit')?.classList.add('pulse');setTimeout(()=>$('#he3Deposit')?.classList.remove('pulse'),300);show('+10 HE-3');if(he3>=30&&!lunaBase){if($('#deployLunaBase'))$('#deployLunaBase').disabled=false;if($('#lunaTitle'))$('#lunaTitle').textContent='OUTPOST READY';if($('#lunaText'))$('#lunaText').textContent='30 HE-3 secured. Deploy LUNA-01.';mission('BUILD LUNA-01','Resources secured. Establish the lunar base.')}};
if($('#deployLunaBase'))$('#deployLunaBase').onclick=()=>{if(lunaBase)return show('LUNA-01 ALREADY ONLINE');if(he3<30)return show('NEED 30 HE-3');he3-=30;updateHe3();lunaBase=true;$('#lunaBase')?.classList.remove('hidden');$('#lunaBase')?.classList.add('online');$('#deployLunaBase').disabled=true;$('#deployLunaBase').textContent='LUNA-01 ONLINE';if($('#lunaTitle'))$('#lunaTitle').textContent='LUNA-01 ONLINE';if($('#lunaText'))$('#lunaText').textContent='Permanent lunar foothold established. Mars Program is next.';mission('LUNA-01 ONLINE','Lunar base established • Next: Mars Program.');show('🚀 LUNA-01 ONLINE • MARS NEXT')};
if($('#leaveMoon'))$('#leaveMoon').onclick=()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');if($('#locationLabel'))$('#locationLabel').textContent='EARTH ORBIT • NXR-01'};
if($('#returnOrbit'))$('#returnOrbit').onclick=()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');if($('#locationLabel'))$('#locationLabel').textContent='EARTH ORBIT • NXR-01'};
if($('#returnEarth'))$('#returnEarth').onclick=()=>{hideSpace();if($('#locationLabel'))$('#locationLabel').textContent='EARTH • AURORA ISLAND';show('RETURNED TO EARTH')};
})();