


const arrObjetos = [
    {
        172247: {
        id: 172247, username: "juan", mail: "juan@carlos.com",password: "fsgwrg",direc: {calle: "Riobamba", altura: "2212", codPostal: "1650",ciudad: "San Martin",provincia: "Buenos Aires",pais: "Argentina"},nombre: "Juan",apellido: "Carlardo",fechaNac: "09/09/1992",carrito: "null"}
    },{
        65547: {
            id: 172247, username: "juan", mail: "juan@carlos.com",password: "fsgwrg",direc: {calle: "Riobamba", altura: "2212", codPostal: "1650",ciudad: "San Martin",provincia: "Buenos Aires",pais: "Argentina"},nombre: "Juan",apellido: "Carlardo",fechaNac: "09/09/1992",carrito: "null"}
    },{
        1265547: {
            id: 172247, username: "juan", mail: "juan@carlos.com",password: "fsgwrg",direc: {calle: "Riobamba", altura: "2212", codPostal: "1650",ciudad: "San Martin",provincia: "Buenos Aires",pais: "Argentina"},nombre: "Juan",apellido: "Carlardo",fechaNac: "09/09/1992",carrito: "null"}}]



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
console.log("NUEVO ARRAY:")
console.log(sortObj(arrObjetos,"DESC"))

