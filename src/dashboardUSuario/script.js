/* ==========================================================================
   CONFIGURAÇÃO E INICIALIZAÇÃO LIMPA DO SISTEMA
   ========================================================================== */

let mapaLeaflet = null;

// Garante o disparo seguro ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    inicializarMapa();
});

/* ==========================================================================
   1. INICIALIZAÇÃO DO MAPA E MARCADORES ESTÁTICOS
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

    // Marcadores estáticos posicionados diretamente no mapa
    const marcadores = [
        { tipo: 'Obras na Pista', local: 'Via Expressa - KM 14', lat: -8.83833, lng: 13.23444 },
        { tipo: 'Buraco Grave', local: 'Avenida Fidel Castro', lat: -8.85000, lng: 13.25000 }
    ];

    marcadores.forEach(item => {
        L.marker([item.lat, item.lng])
            .addTo(mapaLeaflet)
            .bindPopup(`<b>${item.tipo}</b><br>${item.local}`);
    });

    // Correção de Bug do Chrome onde o mapa por vezes carrega incompleto
    setTimeout(() => {
        mapaLeaflet.invalidateSize();
    }, 200);
}

/* ==========================================================================
   2. AÇÕES DE INTERAÇÃO & MODAIS (SWEETALERT2)
   ========================================================================== */

function dispararAlertaEmergencia() {
    Swal.fire({
        title: 'Alerta SOS Activado',
        text: 'A enviar a sua localização de emergência para as autoridades...',
        icon: 'warning',
        confirmButtonColor: '#DC2626'
    });
}

function atualizarDadosPainel() {
    Swal.fire({
        title: 'Atualizado',
        text: 'Os dados do painel foram atualizados com sucesso.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
    });
}

function abrirModalReportar() {
    Swal.fire({
        title: 'Reportar Ocorrência',
        text: 'Deseja abrir o formulário detalhado de registo de ocorrências?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0284C7',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Sim, Abrir Formulário',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            window.location.href = '/ocorrencias/novo';
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
        window.location.href = '/portal-anuncios';
    });
}