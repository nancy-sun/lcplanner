import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen() {

    const navigate = useNavigation();

    const isLoggedIn = async () => {
        // await AsyncStorage.removeItem("token"); signout
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        return token != null;
    }

    const checkLoggedIn = async () => {
        if (await isLoggedIn()) {
            navigate.navigate("Tasks");
        } else {
            navigate.navigate("SignIn");
        }
    }

    useEffect(() => {
        checkLoggedIn();
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
