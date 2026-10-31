const grid = document.querySelector('#story-grid');
STORIES.forEach((story, index) => {
 const button = document.createElement('button'); button.className = 'story-card reveal';
 button.innerHTML = `<div class="story-image"><img src="${story.panels[0]}" alt="Pierwszy kadr komiksu ${story.title}" loading="lazy" width="1080" height="1080"><span class="read-badge">Czytaj komiks ↗</span></div><div class="story-meta"><span>${story.tag.toUpperCase()}</span><span>${story.panels.length} KADRÓW</span></div><h3>${story.title}</h3><p>${story.desc}</p>`;
 button.addEventListener('click', () => openStory(index)); grid.append(button);
});
const rail = document.querySelector('#character-rail');
CHARACTERS.forEach(([slug, name, line, description]) => {
 const card = document.createElement('article');card.className='character';
 card.innerHTML=`<div class="portrait"><img src="assets/${slug}.webp" loading="lazy" alt="${name}, bohater Niby Nic" width="600" height="1067"></div><h3>${name}</h3><strong>${line}</strong><p>${description}</p>`;rail.append(card);
});
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
function moveRail(direction) {rail.scrollBy({left: direction * 264, behavior: reduceMotion.matches ? 'instant' : 'smooth'});}
document.querySelector('#rail-prev').addEventListener('click',()=>moveRail(-1));
document.querySelector('#rail-next').addEventListener('click',()=>moveRail(1));
const dialog=document.querySelector('#reader'), panel=document.querySelector('#panel');let currentStory=0,currentPanel=0;
function renderPanel(){const story=STORIES[currentStory];panel.src=story.panels[currentPanel];panel.alt=`${story.title}, kadr ${currentPanel+1} z ${story.panels.length}`;document.querySelector('#panel-count').textContent=`${currentPanel+1} / ${story.panels.length}`;document.querySelector('#prev-panel').disabled=currentPanel===0;document.querySelector('#next-panel').disabled=currentPanel===story.panels.length-1;}
function openStory(index){currentStory=index;currentPanel=0;document.querySelector('#reader-title').textContent=STORIES[index].title;renderPanel();dialog.showModal();}
function changePanel(direction){const next=currentPanel+direction;if(next>=0&&next<STORIES[currentStory].panels.length){currentPanel=next;renderPanel();}}
document.querySelector('#prev-panel').addEventListener('click',()=>changePanel(-1));document.querySelector('#next-panel').addEventListener('click',()=>changePanel(1));document.querySelector('#close-reader').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changePanel(1);}if(event.key==='ArrowLeft'){event.preventDefault();changePanel(-1);}});
let touchX=0;panel.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;},{passive:true});panel.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchX;if(Math.abs(delta)>60)changePanel(delta<0?1:-1);},{passive:true});
if('IntersectionObserver' in window&&!reduceMotion.matches){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}
// Set the author's verified profile URL here before enabling payments.
const COFFEE_URL = 'https://buycoffee.to/mm88';
if(COFFEE_URL){document.querySelectorAll('.coffee-link').forEach(link=>{link.href=COFFEE_URL;link.target='_blank';link.rel='noopener noreferrer';});}else{document.querySelector('.support-action').hidden=true;document.querySelector('.support-status').hidden=false;document.querySelector('.coffee-note .coffee-link').textContent='Drobne wsparcie kolejnych historii ↘';}
document.querySelector('#year').textContent=new Date().getFullYear();

// A deterrent for casual saving; attribution is embedded in the image files.
function discourageImageSaving(event) {
 if (event.target instanceof Element && event.target.closest('img')) event.preventDefault();
}
document.querySelectorAll('img').forEach(image => { image.draggable = false; });
document.addEventListener('contextmenu', discourageImageSaving);
document.addEventListener('dragstart', discourageImageSaving);
