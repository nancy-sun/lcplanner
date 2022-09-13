import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";


function ProfileScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.avatar}>
                avatar
            </Text>
            <Text style={styles.name}>
                profile
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 9,
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