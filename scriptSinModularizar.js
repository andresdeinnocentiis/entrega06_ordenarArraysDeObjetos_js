/*
ENTREGA 06 - INCORPORAR ARRAYS
*/

// ESTA PRIMERA PARTE ES LA MISMA QUE LA ENTREGA ANTERIOR, 
//PARA VER LO CORRESPONDIENTE A ESTA ENTREGA SALTAR A LINEA 303

/* ============================================================================================= */
/* ================================ PRODUCTOS Y CARRITO ======================================== */
/* ============================================================================================= */


function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}

class Producto{
    constructor(nombre,categoria,precio,currency,stock) {
        this._id = Math.floor(Math.random()*1000000); // No incluí el id porque en principio no debería ser asignable manualmente
        // Se que esta no es la forma correcta de asignar un ID pero como todavía no estamos trabajando con bases de datos es lo único que se me ocurrió.
        this._nombre = titleCase(nombre);
        this._categoria = titleCase(categoria);
        this._precio = precio;
        this._currency = currency.toUpperCase();
        this._stock = stock;
        this._cantidadElegida = 0 // No lo incluí en el constructor porque no debería ser algo que se pueda definir al instanciar el objeto
        // De todas formas tampoco estoy seguro que "cantidadElegida" deba ser un atributo del producto, pero por ahora no se me ocurrió una forma
        // más prolija de resolverlo.
        
    }
    getId() {
        return this._id
    }
    getNombre() {
        return this._nombre
    }
    getCategoria() {
        return this._categoria
    }
    getPrecio() {
        return this._precio
    }
    getCurrency() {
        return this._currency
    }
    getStock() {
        return this._stock
    }
    getCantidad() {
        return this._cantidadElegida
    }

    setNombre(newNombre) {
        this._nombre = titleCase(newNombre);
    }
    setCategoria(newCategoria) {
        this._categoria = titleCase(newCategoria);
    }
    setPrecio(newPrecio) {
        this._precio = newPrecio;
    }
    setCurrency(newCurrency) {
        this._currency = newCurrency.toUpperCase();
    }
    setStock(newStock) {
        this._stock = newStock;
    }
    setCantidad(newCantidad) {
        this._cantidadElegida = newCantidad;
    }

    verInfo() {
        let info = `ID: ${this.getId()} - Producto: ${this.getNombre()} - Categoría: ${this.getCategoria()} - Precio: ${this.getCurrency()} $${this.getPrecio()} - Stock: ${this.getStock()}.`
        return info 
    }

    switchCurrency() {
        if (this._currency == "ARS") {
            this._currency = "USD"
        } else {
            this._currency = "ARS"
        }
        
    }

    
    
}

class Zapatilla extends Producto {
    constructor(nombre,categoria,precio,currency,stock,marca,modelo,talle,color) {
        super(nombre,categoria,precio,currency,stock)
        this._marca = titleCase(marca)
        this._modelo = modelo
        this._talle = talle
        this._color = color

    }

    getMarca() {
        return this._marca
    }

    setMarca(newMarca) {
        this._marca = titleCase(newMarca);
    }
    getModelo() {
        return this._modelo
    }
    getTalle() {
        return this._talle
    }
    getColor() {
        return this._color
    }

    setModelo(newModelo) {
        this._modelo = newModelo;
    }
    setTalle(newTalle) {
        this._talle = newTalle;
    }
    setColor(newColor) {
        this._color = newColor;
    }


    verInfo() {
        let info = `ID: ${this.getId()} - Producto: ${this.getNombre()} - Marca: ${this.getMarca()} - Modelo: ${this.getModelo()} - Categoría: ${this.getCategoria()} - Color: ${this.getColor()} - Talle: ${this.getTalle()} - Precio: ${this.getCurrency()} $${this.getPrecio()} - Stock: ${this.getStock()}.`
        return info 
    }
}

class Carrito {
    constructor() {
        this._id = Math.floor(Math.random()*1000000);
        this._productos = {}  
        this._total = 0
        this._currency = "ARS"
    }

    getId(){
        return this._id
    }
    getProductos(){
        return this._productos
    }
    getTotal(){
        this._total = this.calcularTotal()
        return this._total
    }
    getCurrency(){
        return this._currency
    }

    setCurrencyAll(newCurrency){
        this._currency = newCurrency
        const productos = this.getProductos()
        for (let item in productos) {
            productos[item].setCurrency(newCurrency)
        }
    }

    calcularTotal(){
        let newTotal = 0 
        const productos = this.getProductos()
        for (let item in productos) {
            let precioItem = Number(productos[item].getPrecio()) * Number(productos[item].getCantidad())
            newTotal += precioItem
        }
        return newTotal
    }
    
    
        
    
    
}


class Catalogo {
    constructor(){
        this._listadoProductos = {} // No lo agregué como parametro al constructor porque es algo intrínseco a la clase
        // y a ese listado se le pueden agregar productos
    }

    getCatalogo(){
        return this._listadoProductos
    }

    getLength(){
        let size = 0;
        for (let key in this._listadoProductos){
            size++
            
        }
        return size
    }

    showCatalogo(){
        let item
        for (const producto in this.getCatalogo()){
            item = this.getCatalogo()[producto]
            console.log(item)
        }
        if (this.getLength() == 0) {
            alert("Aún no hay productos en el catálogo.")
        }
    }

    

}

function addToCatalogo(Catalogo,Producto) {
    Catalogo.getCatalogo()[Producto.getId()] = Producto
}

function addToCarrito(Carrito,Producto){
    const listaProductos = Carrito.getProductos();
    let stock = Producto.getStock()
    if ((!(Object.keys(listaProductos)).includes(((Producto.getId()).toString()))) && (stock > 0)) {
        listaProductos[Producto.getId()] = Producto;
        Producto.setCantidad(1);
        
        Producto.setStock(stock-1)
        // Si se agrega el producto al carrito, hay que restarle 1 al stock (Solo se puede agregar siempre y cuando haya stock)
        
    } else {
        cantidad = Producto.getCantidad();
        if (stock) {    
            newCantidad = (Producto.getCantidad())+1
            listaProductos[Producto.getId()].setCantidad(newCantidad);
            stock = Producto.getStock()
            Producto.setStock(stock-1)
        };
    };
    
};

function removeFromCatalogo(Catalogo,Producto) {
    let catalogo = Catalogo.getCatalogo()
    
    let producto = Producto.getId()
    
    if ((Object.keys(catalogo)).includes(String(producto))){
        delete catalogo[producto];
        alert(`El producto ${producto} ha sido removido del catálogo.`)
    } else {
        alert(`El producto ${producto} no se encuentra en el catálogo.`)
    }
}

function removeFromCarrito(Carrito,Producto) {
    let carrito = Carrito.getProductos()
    let producto = Producto.getId()
    let cantidad = Producto.getCantidad()
    
    if ((Object.keys(carrito)).includes(String(producto))){
        // Si se elimina el producto del carrito, tiene que volver a aparecer la cantidad de ese producto en stock
        Producto.setStock(cantidad)
        Producto.setCantidad(0)
        delete carrito[producto];
        alert(`El producto ${producto} ha sido removido del carrito.`)
    } else {
        alert(`El producto ${producto} no se encuentra en el carrito.`)
    }
}

function crearProducto() {
    let producto
    rta = (prompt("El producto es una zapatilla? [S/N]: ").toUpperCase())
    while (!(rta == "S") && !(rta == "N")) {
        rta = (prompt("Opción invalida. Solamente puede responder [S/N]: ").toUpperCase())
    }
    if (rta == "S") {
        let nombre = titleCase(prompt("Ingrese el nombre del producto: "));
        let categoria = titleCase(prompt("Ingrese la categoría del producto: "));
        let precio = Number(prompt("Ingrese el precio del producto: "));
        let currency = (prompt("Ingrese el tipo de moneda [USD/ARS]: ").toUpperCase());
        let stock = Number(prompt("Ingrese el stock del producto: "));
        let marca = titleCase(prompt("Ingrese la marca del producto: "));
        let modelo = titleCase(prompt("Ingrese el modelo del producto: "));
        let talle = prompt("Ingrese el talle del producto: ")
        let color = prompt("Ingrese el color del producto: ")

        producto = new Zapatilla(nombre,categoria,precio,currency,stock,marca,modelo,talle,color)
    } else {
        let nombre = titleCase(prompt("Ingrese el nombre del producto: "));
        let categoria = titleCase(prompt("Ingrese la categoría del producto: "));
        let precio = Number(prompt("Ingrese el precio del producto: "));
        let currency = (prompt("Ingrese el tipo de moneda [USD/ARS]: ").toUpperCase());
        let stock = Number(prompt("Ingrese el stock del producto: "));
        producto = new Producto(nombre,categoria,precio,currency,stock)
    }

    return producto
}

/*============================================================================================== */
/*============================= USUARIOS Y CLIENTES ============================================ */
/*============================================================================================== */



const mails = []
const usuarios = {} // Creo un object de usuarios que tenga por claves el nombre de usuario y x valor la clave para validar en un futuro.




class Direccion {
    constructor(calle,altura,codPostal,ciudad,provincia,pais) {
        this._calle = titleCase(calle);
        this._altura = altura;
        this._codPostal = codPostal;
        this._ciudad = titleCase(ciudad);
        this._provincia = titleCase(provincia);
        this._pais = titleCase(pais);
    }

    setCalle(newCalle) {
        this._calle = titleCase(newCalle);
    }
    setAltura(newAltura) {
        this._altura = newAltura;
    }
    setCod_Postal(newCodPostal) {
        this._codPostal = newCodPostal;
    }
    setCiudad(newCiudad) {
        this._ciudad = titleCase(newCiudad);
    }
    setProvincia(newProvincia) {
        this._provincia = titleCase(newProvincia);
    }
    setPais(newPais) {
        this._pais = titleCase(newPais);
    }

    getCalle(){
        return this._calle
    }
    getAltura(){
        return this._altura
    }
    getCodPostal(){
        return this._codPostal
    }
    getCiudad(){
        return this._ciudad
    }
    getProvincia(){
        return this._provincia
    }
    getPais(){
        return this._pais
    }

    verDireccion() {
        let direc = `Calle ${this.getCalle()} ${this.getAltura()}, Cód. Postal: ${this.getCodPostal()}, ${this.getCiudad()}, ${this.getProvincia()}, ${this.getPais()}.`
        return direc
    }
}

class Usuario {
    constructor(username,mail,password,direc) {
        this._id = Math.floor(Math.random()*1000000);
        this._username = username
        this._mail = mail
        this._password = password
        this._direc = direc
        this._carrito = null
    }


    setUsername(newUsername) {
        this._nombre = newUsername;
    }
    setMail(newMail) {
        this._mail = newMail;
    }
    setPassword(newPassword) {
        this._password = newPassword;
    }

    getID(){
        return this._id
    }

    getUsername(){
        return this._username;
    }
    getMail(){
        return this._mail;
    }
    getPassword(){
        return this._password;
    }
    getDireccion(){
        return this._direc;
    }
    getStringDireccion(){
        return this._direc.verDireccion();
    }

    getCarrito(){
        return this._carrito;
    }
    
    // Esto seguramente no debería ir acá sino en otra clase o como parte del sistema de verificación de la página.
    verifyLogin(username, password){
        if (Object.keys(usuarios).includes(username)) {
            if (usuarios[username] == password) {
                alert("Login successful! Bienvenido!")
            } else {
                alert("Contraseña incorrecta.")
            }
        } else {
            alert("Usuario inválido.")
        }
    }

    modifyDireccion(){
        let calle = titleCase(prompt("Ingrese el nombre de su calle: "))
        let altura = prompt("Ingrese la altura: ")
        let codPostal = prompt("Ingrese su Código Postal: ")
        let ciudad = titleCase(prompt("Ingrese su Ciudad: "))
        let prov = titleCase(prompt("Ingrese su Provincia/Estado: "))
        let pais = titleCase(prompt("Ingrese su País: "))
        
        let newDirec = new Direccion(calle,altura,codPostal,ciudad,prov,pais)
        

        return newDirec
    }

    verUsuario() {
        let usuario = `ID: ${this.getID()}, Username: ${this.getUsername()}, Password: ${this.getPassword()} Dirección: ${this.getStringDireccion()}.`

        return usuario
    }
}



function crearUsuario() {
    let username = prompt("Ingrese un nombre de usuario: ")
    let mail = prompt("Ingrese su direccion de e-mail: ")
    let password = prompt("Ingrese una contraseña: ")
    let calle = titleCase(prompt("Ingrese el nombre de su calle: "))
    let altura = prompt("Ingrese la altura: ")
    let codPostal = prompt("Ingrese su Código Postal: ")
    let ciudad = titleCase(prompt("Ingrese su Ciudad: "))
    let prov = titleCase(prompt("Ingrese su Provincia/Estado: "))
    let pais = titleCase(prompt("Ingrese su País: "))
    const direccion = new Direccion(calle,altura,codPostal,ciudad,prov,pais)

    const usuario = new Usuario(username,mail,password,direccion)

    if ((!(mails.includes(usuario.getMail())))) {
        if (!(Object.keys(usuarios).includes(usuario.getUsername()))) {
            mails.push(usuario.getMail()) // Agregamos el id a un array de ids para poder corroborar que no exista ya ese id
            //(Hago esto solo porque el ID se genera con random, y siempre se va a generar uno distinto, entonces capaz el mail ya estaba registrado)
            usuarios[usuario.getUsername()] = usuario.getPassword() // agregamos usuario y password a usuarios
            alert(`Su usuario se ha registrado satisfactoriamente. Su ID es ${usuario.getID()}`)
        } else {
            alert("El username ingresado ya se encuentra registrado en nuestra Base de Datos")
            // Se que esta no es una buena forma de validación, pero por el momento no se requiere algo más complejo
            usuario = "Error al crear el usuario. Username ya se encuentraba registrado"
        }
    } else {
        alert("El mail ingresado ya se encuentra registrado en nuestra Base de Datos")
        // Se que esta no es una buena forma de validación, pero por el momento no se requiere algo más complejo
        usuario = "Error al crear el usuario. El mail ya se encuentraba registrado"
    }

    return usuario
}


class Cliente extends Usuario {
    constructor(username,mail,password, direc, nombre, apellido, fechaNac, carrito=null){
        super(username,mail,password,direc)
        this._nombre = titleCase(nombre);
        this._apellido = titleCase(apellido);
        this._fechaNac = fechaNac;
        this._carrito = carrito
        this._direc = direc

    }

    setNombre(newNombre) {
        this._nombre = newNombre
    }
    setApellido(newApellido) {
        this._apellido = newApellido
    }
    setNewBirthDate() {
        let diaNac = prompt("Ingrese el día de su nacimiento [DD]: ")
        let mesNac = prompt("Ingrese el mes de su nacimiento [MM]: ")
        let anioNac = prompt("Ingrese el año de su nacimiento [YYYY]: ")
        let newFechaNac = `${diaNac}/${mesNac}/${anioNac}`

        this._fechaNac = newFechaNac
    }

    getNombre() {
        return this._nombre
    }
    getApellido() {
        return this._apellido
    }
    getFechaNac() {
        return this._fechaNac
    }

    getDireccion(){
        return this._direc;
    }
    getStringDireccion(){
        return this._direc.verDireccion();
    }

    verCliente() {
        let cliente = `ID: ${this.getID()}, Nombre: ${this.getNombre()}, Apellido: ${this.getApellido()}, Dirección: ${this.getStringDireccion()}, Fecha Nac: ${this.getFechaNac()}, Username: ${this.getUsername()}, Password: ${this.getPassword()}.`

        return cliente
    }

}



function setClienteFromUsuario(user){
    let nombre = titleCase(prompt("Ingrese su nombre: "))
    let apellido = titleCase(prompt("Ingrese su apellido: "))
    let diaNac = prompt("Ingrese el día de su nacimiento [DD]: ")
    let mesNac = prompt("Ingrese el mes de su nacimiento [MM]: ")
    let anioNac = prompt("Ingrese el año de su nacimiento [YYYY]: ")
    let fechaNac = `${diaNac}/${mesNac}/${anioNac}`
    const newCliente = new Cliente(user.getUsername(),user.getMail(),user.getPassword(),user.getDireccion(),nombre,apellido,fechaNac,user.getCarrito())

    return newCliente
}




/*============================================================================================== */
/*================================= PSEUDO DATABASE ============================================ */
/*============================================================================================== */


const pseudoClientesDB = []

function addClientToDB(cliente) {
    let idCliente = cliente.getID()
    let incluido = false
    const nuevoCliente = {}
    for (let lineaCliente in pseudoClientesDB){
        if (Object.keys(lineaCliente).includes(cliente.getUsername())) {
            incluido = true
            alert("El usuario ya se encuentra registrado en nuestra Base de Datos.")
        } 
    }
    if (incluido == false) {
        nuevoCliente[idCliente] = {
            id:idCliente,
            username:cliente.getUsername(),
            mail:cliente.getMail(),
            password:cliente.getPassword(),
            direc:cliente.getDireccion(),
            nombre:cliente.getNombre(),
            apellido:cliente.getApellido(),
            fechaNac:cliente.getFechaNac(),
            carrito:cliente.getCarrito()
        } 

        pseudoClientesDB.push(nuevoCliente)
    }
}


function verDataBase() {
    for (const objPersona of pseudoClientesDB){
        console.log(objPersona)
    }
}


// ================= PARA ORDENAR UN ARRAY =============================================== 
// =============(ESTA SECCiÓN ES PARA LA ENTREGA DE "ORDENAR UN ARRAY"):


function ObjKeysToOrderedArray(obj,order="ASC") {
    const newArrNums = []
    for (let key in Object.keys(obj)) {
        newArrNums.push(Number(Object.keys(obj[key])))
    }
    if (order == "ASC") {
        newArrNums.sort((a,b) => a-b)
    } else if (order == "DESC") {
        newArrNums.sort((a,b) => b-a)
    }
    return newArrNums
}


//console.log(newArrOrd)

function sortObj(obj, order="ASC") {
    const newArrOrd = ObjKeysToOrderedArray(obj,order)
    const arrayNuevo = []
    while (newArrOrd.length > 0) {
        for (i in Object.keys(obj)) {
            if (Object.keys(obj[i]) == newArrOrd[0]) {
                arrayNuevo.push(obj[i])
                newArrOrd.splice(0,1)
            }

        }
    }
    return arrayNuevo

}



// ========================================================================================
// ========================================================================================
// ========================================================================================

// FUNCIONES buscarID y eliminarCliente AUN NO TESTEADAS (FALTAN RETOCAR)
function buscarID(id) {
    let usuarioBuscado = null
    let encontrado = false
    for (let cliente of pseudoClientesDB) {
        if (Object.keys(cliente).includes(id)){
            encontrado = true
            usuarioBuscado = cliente[id]
            break
        }
    }
    if (!(encontrado)) {
        usuarioBuscado = `No existe ningún usuario con el ID ${id}`
    }

    return usuarioBuscado
}


function eliminarCliente(username) {
    let encontrado = false
    for (let cliente in pseudoClientesDB) {
        let id = Object.keys(pseudoClientesDB[cliente])
        if (Object.keys(id).includes(username)){
            pseudoClientesDB.splice(cliente,1)
            encontrado = true
            break
        }
    }
    if (!(encontrado)) {
        usuarioBuscado = `No existe ningún usuario con el username ${username}`
    }
}

// ===================================================================================================




function main() {
    const usuario1 = crearUsuario()
    console.log(usuario1.getStringDireccion())
    
    const usuario2 = crearUsuario()
    console.log("USUARIO 1:\n")
    console.log(usuario1.verUsuario())
    console.log("USUARIO 2:\n")
    console.log(usuario2.verUsuario())

    const cliente1 = setClienteFromUsuario(usuario1)
    const cliente2 = setClienteFromUsuario(usuario2)
    console.log("USUARIO 1 AHORA CLIENTE1:\n")
    console.log(cliente1.verCliente())
    console.log("USUARIO 2 AHORA CLIENTE2:\n")
    console.log(cliente2.verCliente())
    const usuario3 = crearUsuario()
    const cliente3 = setClienteFromUsuario(usuario3)
    addClientToDB(cliente1)
    addClientToDB(cliente2)
    addClientToDB(cliente3)
    console.log("VEMOS LA BASE DE DATOS:\n")
    verDataBase()
    console.log("ARRAY DE OBJETOS ORDENADO (BASE DE DATOS ORDENADA):")
    console.log(sortObj(pseudoClientesDB,"DESC")) // SE PUEDE PONER order="ASC" o "DESC" según se desee
    /*console.log("DIRECCION CLIENTE 1:\n")
    console.log(cliente1.getStringDireccion())
    cliente1.modifyDireccion()
    console.log("NUEVA DIREC CLIENTE 1:\n")
    console.log(cliente1.getStringDireccion())
    console.log("FECHA NAC CLIENTE 1:\n")
    console.log(cliente1.getFechaNac())
    cliente1.setNewBirthDate()
    console.log("NUEVA FECHA NAC CLIENTE 1:\n")
    console.log(cliente1.getFechaNac())*/

    /* ESTAS LINEAS COMENTADAS ABAJO SON LO MISMO QUE LA ENTREGA ANTERIOR, PERO NO TENÍA SENTIDO DEJARLO HABILITADO DE NUEVO. */
    /*
    const zapatilla1 = crearProducto()
    console.log(zapatilla1.verInfo())


    const catalogo = new Catalogo()
    const carrito = new Carrito() // Debería crear una clase Usuario que tenga dentro del constructor un objeto Carrito

    const zapatilla2 = crearProducto()
    console.log(zapatilla2.verInfo())
    //new Zapatilla("Adidas XR150","Calzado Deportivo",21000,"USD",3,"Adidas","XR150",42,"Blanco")
    addToCatalogo(catalogo,zapatilla1)
    addToCatalogo(catalogo,zapatilla2)

    console.log(catalogo.getCatalogo())


    console.log("SHOW CATALOGO:")
    catalogo.showCatalogo()

    

    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla2)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1)
    addToCarrito(carrito, zapatilla1) // Notese que NO se agrega una nueva al carrito, ya que supera el STOCK que posee esa zapatilla
    addToCarrito(carrito, zapatilla2)
    console.log("SHOW CARRITO:")
    console.log(carrito.getProductos())
    carrito.setCurrencyAll("USD")
    console.log(`TOTAL: ${carrito.getCurrency()} $${carrito.getTotal()}.`)
    console.log("SHOW CATALOGO:")
    console.log(catalogo.getCatalogo())
    */
}

main()



