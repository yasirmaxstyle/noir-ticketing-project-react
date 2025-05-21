import fetchMovie from "./fetchMovie";

async function getGenreList() {
    try {
        const { genres } = await fetchMovie('genre/movie/list');
        return genres;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

export default getGenreList