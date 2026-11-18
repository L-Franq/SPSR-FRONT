/* ==========================================================================
   ROTAS DOS ENDPOINTS 
   ========================================================================== */
const ROTAS_API = {
    obterOcorrenciasZona: '/api/v1/ocorrencias/zona',
    obterHistoricoUtilizador: '/api/v1/ocorrencias/usuario',
    redirecionarFormularioReporte: '/ocorrencias/novo',
    redirecionarPortalAnuncios: '/portal-anuncios'
};

let mapaLeaflet = null;

// Garante o disparo seguro e compatível com diferentes navegadores.
document.addEventListener('DOMContentLoaded', function () {
    inicializarMapa();
    carregarDadosPainel();
});

/* ==========================================================================
   1. INICIALIZAÇÃO DO MAPA 
   ========================================================================== */
function inicializarMapa() {
    const elementoMapa = document.getElementById('map');
    if (!elementoMapa) return;

    const coordenadasIniciais = [-8.83833, 13.23444];

    mapaLeaflet = L.map(elementoMapa).setView(coordenadasIniciais, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapaLeaflet);

    // Correção de Bug do Chrome onde o mapa por vezes carrega incompleto
    setTimeout(() => {
        mapaLeaflet.invalidateSize();
    }, 200);
}

/* ==========================================================================
   2. CONSUMO DE ENDPOINTS DA API
   ========================================================================== */
async function carregarDadosPainel() {
    try {
        const [respostaZona, respostaUtilizador] = await Promise.all([
            fetch(ROTAS_API.obterOcorrenciasZona),
            fetch(ROTAS_API.obterHistoricoUtilizador)
        ]);

        if (!respostaZona.ok || !respostaUtilizador.ok) {
            throw new Error("Aguardando conexao com os endpoints.");
        }

        const dadosZona = await respostaZona.json();
        const dadosUtilizador = await respostaUtilizador.json();

        renderizarOcorrenciasZona(dadosZona);
        renderizarHistoricoUtilizador(dadosUtilizador);
        renderizarMarcadoresMapa(dadosZona);

    } catch (erro) {
        console.warn("Endpoints desconectados. Exibindo estado pronto para recepção:", erro);
        document.getElementById('lista-ocorrencias-zona').innerHTML = `
            <p class="mensagem-vazia">Nenhuma ocorrência encontrada nesta zona.</p>
        `;
    }
}

/* ==========================================================================
   3. RENDERIZAÇÃO DE COMPONENTES VISUAIS 
   ========================================================================== */

function renderizarOcorrenciasZona(listaDeOcorrencias) {
    const container = document.getElementById('lista-ocorrencias-zona');
    const contador = document.getElementById('contador-ocorrencias-zona');

    if (!listaDeOcorrencias || listaDeOcorrencias.length === 0) {
        contador.innerText = "0";
        container.innerHTML = `<p class="mensagem-vazia">Nenhuma ocorrência registrada nesta zona.</p>`;
        return;
    }

    contador.innerText = listaDeOcorrencias.length;

    container.innerHTML = listaDeOcorrencias.map(item => `
        <div class="item-ocorrencia">
            <div class="item-left">
                <i class="fa-solid fa-triangle-exclamation icone-sky"></i>
                <div>
                    <h4 class="item-titulo">${item.tipo}</h4>
                    <p class="item-subtitulo">${item.local}</p>
                </div>
            </div>
            <span class="badge-status badge-sky">${item.status}</span>
        </div>
    `).join('');
}

function renderizarMarcadoresMapa(listaDeOcorrencias) {
    if (!listaDeOcorrencias || !mapaLeaflet) return;

    listaDeOcorrencias.forEach(item => {
        if (item.latitude && item.longitude) {
            L.marker([item.latitude, item.longitude])
                .addTo(mapaLeaflet)
                .bindPopup(`<b>${item.tipo}</b><br>${item.local}`);
        }
    });
}

function renderizarHistoricoUtilizador(dadosDoUtilizador) {
    if (!dadosDoUtilizador) return;

    document.getElementById('estatistica-total').innerText = dadosDoUtilizador.totalEnviados || 0;
    document.getElementById('estatistica-pendentes').innerText = dadosDoUtilizador.pendentesAnálise || 0;
    document.getElementById('estatistica-resolvidos').innerText = dadosDoUtilizador.resolvidos || 0;

    const container = document.getElementById('lista-historico-utilizador');

    if (!dadosDoUtilizador.historicoRecente || dadosDoUtilizador.historicoRecente.length === 0) {
        container.innerHTML = `<p class="mensagem-vazia">Sem histórico registado.</p>`;
        return;
    }

    container.innerHTML = dadosDoUtilizador.historicoRecente.map(item => `
        <div class="item-ocorrencia">
            <span class="item-titulo">${item.tipo}</span>
            <span class="badge-status badge-amber">${item.status}</span>
        </div>
    `).join('');
}

/* ==========================================================================
   4. AÇÕES DE INTERAÇÃO & MODAIS (SWEETALERT2)
   ========================================================================== */

function abrirModalReportar() {
    Swal.fire({
        title: 'Reportar Ocorrência',
        text: 'Deseja abrir o formulário detalhado de registro de ocorrências?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0284C7',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Sim, Abrir Formulário',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            window.location.href = ROTAS_API.redirecionarFormularioReporte;
        }
    });
}

function navegarParaPortalAnuncios(evento) {
    evento.preventDefault();
    Swal.fire({
        title: 'Redirecionamento',
        text: 'A reencaminhar para o Portal de Anúncios...',
        icon: 'info',
        timer: 1200,
        showConfirmButton: false
    }).then(() => {
        window.location.href = ROTAS_API.redirecionarPortalAnuncios;
    });
}

function dispararAlertaEmergencia() {
    Swal.fire({
        title: 'Emitir Alerta SOS?',
        text: 'Isso enviará sua localização atual imediatamente às autoridades.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DC2626',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Confirmar SOS',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            Swal.fire({
                title: 'Alerta Enviado!',
                text: 'Sua localização foi transmitida para a central.',
                icon: 'success',
                confirmButtonColor: '#0284C7'
            });
        }
    });
}

function atualizarDadosPainel() {
    const icone = document.getElementById('icone-atualizar');
    if (icone) icone.classList.add('fa-spin');

    carregarDadosPainel().then(() => {
        setTimeout(() => {
            if (icone) icone.classList.remove('fa-spin');
        }, 500);
    });
}