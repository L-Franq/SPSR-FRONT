/* ==========================================================================
   CONFIGURAÇÃO DOS ENDPOINTS (Rotas da API para integração com o backend)
   ========================================================================== */
const ROTAS_API = {
    obterOcorrenciasZona: '/api/v1/ocorrencias/zona',
    obterHistoricoUtilizador: '/api/v1/ocorrencias/usuario',
    redirecionarFormularioReporte: '/ocorrencias/novo', // Telas por desenvolver
    redirecionarPortalAnuncios: '/portal-anuncios'       // Tela por desenvolver
};

let mapaLeaflet;

// Executa a inicialização assim que o documento HTML estiver carregado
window.onload = function () {
    inicializarMapa();
    carregarDadosPainel();
};

/* ==========================================================================
   1. INICIALIZAÇÃO DO MAPA GEOGRÁFICO (LEAFLET)
   ========================================================================== */
function inicializarMapa() {
    // Coordenadas geográficas padrão (Luanda, Angola)
    const coordenadasIniciais = [-8.83833, 13.23444];

    mapaLeaflet = L.map('map').setView(coordenadasIniciais, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapaLeaflet);
}

/* ==========================================================================
   2. CARREGAMENTO E PROCESSAMENTO DOS DADOS DO PAINEL
   ========================================================================== */
async function carregarDadosPainel() {
    try {

        // Dados Simulados (Mock) para teste 
        const dadosSimuladosZona = [
            { id: 101, tipo: 'Acidente', local: 'Via Expressa - KM 12', status: 'Grave', hora: 'Há 10 min', latitude: -8.840, longitude: 13.230 },
            { id: 102, tipo: 'Obras na Pista', local: 'Av. Deolinda Rodrigues', status: 'Atenção', hora: 'Há 45 min', latitude: -8.830, longitude: 13.240 },
            { id: 103, tipo: 'Semáforo Avariado', local: 'Nó da Samba', status: 'Lento', hora: 'Há 1 hora', latitude: -8.850, longitude: 13.220 }
        ];

        const dadosSimuladosUtilizador = {
            totalEnviados: 5,
            pendentesAnálise: 1,
            resolvidos: 4,
            historicoRecente: [
                { id: 1, tipo: 'Buraco na Via', data: '02/11/2026', status: 'Em Análise' },
                { id: 2, tipo: 'Óleo na Pista', data: '28/10/2026', status: 'Resolvido' }
            ]
        };

        renderizarOcorrenciasZona(dadosSimuladosZona);
        renderizarHistoricoUtilizador(dadosSimuladosUtilizador);
        renderizarMarcadoresMapa(dadosSimuladosZona);

    } catch (erro) {
        console.error("Erro ao carregar dados do painel:", erro);
        Swal.fire({
            icon: 'error',
            title: 'Erro de Conexão',
            text: 'Não foi possível carregar as ocorrências em tempo real.',
            confirmButtonColor: '#0284C7'
        });
    }
}

/* ==========================================================================
   3. RENDERIZAÇÃO DE COMPONENTES VISUAIS NO FRONT-END
   ========================================================================== */

// Renderiza a lista de ocorrências na zona do utilizador
function renderizarOcorrenciasZona(listaDeOcorrencias) {
    const elementoContainer = document.getElementById('lista-ocorrencias-zona');
    document.getElementById('contador-ocorrencias-zona').innerText = listaDeOcorrencias.length;

    if (listaDeOcorrencias.length === 0) {
        elementoContainer.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">Nenhuma ocorrência registrada nesta zona.</p>`;
        return;
    }

    elementoContainer.innerHTML = listaDeOcorrencias.map(item => {
        const estilo = obterEstiloPorTipoOcorrencia(item.tipo);
        return `
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg ${estilo.classeFundo} ${estilo.classeTexto} flex items-center justify-center text-xs">
                        <i class="${estilo.iconeFontAwesome}"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-slate-800">${item.tipo}</h4>
                        <p class="text-[11px] text-slate-500">${item.local}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-[10px] font-medium px-2 py-0.5 rounded-full ${estilo.classeBadge}">${item.status}</span>
                    <p class="text-[10px] text-slate-400 mt-1">${item.hora}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Adiciona os marcadores (pins) no mapa Leaflet
function renderizarMarcadoresMapa(listaDeOcorrencias) {
    listaDeOcorrencias.forEach(item => {
        if (item.latitude && item.longitude) {
            L.marker([item.latitude, item.longitude])
                .addTo(mapaLeaflet)
                .bindPopup(`<b>${item.tipo}</b><br>${item.local}`);
        }
    });
}

// Renderiza o resumo estatístico e o histórico do utilizador
function renderizarHistoricoUtilizador(dadosDoUtilizador) {
    document.getElementById('estatistica-total').innerText = dadosDoUtilizador.totalEnviados;
    document.getElementById('estatistica-pendentes').innerText = dadosDoUtilizador.pendentesAnálise;
    document.getElementById('estatistica-resolvidos').innerText = dadosDoUtilizador.resolvidos;

    const elementoContainer = document.getElementById('lista-historico-utilizador');
    elementoContainer.innerHTML = dadosDoUtilizador.historicoRecente.map(itemHistorico => `
        <div class="flex items-center justify-between p-2 text-xs border-b border-slate-100 last:border-0">
            <span class="font-medium text-slate-700">${itemHistorico.tipo}</span>
            <span class="text-[10px] ${itemHistorico.status === 'Resolvido' ? 'text-emerald-600' : 'text-amber-600'}">${itemHistorico.status}</span>
        </div>
    `).join('');
}

/* ==========================================================================
   4. AÇÕES DE INTERAÇÃO DO UTILIZADOR & ALERTAS (SWEETALERT2)
   ========================================================================== */

// Ação do Botão "Reportar Ocorrência"
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
            // Redireciona para a página com o formulário detalhado 
            window.location.href = ROTAS_API.redirecionarFormularioReporte;
        }
    });
}

// Ação de Redirecionamento para o Portal de Anúncios
function navegarParaPortalAnuncios(evento) {
    evento.preventDefault();
    Swal.fire({
        title: 'Redirecionamento',
        text: 'A reencaminhar para o Portal de Anúncios e Seguradoras...',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        window.location.href = ROTAS_API.redirecionarPortalAnuncios;
    });
}

// Ação do Botão de Emergência SOS
function dispararAlertaEmergencia() {
    Swal.fire({
        title: 'Emitir Alerta SOS?',
        text: 'Isso enviará sua localização atual imediatamente às autoridades rodoviárias.',
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

// Recarrega os dados do painel simulando animação no ícone
function atualizarDadosPainel() {
    const icone = document.getElementById('icone-atualizar');
    icone.classList.add('fa-spin');

    carregarDadosPainel().then(() => {
        setTimeout(() => {
            icone.classList.remove('fa-spin');
        }, 600);
    });
}

// Função utilitária para definir ícones e cores conforme o tipo de ocorrência
function obterEstiloPorTipoOcorrencia(tipo) {
    switch (tipo) {
        case 'Acidente':
            return { classeFundo: 'bg-red-100', classeTexto: 'text-red-600', classeBadge: 'bg-red-100 text-red-700', iconeFontAwesome: 'fa-solid fa-car-burst' };
        case 'Obras na Pista':
            return { classeFundo: 'bg-amber-100', classeTexto: 'text-amber-600', classeBadge: 'bg-amber-100 text-amber-700', iconeFontAwesome: 'fa-solid fa-person-digging' };
        default:
            return { classeFundo: 'bg-sky-100', classeTexto: 'text-sky-600', classeBadge: 'bg-sky-100 text-sky-700', iconeFontAwesome: 'fa-solid fa-triangle-exclamation' };
    }
}