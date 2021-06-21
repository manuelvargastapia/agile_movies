import React from 'react';
import {
    TouchableHighlight,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';

const NowPlayingItem: React.FC<{
    item: NowPlayingMovie;
    onSelectItem: (movie: NowPlayingMovie) => void;
}> = ({ item, onSelectItem }) => {
    const { colors } = useTheme();

    return (
        <TouchableHighlight
            onPress={onSelectItem.bind(null, item)}
            underlayColor={colors.accent}>
            <Image
                style={styles.bannerImage}
                resizeMode="contain"
                source={{
                    uri: item.movieBannerUrl.value,
                }}
            />
        </TouchableHighlight>
    );
};

export default NowPlayingItem;

const styles = StyleSheet.create({
    bannerImage: {
        height: Dimensions.get('screen').width * 0.6,
    },
});
