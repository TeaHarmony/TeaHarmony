// carrito.js

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agrega un producto al carrito
export function agregarAlCarrito(producto) {
  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  localStorage.setItem('carrito', JSON.stringify(carrito));
  toggleCarrito();
}

// Actualiza la vista del carrito
export function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    const totalElemento = document.getElementById("total-carrito");

    if (!contenedor || !totalElemento) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.classList.add("carrito-item");

        item.innerHTML = `
  <div class="carrito-detalle">
    <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50" style="border-radius: 8px; margin-right: 10px;">
    <div>
      <p><strong>${producto.nombre}</strong> x${producto.cantidad}</p>
      <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    </div>
  </div>
  <hr>
`;

        contenedor.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = total.toFixed(2);
}

// Elimina producto por índice
window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Muestra u oculta el carrito
function toggleCarrito(forceState = null) {
    const carritoDiv = document.getElementById("carrito-flotante");
    if (!carritoDiv) return;

    if (forceState === true) carritoDiv.classList.add("visible");
    else if (forceState === false) carritoDiv.classList.remove("visible");
    else carritoDiv.classList.toggle("visible");
}

// Inicializa el sistema de carrito
export function initCarrito() {
    const btnAbrir = document.getElementById("boton-carrito");
    const btnCerrar = document.getElementById("cerrar-carrito");

    if (btnAbrir) {
        btnAbrir.addEventListener("click", () => {
            toggleCarrito();
            actualizarCarrito();
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            toggleCarrito(false);
        });
    }

    actualizarCarrito();
}