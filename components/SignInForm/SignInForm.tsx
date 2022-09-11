import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignInFormStyles";

function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const handleSubmit = () => {
        console.log("handling submit")
    }

    const redirectToSignUp = () => {
        navigate.navigate("SignUp");
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                secureTextEntry
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Sign In</Text>
            </Pressable>
            <Pressable onPress={redirectToSignUp} style={styles.signUpButton}>
                <Text style={styles.signUpText}>
                    Sign Up Here
                </Text>
            </Pressable>
        </View>
    )
}



export default SignInForm;