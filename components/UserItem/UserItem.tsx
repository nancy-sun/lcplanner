import React from "react";
import { Text, Pressable } from "react-native";
import { View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./UserItemStyles";
interface UserItemProps {
    user: {
        id: string, // taskslist id
        tasks: Array<any>,
        owner: {
            name: string,
            id: string,
        }
    }
};

function UserItem({ user }: UserItemProps) {
    const navigate = useNavigation();

    const handlePress = () => {
        navigate.navigate("ViewOnlyTasks", { id: user.id, username: user.owner.name });
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <UserAvatar id={user.owner.id} editable={false} />
                <Text style={styles.username}>{user.owner.name}</Text>
            </View>
        </Pressable>
    );
};

export default UserItem;