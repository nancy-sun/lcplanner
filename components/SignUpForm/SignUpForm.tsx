import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import styles from "./SignUpFormStyles";
import { SIGN_UP_MUTATION } from "../../graphql/mutations";
import { CREATE_TASKS_LIST_MUTATION } from "../../graphql/mutations";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpForm() {

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigation();

    const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION); // mutation[0] function, mutation[1] response object 
    const [createTasksList, { data: createTasksListData, error: createTasksListError }] = useMutation(CREATE_TASKS_LIST_MUTATION); // mutation[0] function, mutation[1] response object 

    const handleSubmit = async () => {
        await signUp({ variables: { email, name, password } });
        createTasksList();
        // create tasks list right away after signUp
    }

    const redirectToSignIn = () => {
        navigate.navigate("SignIn");
    }

    useEffect(() => {
        if (data) {
            AsyncStorage.setItem('token', data.signUp.token).then(() => {
                navigate.navigate("Root");
            })
        }
    }, [data])

    useEffect(() => {
        if (error) {
            Alert.alert('Invalid credentials, try again');
        }
    }, [error])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="username"
                autoCapitalize="none"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                secureTextEntry
                placeholder="password"
                autoCapitalize="none"
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