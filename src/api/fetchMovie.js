async function fetchMovie(endpoint) {
    try {
        const API_KEY = import.meta.env.VITE_API_KEY
        const url = `https://api.themoviedb.org/3/${endpoint}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

export default fetchMovie