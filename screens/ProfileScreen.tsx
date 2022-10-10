import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/queries";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfilePieChart from "../components/ProfilePieChart/ProfilePieChart";

interface UserObj {
    id: string,
    name: string,
    email: string,
}

function ProfileScreen() {

    const [username, setUsername] = useState<string>("");
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
            <ProfileHeader userID={userID} username={username} />
            <ProfilePieChart />
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
});

export default ProfileScreen;