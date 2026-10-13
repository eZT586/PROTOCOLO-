const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const menuToggle=$('#menuToggle'), nav=$('#nav');
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');menuToggle.setAttribute('aria-label','Abrir menú')}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menuToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
// Navegación por pantallas: cada opción muestra una sola vista y no desplaza la portada.
const views=$$('.page-view');
const navLinks=$$('#nav a');
function showView(id, updateHash=true){
  const targetView=views.find(view=>view.dataset.view===id);
  if(!targetView)return;
  views.forEach(view=>{
    const active=view.dataset.view===id;
    view.classList.toggle('is-active',active);
    view.hidden=!active;
    view.setAttribute('aria-hidden',String(!active));
  });
  navLinks.forEach(link=>{
    const active=link.getAttribute('href')==='#'+id;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
  closeMenu();
  window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  if(updateHash && history.replaceState)history.replaceState(null,'','#'+id);
}
$$('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const id=link.getAttribute('href').slice(1);
  if(!views.some(view=>view.dataset.view===id))return;
  event.preventDefault();showView(id);
}));
showView(location.hash.slice(1)||'inicio',false);
window.addEventListener('hashchange',()=>showView(location.hash.slice(1)||'inicio',false));
const specsToggle=$('#specsToggle'),specsPanel=$('#specsPanel');
specsToggle.addEventListener('click',()=>{const open=specsToggle.getAttribute('aria-expanded')!=='true';specsToggle.setAttribute('aria-expanded',String(open));specsPanel.hidden=!open;$('.toggle-plus',specsToggle).textContent=open?'−':'+';specsToggle.firstChild.textContent=open?'Ocultar características ':'Ver características clave '});
$$('.learn-btn').forEach(btn=>btn.addEventListener('click',()=>{const target=$('#detail-'+btn.dataset.discipline);const open=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(open));target.hidden=!open;$('.learn-btn span',btn).textContent=open?'−':'+';btn.childNodes[0].textContent=open?'Ocultar detalles ':'Ver características '}));
const partData={
  respaldo:['Respaldo','Da soporte al tronco. Su altura y forma deben adaptarse a la persona y a las necesidades de la disciplina deportiva.'],
  asiento:['Asiento','Ayuda a mantener una posición estable. La forma, la altura y el ajuste dependen de las necesidades del deportista y del deporte.'],
  chasis:['Chasis','Es la estructura que conecta los componentes. Su rigidez, geometría y material varían según la disciplina y el modelo.'],
  ruedas:['Ruedas traseras','En muchas sillas deportivas, la inclinación de las ruedas ayuda a la estabilidad lateral y a la maniobrabilidad. La configuración no es igual para todos los deportes.'],
  aros:['Aros impulsores','Permiten que el deportista impulse y controle la silla con las manos. El tamaño y el agarre pueden variar según la actividad y las necesidades individuales.'],
  reposapies:['Reposapiés','Ayuda a colocar y proteger los pies. Su forma y posición deben corresponder al diseño de la silla y a la postura del atleta.'],
  proteccion:['Protecciones y sujeciones','Los cinturones, correas y protecciones se seleccionan según la disciplina y las necesidades del deportista. Deben ajustarse de forma segura, siguiendo indicaciones especializadas.']
};
const partButtons=$$('.part-btn'), hotspots=$$('.hotspot');
function selectPart(key){
  const data=partData[key];if(!data)return;
  const index=Object.keys(partData).indexOf(key);
  partButtons.forEach(b=>{const active=b.dataset.part===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  hotspots.forEach(b=>{const active=b.dataset.part===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  $('#partTitle').textContent=data[0];$('#partText').textContent=data[1];$('#partCount').textContent=String(index+1).padStart(2,'0')+' / 07';
  $('.art-number').textContent=String(index+1).padStart(2,'0');
}
partButtons.forEach(btn=>btn.addEventListener('click',()=>selectPart(btn.dataset.part)));
hotspots.forEach(btn=>{btn.setAttribute('aria-pressed','false');btn.addEventListener('click',()=>selectPart(btn.dataset.part))});
partButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.classList.contains('active'))));

window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
