// --- ÁREA DE CONFIGURAÇÃO DE CLIENTES ---
const USUARIOS_VALIDOS = {
    "familia": "marique10",
};
// -----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    // Pega todos os elementos que podem ser focados (campos e botão)
    const focusableElements = document.querySelectorAll('.focusable');
    let currentFocusIndex = 0; // Começa no primeiro elemento (campo de usuário)

    // Função para definir o foco visual
    const setFocus = (index) => {
        // Remove o foco do elemento antigo
        focusableElements[currentFocusIndex].classList.remove('focused');
        
        // Atualiza o índice e adiciona o foco ao novo elemento
        currentFocusIndex = index;
        focusableElements[currentFocusIndex].classList.add('focused');
        focusableElements[currentFocusIndex].focus(); // Foco real para digitação
    };

    // "Ouve" as teclas do controle remoto
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowDown':
                // Se a seta para baixo for pressionada, move o foco para o próximo item
                if (currentFocusIndex < focusableElements.length - 1) {
                    setFocus(currentFocusIndex + 1);
                }
                break;
            case 'ArrowUp':
                // Se a seta para cima for pressionada, move o foco para o item anterior
                if (currentFocusIndex > 0) {
                    setFocus(currentFocusIndex - 1);
                }
                break;
            case 'Enter': // O botão "OK" do controle
                // Se o foco estiver no botão de login, envia o formulário
                if (focusableElements[currentFocusIndex].id === 'login-button') {
                    loginForm.dispatchEvent(new Event('submit'));
                }
                break;
        }
    });

    // Função que verifica o login quando o formulário é enviado
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        if (USUARIOS_VALIDOS[usuario] && USUARIOS_VALIDOS[usuario] === senha) {
            // SUCESSO! Redireciona para a sua tela de filmes
            window.location.href = 'home.html';
        } else {
            // ERRO! Mostra a mensagem
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Define o foco inicial no campo de usuário quando o app abre
    setFocus(0);
});
