const productos = [
  {
    nombre: 'Remera',
    descripcion: 'Remera manga larga 100% algodón',
    precio: 25000,
    imagen: 'Assets/Imagenes/remera.jpg',
  },
  {
    nombre: 'Pantalón',
    descripcion: 'Pantalón cargo azul marino',
    precio: 30000,
    imagen:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F42%2F3b%2Fad%2F423bad5c86eeba836fca40fe38481c3b.jpg&f=1&nofb=1&ipt=842342ef9991487359250d1117d76e5da2525d41def05d0652c655bfe23ace57',
  },
  {
    nombre: 'Zapatillas',
    descripcion: 'Zapatillas deportivas',
    precio: 85000,
    imagen:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhttp2.mlstatic.com%2Ftenis-zapatillas-adidas-swift-run-azul-hombre-env-gr-D_NQ_NP_989930-MCO26513865735_122017-F.jpg&f=1&nofb=1&ipt=a3c5e6d790d30676d3ea4694f5b9242af2c49a6bd97424c15eaa6f1ac8e14fc0',
  },
  {
    nombre: 'Buzo',
    descripcion: 'Buzo scarface blanco',
    precio: 50000,
    imagen: 'Assets/Imagenes/scarface.jpg',
  },
];

const contenedor = document.getElementById('productos');
const totalElem = document.getElementById('total');
const numeroWhatsApp = '542645208135';
function crearProductoHTML(producto, index) {
  return `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
          <h4>${producto.nombre}</h4>
          <p>${producto.descripcion}</p>
          <p class="precio">Precio: $${producto.precio}</p>
          <label>Cantidad:
            <input type="number" min="0" value="0" data-index="${index}" class="cantidad">
          </label>
        </div>
      </div>
    `;
}

function actualizarTotal() {
  let total = 0;
  document.querySelectorAll('.cantidad').forEach((input) => {
    const index = input.dataset.index;
    const cantidad = parseInt(input.value) || 0;
    total += cantidad * productos[index].precio;
  });
  totalElem.textContent = `Total: $${total}`;
}

function generarMensajeWhatsApp() {
  let mensaje = 'Hola, quisiera realizar el siguiente pedido:%0A';
  let total = 0;
  productos.forEach((producto, i) => {
    const cantidad =
      parseInt(document.querySelector(`input[data-index="${i}"]`).value) || 0;
    if (cantidad > 0) {
      mensaje += `- ${cantidad} x ${producto.nombre} ($${producto.precio} c/u)%0A`;
      total += cantidad * producto.precio;
    }
  });

  if (total === 0) {
    alert('Por favor, seleccioná al menos un producto.');
    return;
  }

  mensaje += `%0ATotal: $${total}`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, '_blank');
}

contenedor.innerHTML = productos
  .map((p, i) => crearProductoHTML(p, i))
  .join('');
document.querySelectorAll('.cantidad').forEach((input) => {
  input.addEventListener('input', actualizarTotal);
});
document
  .getElementById('enviarPedido')
  .addEventListener('click', generarMensajeWhatsApp);
