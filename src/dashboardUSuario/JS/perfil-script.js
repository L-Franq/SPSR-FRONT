document.addEventListener('DOMContentLoaded', function () {
});

function submeterAtualizacaoPerfil(evento) {
    evento.preventDefault(); // Impede o recarregamento nativo do html

    const nomeUtilizador = document.getElementById('nome').value;

    Swal.fire({
        title: 'Atualizar Dados?',
        text: `Pretende guardar as alterações efetuadas no perfil de ${nomeUtilizador}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0284C7',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Sim, Guardar',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Os dados do perfil foram atualizados com sucesso.',
                icon: 'success',
                confirmButtonColor: '#0284C7',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}
