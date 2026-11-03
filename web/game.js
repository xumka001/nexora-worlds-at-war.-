(()=>{
const $=s=>document.querySelector(s),menu=$('#menu'),game=$('#game'),toast=$('#toast');
let he3=0,moonScanned=false,lunaBase=false,marsPrepared=false;
function show(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(show.t);show.t=setTimeout(()=>toast.classList.remove('show'),1800)}
function mission(t,d){const el=$('#mission');if(el)el.innerHTML='<span>MISSION UPDATE</span><b>'+t+'</b><small>'+d+'</small>'}
function hideSpace(){['#orbitPanel','#moonPanel','#lunaSurface','#marsPrep'].forEach(s=>$(s)?.classList.add('hidden'))}
function updateHe3(){const el=$('#he3');if(el)el.textContent=he3}

// Earth movement — kept isolated so new missions cannot break the joystick.
const player=$('#player'),stick=$('#stick'),knob=$('#knob');
let px=50,py=55,drag=false,pointerId=null;
function movePlayer(dx,dy){if(!player)return;px=Math.max(12,Math.min(88,px+dx));py=Math.max(25,Math.min(78,py+dy));player.style.left=px+'%';player.style.top=py+'%'}
function stickMove(e){if(!drag||!stick||!knob)return;const r=stick.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy;const max=r.width*.32,len=Math.hypot(dx,dy)||1;if(len>max){dx=dx/len*max;dy=dy/len*max}knob.style.transform=`translate(${dx}px,${dy}px)`;movePlayer(dx*.018,dy*.018)}
if(stick&&knob){stick.addEventListener('pointerdown',e=>{drag=true;pointerId=e.pointerId;stick.setPointerCapture?.(e.pointerId);stickMove(e);e.preventDefault()});stick.addEventListener('pointermove',e=>{if(drag&&e.pointerId===pointerId){stickMove(e);e.preventDefault()}});const stop=e=>{if(pointerId!==null&&e.pointerId!==pointerId)return;drag=false;pointerId=null;knob.style.transform='translate(0,0)'};stick.addEventListener('pointerup',stop);stick.addEventListener('pointercancel',stop)}

$('#play')?.addEventListener('click',()=>{menu?.classList.remove('active');game?.classList.add('active');mission('MISSION 02 AVAILABLE','Explore Aurora Island or use FLY TO MOON.');show('BUILD 0.7 • WORLD ONLINE')});
$('#moonQuick')?.addEventListener('click',()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');$('#locationLabel').textContent='EARTH ORBIT • NXR-01';show('NXR-01 • EARTH ORBIT')});
$('#moonMission')?.addEventListener('click',()=>{$('#orbitPanel')?.classList.add('hidden');$('#moonPanel')?.classList.remove('hidden');$('#locationLabel').textContent='LUNAR ORBIT • NXR-L1';show('LUNAR ORBIT REACHED')});
$('#landMoon')?.addEventListener('click',()=>{$('#moonPanel')?.classList.add('hidden');$('#lunaSurface')?.classList.remove('hidden');$('#locationLabel').textContent='LUNA • SOUTH REGION';$('#he3Hud')?.classList.remove('hidden');mission('LUNAR FRONTIER','Scan the lunar surface for Helium-3.');show('🌕 TOUCHDOWN CONFIRMED')});
$('#scanMoon')?.addEventListener('click',()=>{if(moonScanned)return show('HE-3 DEPOSIT ALREADY LOCATED');moonScanned=true;$('#he3Deposit')?.classList.add('found');$('#mineMoon').disabled=false;$('#lunaTitle').textContent='HELIUM-3 LOCATED';$('#lunaText').textContent='Mine 30 HE-3 to power the first lunar outpost.';mission('RESOURCE SIGNAL FOUND','Mine 30 Helium-3 for LUNA-01.');show('☢ HE-3 DEPOSIT LOCATED')});
$('#mineMoon')?.addEventListener('click',()=>{if(!moonScanned)return;he3+=10;updateHe3();$('#he3Deposit')?.classList.add('pulse');setTimeout(()=>$('#he3Deposit')?.classList.remove('pulse'),300);show('+10 HE-3');if(he3>=30&&!lunaBase){$('#deployLunaBase').disabled=false;$('#lunaTitle').textContent='OUTPOST READY';$('#lunaText').textContent='30 HE-3 secured. Deploy LUNA-01.';mission('BUILD LUNA-01','Resources secured. Establish the lunar base.')}});
$('#deployLunaBase')?.addEventListener('click',()=>{if(lunaBase)return show('LUNA-01 ALREADY ONLINE');if(he3<30)return show('NEED 30 HE-3');he3-=30;updateHe3();lunaBase=true;$('#lunaBase')?.classList.remove('hidden');$('#lunaBase')?.classList.add('online');$('#deployLunaBase').disabled=true;$('#deployLunaBase').textContent='LUNA-01 ONLINE';$('#marsProgram')?.classList.remove('hidden');$('#lunaTitle').textContent='LUNA-01 ONLINE';$('#lunaText').textContent='Lunar foothold established. Mars Program unlocked.';mission('MISSION 03 UNLOCKED','Open the Mars Program from LUNA-01.');show('🚀 MARS PROGRAM UNLOCKED')});
$('#marsProgram')?.addEventListener('click',()=>{hideSpace();$('#marsPrep')?.classList.remove('hidden');$('#locationLabel').textContent='LUNA-01 • MARS COMMAND';show('MISSION 03 • MARS PROGRAM')});
$('#prepareMars')?.addEventListener('click',()=>{if(marsPrepared)return show('NXR-02 ALREADY READY');marsPrepared=true;$('#marsStatus').textContent='READY';$('#prepareMars').textContent='NXR-02 READY';mission('NXR-02 READY','Mars transfer systems prepared. Next build will add launch and Mars orbit.');show('🔴 NXR-02 READY FOR MARS')});
$('#backLuna')?.addEventListener('click',()=>{hideSpace();$('#lunaSurface')?.classList.remove('hidden');$('#locationLabel').textContent='LUNA • SOUTH REGION'});
$('#leaveMoon')?.addEventListener('click',()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');$('#locationLabel').textContent='EARTH ORBIT • NXR-01'});
$('#returnOrbit')?.addEventListener('click',()=>{hideSpace();$('#orbitPanel')?.classList.remove('hidden');$('#locationLabel').textContent='EARTH ORBIT • NXR-01'});
$('#returnEarth')?.addEventListener('click',()=>{hideSpace();$('#locationLabel').textContent='EARTH • AURORA ISLAND';show('RETURNED TO EARTH')});
})();