// Função responsável pela busca de habilidades sociais com base no texto inserido no campo de pesquisa
function pesquisar(campoPesquisa) {
    let section = document.getElementById("resultados-pesquisa");
    let resultados = '';
    let encontrouResultados = false;

    // Remove espaços extras do campo de pesquisa e substitui múltiplos espaços por um único
    // Normaliza para minúsculas para garantir comparação insensível a maiúsculas/minúsculas
    const pesquisaNormalizada = campoPesquisa.trim().replace(/\s+/g, ' ').toLowerCase();

    // Itera sobre a lista de habilidades sociais para encontrar correspondências
    for (let informacoes of habilidadesSociais) {
        // Remove espaços extras do nome e descrição e substitui múltiplos espaços por um único
        const nomeNormalizado = informacoes.nome.trim().replace(/\s+/g, ' ').toLowerCase();
        const descricaoNormalizada = informacoes.descricao.trim().replace(/\s+/g, ' ').toLowerCase();

        // Verifica se o campo de pesquisa está vazio e exibe uma mensagem adequada
        if (pesquisaNormalizada === '') {
            section.innerHTML = 'Digite algo antes de pesquisar.';
            return; 
        }

        // Verifica se o nome ou a descrição contêm o texto pesquisado
        if (nomeNormalizado.includes(pesquisaNormalizada) || 
            descricaoNormalizada.includes(pesquisaNormalizada)) {
            
            encontrouResultados = true;

            // Adiciona o resultado à lista de resultados
            resultados += `
                <div class="item-resultado">
                    <h2>${informacoes.nome}</h2>
                    <p class="descricao-meta">${informacoes.descricao}</p>
                </div>`;
        }
    }

    // Exibe uma mensagem se nenhum resultado for encontrado
    if (!encontrouResultados) {
        section.innerHTML = 'Nada foi encontrado.';
    } else {
        section.innerHTML = resultados;
    }
}

// Adiciona um evento para quando o documento for carregado completamente
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('campo-pesquisa');
    
    // Adiciona um evento de "input" para o campo de pesquisa para realizar a pesquisa em tempo real
    searchInput.addEventListener('input', () => {
        const campoPesquisa = searchInput.value;
        pesquisar(campoPesquisa);
    });

    // Adiciona um evento para o campo de pesquisa para ocultar o teclado ao pressionar Enter
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchInput.blur(); // Remove o foco do campo de entrada, ocultando o teclado
            event.preventDefault(); // Previne o comportamento padrão de pressionar Enter
        }
    });
});

// Função responsável por manter a seção de pesquisa fixa no topo após rolar a página
function fixarPesquisa() {
    const pesquisa = document.querySelector('.pesquisa');
    const posicaoPesquisa = pesquisa.offsetTop;

    // Adiciona ou remove a classe 'fixa' com base na posição de rolagem
    if (window.scrollY > posicaoPesquisa) {
        pesquisa.classList.add('fixa');
    } else {
        pesquisa.classList.remove('fixa');
    }
}

// Adiciona um evento para rolar a página e chamar a função fixarPesquisa
window.addEventListener('scroll', fixarPesquisa);
