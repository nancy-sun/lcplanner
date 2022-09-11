import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import styles from "./SignUpFormStyles";
import { SIGN_UP_MUTATION } from "../../graphql/mutations";
import { GRAPHQL_URI } from '@env';

function SignUpForm() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION); // mutation[0] function, mutation[1] response object 
    console.log(data)

    const handleSubmit = () => {
        // console.log("handling submit")
        signUp({ variables: { email, name, password } })
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
            <Pressable onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                {loading && <ActivityIndicator color="white" />}
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