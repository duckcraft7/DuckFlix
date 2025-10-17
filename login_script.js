// --- ÁREA DE CONFIGURAÇÃO DE CLIENTES ---
const USUARIOS_VALIDOS = {
    "familia": "marique10",
    "client01": "5434",
    "client02": "9897",
    "clint03": "4554"
};
// -----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const focusableElements = document.querySelectorAll('.focusable');
    let currentFocusIndex = 0;

    const setFocus = (index) => {
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = index;
        focusableElements[currentFocusIndex].classList.add('focused');
        focusableElements[currentFocusIndex].focus();
    };

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowDown':
                if (currentFocusIndex < focusableElements.length - 1) {
                    setFocus(currentFocusIndex + 1);
                }
                break;
            case 'ArrowUp':
                if (currentFocusIndex > 0) {
                    setFocus(currentFocusIndex - 1);
                }
                break;
            case 'Enter':
                if (focusableElements[currentFocusIndex].id === 'login-button') {
                    loginForm.dispatchEvent(new Event('submit'));
                }
                break;
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        if (USUARIOS_VALIDOS[usuario] && USUARIOS_VALIDOS[usuario] === senha) {
            
            // LINHA ADICIONADA - Salva na "memória" que o login foi bem-sucedido
            localStorage.setItem('duckflix_isLoggedIn', 'true');
            
            // SUCESSO! Redireciona para a sua tela de filmes
            window.location.href = 'home.html';
        } else {
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    setFocus(0);
});

