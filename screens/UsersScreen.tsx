import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import UserList from '../components/UserList/UserList';


export default function UsersScreen() {

    const getUserInfo = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token)
    }

    useEffect(() => {
        getUserInfo();
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
