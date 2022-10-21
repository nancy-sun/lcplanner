import React, { useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInForm from "../components/SignInForm/SignInForm";

function SignInScreen() {

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
                keyboardVerticalOffset={120}>
                <SignInForm />
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
        width: "100%",
    }
});

export default SignInScreen;