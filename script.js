const products = [
    // Hambúrgueres
    {
        id: 1,
        name: 'Classic Burger',
        price: 28.90,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        description: '180g de blend angus, queijo cheddar, alface, tomate e molho especial',
        category: 'hamburgueres',
        destaque: true
    },
    {
        id: 2,
        name: 'Bacon Supreme',
        price: 32.90,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500',
        description: 'Burger duplo, muito bacon crispy, cheddar, cebola caramelizada',
        category: 'hamburgueres'
    },
    {
        id: 3,
        name: 'Vegetariano',
        price: 26.90,
        image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500',
        description: 'Burger de grão de bico, rúcula, tomate seco e maionese vegana',
        category: 'hamburgueres'
    },
    // Pizzas
    {
        id: 4,
        name: 'Margherita Especial',
        price: 45.90,
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500',
        description: 'Molho de tomate italiano, mussarela de búfala, manjericão fresco',
        category: 'pizzas',
        destaque: true
    },
    {
        id: 5,
        name: 'Pepperoni Premium',
        price: 49.90,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        description: 'Pepperoni importado, mussarela, orégano e azeitonas pretas',
        category: 'pizzas'
    },
    {
        id: 6,
        name: '4 Queijos',
        price: 47.90,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        description: 'Mussarela, gorgonzola, parmesão e requeijão cremoso',
        category: 'pizzas'
    },
    // Bebidas
    {
        id: 7,
        name: 'Gin Tônica Especial',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
        description: 'Gin importado, tônica premium, zimbro e limão siciliano',
        category: 'bebidas'
    },
    {
        id: 8,
        name: 'Suco Detox Verde',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=500',
        description: 'Couve, maçã verde, gengibre, hortelã e limão',
        category: 'bebidas',
        destaque: true
    },
    // Sobremesas
    {
        id: 9,
        name: 'Cheesecake',
        price: 18.90,
        image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=500',
        description: 'Cheesecake NY style com calda de frutas vermelhas',
        category: 'sobremesas',
        destaque: true
    },
    {
        id: 10,
        name: 'Brownie com Sorvete',
        price: 16.90,
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500',
        description: 'Brownie quente com sorvete de baunilha e calda de chocolate',
        category: 'sobremesas'
    },
    // Hot Dogs
    {
        id: 11,
        name: 'Hot Dog Clássico',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1677674048180-9e9ac1a50e35?w=500',
        description: 'Salsicha, tomate, batata palha, milho, ervilha e molhos especiais',
        category: 'hotdogs',
        destaque: true
    },
    {
        id: 12,
        name: 'Hot Dog Bacon',
        price: 15.90,
        image: 'https://images.unsplash.com/photo-1612392062422-ef19c7e3d8cf?w=500',
        description: 'Salsicha, bacon crocante, cheddar, batata palha e molhos',
        category: 'hotdogs'
    },
    {
        id: 13,
        name: 'Hot Dog Catupiry',
        price: 14.90,
        image: 'https://images.unsplash.com/photo-1683297002760-c8655924a015?w=500',
        description: 'Salsicha, catupiry original, batata palha e molhos especiais',
        category: 'hotdogs'
    }
];

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showToast(`${product.name} adicionado ao carrinho!`);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="d-flex justify-content-between mb-2">
                    <h6 class="mb-0">${item.name}</h6>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="quantity-control">
                        <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-primary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div>R$ ${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCart();
        showToast('Item removido do carrinho');
    }
}

function showToast(message, type = 'primary') {
    const toast = document.getElementById('toast-notification');
    toast.querySelector('.toast-body').textContent = message;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

function toggleTrocoField() {
    const trocoField = document.getElementById('trocoField');
    const isMoneySelected = document.getElementById('money').checked;
    trocoField.style.display = isMoneySelected ? 'block' : 'none';
    if (!isMoneySelected) {
        document.getElementById('trocoInput').value = '';
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Adicione itens ao carrinho primeiro!');
        return;
    }

    // Validar endereço
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const referencia = document.getElementById('referencia').value.trim();

    if (!rua || !numero || !bairro) {
        showToast('Por favor, preencha o endereço de entrega');
        return;
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;

    let trocoMessage = '';
    if (selectedPayment === 'Dinheiro') {
        const trocoValue = document.getElementById('trocoInput').value;
        if (trocoValue && parseFloat(trocoValue) > total) {
            const trocoAmount = parseFloat(trocoValue) - total;
            trocoMessage = `\n*Troco para: R$ ${parseFloat(trocoValue).toFixed(2)}*\n*Troco: R$ ${trocoAmount.toFixed(2)}*`;
        }
    }

    const endereco = `*Endereço de Entrega:*
Rua: ${rua}, ${numero}
${complemento ? `Complemento: ${complemento}\n` : ''}Bairro: ${bairro}
${referencia ? `Referência: ${referencia}` : ''}`;

    const pedido = cart.map(item =>
        `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const mensagem = encodeURIComponent(
        `*Novo Pedido*\n\n${pedido}\n\n` +
        `*Total: R$ ${total.toFixed(2)}*\n` +
        `*Forma de Pagamento: ${selectedPayment}*${trocoMessage}\n\n` +
        `${endereco}`
    );

    const phoneNumber = '558498699449';
    window.open(`https://wa.me/${phoneNumber}?text=${mensagem}`);

    cart = [];
    updateCart();
    showToast('Pedido enviado com sucesso!');
}

function renderProducts(category = 'todos') {
    const containerId = category === 'todos'
        ? 'products-container-todos'
        : `products-container-${category}`;

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const productsToShow = category === 'todos'
        ? products
        : products.filter(product => product.category === category);

    productsToShow.forEach(product => {
        const div = document.createElement('div');
        div.className = 'col-md-6 col-lg-4 mb-4';
        div.innerHTML = `
            <div class="card card-product h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    ${product.destaque ? '<span class="position-absolute top-0 start-0 badge bg-danger m-2">Mais Pedido</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text small text-muted flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="h5 mb-0">R$ ${product.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            <i class="bi bi-plus-circle"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se há usuário logado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }

    // Adicionar listener para o botão de login
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', () => {
        if (!currentUser) {
            // Só abre o modal se não houver usuário logado
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
    });

    // Renderizar todos os produtos em todas as categorias
    renderProducts('todos');
    renderProducts('hamburgueres');
    renderProducts('hotdogs'); // Adicionar esta linha
    renderProducts('pizzas');
    renderProducts('bebidas');
    renderProducts('sobremesas');

    // Event listeners para as tabs
    document.querySelectorAll('[data-bs-toggle="pill"]').forEach(pill => {
        pill.addEventListener('shown.bs.tab', event => {
            const category = event.target.id.replace('pills-', '').replace('-tab', '');
            // Não precisa re-renderizar, as tabs já contêm os produtos
        });
    });

    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
        modalElement.addEventListener('hide.bs.modal', () => {
            setTimeout(cleanupModal, 300); // Pequeno delay para garantir que o modal fechou
        });
    }
});

// Funções de autenticação
let currentUser = null;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/api/auth/login', {  // Modificar URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Salvar dados do usuário no localStorage
            localStorage.setItem('currentUser', JSON.stringify(data));
            currentUser = data;
            updateUserInterface();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            showToast('Login realizado com sucesso!');
        } else {
            showToast(data.error, 'danger');
        }
    } catch (error) {
        showToast('Erro ao fazer login', 'danger');
    } finally {
        closeModal();
        // Recriar o modal para futuros usos
        new bootstrap.Modal(document.getElementById('loginModal'));
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        showToast('Registrando usuário...', 'info');

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        let data;
        try {
            data = await response.json();
        } catch (e) {
            throw new Error('Erro na resposta do servidor');
        }

        if (response.ok) {
            showToast('Registro realizado com sucesso!', 'success');
            form.reset();
            document.querySelector('[data-bs-target="#loginTab"]').click();
        } else {
            throw new Error(data.error || 'Erro ao registrar usuário');
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        showToast(error.message || 'Erro ao conectar com o servidor', 'danger');
    }
});

// Modificar a função de logout para limpar dados e atualizar interface
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUserInterface();
    showToast('Logout realizado com sucesso!');
}

// Modificar updateUserInterface para gerenciar o comportamento do botão
function updateUserInterface() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const loginButton = document.getElementById('loginButton');
    const isMobile = window.innerWidth <= 768;

    if (currentUser) {
        loginButton.removeAttribute('data-bs-toggle');
        loginButton.removeAttribute('data-bs-target');
        loginButton.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person"></i>${isMobile ? '' : ` ${currentUser.name}`}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><span class="dropdown-item-text text-muted d-md-none">${currentUser.name}</span></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()">Sair</a></li>
                </ul>
            </div>
        `;
    } else {
        loginButton.setAttribute('data-bs-toggle', 'modal');
        loginButton.setAttribute('data-bs-target', '#loginModal');
        loginButton.innerHTML = `
            <i class="bi bi-person"></i>
            <span id="userNameDisplay">${isMobile ? '' : 'Login'}</span>
        `;
    }
}

// Adicionar listener para redimensionamento da janela
window.addEventListener('resize', () => {
    updateUserInterface();
});

function closeModal() {
    // Fechar modal usando Bootstrap
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
        // Remover event listeners antigos
        modalElement.removeEventListener('hidden.bs.modal', cleanupModal);

        // Adicionar novo listener para limpeza
        modalElement.addEventListener('hidden.bs.modal', cleanupModal);

        // Fechar usando API do Bootstrap
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
}

function cleanupModal() {
    // Limpar elementos do modal
    document.body.classList.remove('modal-open');

    // Remover todos os backdrops
    const backdrops = document.getElementsByClassName('modal-backdrop');
    Array.from(backdrops).forEach(backdrop => backdrop.remove());

    // Restaurar scroll e padding
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Recriar modal
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
        new bootstrap.Modal(modalElement);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Adicionar clique fora do modal para fechar
document.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    if (e.target === overlay) {
        closeModal();
    }
});
