import React, { useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpForm from "../components/SignUpForm/SignUpForm";

function SignUpScreen() {

    const removePreviousToken = async () => {
        await AsyncStorage.removeItem("token");
    };

    useEffect(() => {
        removePreviousToken();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={"position"}
                keyboardVerticalOffset={150}>
                <SignUpForm />
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 9,
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%"
    },
    text: {
        fontSize: 16
    }
});

export default SignUpScreen;