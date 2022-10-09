import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/queries";
import UserAvatar from "../components/UserAvatar/UserAvatar";

interface UserObj {
    id: string,
    name: string,
    email: string,
    avatar: string
}

function ProfileScreen() {

    const [username, setUsername] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [userID, setUserID] = useState<string>("");

    const [getUser, { data, error, loading }] = useLazyQuery(GET_USER_QUERY);

    const navigate = useNavigation();

    const getProfile = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigate.navigate("SignIn");;
        } else {
            const decoded = jwt_decode<UserObj>(token);
            getUser({ variables: { id: decoded.id } })
        }
    }

    useEffect(() => {
        if (data) {
            setUsername(data.getUser.name);
            setAvatar(data.getUser.avatar);
            setUserID(data.getUser.id);
            console.log(data);
        }
    }, [data])

    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching user ${error.message}`);
            navigate.navigate("SignIn");;
        }
    }, [error]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="#F09B2A" />}
            <UserAvatar avatar={avatar} id={userID} />
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
    name: {
        fontSize: 20,
        marginTop: 12,
        fontWeight: "500",
    }
});

export default ProfileScreen;