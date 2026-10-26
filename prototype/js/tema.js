/* ==========================================================================
   TaleCraft — troca de tema (protótipo)

   No protótipo (HTML + CSS, sem servidor) o tema precisa ser aplicado no
   cliente. Este arquivo é a ÚNICA exceção de JavaScript do protótipo, ao
   lado dos onclick de navegação.

   Como funciona:
     1. Lê o tema da URL:      pagina.html?tema=old-tower
     2. Se não houver, lê a preferência salva (localStorage).
     3. Aplica data-theme no <html>.
     4. Ao escolher um tema, salva a preferência e recarrega com ?tema=...

   Em Spring Boot isso sai inteiro: o tema vira uma coluna do usuário e o
   Thymeleaf renderiza <html th:attr="data-theme=${prefs.tema}">. Este
   arquivo deixa de existir.
   ========================================================================== */
(function () {
  var VALIDOS = ['blade-byte', 'old-tower', 'tundra'];
  var CHAVE  = 'talecraft.tema';
  var PADRAO = 'blade-byte';
  var raiz   = document.documentElement;

  /* --- 1. Descobre o tema desejado ---------------------------------------- */
  var daUrl = new URLSearchParams(location.search).get('tema');
  var salvo = null;
  try { salvo = localStorage.getItem(CHAVE); } catch (e) { /* modo restrito */ }

  var tema = VALIDOS.indexOf(daUrl)  >= 0 ? daUrl
           : VALIDOS.indexOf(salvo)  >= 0 ? salvo
           : raiz.getAttribute('data-theme') || PADRAO;

  /* --- 2. Aplica no <html> ------------------------------------------------ */
  raiz.setAttribute('data-theme', tema);

  /* --- 3. Salva a preferência -------------------------------------------- */
  if (daUrl) {
    try { localStorage.setItem(CHAVE, tema); } catch (e) { /* ignora */ }
  }

  /* --- 4. Marca o cartão escolhido na tela de temas ----------------------- */
  var NOMES = { 'blade-byte': 'Blade Byte', 'old-tower': 'Old Tower', 'tundra': 'Tundra' };

  function marcarCartoes() {
    var cartoes = document.querySelectorAll('[data-tema-opcao]');
    for (var i = 0; i < cartoes.length; i++) {
      var ativo = cartoes[i].getAttribute('data-tema-opcao') === tema;
      cartoes[i].classList.toggle('is-selected', ativo);
      cartoes[i].setAttribute('aria-checked', ativo ? 'true' : 'false');
    }
    var rotulo = document.getElementById('temaAtual');
    if (rotulo) rotulo.textContent = 'atual: ' + (NOMES[tema] || tema);

    /* O botão da topbar mostra o tema em uso */
    var botoes = document.querySelectorAll('.themebtn');
    for (var j = 0; j < botoes.length; j++) {
      var txt = botoes[j].querySelector('.themebtn__text');
      if (txt) txt.textContent = NOMES[tema] || tema;
      botoes[j].setAttribute('title', 'Tema atual: ' + (NOMES[tema] || tema) + ' — clique para trocar');
    }
  }

  /* --- 5. Cliques: escolher tema / navegar preservando o tema ------------- */
  document.addEventListener('click', function (ev) {
    /* Escolher um tema: salva e recarrega a página atual já no tema novo */
    var escolha = ev.target.closest('[data-tema-opcao]');
    if (escolha) {
      ev.preventDefault();
      var novo = escolha.getAttribute('data-tema-opcao');
      try { localStorage.setItem(CHAVE, novo); } catch (e) { /* ignora */ }
      location.search = '?tema=' + novo;
      return;
    }

    /* Navegar: propaga ?tema= para que o tema sobreviva à troca de tela */
    var link = ev.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;

    var url = new URL(href, location.href);
    /* Páginas de preview interno não precisam do parâmetro */
    if (url.pathname.indexOf('_preview-') >= 0) return;
    url.searchParams.set('tema', tema);
    link.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', marcarCartoes);
  } else {
    marcarCartoes();
  }
})();
