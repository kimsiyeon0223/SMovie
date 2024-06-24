// TMDb API 키와 URL 설정
const API_KEY = "faa8c28c41bbd8a91fcf6bc695828f93";
const API_URL = "https://api.themoviedb.org/3";

// HTML 문서가 완전히 로드된 후 실행할 코드를 설정
document.addEventListener("DOMContentLoaded", () => {
  // 검색 폼 요소를 ID로 가져옴
  const searchForm = document.getElementById("search-form");

  // 검색 폼에 'submit' 이벤트 리스너 추가
  searchForm.addEventListener("submit", (event) => {
    // 기본 폼 제출 동작(페이지 새로고침)을 방지
    event.preventDefault();

    // 입력 필드에서 검색어를 가져옴
    const query = document.getElementById("search-input").value;

    // 검색어가 비어 있지 않으면 searchMovies 함수 호출
    if (query.trim() !== "") {
      searchMovies(query);
    }
  });
});

// 검색어를 기반으로 영화를 검색하는 비동기 함수
async function searchMovies(query) {
  try {
    // 검색어를 포함한 TMDb API에 GET 요청을 보냄
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}&language=ko-KR`,
    );

    // API의 JSON 응답을 파싱
    const data = await response.json();

    // API 응답 결과를 displayMovies 함수에 전달
    displayMovies(data.results);
  } catch (error) {
    // 데이터를 불러오는 중 오류가 발생하면 콘솔에 오류 로그를 출력
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
}

// 웹 페이지에 영화 리스트를 표시하는 함수
function displayMovies(movies) {
  // 영화 리스트 컨테이너 요소를 ID로 가져옴
  const movieList = document.getElementById("movie-list");

  // 컨테이너의 기존 내용을 지움
  movieList.innerHTML = "";

  // 각 영화에 대해 반복
  movies.forEach((movie) => {
    // 각 영화 카드를 위한 새로운 div 요소 생성
    const movieCard = document.createElement("div");

    // 영화 카드에 스타일을 적용하기 위한 CSS 클래스 추가
    movieCard.classList.add("movie-card");

    // 영화 카드의 내부 HTML을 영화 정보로 설정
    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>평점: ${movie.vote_average}</p>
        <p>발매일: ${movie.release_date}</p>
    `;

    // 생성된 영화 카드를 영화 리스트 컨테이너에 추가
    movieList.appendChild(movieCard);
  });
}
