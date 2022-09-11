import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './UserItemStyles';
interface UserItemProps {
    user: {
        id: string,
        name: string
    }
}

function UserItem({ user }: UserItemProps) {

    const navigate = useNavigation();

    const handlePress = () => {
        // to be change to axios call
        // navigate.navigate("UserProfile", {id: user.id});
        console.log("navigating to friend's profile");
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