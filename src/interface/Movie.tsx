export type Movie = {
    id: number
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    genre_names: string[],
    overview: string,
    external_id: number
}