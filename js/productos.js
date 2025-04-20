const productos = [
  // Hierbas (33)
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `hierba${i + 1}`,
    nombre: `Hierba ${i + 1}`,
    categoria: "Hierbas",
    precio: 300 + i * 10,
    imagen: `https://source.unsplash.com/300x300/?herb,plant,${i}`
  })),

  // Infusiones (33)
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `infusion${i + 1}`,
    nombre: `Infusión ${i + 1}`,
    categoria: "Infusiones",
    precio: 350 + i * 10,
    imagen: `https://source.unsplash.com/300x300/?infusion,tea,${i}`
  })),

  // Aromáticos (33)
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `aromatico${i + 1}`,
    nombre: `Aromático ${i + 1}`,
    categoria: "Aromáticos",
    precio: 320 + i * 10,
    imagen: `https://source.unsplash.com/300x300/?aromatic,spice,${i}`
  })),

  // Semillas (33)
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `semilla${i + 1}`,
    nombre: `Semilla ${i + 1}`,
    categoria: "Semillas",
    precio: 280 + i * 10,
    imagen: `https://source.unsplash.com/300x300/?seed,grain,${i}`
  }))
];

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
      const productoJSON = JSON.stringify(producto)
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;");

      card.innerHTML = `
        <a href="producto.html?id=${producto.id}">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
        </a>
        <button data-producto='${productoJSON}' class="btn-agregar">Agregar al carrito</button>
      `;
      grid.appendChild(card);
    });
    seccion.appendChild(grid);
    contenedor.appendChild(seccion);
  });
};