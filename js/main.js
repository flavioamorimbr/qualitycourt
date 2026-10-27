/* Quality Court — animações e interações */
(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduce){ root.classList.add('js'); }

  // Entrada dos elementos ao rolar
  var els=document.querySelectorAll('.rv');
  if(root.classList.contains('js')){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){ io.observe(el); });
    // segurança: nada fica escondido se o observador falhar
    setTimeout(function(){ els.forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top<innerHeight) el.classList.add('in'); }); },1600);
  }

  // Cabeçalho ao rolar
  var header=document.querySelector('.site-header');
  var steps=document.getElementById('steps');
    var items=steps?steps.querySelectorAll('.step'):[];
  function onScroll(){
    header.classList.toggle('scrolled',scrollY>20);
    if(steps){
      var r=steps.getBoundingClientRect(), vh=innerHeight;
      var p=Math.min(1,Math.max(0,(vh*.75-r.top)/(r.height+vh*.25)));
      steps.style.setProperty('--p',p.toFixed(3));
      items.forEach(function(it,i){ it.classList.toggle('done', p>=(i/(items.length-1))*.92 || (reduce&&true)); });
    }
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();


  // Parallax do fundo da abertura
  var heroBg=document.getElementById('heroBg'), heroEl=document.querySelector('.hero'), ticking=false;
  function parallax(){
    ticking=false;
    var r=heroEl.getBoundingClientRect();
    if(r.bottom<0) return;
    heroBg.style.transform='translate3d(0,'+(-r.top*0.35).toFixed(1)+'px,0) scale(1.05)';
  }
  if(heroBg && !reduce){
    addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(parallax); } },{passive:true});
    parallax();
  }

  // Menu celular
  var btn=document.getElementById('menuBtn');
  if(btn) btn.addEventListener('click',function(){
    var open=document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded',open); btn.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  document.querySelectorAll('#nav a').forEach(function(a){ a.addEventListener('click',function(){ document.body.classList.remove('menu-open'); btn.setAttribute('aria-expanded','false'); }); });

  // Copiar contato
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.dataset.copy), txt=el.textContent;
      function ok(){ b.textContent='Copiado'; setTimeout(function(){ b.textContent='Copiar'; },1800); }
      function sel(){ var r=document.createRange(); r.selectNodeContents(el); var s=getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent='Selecionado'; setTimeout(function(){ b.textContent='Copiar'; },1800); }
      try{ navigator.clipboard.writeText(txt).then(ok,sel); }catch(e){ sel(); }
    });
  });
})();
