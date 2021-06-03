import { MovieCoverUrl, MovieId } from '../core/value_objects';

export class NowPlayingMovie {
    movieId: MovieId;
    movieCoverUrl: MovieCoverUrl;

    constructor(movieId: MovieId, movieCoverUrl: MovieCoverUrl) {
        this.movieId = movieId;
        this.movieCoverUrl = movieCoverUrl;
    }
}
