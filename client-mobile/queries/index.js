import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query FindMovies {
        findMovies {
            id
            title
            imgUrl
            rating
        }
    }
`;

export const GET_MOVIE_DETAIL = gql`
    query FindMovieById($findMovieByIdId: ID) {
        findMovieById(id: $findMovieByIdId) {
            id
            title
            slug
            synopsis
            trailerUrl
            imgUrl
            rating
            genreId
            UserMongoId
            Genre {
                id
                name
            }
            Casts {
                id
                name
                profilePict
            }
            User {
                _id
                username
                email
                role
            }
        }
    }
`;