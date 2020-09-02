const API_KEY = 'c3577630d4a810712372eb1056709f36';

const API_BASE_URL = 'https://api.themoviedb.org/3';

/*
    Originais da Netflix    
    Recomendados
    Em alta
    Ação
    Comédia
    Terror
    Romance
    Documentários    
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE_URL}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },

    getOriginals: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },

    getCategoriesMovies: async () => {
        return [
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },

    getMyList: async () => {
        return [
            {
                slug: 'now_playing',
                title: 'Minha Lista',
                items: await basicFetch(`/movie/popular?api_key=${API_KEY}&language=pt-BR&page=2`)
            }
        ]
    },

    getContinueWatching: async () => {
        return [
            {
                slug: 'now_playing',
                title: 'Continue Assitindo',
                items: await basicFetch(`/movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=2`)
            }
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }

        return info;
    }
}