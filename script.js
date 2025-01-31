document.getElementById('form-item').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoItem = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        descricao: document.getElementById('descricao').value,
        imagemUrl: document.getElementById('imagem-url').value
    };

    adicionarItem(novoItem);
    e.target.reset();
});

async function adicionarItem(item) {
    const placeholder = document.createElement('div');
    placeholder.className = 'item-carregando';
    placeholder.innerHTML = 'Carregando item...';
    
    const lista = document.getElementById('itens-lista');
    lista.prepend(placeholder);

    try {
        const response = await fetch(item.imagemUrl);
        if (!response.ok) throw new Error('Imagem não encontrada');
        
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h3>${item.nome}</h3>
            <p class="preco">R$ ${item.preco.toFixed(2)}</p>
            <p>${item.descricao}</p>
            <img src="${item.imagemUrl}" alt="${item.nome}">
            <button class="delete-btn">Remover</button>
        `;

        itemElement.querySelector('.delete-btn').addEventListener('click', () => {
            itemElement.remove();
        });

        setTimeout(() => {
            placeholder.replaceWith(itemElement);
        }, 1000);

    } catch (error) {
        placeholder.innerHTML = 'Erro ao carregar o item';
        console.error(error);
    }
}