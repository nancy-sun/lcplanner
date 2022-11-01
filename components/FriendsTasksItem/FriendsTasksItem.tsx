import React from "react";
import { Text } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import { View } from "../Themed";
import styles from "./FriendsTasksItemStyles";

interface FriendsTasksItemProps {
    task: {
        title: string;
        isCompleted: boolean;
    }
}

function FriendsTasksItem({ task }: FriendsTasksItemProps) {
    return (
        <View style={styles.container}>
            <Checkbox isChecked={task.isCompleted} onPress={() => { }} />
            <Text style={styles.item}>{task.title}</Text>
        </View>
    );
};

export default FriendsTasksItem;
