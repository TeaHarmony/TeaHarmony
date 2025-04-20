// Mostrar u ocultar el carrito flotante
function toggleCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle('visible');
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificamos si ya está el producto
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    mostrarCarrito();
}

// Mostrar el carrito automáticamente
function mostrarCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.classList.add('visible');
}

// Actualiza los items del carrito y suma total
function actualizarCarritoUI() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-items');
    const totalSpan = document.getElementById('carrito-total');
    let total = 0;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>Carrito vacío</p>';
        totalSpan.textContent = '0';
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        contenedor.innerHTML += `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" width="40" height="40" />
                <span>${producto.nombre} x${producto.cantidad}</span> - $${subtotal.toFixed(2)}
            </div>
        `;
    });

    totalSpan.textContent = total.toFixed(2);
}

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    actualizarCarritoUI();
});

// Configuración de los productos en el carrito
window.onload = () => {
    const contenedor = document.getElementById("contenedor-productos");

    const categorias = ["Hierbas", "Infusiones", "Aromáticos", "Semillas"];
    categorias.forEach((cat) => {
        const seccion = document.createElement("section");
        seccion.id = cat.toLowerCase();
        const titulo = document.createElement("h2");
        titulo.textContent = cat;
        seccion.appendChild(titulo);

        const grid = document.createElement("div");
        grid.className = "grid-productos";
        productos.filter(p => p.categoria === cat).forEach(producto => {
            const card = document.createElement("div");
            card.className = "producto";
            card.innerHTML = `
                <a href="producto.html?id=${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}" />
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                </a>
                <button class="btn-agregar" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">Agregar al carrito</button>
            `;
            grid.appendChild(card);
        });
        seccion.appendChild(grid);
        contenedor.appendChild(seccion);
    });

    // Manejo del evento de agregar al carrito
    document.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', (event) => {
            const { nombre, precio, imagen } = event.target.dataset;
            agregarAlCarrito(nombre, parseFloat(precio), imagen);
        });
    });
};