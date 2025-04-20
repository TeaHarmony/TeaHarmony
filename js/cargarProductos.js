fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
        const productosGrid = document.getElementById('productos-grid');
        
        // Limpiar el contenido de la sección antes de agregar los nuevos productos
        productosGrid.innerHTML = '';

        data.forEach(producto => {
            const productoHTML = `
                <div class="producto-item">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <a href="producto.html?nombre=${encodeURIComponent(producto.nombre)}" class="btn">Ver más</a>
                </div>
            `;
            productosGrid.innerHTML += productoHTML;
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });