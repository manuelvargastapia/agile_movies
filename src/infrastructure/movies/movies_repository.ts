import { Actor } from '../../domain/movies/actor';
import {
    MovieBannerUrl,
    MovieCoverUrl,
    MovieId,
    MovieOverview,
    MovieTitle,
    Token,
} from '../../domain/core/value_objects';
import {
    MovieFailure,
    ServerError,
    TokenExpired,
} from '../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../domain/movies/now_playing';
import { PopularMovie } from '../../domain/movies/popular';
import { axiosInstance } from '../core/axios_instance';
import { IMovie } from '../../domain/movies/i_movie';

export enum MovieAPI {
    NOW_PLAYING,
    POPULAR,
}

export async function getMovies(
    token: Token,
    pageNumber: number,
    movieAPI: MovieAPI,
): Promise<MovieFailure | IMovie[]> {
    try {
        if (!token.isValid()) {
            return new ServerError(500, 'Something wrong happened');
        }

        const apiUrl =
            movieAPI === MovieAPI.NOW_PLAYING ? '/now_playing' : '/popular';

        const { status, data } = await axiosInstance({
            method: 'GET',
            url: `/api/movies${apiUrl}?page=${pageNumber}`,
            headers: {
                Authorization: `Bearer ${token.getOrCrash()}`,
            },
        });

        if (status === 200) {
            const movies: IMovie[] = [];

            const imageBaseUrl = data.imageBaseUrl;

            const pushNowPlaying = (rawMovie: any) => {
                movies.push(
                    new NowPlayingMovie(
                        new MovieId(rawMovie.id),
                        new MovieCoverUrl(
                            `${imageBaseUrl}${rawMovie.backdrop_path}`,
                        ),
                        new MovieBannerUrl(
                            `${imageBaseUrl}${rawMovie.poster_path}`,
                        ),
                        new MovieTitle(rawMovie.title),
                        new MovieOverview(rawMovie.overview),
                    ),
                );
            };

            const pushPopular = (rawMovie: any) => {
                movies.push(
                    new PopularMovie(
                        new MovieId(rawMovie.id),
                        new MovieCoverUrl(
                            `${imageBaseUrl}${rawMovie.backdrop_path}`,
                        ),
                        new MovieBannerUrl(
                            `${imageBaseUrl}${rawMovie.poster_path}`,
                        ),
                        new MovieTitle(rawMovie.title),
                        new MovieOverview(rawMovie.overview),
                    ),
                );
            };

            data.data.forEach(
                movieAPI === MovieAPI.NOW_PLAYING
                    ? pushNowPlaying
                    : pushPopular,
            );

            return movies;
        }

        return new ServerError(500, 'Something wrong happened');
    } catch (error) {
        if (error.response.status === 401) {
            return new TokenExpired(
                error.response.status,
                error.response.data.message,
            );
        }

        return new ServerError(500, 'Something wrong happened');
    }
}

export async function getMovieActors(token: Token, movieId: MovieId) {
    try {
        if (!token.isValid()) {
            return new ServerError(500, 'Something wrong happened');
        }

        const { status, data } = await axiosInstance({
            method: 'GET',
            url: `/api/movies/${movieId.value}/actors`,
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (status === 200) {
            const actors: Actor[] = [];

            const imageBaseUrl = data.imageBaseUrl;

            data.data.forEach((rawActor: any) => {
                actors.push(
                    new Actor(
                        rawActor.name,
                        `${imageBaseUrl}${rawActor.profile_path}`,
                    ),
                );
            });

            return actors;
        }

        return new ServerError(500, 'Something wrong happened');
    } catch (error) {
        if (error.response.status === 401) {
            return new TokenExpired(
                error.response.status,
                error.response.data.message,
            );
        }

        return new ServerError(500, 'Something wrong happened');
    }
}
