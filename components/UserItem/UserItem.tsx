import { View, Text, StyleSheet } from 'react-native'

import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

function UserItem() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome name="user" size={24} color="#f09a2a" />
            </View>
            <Text style={styles.username}>Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        // alignItems: 'center',
        width: "100%",
        paddingLeft: 2,
        paddingRight: 2,
        marginVertical: 20,
    },
    username: {
        fontSize: 20,
        height: 25,
    },
    iconContainer: {
        width: 25,
        height: 25,
    }
});

export default UserItem;