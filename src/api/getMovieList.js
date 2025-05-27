import fetchMovie from "./fetchMovie";
import getGenreList from "./getGenreList";

/**
 * 
 * @param {string} endpoint
 * movie/now_playing;
 * movie/popular;
 * movie/top_rated;
 * movie/upcoming;
 * trending/movie/day;
 * discover/movie;
 * 
 * @returns {Array} movie list with: genre, id, img, title
 */

async function getMovieList(endpoint) {
  try {
    const { results } = await fetchMovie(endpoint);
    const dataMovie = [];
    results.forEach(el => {
      dataMovie[dataMovie.length] = { genre: el['genre_ids'], id: el.id, img: `https://image.tmdb.org/t/p/original/${el['poster_path']}`, release: el['release_date'], title: el.title }
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

export default getMovieList