import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader: React.FC<{
    visible: boolean;
    color: string;
}> = ({ visible, color }) => {
    return (
        <>
            {visible && (
                <View style={styles.container}>
                    <ActivityIndicator
                        size={50}
                        animating={true}
                        color={color}
                    />
                </View>
            )}
        </>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 50,
    },
});
