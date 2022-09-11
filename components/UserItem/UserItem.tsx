import React from 'react';
import { View, Text, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import styles from './UserItemStyles';
interface UserItemProps {
    user: {
        id: string,
        name: string
    }
}

function UserItem({ user }: UserItemProps) {
    const handlePress = () => {

    }

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="user" size={24} color="#f09a2a" />
                </View>
                <Text style={styles.username}>{user.name}</Text>
            </View>
        </Pressable>
    )
}

export default UserItem;