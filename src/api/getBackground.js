import fetchMovie from "./fetchMovie";

async function getBackground() {
  try {
    const { results } = await fetchMovie('movie/now_playing');

    const backdrops = [];
    results.forEach(backdrop => {
      backdrops[backdrops.length] = `https://image.tmdb.org/t/p/original${backdrop['backdrop_path']}`
    });

    return backdrops;
  } catch (error) {
    if (error instanceof Error) return error.message;
  }
}

export default getBackground