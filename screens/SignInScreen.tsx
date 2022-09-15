import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignInForm from "../components/SignInForm/SignInForm";

function SignInScreen() {

    const removePreviousToken = async () => {
        await AsyncStorage.removeItem("token");
    }

    useEffect(() => {
        removePreviousToken();
    }, [])

    return (
        <View style={styles.container}>
            <SignInForm />
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

export default SignInScreen;