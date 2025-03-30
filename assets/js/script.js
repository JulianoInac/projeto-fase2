// Variáveis globais
let carrinho = [];
let horariosDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", 
    "14:00", "15:00", "16:00", "17:00"
];

// Quando o DOM estiver carregado( versão 3) voltar a versão 2 caso volte a parar de funcionar.
document.addEventListener('DOMContentLoaded', function() {
    // Configurar data mínima para agendamento (amanhã)
    let dataInput = document.getElementById('dataAgendamento');
    let hoje = new Date();
    let amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    
    let dd = String(amanha.getDate()).padStart(2, '0');
    let mm = String(amanha.getMonth() + 1).padStart(2, '0');
    let yyyy = amanha.getFullYear();
    
    dataInput.min = `${yyyy}-${mm}-${dd}`;
    
    // Event listeners para formulários
    document.getElementById('formCadastro').addEventListener('submit', validarCadastro);
    document.getElementById('formAgendamento').addEventListener('submit', validarAgendamento);
    document.getElementById('formLogin').addEventListener('submit', validarLogin);
    
    // Event listener para mudança no tipo de serviço
    document.getElementById('tipoServico').addEventListener('change', function() {
        let campoEndereco = document.getElementById('campoEndereco');
        if (this.value === 'entrega') {
            campoEndereco.style.display = 'block';
            document.getElementById('enderecoEntrega').setAttribute('required', '');
        } else {
            campoEndereco.style.display = 'none';
            document.getElementById('enderecoEntrega').removeAttribute('required');
        }
    });
    
    // Event listener para mudança na data de agendamento
    document.getElementById('dataAgendamento').addEventListener('change', function() {
        atualizarHorariosDisponiveis(this.value);
    });
    
    // Carregar carrinho do localStorage, se existir
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'));
        atualizarContadorCarrinho();
    }
});

// Funções para abrir modais( versão 3)
function abrirCadastro() {
    let modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
    modalLogin.hide();
    
    let modalCadastro = new bootstrap.Modal(document.getElementById('modalCadastro'));
    modalCadastro.show();
}

function abrirLogin() {
    let modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
    modalLogin.show();
}
// retirar o padding do body da pagina css.
function abrirCarrinho() {
    let modalCarrinho = new bootstrap.Modal(document.getElementById('modalCarrinho'));
    atualizarModalCarrinho();
    modalCarrinho.show();
}

function abrirAgendamento(tipo) {
    let modalAgendamento = new bootstrap.Modal(document.getElementById('modalAgendamento'));
    let form = document.getElementById('formAgendamento');
    
    // Resetar formulário
    form.classList.remove('was-validated');
    form.reset();
    
    // Configurar título e tipo de serviço
    if (tipo === 'retirada') {
        document.getElementById('tituloAgendamento').textContent = 'Agendar Retirada';
        document.getElementById('tipoServico').value = 'retirada';
    } else {
        document.getElementById('tituloAgendamento').textContent = 'Agendar Entrega';
        document.getElementById('tipoServico').value = 'entrega';
        document.getElementById('campoEndereco').style.display = 'block';
        document.getElementById('enderecoEntrega').setAttribute('required', '');
    }
    
    modalAgendamento.show();
}

// Funções de validação de formulários( versão 3)
function validarCadastro(e) {
    e.preventDefault();
    let form = e.target;
    
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Se chegou aqui, o formulário é válido( versão 3)
    alert('Cadastro realizado com sucesso!');
    let modalCadastro = bootstrap.Modal.getInstance(document.getElementById('modalCadastro'));
    modalCadastro.hide();
    form.reset();
    form.classList.remove('was-validated');
}

function validarAgendamento(e) {
    e.preventDefault();
    let form = e.target;
    
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Se chegou aqui, o formulário é válido( versão 3)
    let tipo = document.getElementById('tipoServico').value;
    let data = document.getElementById('dataAgendamento').value;
    let horario = document.getElementById('horarioAgendamento').value;
    
    let mensagem = `Agendamento para ${tipo === 'retirada' ? 'retirada' : 'entrega'} confirmado!\n`;
    mensagem += `Data: ${formatarDataParaExibicao(data)}\n`;
    mensagem += `Horário: ${horario}`;
    
    if (tipo === 'entrega') {
        mensagem += `\nEndereço: ${document.getElementById('enderecoEntrega').value}`;
    }
    
    alert(mensagem);
    let modalAgendamento = bootstrap.Modal.getInstance(document.getElementById('modalAgendamento'));
    modalAgendamento.hide();
    form.reset();
    form.classList.remove('was-validated');
}

function validarLogin(e) {
    e.preventDefault();
    alert('Login realizado com sucesso! (simulação)');
    let modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
    modalLogin.hide();
    document.getElementById('formLogin').reset();
}

// Funções do carrinho
function adicionarAoCarrinho(nome, preco) {
    // Verificar se o item já está no carrinho( funcionou manter nessa versão)
    let itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }
    
    // Atualizar contador e salvar no localStorage(armazena os dados no navegador do usuário)
    atualizarContadorCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Feedback visual
    let toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Produto adicionado</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${nome} foi adicionado ao carrinho!
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remover o toast após 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function atualizarContadorCarrinho() {
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('contador-carrinho').textContent = totalItens;
}

function atualizarModalCarrinho() {
    let listaCarrinho = document.getElementById('listaCarrinho');
    let totalCarrinho = document.getElementById('totalCarrinho');
    
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
        totalCarrinho.textContent = 'R$ 0,00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        let subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        html += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.nome}</h6>
                    <small class="text-muted">${item.quantidade}x R$ ${item.preco.toFixed(2)}</small>
                </div>
                <div class="d-flex align-items-center">
                    <span class="me-3">R$ ${subtotal.toFixed(2)}</span>
                    <button class="btn btn-outline-danger btn-sm" onclick="removerDoCarrinho(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    listaCarrinho.innerHTML = html;
    totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    atualizarModalCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let modalCarrinho = bootstrap.Modal.getInstance(document.getElementById('modalCarrinho'));
    modalCarrinho.hide();
    
    // Verificar se o usuário está logado (simulação) guiado pelo livro JavaScript: O Guia Definitivo" de David Flanagan
    let usuarioLogado = false;
    
    if (!usuarioLogado) {
        alert('Para finalizar a compra, faça login ou cadastre-se.');
        abrirLogin();
        return;
    }
    
    // Se o usuário estiver logado, prosseguir para o agendamento
    abrirAgendamento('entrega');
}

// Funções de formatação... guiado pelo livro JavaScript: O Guia Definitivo" de David Flanagan
function formatarCPF(input) {
    let cpf = input.value.replace(/\D/g, '');
    
    if (cpf.length > 3) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
    }
    if (cpf.length > 7) {
        cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
    }
    if (cpf.length > 11) {
        cpf = cpf.substring(0, 11) + '-' + cpf.substring(11, 13);
    }
    
    input.value = cpf;
}

function formatarTelefone(input) {
    let telefone = input.value.replace(/\D/g, '');
    
    if (telefone.length > 0) {
        telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2);
    }
    if (telefone.length > 10) {
        telefone = telefone.substring(0, 10) + '-' + telefone.substring(10, 15);
    }
    
    input.value = telefone;
}

function formatarCEP(input) {
    let cep = input.value.replace(/\D/g, '');
    
    if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    }
    
    input.value = cep;
}

function formatarDataParaExibicao(data) {
    let partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Funções de agendamento
function atualizarHorariosDisponiveis(data) {
    let selectHorarios = document.getElementById('horarioAgendamento');
    
    // Limpar opções existentes, mantendo a primeira (placeholder)
    while (selectHorarios.options.length > 1) {
        selectHorarios.remove(1);
    }
    
    // Adicionar horários disponíveis (simulação)
    horariosDisponiveis.forEach(horario => {
        let option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        selectHorarios.appendChild(option);
    });
}

// Funções de acessibilidade
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    
    // Salvar preferência no localStorage
    if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('highContrast', 'true');
    } else {
        localStorage.setItem('highContrast', 'false');
    }
}

// Verificar preferência de contraste ao carregar a página
if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Função para aumentar/diminuir fonte
function changeFontSize(direction) {
    let html = document.documentElement;
    let currentSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue('font-size'));
    
    if (direction === 'increase') {
        html.style.fontSize = (currentSize + 1) + 'px';
    } else if (direction === 'decrease') {
        html.style.fontSize = (currentSize - 1) + 'px';
    } else {
        html.style.fontSize = '16px'; // Reset
    }
}