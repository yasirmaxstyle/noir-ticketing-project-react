import fetchMovie from "./fetchMovie";
import getCastList from "./getCastList.js";

async function getMovieDetail(id) {
    try {
        const { title, genres, release_date, runtime, overview, poster_path, backdrop_path } = await fetchMovie(`movie/${id}`);
        const genre = [];
        genres.forEach(e => {
            genre[genre.length] = e.name;
        });
        const { actors, director } = await getCastList(id);
        return { title, genre, release_date, runtime, overview, poster_path, backdrop_path, actors, director };
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

getMovieDetail('574475')
export default getMovieDetail