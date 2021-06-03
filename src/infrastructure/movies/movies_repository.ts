import {
    MovieCoverUrl,
    MovieId,
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

export async function getNowPlayingMovies(
    token: Token,
    pageNumber: number,
): Promise<MovieFailure | NowPlayingMovie[]> {
    try {
        const { status, data } = await axiosInstance({
            method: 'GET',
            url: '/api/movies/now_playing',
            params: {
                page: pageNumber,
            },
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (status === 200) {
            const movies: NowPlayingMovie[] = [];

            data.data.forEach((rawMovie: any) => {
                movies.push(
                    new NowPlayingMovie(
                        new MovieId(rawMovie.id),
                        new MovieCoverUrl(
                            `${rawMovie.imageBaseUrl}${rawMovie.backdrop_path}`,
                        ),
                    ),
                );
            });

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

export async function getPopularMovies(
    token: Token,
    pageNumber: number,
): Promise<MovieFailure | PopularMovie[]> {
    try {
        const { status, data } = await axiosInstance({
            method: 'GET',
            url: '/api/movies/popular',
            params: {
                page: pageNumber,
            },
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (status === 200) {
            const movies: PopularMovie[] = [];

            data.data.forEach((rawMovie: any) => {
                movies.push(
                    new PopularMovie(
                        new MovieId(rawMovie.id),
                        new MovieCoverUrl(
                            `${rawMovie.imageBaseUrl}${rawMovie.backdrop_path}`,
                        ),
                        new MovieTitle(rawMovie.title),
                    ),
                );
            });

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
