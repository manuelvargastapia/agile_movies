import React from 'react';
import { View, Text } from 'react-native';
import { useParams } from 'react-router-native';

const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();

    return (
        <View>
            <Text>{movieId}</Text>
        </View>
    );
};

export default MovieDetails;
