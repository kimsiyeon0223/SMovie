const API_KEY = "faa8c28c41bbd8a91fcf6bc695828f93";
const API_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = document.getElementById("search-input").value;
    if (query.trim() !== "") {
      searchMovies(query);
    }
  });
});

async function searchMovies(query) {
  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}&language=ko-KR`,
    );
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
}

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>평점: ${movie.vote_average}</p>
        <p>발매일: ${movie.release_date}</p>
    `;
    movieList.appendChild(movieCard);
  });
}
