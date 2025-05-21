import fetchMovie from "./fetchMovie";

async function getCastList(id) {
    try {
        const { cast, crew } = await fetchMovie(`movie/${id}/credits`);
        const actors = [];
        let director;
        cast.forEach(e => {
            if (e.known_for_department === "Acting") actors[actors.length] = e.name;
        })
        crew.forEach(e => {
            if (e.job === "Director") director = e.name;
        })
        return { actors, director };
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

export default getCastList