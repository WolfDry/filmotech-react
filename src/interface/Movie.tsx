import {Genre} from "./Genre.tsx";
import {Production} from "./Production.tsx";

export type Movie = {
    imdb_id: string;
    production_companies: Production[],
    tagline: string,
    id: number
    title: string,
    total_pages: number,
    total_results: number,
    poster_path: string,
    vote_average: number,
    release_date: string,
    genre_names: string[],
    overview: string,
    vote_count: number,
    genres: Genre[],
    external_id: number,
    cinemas: null | string,
}