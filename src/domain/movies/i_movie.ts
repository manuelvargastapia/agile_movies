import {
    MovieBannerUrl,
    MovieCoverUrl,
    MovieId,
    MovieOverview,
    MovieTitle,
} from '../core/value_objects';

export interface IMovie {
    movieId: MovieId;
    movieCoverUrl: MovieCoverUrl;
    movieBannerUrl: MovieBannerUrl;
    movieTitle: MovieTitle;
    movieOverview: MovieOverview;
}
