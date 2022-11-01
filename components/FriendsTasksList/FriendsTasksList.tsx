import React from "react"
import { FlatList } from "react-native";
import { View } from "../Themed";
import FriendsTasksItem from "../FriendsTasksItem/FriendsTasksItem";
import styles from "./FriendsTasksListStyles";

interface FriendsTasksListProps {
    showTasksList: Array<Task>,
};

interface Task {
    title: string,
    isCompleted: boolean,
};

function FriendsTasksList({ showTasksList }: FriendsTasksListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={showTasksList}
                renderItem={({ item, index }: { item: Task, index: number }) =>
                    <FriendsTasksItem task={item} />
                }
            />
        </View>
    );
};

export default FriendsTasksList;
