import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
import { Actor } from '../../../domain/movies/actor';

const ActorItem: React.FC<{ item: Actor }> = ({ item }) => {
    return (
        <View style={styles.actorPictureContainer}>
            <Image
                style={styles.actorPicture}
                resizeMode="contain"
                source={{
                    uri: item.profileImageUrl,
                }}
            />
            <Text style={styles.actorName}>{item.name}</Text>
        </View>
    );
};

export default ActorItem;

const styles = StyleSheet.create({
    actorPictureContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16,
        marginHorizontal: 30,
        marginBottom: 0,
    },
    actorPicture: {
        width: '100%',
        height: Dimensions.get('screen').width * 0.5,
    },
    actorName: {
        color: Colors.white,
    },
});
