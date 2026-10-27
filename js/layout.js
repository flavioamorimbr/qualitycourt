/*
  MENU, RODAPÉ E BOTÃO DE WHATSAPP — compartilhados por todas as páginas.
  Para mudar o menu, edite só a lista MENU abaixo.
*/
(function () {
  var MENU = [
    { texto: "Início",              link: "index.html" },
    { texto: "Quem somos",          link: "quem-somos.html" },
    { texto: "Serviços",            link: "servicos.html" },
    { texto: "Produtos",            link: "produtos.html" },
    { texto: "Portfólio",           link: "portfolio.html" }
  ];

  var CONTATO = {
    whatsapp: "5579991436105",
    email: "comercial@qualitycourt.com.br",
    endereco: "R. José Francisco Prejuízo, 266<br>Farolândia, Aracaju/SE · 49030-513",
    instagram: "https://www.instagram.com/qualitycourt"
  };

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>';
  var waLink = "https://wa.me/" + CONTATO.whatsapp + "?text=" + encodeURIComponent("Olá! Vim pelo site da Quality Court.");

  // Descobre a página atual (funciona com ou sem ".html" no endereço)
  var atual = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  function ehAtual(link) { return link.replace(/\.html$/, "") === atual; }

  var itens = MENU.map(function (m) {
    return '<a href="' + m.link + '"' + (ehAtual(m.link) ? ' aria-current="page"' : '') + '>' + m.texto + '</a>';
  }).join("\n      ");

  var header =
    '<header class="site-header" id="topo">' +
    '<div class="wrap">' +
    '<a class="logo" href="index.html" aria-label="Quality Court, página inicial"><img src="img/logo-azul.webp" alt="Quality Court Engenharia Esportiva" width="600" height="326"></a>' +
    '<nav class="nav" id="nav" aria-label="Menu principal">' + itens +
    '<a class="btn btn-lime nav-wa" href="' + waLink + '" target="_blank" rel="noopener">' + WA_ICON + ' Fale conosco agora</a>' +
    '</nav>' +
    '<button class="menu-btn" id="menuBtn" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var paginasRodape = MENU.map(function (m) { return '<li><a href="' + m.link + '">' + m.texto + '</a></li>'; }).join("");

  var footer =
    '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
    '<div>' +
      '<a class="logo logo-foot" href="index.html" aria-label="Quality Court"><img src="img/logo-branco.webp" alt="Quality Court Engenharia Esportiva" width="600" height="326" loading="lazy"></a>' +
      '<p style="margin-top:16px;max-width:36ch">Engenharia esportiva especializada em quadras de tênis. Aracaju, Sergipe. Atendemos em todo o território nacional.</p>' +
      '<div class="social">' +
        '<a href="' + CONTATO.instagram + '" target="_blank" rel="noopener" aria-label="Instagram da Quality Court"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a>' +
        '<a href="https://wa.me/' + CONTATO.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp da Quality Court">' + WA_ICON + '</a>' +
      '</div>' +
    '</div>' +
    '<div><h4>Páginas</h4><ul>' + paginasRodape + '</ul></div>' +
    '<div><h4>Contato</h4><ul><li><a href="' + waLink + '" target="_blank" rel="noopener">Fale conosco agora pelo WhatsApp</a></li><li>' + CONTATO.email + '</li><li>' + CONTATO.endereco + '</li></ul></div>' +
    '</div>' +
    '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Quality Court – Engenharia Esportiva. Todos os direitos reservados.</span>' +
    '<a href="politica-de-privacidade.html" style="text-decoration:none">Política de privacidade</a></div>' +
    '</div></footer>' +
    '<a class="wa-float" href="' + waLink + '" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">' + WA_ICON + '</a>';

  var h = document.getElementById("site-header");
  if (h) h.outerHTML = header;
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = footer;
})();
