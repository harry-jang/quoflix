
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

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json());
}
