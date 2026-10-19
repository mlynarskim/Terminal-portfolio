(() => {
'use strict';
const $ = (id) => document.getElementById(id);
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const state = { mode:'home', view:'music', open:true, pinned:false, playing:false, track:0, time:48, focus:false, remaining:1500, files:['Project brief.pdf'], look:'dark' };
const tracks = [{title:'Slow Sunday',artist:'Demo Sessions',length:224},{title:'Somewhere, Unhurried',artist:'Demo Sessions',length:198},{title:'A Little More Space',artist:'Demo Sessions',length:251}];
const captions = {music:'Press play, skip a track, or collapse the notch.',video:'A YouTube player, inside your panel. Load it only if you choose.',files:'Drag the sample document into the shelf, or click it to add.',work:'Start a focus session and keep your next task in sight.',controls:'Move the sliders. See the desktop change instantly.'};
const format = seconds => `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function announce(message) { $('announcement').textContent = message; }
function tabState(view) {
 document.querySelectorAll('[data-view]').forEach(button=>{const on=button.dataset.view===view;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
 $('demoCaption').textContent=captions[view];
}
function expand(open) {
 if(!open){if(state.view==='controls'){state.view='music';tabState('music');}$('panelBody').querySelectorAll('iframe').forEach(frame=>frame.remove());$('quickControls').hidden=true;$('controlsButton').setAttribute('aria-expanded','false');}
 state.open=open;
 $('notch').dataset.open=String(open);
 $('miniNotch').setAttribute('aria-expanded',String(open));
 $('expandedContent').inert=!open;
 $('miniNotch').inert=open;
 $('miniNotch').setAttribute('aria-hidden',String(open));
 $('miniNotch').tabIndex=open?-1:0;
 if(open)render();
}
function selectView(view){
 state.view=view;state.mode=view==='work'?'work':'home';
 if(!state.open)expand(true); else render();
 $('quickControls').hidden=view!=='controls';
 $('controlsButton').setAttribute('aria-expanded',String(view==='controls'));
 tabState(view);
}
function musicMarkup(){const track=tracks[state.track];return `<div class="music-panel"><div class="album" aria-hidden="true"><span>DEMO<br>SESSIONS</span></div><div class="track-details"><h3>${track.title}</h3><p>${track.artist} · Sample music, no audio</p><div class="transport"><button class="previous" data-action="previous" aria-label="Previous demo track">${icon('next')}</button><button data-action="play" id="playMusic" aria-label="${state.playing?'Pause':'Play'} demo track">${icon(state.playing?'pause':'play')}</button><button data-action="next" aria-label="Next demo track">${icon('next')}</button></div><progress class="song-progress" id="songProgress" max="${track.length}" value="${state.time}" aria-label="Demo track progress"></progress><div class="song-time"><span id="songTime">${format(state.time)}</span><span>${format(track.length)}</span></div></div></div><div class="mini-tiles"><button class="mini-tile" data-action="weather">${icon('sun')}<span>Cupertino<small id="weatherDetail">Sunny · Sample forecast</small></span><span class="tile-value">21°</span></button><button class="mini-tile focus" data-action="work">${icon('timer')}<span>A little focus<small>Make space for one thing</small></span><span class="tile-value">25′</span></button></div>`;}
function workMarkup(){return `<div class="work-grid"><div class="work-timer">${icon('timer')}<span>Focus session</span><strong id="focusTime">${format(state.remaining)}</strong><button data-action="focus">${state.focus?'Pause session':'Start session'}</button></div><div class="agenda-card"><span>UP NEXT · SAMPLE AGENDA</span><b>A little time to create</b><small>10:00 — 10:30 · Your project</small></div><div class="links-card"><span>YOUR SHORTCUTS</span><div><button data-action="shortcut" data-name="GitHub">GitHub ↗</button><button data-action="shortcut" data-name="Notes">Notes ↗</button><button data-action="files">Files ↗</button></div></div></div>`;}
function shelfMarkup(){return `<div class="panel-heading">File Shelf <span>DEMO FILES ONLY</span></div><div class="shelf-drop" id="shelfDrop" role="region" aria-label="Drop sample file here">${state.files.length?state.files.map((file,index)=>`<div class="shelf-item" draggable="true" data-file="${index}">${icon('file')}<span title="${escape(file)}">${escape(file)}</span><button data-remove="${index}" aria-label="Remove ${escape(file)} from demo shelf">×</button></div>`).join(''):`<div class="shelf-empty">${icon('file')}Drop the sample document here</div>`}</div><p class="shelf-help">Sample shelf · Add a file, remove it, or drag it out as a demo text file.</p>`;}
function videoMarkup(){return `<div class="video-demo" id="videoContainer"><div class="sun-orb"></div><div class="landscape-ridge"></div><strong>A moment to reset.</strong><button data-action="video-consent">${icon('play')} Load a YouTube demo</button><small>Illustrated preview. The player connects only after confirmation.</small></div>`;}
function render(){
 document.querySelectorAll('[data-mode]').forEach(button=>{const on=button.dataset.mode===state.mode;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
 $('panelBody').innerHTML=state.view==='work'?workMarkup():state.view==='files'?shelfMarkup():state.view==='video'?videoMarkup():musicMarkup();
 $('miniNotch').inert=state.open;
 $('miniNotch').setAttribute('aria-hidden',String(state.open));
 $('miniNotch').tabIndex=state.open?-1:0;
 $('notch').style.height=state.open?(state.view==='video'?'303px':state.view==='work'?'283px':state.view==='files'?'272px':'286px'):'';
 bindShelf();
}
function addFile(){if(!state.files.includes('Weekend plans.pdf'))state.files.push('Weekend plans.pdf');selectView('files');announce('Sample document added to File Shelf. No real file was uploaded.');}
function bindShelf(){
 const shelf=$('shelfDrop');if(!shelf)return;
 shelf.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='copy';shelf.classList.add('drag-over');});
 shelf.addEventListener('dragleave',()=>shelf.classList.remove('drag-over'));
 shelf.addEventListener('drop',event=>{event.preventDefault();shelf.classList.remove('drag-over');if(event.dataTransfer.getData('application/x-ultranotch-demo')==='sample')addFile();else announce('Use the sample document in this demo. Your files have not been opened or uploaded.');});
 shelf.querySelectorAll('[draggable]').forEach(item=>item.addEventListener('dragstart',event=>{const filename=state.files[Number(item.dataset.file)];event.dataTransfer.setData('text/plain',`UltraNotch demo: ${filename}. This is sample content, not the original file.`);event.dataTransfer.setData('DownloadURL',`text/plain:UltraNotch-demo.txt:data:text/plain,${encodeURIComponent('UltraNotch sample shelf document. No original files are included.')}`);}));
}
$('panelBody').addEventListener('click',event=>{
 const remove=event.target.closest('[data-remove]');if(remove){state.files.splice(Number(remove.dataset.remove),1);render();announce('Sample file removed.');return;}
 const button=event.target.closest('[data-action]');if(!button)return;
 switch(button.dataset.action){
 case'play':state.playing=!state.playing;render();$('playMusic')?.focus({preventScroll:true});break;
 case'previous':state.track=(state.track+tracks.length-1)%tracks.length;state.time=0;render();break;
 case'next':state.track=(state.track+1)%tracks.length;state.time=0;render();break;
 case'work':selectView('work');break;
 case'files':selectView('files');break;
 case'focus':state.focus=!state.focus;render();break;
 case'weather':$('weatherDetail').textContent=$('weatherDetail').textContent.includes('Sunny')?'Tomorrow · 23° · Sample':'Sunny · Sample forecast';break;
 case'shortcut':announce(`${button.dataset.name} is a sample shortcut. The native app opens your own saved links.`);$('demoCaption').textContent='In the app, these shortcuts open your own saved links.';break;
 case'video-consent':$('videoContainer').insertAdjacentHTML('beforeend',`<div class="video-consent"><p>Loading YouTube connects to Google and may enable cookies or similar storage, ads, and processing of your IP address, device and playback activity. You can keep this illustration instead. See <a href="Privacy.html#external" target="_blank" rel="noopener noreferrer">our Privacy Policy</a>, <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy</a> and <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms</a>. By using the YouTube feature you agree to YouTube’s Terms.</p><div><button data-action="load-video">Load YouTube player</button><button data-action="cancel-video">Keep illustration</button></div></div>`);$('videoContainer').querySelector('[data-action="load-video"]').focus();break;
 case'cancel-video':render();$('videoContainer').querySelector('button').focus();break;
 case'load-video':$('videoContainer').innerHTML='<iframe title="Big Buck Bunny, Blender Foundation, on YouTube" src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?playsinline=1" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';announce('YouTube player loaded. Start playback using its controls.');break;
 }
});
$('miniNotch').addEventListener('click',()=>{expand(true);$('closeNotch').focus({preventScroll:true});});
$('closeNotch').addEventListener('click',()=>{state.pinned=false;updatePin();expand(false);$('notch').style.height='';$('miniNotch').focus({preventScroll:true});});
function updatePin(){$('pinButton').setAttribute('aria-pressed',String(state.pinned));$('pinButton').setAttribute('aria-label',state.pinned?'Unlock notch':'Keep notch open');$('pinButton').innerHTML=icon(state.pinned?'lock':'unlock');announce(state.pinned?'Demo notch pinned open.':'Demo notch unpinned.');}
$('pinButton').addEventListener('click',()=>{state.pinned=!state.pinned;updatePin();});
$('controlsButton').addEventListener('click',()=>{const show=$('quickControls').hidden;$('quickControls').hidden=!show;$('controlsButton').setAttribute('aria-expanded',String(show));if(show){tabState('controls');}else tabState(state.view);});
$('closeControls').addEventListener('click',()=>{$('quickControls').hidden=true;$('controlsButton').setAttribute('aria-expanded','false');if(state.view==='controls')state.view='music';tabState(state.view);$('controlsButton').focus();});
$('appearanceButton').addEventListener('click',()=>{state.look=state.look==='dark'?'light':'dark';$('notch').dataset.look=state.look;announce(`${state.look==='dark'?'Dark':'Light'} notch appearance selected.`);});
for(const id of ['hue','dim','volume'])$(id).addEventListener('input',()=>{const value=Number($(id).value);$(id+'Value').textContent=value+(id==='hue'?'°':'%');if(id==='hue')$('desktop').style.setProperty('--hue',`${value}deg`);if(id==='dim')$('desktopShade').style.opacity=String(value/100);if(id==='volume')$('edgeValue').textContent=value;});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>selectView(button.dataset.mode==='home'?'music':'work')));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>selectView(button.dataset.view)));
document.querySelectorAll('[data-demo-link]').forEach(link=>link.addEventListener('click',()=>selectView(link.dataset.demoLink)));
let sampleDrag=null;
let ignoreSampleClickUntil=0;
$('sampleFile').addEventListener('pointerdown',event=>{
 if(event.button!==0)return;
 sampleDrag={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false};
 $('sampleFile').setPointerCapture(event.pointerId);
});
$('sampleFile').addEventListener('pointermove',event=>{
 if(!sampleDrag||event.pointerId!==sampleDrag.id)return;
 const dx=event.clientX-sampleDrag.x,dy=event.clientY-sampleDrag.y;
 if(Math.hypot(dx,dy)>6&&!sampleDrag.moved){sampleDrag.moved=true;selectView('files');}
 if(!sampleDrag.moved)return;
 $('sampleFile').style.transform=`translate(${dx}px,${dy}px)`;
 const shelf=$('shelfDrop');if(shelf){const r=shelf.getBoundingClientRect();shelf.classList.toggle('drag-over',event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom);}
});
function endSampleDrag(event){
 if(!sampleDrag)return;
 const moved=sampleDrag.moved;sampleDrag=null;$('sampleFile').style.transform='';
 const shelf=$('shelfDrop');if(shelf){shelf.classList.remove('drag-over');const r=shelf.getBoundingClientRect();if(moved&&event.type!=='pointercancel'&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom)addFile();}
 if(moved)ignoreSampleClickUntil=Date.now()+500;
}
$('sampleFile').addEventListener('pointerup',endSampleDrag);
$('sampleFile').addEventListener('pointercancel',endSampleDrag);
$('sampleFile').addEventListener('click',()=>{if(Date.now()>ignoreSampleClickUntil)addFile();});
$('sampleFile').addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();addFile();}});
$('desktop').addEventListener('click',event=>{if(state.open&&!state.pinned&&!event.composedPath().some(node=>node===$('notch')||node===$('quickControls')||node===$('sampleFile'))){$('closeNotch').click();}});
$('desktop').addEventListener('dragover',event=>{event.preventDefault();});
$('desktop').addEventListener('drop',event=>{event.preventDefault();if(!event.target.closest('#shelfDrop'))announce('Drop the sample document on the File Shelf area.');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('desktop').contains(document.activeElement)){if(!$('quickControls').hidden){$('closeControls').click();}else if(state.open&&!state.pinned){$('closeNotch').click();}}});
const tools={
 everyday:[['music','Music','Apple Music or Spotify, with track progress.'],['sun','Weather','A forecast for your chosen city.'],['video','Video','Your YouTube player inside the notch.'],['file','File Shelf','Keep files and photos within reach.'],['timer','Clock','Time at a glance.'],['◉','Camera Mirror','A local camera preview, with permission.']],
 productivity:[['timer','Focus Timer','Make space for a focused session.'],['▣','Calendar','Your upcoming events, with permission.'],['▤','Clipboard','Optional local text history.'],['terminal','Terminal','Open a folder or copy a saved command.'],['↗','Links','Pin your own favorite web shortcuts.'],['✳','Siri','Open your Mac’s system assistant.'],['grid','Scenes','Save a set of control values.']],
 controls:[['sliders','Volume','Adjust a compatible audio output.'],['sun','Screen Dimmer','Soften the screen with a visual layer.'],['◐','Wallpaper Hue','Recolor a static wallpaper locally.']]
};
function renderTools(category){$('toolboxGrid').innerHTML=tools[category].map(([glyph,name,description])=>`<article class="tool"><span>${glyph.length>1?icon(glyph):glyph}</span><div><b>${name}</b><p>${description}</p></div></article>`).join('');}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-category]').forEach(item=>{const on=item===button;item.classList.toggle('active',on);item.setAttribute('aria-pressed',String(on));});renderTools(button.dataset.category);}));
setInterval(()=>{if(document.hidden)return;if(state.playing){state.time++;if(state.time>tracks[state.track].length){state.track=(state.track+1)%tracks.length;state.time=0;if(state.view==='music'||state.view==='controls')render();}if($('songProgress')){$('songProgress').value=state.time;$('songTime').textContent=format(state.time);}}if(state.focus&&state.remaining>0){state.remaining--;if($('focusTime'))$('focusTime').textContent=format(state.remaining);if(!state.remaining){state.focus=false;announce('Demo focus session complete.');}}},1000);
if('IntersectionObserver'in window){document.body.classList.add('js-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
let draggedTile=null;
document.querySelectorAll('.layout-cell').forEach((tile,index)=>{
 tile.draggable=true;tile.dataset.tile=String(index);
 tile.addEventListener('dragstart',event=>{draggedTile=tile;event.dataTransfer.setData('text/plain','UltraNotch demo tile');event.dataTransfer.effectAllowed='move';});
 tile.addEventListener('dragover',event=>event.preventDefault());
 tile.addEventListener('drop',event=>{event.preventDefault();if(draggedTile&&draggedTile!==tile){const children=[...tile.parentNode.children];if(children.indexOf(draggedTile)<children.indexOf(tile))tile.after(draggedTile);else tile.before(draggedTile);announce('Demo tile order updated.');}draggedTile=null;});
 tile.querySelector('[data-resize]').addEventListener('click',()=>{tile.classList.toggle('large');announce('Demo tile width changed.');});
 tile.querySelector('[data-move]').addEventListener('click',()=>{if(tile.previousElementSibling)tile.previousElementSibling.before(tile);else tile.parentNode.append(tile);announce('Demo tile moved.');});
});
render();renderTools('everyday');
})();
