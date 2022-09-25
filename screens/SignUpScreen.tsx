import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
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
            <KeyboardAvoidingView
                behavior={"position"}
                keyboardVerticalOffset={150}>
                <SignUpForm />
            </KeyboardAvoidingView>
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