import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm/SignUpForm";

function SignUpScreen() {

    const removePreviousToken = async () => {
        await AsyncStorage.removeItem("token");
    }

    useEffect(() => {
        removePreviousToken();
    }, [])


    return (
        <View style={styles.container}>
            <SignUpForm />
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

export default SignUpScreen;