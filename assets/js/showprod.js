// Modifique a função que renderiza os produtos
function renderizarProdutos() {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-lg-3';
        
        col.innerHTML = `
            <div class="card h-100">
                <img src="assets/images/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao.substring(0, 60)}...</p>
                    <p class="text-success fw-bold">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="btn btn-outline-success w-100" 
                            onclick="carregarDetalhesProduto(${produto.id})">
                        <i class="fas fa-info-circle"></i> Detalhes
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Nova função para carregar detalhes ( versão 3)
function carregarDetalhesProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const modalBody = document.getElementById('modalProdutoBody');
    
    if (produto) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="assets/images/${produto.imagem}" 
                         alt="${produto.nome}" 
                         class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-6">
                    <h2>${produto.nome}</h2>
                    <p class="text-muted">${produto.categoria}</p>
                    <p class="text-success fs-3">R$ ${produto.preco.toFixed(2)}</p>
                    <p>${produto.descricao}</p>
                    ${produto.detalhes ? `<p><small>${produto.detalhes}</small></p>` : ''}
                    
                    <div class="d-flex align-items-center mt-4">
                        <input type="number" min="1" value="1" class="form-control me-2" style="width: 70px;">
                        <button class="btn btn-success flex-grow-1" 
                                onclick="adicionarAoCarrinho(${produto.id})">
                            <i class="fas fa-cart-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="alert alert-danger">
                Produto não encontrado
            </div>
        `;
    }

    // Mostra o modal
    const modal = new bootstrap.Modal(document.getElementById('modalProduto'));
    modal.show();
}