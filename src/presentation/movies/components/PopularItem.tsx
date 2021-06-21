import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Colors, useTheme } from 'react-native-paper';
import { PopularMovie } from '../../../domain/movies/popular';

const PopularItem: React.FC<{
    item: PopularMovie;
    onSelectItem: (movie: PopularMovie) => void;
}> = ({ item, onSelectItem }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.converImageContainer}>
            <TouchableHighlight
                onPress={onSelectItem.bind(null, item)}
                underlayColor={colors.accent}>
                <Image
                    style={styles.coverImage}
                    resizeMode="contain"
                    source={{
                        uri: item.movieBannerUrl.value,
                    }}
                />
            </TouchableHighlight>
            <Text style={styles.movieTitle}>{item.movieTitle.value}</Text>
        </View>
    );
};

export default PopularItem;

const styles = StyleSheet.create({
    converImageContainer: {
        flex: 1,
        paddingBottom: 16,
        marginHorizontal: 30,
        marginBottom: 0,
    },
    coverImage: {
        width: '100%',
        height: Dimensions.get('screen').width * 0.5,
    },
    movieTitle: {
        color: Colors.white,
        textAlign: 'center',
    },
});
