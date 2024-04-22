let input = document.querySelector("#input");
let btn = document.querySelector("#button");
let movieList = document.querySelector("#movieList");

const API_KEY = "api_key=b96be90fb5eb89b775dfd1f4c66779f1";
const BASE_URL = "https://api.themoviedb.org/3";
const discoverURL = `${BASE_URL}/discover/movie?${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
let data;

const getMovies = async() => {
  await axios.get(
    discoverURL
  )
  .then((res) => {
    data = res.data.results;
    console.log(data);
    if (data && data.length > 0){
      showMovies(data);
    } else{
      movieList.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
    }
  })
  .catch((error) => console.error(`Error: ${error}`));
};


const showMovies = (data) =>{
   movieList.innerHTML = data.map((movie) => {
    return `<div class="movie-card">
        <img src="${
        movie.poster_path
          ? IMG_URL + movie.poster_path
          : "http://via.placeholder.com/1080x1580"
      }" alt="${movie.title}" class="poster">
        <p class="description">
          Movie Overview:
          ${movie.overview}
        </p>
        <div class="movie-info">
          <div class="info-text">
            <span class="badge badge-danger" id="tag1">${movie.genre_ids[0]}</span>
            <span class="badge badge-warning" id="tag2">${movie.genre_ids[1]}</span>
            <span class="badge badge-danger"id="tag3">${movie.genre_ids[2]}</span>
            <h4 class="title" id="title">
              ${movie.original_title}
            </h4>
            <span class="badge badge-pill badge-primary">${movie.original_language.toUpperCase()}</span>
            <div class="rating" id="rating">
            <i class="fa-solid fa-star"></i> ${movie.vote_average}/10
            </div>
            <span class="note">Rated  by ${movie.vote_count} people</span>
          </div>
        </div>
    </div>`
  }).join("");
}


const searchMovies = async() => {
  let searchInput = input.value.toLowerCase();
  const searchURL = `${BASE_URL}/search/movie?${API_KEY}&query=${searchInput}`;

  await axios.get(
    searchURL
  )
  .then((res) => {
    data = res.data.results;
    console.log(res);
    if (data && data.length > 0){
      showMovies(data);
    } else{
      movieList.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
    }
  })
  .catch((error) => console.error(`Error: ${error}`));
};


btn.addEventListener("click", searchMovies);
input.addEventListener("keypress", function(event){
  if(event.key ==="Enter") {
    searchMovies();
  }
});

(async () => {
  await getMovies(discoverURL);
})();





// function filterMovies(){
//   const search = input.value.toLowerCase();
//   if (search === "") {
//     getMovies();
//   } else {
//     const searchedMovies = data.filter((movie)=>
//     movie.original_title.toLowerCase().includes(search));
//     showMovies(searchedMovies);

//   }
// }
// input.addEventListener("keyup", filterMovies);