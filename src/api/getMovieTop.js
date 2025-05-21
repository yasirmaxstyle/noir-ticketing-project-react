import fetchMovie from "./fetchMovie";
import getGenreList from "./getGenreList";

async function getMovieTop() {
    try {
        const { results } = await fetchMovie('movie/top_rated');
        const dataMovie = [];
        results.forEach(el => {
            dataMovie[dataMovie.length] = { genre: el['genre_ids'], id: el.id, img: `https://image.tmdb.org/t/p/original/${el['poster_path']}`, title: el.title }
        });
        const genres = await getGenreList();
        dataMovie.map(e => {
            const genre = []
            genres.forEach(g => {
                if (e.genre.includes(g.id)) genre[genre.length] = g.name;
            })
            e.genre = genre
        })

        return dataMovie;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

export default getMovieTop