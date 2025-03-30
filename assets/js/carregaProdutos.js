

        document.addEventListener('DOMContentLoaded', function() {
            // Carrega os produtos na página inicial
            const container = document.getElementById('produtos-container');
            
            if (container) {
                setTimeout(() => {
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
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-outline-success" onclick="carregarDetalhesProduto(${produto.id})">
                                            <i class="fas fa-info-circle"></i> Detalhes
                                        </button>
                                        <button class="btn btn-success" onclick="adicionarAoCarrinho(${produto.id})">
                                            <i class="fas fa-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                        
                        container.appendChild(col);
                    });
                }, 1000); // Simula um delay de carregamento
            }
        });

        // Função para adicionar ao carrinho pelo ID do produto
        function adicionarAoCarrinho(produtoId) {
            const produto = produtos.find(p => p.id === produtoId);
            if (produto) {
                // (Use a função existente de adicionar ao carrinho)
                const itemExistente = carrinho.find(item => item.id === produto.id);
                
                if (itemExistente) {
                    itemExistente.quantidade++;
                } else {
                    carrinho.push({
                        id: produto.id,
                        nome: produto.nome,
                        preco: produto.preco,
                        quantidade: 1
                    });
                }
                
                atualizarContadorCarrinho();
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                
                // Feedback visual
                alert(`${produto.nome} foi adicionado ao carrinho!`);
            }
        }
