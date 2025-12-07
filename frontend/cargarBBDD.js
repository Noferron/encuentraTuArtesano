URL_API = "http://localhost:3000/api";

async function cargarDatos(nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo){
    try{
        const respuesta = await fetch (`${URL_API}/productos`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo})
        });

        const datos= await respuesta.json();
        console.log("Respuesta productos:", respuesta.status, datos);

        if(respuesta.ok){
            
            alert(`Producto creado, ${datos.productoId}`);
        }
        else{
            alert(datos.message || "Error al crear producto, fallo de comunicación del front y el backend");
        }
    }catch (error){
        console.error("Error al guardar los datos", error);
        alert("Error al guardar el producto");
    }
}

//Falta crear la funcion que traiga los datos del formulario hacia la función cargarDatos

function crearProducto(){
    const formulario = document.getElementById("formulario");


    formulario.addEventListener("submit", async (e)=>{ 
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const imagen_url = document.getElementById("imagen_url").value;
        const categoria = document.getElementById("categoria").value;
        const precio = document.getElementById("precio").value;
        const stock = document.getElementById("stock").value;
        const comprar_url = document.getElementById("comprar_url").value;
        const activo = document.getElementById("activo").checked;
        await cargarDatos(nombre,descripcion,imagen_url,categoria,precio,stock,comprar_url,activo);

        formulario.reset();
    })
}

document.addEventListener("DOMContentLoaded", () => {
  crearProducto();
});