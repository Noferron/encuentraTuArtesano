URL_API = "http://localhost:3000/api";


async function cargarArtesanos() {
    try{
        //Traemos los datos del back
        const respuesta = await fetch (`${URL_API}/artesanos`);
        //Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        //Verificamos si fue exitosa la petición
        if(respuesta.ok){
            mostrarArtesanos(datos.data);
        }
        else{
            console.error ("Error al cargar artesanos");
        }
    } catch (error){
        console.error("Error de conexión:",error);
    }
}

// Función para mostrar los productos 

function mostrarArtesanos(lista){
    const contenedor = document.getElementById("artesanos");

    // Creamos el HTML para cada producto
    contenedor.innerHTML = lista.map(presentacion=> `
        <div class="product-card">
           <a href="${presentacion.tienda_url}"> <img src="${presentacion.logo_url}" class="product-image" alt="${presentacion.nombre}"></a>
            <p>${presentacion.descripcion}</p>
            <p><strong>${presentacion.localizacion}</strong></p>
            <a href="${presentacion.instagram_url}"><img class ="logo" src="/assets/intagram.png"></a>
            <a href="${presentacion.facebook_url}"><img class ="logo" src="/assets/facebook.webp"></a>
            <p> ${presentacion.categoria}</p>
        </div>
        `).join ('');
}

// 🚀 Cuando la página termine de cargar, ejecutamos la función
document.addEventListener("DOMContentLoaded", () => {
    cargarArtesanos();
});
