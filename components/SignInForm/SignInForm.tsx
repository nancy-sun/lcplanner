import React, { useEffect, useState } from "react";
import { Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { View } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { SIGN_IN_MUTATION } from "../../graphql/mutations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./SignInFormStyles";

function SignInForm() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigation();

    const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION); // mutation[0] function, mutation[1] response object 

    const handleSubmit = () => {
        signIn({ variables: { email, password } });
    };

    const redirectToSignUp = () => {
        navigate.navigate("SignUp");
    };

    useEffect(() => {
        if (data) {
            AsyncStorage.setItem("token", data.signIn.token).then(() => {
                navigate.navigate("Root");
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Alert.alert("Invalid credentials, try again");
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                secureTextEntry
                autoCapitalize="none"
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
                {loading && <ActivityIndicator color="white" />}
                <Text style={styles.submitText}>Sign In</Text>
            </Pressable>
            <Pressable onPress={redirectToSignUp} style={styles.signUpButton}>
                <Text style={styles.signUpText}>
                    Sign Up Here
                </Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;