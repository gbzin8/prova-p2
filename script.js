// Função para adicionar uma nova roupa
function adicionarRoupa() {
    // Obter os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const tamanho = document.getElementById('tamanho').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const imagemInput = document.getElementById('imagem');
    
    // Verificar se uma imagem foi selecionada
    if (imagemInput.files.length === 0) {
        alert("Por favor, selecione uma imagem.");
        return;
    }
    
    // Obter o arquivo de imagem selecionado
    const imagemFile = imagemInput.files[0];
    const reader = new FileReader();

    // Função de callback para quando o arquivo de imagem for carregado
    reader.onload = function(event) {
        // Criar um objeto para a nova roupa
        const novaRoupa = {
            nome: nome,
            tamanho: tamanho,
            descricao: descricao,
            preco: preco,
            imagem: "Imagens/" + imagemFile.name // Caminho relativo para a imagem
        };

        // Obter as roupas salvas no local storage
        let roupas = JSON.parse(localStorage.getItem('roupas')) || [];

        // Adicionar a nova roupa à lista
        roupas.push(novaRoupa);

        // Salvar a lista atualizada no local storage
        localStorage.setItem('roupas', JSON.stringify(roupas));

        // Limpar os campos do formulário
        document.getElementById('clothes-form').reset();

        // Se estiver na página 'pag1.html', redirecionar para 'index.html'
        if (window.location.pathname.includes("pag1.html")) {
            window.location.href = "index.html";
        }
    };

    // Ler o arquivo de imagem como uma URL de dados
    reader.readAsDataURL(imagemFile);
}

// Função para carregar as roupas do local storage e exibi-las na página
function carregarRoupas() {
    // Obter as roupas do local storage
    let roupas = JSON.parse(localStorage.getItem('roupas')) || [];

    // Selecionar o elemento da lista de roupas
    const roupasList = document.getElementById('roupas-list');

    // Limpar a lista de roupas
    roupasList.innerHTML = '';

    // Adicionar cada roupa à lista
    roupas.forEach((roupa, index) => {
        const roupaItem = document.createElement('li');
        roupaItem.innerHTML = `
            <h3>${roupa.nome}</h3>
            <p>Tamanho: ${roupa.tamanho}</p>
            <p>Descrição: ${roupa.descricao}</p>
            <p>Preço: R$ ${roupa.preco}</p>
            <img src="${roupa.imagem}" alt="${roupa.nome}">
            <button onclick="excluirRoupa(${index})">Excluir</button>
        `;
        roupasList.appendChild(roupaItem);
    });
}

// Função para excluir uma roupa da lista e do local storage
function excluirRoupa(index) {
    // Obter as roupas do local storage
    let roupas = JSON.parse(localStorage.getItem('roupas')) || [];

    // Remover a roupa da lista pelo índice
    roupas.splice(index, 1);

    // Salvar a lista atualizada no local storage
    localStorage.setItem('roupas', JSON.stringify(roupas));

    // Atualizar a lista de roupas exibida na página
    carregarRoupas();
}

// Verificar se a página index.html foi carregada para carregar as roupas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarRoupas);
} else {
    carregarRoupas();
}
