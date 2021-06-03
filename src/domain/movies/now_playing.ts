import {
    MovieBannerUrl,
    MovieCoverUrl,
    MovieId,
    MovieOverview,
    MovieTitle,
} from '../core/value_objects';
import { IMovie } from './i_movie';

export class NowPlayingMovie implements IMovie {
    movieId: MovieId;
    movieCoverUrl: MovieCoverUrl;
    movieBannerUrl: MovieBannerUrl;
    movieTitle: MovieTitle;
    movieOverview: MovieOverview;

    constructor(
        movieId: MovieId,
        movieCoverUrl: MovieCoverUrl,
        movieBannerUrl: MovieBannerUrl,
        movieTitle: MovieTitle,
        movieOverview: MovieOverview,
    ) {
        this.movieId = movieId;
        this.movieCoverUrl = movieCoverUrl;
        this.movieBannerUrl = movieBannerUrl;
        this.movieTitle = movieTitle;
        this.movieOverview = movieOverview;
    }
}
