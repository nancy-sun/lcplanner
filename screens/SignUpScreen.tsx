import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm/SignUpForm";

function SignUpScreen() {

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