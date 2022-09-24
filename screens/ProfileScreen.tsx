import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/queries";

interface UserObj {
    id: string,
    name: string,
    email: string,
    avatar: string
}

function ProfileScreen() {

    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");

    const { data, error, loading } = useQuery(GET_USER_QUERY, { variables: { id: userID } });

    const navigate = useNavigation();

    const getProfile = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigate.navigate("SignIn");;
        } else {
            const decoded = jwt_decode<UserObj>(token);
            setUserID(decoded.id);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        if (data) {
            setUsername(data["getUser"].name);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching user ${error.message}`);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="#f09a2a" />}
            <Text style={styles.avatar}>
                avatar
            </Text>
            <Text style={styles.name}>
                {username}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        width: "100%",
    },
    avatar: {
        width: 70,
        height: 70,
        backgroundColor: "green",
    },
    name: {
        fontSize: 20,
        marginTop: 12,
        fontWeight: "500",
    }
});

export default ProfileScreen;