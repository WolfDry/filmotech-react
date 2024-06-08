
export type Actor = {
    id: number,
    name: string,
    profile_path: string,
    character: string,
    external_id: number,
    total_results: number,
    total_pages: number,
    movies: null | string,
    tv: null | string,
    known_for: string,
    popularity: number,
}