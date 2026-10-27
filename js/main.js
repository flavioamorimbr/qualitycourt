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

/* ===== Portfólio: filtro e tela cheia ===== */
(function(){
  var grid=document.getElementById('pfGrid'); if(!grid) return;
  var items=[].slice.call(grid.querySelectorAll('.pf-item'));
  var chips=[].slice.call(document.querySelectorAll('.pf-chip'));
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      var f=c.dataset.filter;
      chips.forEach(function(x){ var on=x===c; x.classList.toggle('is-on',on); x.setAttribute('aria-pressed',on); });
      items.forEach(function(it){ var show=f==='todas'||it.dataset.cat===f; it.classList.toggle('is-hidden',!show); if(show) it.classList.add('in'); });
    });
  });
  var lb=document.getElementById('lightbox'), img=document.getElementById('lbImg'), cap=document.getElementById('lbCap'), cnt=document.getElementById('lbCount');
  var list=[], pos=0, lastFocus=null;
  function visible(){ return items.filter(function(it){ return !it.classList.contains('is-hidden'); }); }
  function show(){
    var it=list[pos], im=it.querySelector('img');
    img.src=im.currentSrc||im.src; img.alt=im.alt;
    cap.innerHTML='<b>'+it.querySelector('figcaption b').textContent+'</b><span>'+it.querySelector('figcaption span').textContent+'</span>';
    cnt.textContent=(pos+1)+' de '+list.length;
    img.style.animation='none'; void img.offsetWidth; img.style.animation='';
  }
  function open(it){ list=visible(); pos=list.indexOf(it); lastFocus=document.activeElement; lb.hidden=false; document.body.style.overflow='hidden'; show(); lb.querySelector('.lb-close').focus(); }
  function close(){ lb.hidden=true; document.body.style.overflow=''; if(lastFocus) lastFocus.focus(); }
  function step(d){ pos=(pos+d+list.length)%list.length; show(); }
  items.forEach(function(it){ it.querySelector('.pf-open').addEventListener('click',function(){ open(it); }); });
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',function(){ step(-1); });
  lb.querySelector('.lb-next').addEventListener('click',function(){ step(1); });
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(lb.hidden) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') step(-1); if(e.key==='ArrowRight') step(1); });
  var x0=null; lb.addEventListener('touchstart',function(e){ x0=e.touches[0].clientX; },{passive:true});
  lb.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) step(dx<0?1:-1); x0=null; });
})();
