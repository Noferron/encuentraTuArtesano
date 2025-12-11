const URL_API = "http://localhost:3000/api";

//-----------------------------------Funciones con método POST-----------------------------------------------------------

async function cargarDatos(nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo,artesanoId){
    try{
        const respuesta = await fetch (`${URL_API}/productos`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo, artesanoId})
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

// Crear presentacion

async function crearPresentacion(nombre,descripcion,localizacion,categoria,instagram_url,tienda_url,facebook_url,comentarios_url,logo_url, activo,artesanoId){
    try{
        const respuesta = await fetch (`${URL_API}/artesanos`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nombre,descripcion,localizacion,categoria,instagram_url,tienda_url,facebook_url,comentarios_url,logo_url, activo,artesanoId})
        });

        const datos= await respuesta.json();
        console.log("Presentación creada:", respuesta.status, datos);

        if(respuesta.ok){
            
            alert(`🎉Presentación creada, ${datos.artesanoId}`);
        }
        else{
            alert(datos.message || "❌ Error al crear presentación, fallo de comunicación del front y el backend");
        }
    }catch (error){
        console.error("❌ Error al guardar los datos", error);
        alert("❌ Error al guardar el producto");
    }
}

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
        const activo = document.getElementById("activo").checked? 1 : 0;
        
        const user = JSON.parse(localStorage.getItem("user"));
        const artesanoId = user?.id;


        await cargarDatos(nombre,descripcion,imagen_url,categoria,precio,stock,comprar_url,activo,artesanoId);

        formulario.reset();
    })
}

function formularioPresentacion(){

    
    const formularioP = document.getElementById("formularioPresentacion");


    formularioP.addEventListener("submit", async (e)=>{ 
        e.preventDefault();
        const nombre = document.getElementById("nombreP").value;
        const descripcion = document.getElementById("descripcionP").value;
        const categoria = document.getElementById("categoriaP").value;
        const localizacion = document.getElementById("localizacion").value;
        const instagram_url = document.getElementById("instagram_url").value;
        const tienda_url = document.getElementById("tienda_url").value;
        const facebook_url = document.getElementById("facebook_url").value;
        const comentarios_url = document.getElementById("comentarios_url").value;
        const logo_url = document.getElementById("logo_url").value;
        const activo = document.getElementById("activoP").checked? 1 : 0;
        
        const user = JSON.parse(localStorage.getItem("user"));
        const artesanoId = user?.id;


        await crearPresentacion(nombre,descripcion,localizacion,categoria,instagram_url,tienda_url,facebook_url,comentarios_url,logo_url, activo,artesanoId);

        console.log({nombre,descripcion,localizacion,categoria,instagram_url,tienda_url,facebook_url,comentarios_url,logo_url, activo,artesanoId});
        formularioP.reset();
    })
}

//---------------------------------------------Funciones con método PUT---------------------------------------------
async function actualizarPresentacion(id, datosActualizados) {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/artesanos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosActualizados)
        });

        const data = await respuesta.json();
        console.log(data);

        if (respuesta.ok) {
            alert("Presentación actualizada correctamente");
        } else {
            alert("Error al actualizar presentación");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
}
document.getElementById("editar").addEventListener("click",async() =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id;
    
    const respuesta = await fetch(`${URL_API}/artesanos/${id}`);
    const json = await respuesta.json();
    const presentacion = json.data;

    const formularioModificacion = document.getElementById("artesanos");
    formularioModificacion.innerHTML=  `
        <div class="product-card">
            <form id="formularioPresentacion">

                <label>Enlace de tu logo</label>
                <input type="url" id="logo_url" value="${presentacion.logo_url}">

                <label>Nombre</label>
                <input type="text" id="nombreP" value="${presentacion.nombre}" required>

                <label>Presentación</label>
                <input type="text" id="descripcionP" value="${presentacion.descripcion}" required>

                <label>Dirección</label>
                <input type="text" id="localizacion" value="${presentacion.localizacion}">

                <label>Categoría</label>
                <input type="text" id="categoriaP" value="${presentacion.categoria}" required>

                <label>Instagram</label>
                <input type="url" id="instagram_url" value="${presentacion.instagram_url}">

                <label>Tienda</label>
                <input type="url" id="tienda_url" value="${presentacion.tienda_url}">

                <label>Facebook</label>
                <input type="url" id="facebook_url" value="${presentacion.facebook_url}">

                <label>Comentarios</label>
                <input type="url" id="comentarios_url" value="${presentacion.comentarios_url}">

                <label>¿Activo?</label>
                <input type="checkbox" id="activoP" ${presentacion.activo ? "checked" : ""}>

                <br><br>
                <button type="button" id="guardarCambios">Guardar cambios</button>

            </form>
        </div>
    `;

    document.getElementById("guardarCambios").addEventListener("click", () => {
  
        const datosActualizados = {
            nombre: document.getElementById("nombreP").value,
            descripcion: document.getElementById("descripcionP").value,
            categoria: document.getElementById("categoriaP").value,
            localizacion: document.getElementById("localizacion").value,
            instagram_url: document.getElementById("instagram_url").value,
            tienda_url: document.getElementById("tienda_url").value,
            facebook_url: document.getElementById("facebook_url").value,
            comentarios_url: document.getElementById("comentarios_url").value,
            logo_url: document.getElementById("logo_url").value,
            activo: document.getElementById("activoP").checked? 1 : 0,
            
        };

        actualizarPresentacionFront(id, datosActualizados);
    });
});
//--------------------Mostrar los datos y cómo se ven-------------------------------
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
            <button type="submit" id="editar">✏ Editar presentación </button>
        </div>
        `).join ('');
}

// 🚀 Cuando la página termine de cargar, ejecutamos la función
document.addEventListener("DOMContentLoaded", () => {
    cargarArtesanos();
});



document.addEventListener("DOMContentLoaded", () => {
  crearProducto();
  formularioPresentacion();
});