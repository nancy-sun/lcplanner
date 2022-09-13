import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

function ProfileScreen() {

    return (
        <View style={styles.container}>
            <Text>
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
        width: "100%"
    }
});

export default ProfileScreen;