import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, HelperText } from 'react-native-paper';

const ErrorMessage: React.FC<{
    visible: boolean;
    message: string;
}> = ({ visible, message }) => {
    return (
        <View style={styles.container}>
            <HelperText
                style={styles.helperText}
                type="error"
                visible={visible}
                padding="none">
                {message}
            </HelperText>
        </View>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
});
