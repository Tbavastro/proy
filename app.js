class Producto {
    constructor(id, nombre, descripcion, precio, img, alt) {
        this.id = id,
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.precio = precio,
            this.img = img
        this.alt = alt
    }
    descripcionCarrito() {
        return `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${this.descripcion}</h5>
                    <p class="card-text">Precio :$ ${this.precio}</p>
                    <button class="Ver btn btn-danger" id="e-p${this.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>`

    }
    descripcionprod() {
        return `<div class="item">
    <figure>
    <img src="${this.img}">
     <alt="${this.alt}" class="Nov">
    </figure>
    <div class="info-producto">
        <h2 class="Phantom">${this.descripcion}</h2>
     <p class="p-recio">$${this.precio}</p>
      <button class="Ver" id="añadir-${this.id}">Añadir al carrito</button>
    </div>`
    }
}
class productoControl {
    constructor() {
        this.listaProductos = []
    }
    agregar(producto) {
        this.listaProductos.push(producto)
    }
    mostrarEnDOM() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionprod()

        })
        this.listaProductos.forEach(producto => {
            const añadir = document.getElementById(`añadir-${producto.id}`)
            añadir.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarStorage()
                carrito.mostrarEnDOM()
                Toastify({
                    text: "!Producto añadido!",
                    duration: 3000,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();

            })
        })
    }
}
class Carrito {
    constructor() {
        this.listaCompras = []
        this.localStorageKey = "listaCompras"
    }
    agregar(producto) {
        this.listaCompras.push(producto)
    }
    eliminar(productoAeliminar) {
        let indice = this.listaCompras.findIndex(producto => producto.id == productoAeliminar.id)
        this.listaCompras.splice(indice, 1)
    }
    finalizar_Compra() {
        const btn_finalizar = document.getElementById("btn_finalizar")
        btn_finalizar.addEventListener("click", () => {
            localStorage.setItem(this.localStorageKey, "[]")
            this.limpiarCarrito()
            this.mostrarEnDOM()

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'su compra ha sido realizada con exito',
            })
        })

    }
    guardarStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCompras)
        localStorage.setItem(this.localStorageKey, listaCarritoJSON)
    }
    treaerStorage() {
        let listaCarritoJSON = localStorage.getItem(this.localStorageKey)
        let listaCarritojs = JSON.parse(listaCarritoJSON)
        let listaAux = []
        listaCarritojs.forEach(producto => {
            let Product = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.img, producto.alt)
            listaAux.push(Product)
        })
        this.listaCompras = listaAux
    }
    limpiarCarrito() {
        this.listaCompras = []
    }
    mostrarEnDOM() {
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        contenedor_carrito.innerHTML = ""
        this.listaCompras.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionCarrito()

        })
        this.listaCompras.forEach(producto => {
            const btn_eliminar = document.getElementById(`e-p${producto.id}`)
            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarStorage()
                this.mostrarEnDOM()
                Toastify({
                    text: "!producto eliminado¡",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            })
        })

    }
}

const CP = new productoControl()
const carrito = new Carrito

const prod1 = new Producto(1, "zapatilla", "Nike Dunk Low Retro 27", 58000, "https://nikearprod.vtexassets.com/arquivos/ids/220502-800-800?v=638100906284400000&width=800&height=800&aspect=true", "imagen zapatilla")
const prod2 = new Producto(2, "zapatilla", "Nike Air Force 1 '07", 50000, "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4a174924-de99-465f-bbb7-f39762946823/air-force-1-07-zapatillas-g7cG6H.png", "imagen zapatilla")
const prod3 = new Producto(3, "zapatilla", "Adidas Forum Exhibit Low", 48000, "https://assets.adidas.com/images/w_600,f_auto,q_auto/81cb61e69fe94bda88cfae5f017fea87_9366/Zapatillas_Forum_Exhibit_Low_Blanco_GX4121_01_standard.jpg", "imagen zapatilla")
const prod4 = new Producto(4, "zapatilla", "Adidas Forum Low x Bad Bunny", 68000, "https://acdn.mitiendanube.com/stores/001/160/313/products/520765b31-e11443e8f3613bb5c016239419409406-640-0.jpg", "imagen zapatilla")

CP.agregar(prod1)
CP.agregar(prod2)
CP.agregar(prod3)
CP.agregar(prod4)
carrito.finalizar_Compra()
carrito.treaerStorage()
carrito.mostrarEnDOM()


CP.mostrarEnDOM()

