let pagina = 1;

const btnAnterior = document.getElementById("BtnAnterior");
const btnSiguiente = document.getElementById("BtnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 10000) {
    pagina++;
    
    CargarPelis();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    CargarPelis();
  }
});



const CargarPelis = async () => {
  try {
    const RespuestaApi = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1cd99cc085e2a822e984950bece31805&language=es-MX&page=${pagina}`
    );
    

    if (RespuestaApi.status === 200) {
      const data = await RespuestaApi.json();

      let peliculas = "";

      data.results.forEach((element) => {
        peliculas += `
          <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${element.poster_path}">
            <h3 class="titulo">${element.title}</h3>
          </div>
        `;
        

        document.getElementById("contenedor").innerHTML = peliculas;
        document.getElementById("paginaActual").innerHTML = `Pagina ${pagina}`;
      });
    } else if (RespuestaApi.status === 401) {
      console.log("No tienes permiso para acceder a la API");
    } else if (RespuestaApi.status === 404) {
      console.log("Pelicula no encontrada");
    }
  } catch (error) {
    console.log(error);
  }
};

CargarPelis();


