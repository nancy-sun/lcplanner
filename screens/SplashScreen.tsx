import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {

    const navigate = useNavigation();

    const isLoggedIn = () => {
        return false;
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate.navigate("Tasks");
        } else {
            navigate.navigate("SignIn");
        }
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 9,
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%"
    }
});

export default SplashScreen;
