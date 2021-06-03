import { MovieCoverUrl, MovieId, MovieTitle } from '../core/value_objects';

export class PopularMovie {
    movieId: MovieId;
    movieCoverUrl: MovieCoverUrl;
    movieTitle: MovieTitle;

    constructor(
        movieId: MovieId,
        movieCoverUrl: MovieCoverUrl,
        movieTitle: MovieTitle,
    ) {
        this.movieId = movieId;
        this.movieCoverUrl = movieCoverUrl;
        this.movieTitle = movieTitle;
    }
}
