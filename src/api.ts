
const API_KEY = "0a11bdfdb82ee6f7527863b4b1a8ef52";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path : string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMediaResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results : number;
}

export function getNowPlayingMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json());
}

export function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(response => response.json());
}

export function getTopRatedMovies() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(response => response.json());
}

export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(response => response.json());
}

export function getAiringTodayTvShows() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`).then((response) =>
      response.json()
    );
}

export function getOnTheAirTvShows() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`).then((response) =>
      response.json()
    );
}

export function getPopularTvShows() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`).then((response) =>
      response.json()
    );
}

export function getTopRatedTvShows() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`).then((response) =>
      response.json()
    );
}