/* ==========================================================================
   CONFIGURA��O DOS ENDPOINTS (Rotas da API para integra��o com o backend)
   ========================================================================== */
const ROTAS_API = {
    obterOcorrenciasZona: '/api/v1/ocorrencias/zona',
    obterHistoricoUtilizador: '/api/v1/ocorrencias/usuario',
    redirecionarFormularioReporte: '/ocorrencias/novo', // Telas por desenvolver
    redirecionarPortalAnuncios: '/portal-anuncios'       // Tela por desenvolver
};

let mapaLeaflet;

// Executa a inicializa��o assim que o documento HTML estiver carregado
window.onload = function () {
    inicializarMapa();
    carregarDadosPainel();
};

/* ==========================================================================
   1. INICIALIZA��O DO MAPA GEOGR�FICO (LEAFLET)
   ========================================================================== */
function inicializarMapa() {
    // Coordenadas geogr�ficas padr�o (Luanda, Angola)
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
            { id: 101, tipo: 'Acidente', local: 'Via Expressa - KM 12', status: 'Grave', hora: 'H� 10 min', latitude: -8.840, longitude: 13.230 },
            { id: 102, tipo: 'Obras na Pista', local: 'Av. Deolinda Rodrigues', status: 'Aten��o', hora: 'H� 45 min', latitude: -8.830, longitude: 13.240 },
            { id: 103, tipo: 'Sem�foro Avariado', local: 'N� da Samba', status: 'Lento', hora: 'H� 1 hora', latitude: -8.850, longitude: 13.220 }
        ];

        const dadosSimuladosUtilizador = {
            totalEnviados: 5,
            pendentesAnlise: 1,
            resolvidos: 4,
            historicoRecente: [
                { id: 1, tipo: 'Buraco na Via', data: '02/11/2026', status: 'Em An�lise' },
                { id: 2, tipo: '�leo na Pista', data: '28/10/2026', status: 'Resolvido' }
            ]
        };

        renderizarOcorrenciasZona(dadosSimuladosZona);
        renderizarHistoricoUtilizador(dadosSimuladosUtilizador);
        renderizarMarcadoresMapa(dadosSimuladosZona);

    } catch (erro) {
        console.error("Erro ao carregar dados do painel:", erro);
        Swal.fire({
            icon: 'error',
            title: 'Erro de Conex�o',
            text: 'N�o foi poss�vel carregar as ocorr�ncias em tempo real.',
            confirmButtonColor: '#0284C7'
        });
    }
}

/* ==========================================================================
   3. RENDERIZA��O DE COMPONENTES VISUAIS NO FRONT-END
   ========================================================================== */

// Renderiza a lista de ocorr�ncias na zona do utilizador
function renderizarOcorrenciasZona(listaDeOcorrencias) {
    const elementoContainer = document.getElementById('lista-ocorrencias-zona');
    document.getElementById('contador-ocorrencias-zona').innerText = listaDeOcorrencias.length;

    if (listaDeOcorrencias.length === 0) {
        elementoContainer.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">Nenhuma ocorr�ncia registrada nesta zona.</p>`;
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

// Renderiza o resumo estat�stico e o hist�rico do utilizador
function renderizarHistoricoUtilizador(dadosDoUtilizador) {
    document.getElementById('estatistica-total').innerText = dadosDoUtilizador.totalEnviados;
    document.getElementById('estatistica-pendentes').innerText = dadosDoUtilizador.pendentesAnlise;
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
   4. A��ES DE INTERA��O DO UTILIZADOR & ALERTAS (SWEETALERT2)
   ========================================================================== */

// A��o do Bot�o "Reportar Ocorr�ncia"
function abrirModalReportar() {
    Swal.fire({
        title: 'Reportar Ocorr�ncia',
        text: 'Deseja abrir o formul�rio detalhado de registro de ocorr�ncias?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0284C7',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Sim, Abrir Formul�rio',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            // Redireciona para a p�gina com o formul�rio detalhado 
            window.location.href = ROTAS_API.redirecionarFormularioReporte;
        }
    });
}

// A��o de Redirecionamento para o Portal de An�ncios
function navegarParaPortalAnuncios(evento) {
    evento.preventDefault();
    Swal.fire({
        title: 'Redirecionamento',
        text: 'A reencaminhar para o Portal de An�ncios e Seguradoras...',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        window.location.href = ROTAS_API.redirecionarPortalAnuncios;
    });
}

// A��o do Bot�o de Emerg�ncia SOS
function dispararAlertaEmergencia() {
    Swal.fire({
        title: 'Emitir Alerta SOS?',
        text: 'Isso enviar� sua localiza��o atual imediatamente �s autoridades rodovi�rias.',
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
                text: 'Sua localiza��o foi transmitida para a central.',
                icon: 'success',
                confirmButtonColor: '#0284C7'
            });
        }
    });
}

// Recarrega os dados do painel simulando anima��o no �cone
function atualizarDadosPainel() {
    const icone = document.getElementById('icone-atualizar');
    icone.classList.add('fa-spin');

    carregarDadosPainel().then(() => {
        setTimeout(() => {
            icone.classList.remove('fa-spin');
        }, 600);
    });
}

// Fun��o utilit�ria para definir �cones e cores conforme o tipo de ocorr�ncia
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