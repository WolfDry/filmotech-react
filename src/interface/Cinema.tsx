import {Movie} from "./Movie.tsx";

export type Cinema = {
    id: Number
    name: String,
    pc: String,
    city: String,
    screen: Number,
    seat: Number,
    latitude: String,
    longitude: String,
    movies: Array<Movie>
}