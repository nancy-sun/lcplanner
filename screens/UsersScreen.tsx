import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import UserList from '../components/UserList/UserList';

export default function UsersScreen({ navigation }: any) {

    const navigate = useNavigation();

    const isLoggedIn = async () => {
        const token = await AsyncStorage.getItem("token");
        return token != null;
    }

    const checkLoggedIn = async () => {
        if (!await isLoggedIn()) {
            navigate.navigate("SignIn");
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    return (
        <View style={styles.container}>
            <UserList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: 14,
    }
});

