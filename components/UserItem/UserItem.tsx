import React from 'react';
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import styles from './UserItemStyles';

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

export default UserItem;