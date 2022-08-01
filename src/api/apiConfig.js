const apiConfig = {
    baseUrl: 'http://api.themoviedb.org/3/',
    apiKey: 'd0340041cca77fd98e3136206d43e265',
    originalImage: (path) => `https://image.tmdb.org/t/p/original/${path}`,
    w500Image: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};

export default apiConfig;
