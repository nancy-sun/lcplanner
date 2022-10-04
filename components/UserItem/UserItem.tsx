import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './UserItemStyles';
interface UserItemProps {
    user: {
        id: string,
        owner: {
            name: String
        }
    }
}

function UserItem({ user }: UserItemProps) {

    const navigate = useNavigation();

    const handlePress = () => {
        navigate.navigate("ViewOnlyTasks", { id: user.id });
    }

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="user" size={24} color="#F09B2A" />
                </View>
                <Text style={styles.username}>{user.owner.name}</Text>
            </View>
        </Pressable>
    )
}

export default UserItem;