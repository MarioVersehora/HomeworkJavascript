let currPage = 1;
let trendingMoviesPage = 1;
let moviesGenresPage = 1;

let moviesGenresActivated = 0;
let trendingMoviesActivated = 0;
let currActivated = 1;

// ex 2 + ex 3

const select = document.querySelector('#dd-menu')

fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f49caee5f0e1578e8f3090b273f9cd9d&language=en-US')
  .then(response => response.json())
  .then(data => {
    data.genres.forEach(genre => render(genre))
  });


function render(genre) {

  const opt = document.createElement('p');
  opt.value = genre.id;
  const content = document.createTextNode(`${genre.name}`);
  opt.appendChild(content);
  select.appendChild(opt);


  opt.addEventListener("click", () => displayMoviesCorrespondingGenre(genre.id));


}

function displayMoviesCorrespondingGenre(genreId) {
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=f49caee5f0e1578e8f3090b273f9cd9d&with_genres=' + genreId)
    .then(response => response.json())
    .then(movies => {

      document.getElementById('moviesList').innerHTML = '';

      for (movie in movies.results) {

        document.getElementById('moviesList').innerHTML +=
          createCard("https://image.tmdb.org/t/p/original" + movies.results[movie].poster_path, movies.results[movie].title, movies.results[movie].release_date, movies.results[movie].original_language, movies.results[movie].overview);

      }
    });

}


function createCard(image, title, releaseDate, language, overview) {

  return `<div class="card" style="width: 550px; margin-top: 50px;">
        <img class="card-img-top" src="${image}" alt="Sorry! We do not have an image to display for this movie. We strongly recommend that you look elsewhere." style="height: 400px; text-align: center; color: darkgray;">

          <div class="card-body">
            <h4 class="card-title">
              <p>${title}</p>
            </h4>

            <p class="card-text">
              <p style="font-weight: bold;"> Release date: ${releaseDate} </p>
              <p style="font-weight: bold;"> Language: ${language} </p>
              <span style="font-weight: bold;"> Overview: </span> ${overview}

            </p>


            <a href="#" class="btn btn-primary" id="card-button">See Movie</a>

          </div>

      </div>`

}

// ex 4


function displayTrendingMovies(page = 1) {
  trendingMoviesActivated = 1;
  currActivated = 0;
  fetch('https://api.themoviedb.org/3/trending/all/day?api_key=f49caee5f0e1578e8f3090b273f9cd9d&page=' + page)
    .then(response => response.json())
    .then(movies => {

      document.getElementById('moviesList').innerHTML = '';

      for (movie in movies.results) {

        let movieName = movies.results[movie].title;
        let releaseDate = movies.results[movie].release_date;

        if (movieName === undefined) {
          movieName = movies.results[movie].name;
        }

        if (releaseDate === undefined) {
          releaseDate = movies.results[movie].first_air_date;
        }

        document.getElementById('moviesList').innerHTML +=
          createCard("https://image.tmdb.org/t/p/original" + movies.results[movie].poster_path, movieName, releaseDate, movies.results[movie].original_language, movies.results[movie].overview);

      }
    });

}


document.getElementById("button").addEventListener("click", () => displayTrendingMovies());


// ex 1 + ex 5

function displayMoviesFrom2022AfterPageLoadedWithPage(page) {
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=f49caee5f0e1578e8f3090b273f9cd9d&year=2022&page=' + page)
    .then(response => response.json())
    .then(movies => {

      document.getElementById('moviesList').innerHTML = '';

      for (movie in movies.results) {

        document.getElementById('moviesList').innerHTML +=
          createCard("https://image.tmdb.org/t/p/original" + movies.results[movie].poster_path, movies.results[movie].title, movies.results[movie].release_date, movies.results[movie].original_language, movies.results[movie].overview);

      }

    });

}

function nextPage() {

  document.getElementById("prevButton").style.visibility = "visible";

  if (trendingMoviesActivated == 1) {
    trendingMoviesPage++;
    displayTrendingMovies(trendingMoviesPage);
    moviesGenresPage = 1;
    moviesGenresActivated = 0;

    currPage = 1;
    currActivated = 0;

  } else if (currActivated == 1) {
    currPage++;
    displayMoviesFrom2022AfterPageLoadedWithPage(currPage);
    moviesGenresPage = 1;
    moviesGenresActivated = 0;

    trendingMoviesPage = 1;
    trendingMoviesActivated = 0;

  }

}

function previousPage() {

  if (trendingMoviesActivated == 1) {
    trendingMoviesPage--;
    displayTrendingMovies(trendingMoviesPage);
    moviesGenresPage = 1;
    moviesGenresActivated = 0;

    currPage = 1;
    currActivated = 0;

  } else if (currActivated == 1) {
    currPage--;
    displayMoviesFrom2022AfterPageLoadedWithPage(currPage);
    moviesGenresPage = 1;
    moviesGenresActivated = 0;

    trendingMoviesPage = 1;
    trendingMoviesActivated = 0;
  }

  if ((currPage == 1 && currActivated == 1) || (trendingMoviesPage == 1 && trendingMoviesActivated == 1))
    document.getElementById("prevButton").style.visibility = "hidden";

}

document.getElementById("prevButton").style.visibility = "hidden";
document.querySelector('#nextButton').addEventListener('click', nextPage);
document.querySelector('#prevButton').addEventListener('click', previousPage);



