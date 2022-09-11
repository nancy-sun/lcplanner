import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./SignUpFormStyles";

function SignUpForm() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const handleSubmit = () => {
        console.log("handling submit")
    }

    const redirectToSignIn = () => {
        navigate.navigate("SignIn");
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="username"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
                <Text style={styles.submitText}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={redirectToSignIn} style={styles.signUpButton}>
                <Text style={styles.signUpText}>
                    Sign In Here
                </Text>
            </Pressable>
        </View>
    )
}



export default SignUpForm;