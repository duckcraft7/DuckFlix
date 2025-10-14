// Espera a página HTML carregar completamente antes de rodar o código.
document.addEventListener('DOMContentLoaded', () => {

    // Pega todos os cards de filme da página e os coloca em uma lista.
    const movieCards = document.querySelectorAll('.movie-card');
    
    // Se não houver filmes na página, não faz nada.
    if (movieCards.length === 0) {
        return;
    }

    // Começamos com o primeiro filme selecionado (índice 0).
    let currentFocusIndex = 0;

    // Função para definir qual elemento está em foco.
    const setFocus = (index) => {
        // Remove o foco do elemento antigo, se houver.
        movieCards[currentFocusIndex].classList.remove('focused');
        
        // Atualiza o índice para o novo elemento.
        currentFocusIndex = index;
        
        // Adiciona a classe .focused ao novo elemento para destacá-lo.
        movieCards[currentFocusIndex].classList.add('focused');

        // Faz a página rolar para que o elemento em foco esteja sempre visível.
        movieCards[currentFocusIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // "Ouvinte" de eventos: fica esperando uma tecla ser pressionada.
    document.addEventListener('keydown', (event) => {
        // Pega o número de colunas na grade de filmes para pular linhas corretamente.
        const grid = document.querySelector('.movie-grid');
        const gridStyle = window.getComputedStyle(grid);
        const gridColumnCount = gridStyle.getPropertyValue('grid-template-columns').split(' ').length;

        switch (event.key) {
            case 'ArrowRight':
                // Se pressionar para a direita, move o foco para o próximo filme.
                if (currentFocusIndex < movieCards.length - 1) {
                    setFocus(currentFocusIndex + 1);
                }
                break;
            case 'ArrowLeft':
                // Se pressionar para a esquerda, move o foco para o filme anterior.
                if (currentFocusIndex > 0) {
                    setFocus(currentFocusIndex - 1);
                }
                break;
            case 'ArrowDown':
                // Se pressionar para baixo, pula para o filme na linha de baixo.
                if (currentFocusIndex + gridColumnCount < movieCards.length) {
                    setFocus(currentFocusIndex + gridColumnCount);
                }
                break;
            case 'ArrowUp':
                // Se pressionar para cima, pula para o filme na linha de cima.
                if (currentFocusIndex - gridColumnCount >= 0) {
                    setFocus(currentFocusIndex - gridColumnCount);
                }
                break;
            case 'Enter':
                // Se pressionar "Enter" (o botão OK do controle), simula um clique no filme focado.
                movieCards[currentFocusIndex].click();
                break;
        }
    });

    // Define o foco inicial no primeiro filme quando a página carrega.
    setFocus(0);
});
