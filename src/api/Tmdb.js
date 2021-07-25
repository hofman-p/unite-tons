import { api } from 'boot/axios';

export default {
  async getTrendingMovies() {
    const movies = await api.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    return movies.data.results;
  },
};
