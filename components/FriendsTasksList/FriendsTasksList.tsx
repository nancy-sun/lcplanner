import React from 'react'
import { Text, FlatList } from 'react-native';
import FriendsTasksItem from '../FriendsTasksItem/FriendsTasksItem';
import { View } from "../Themed";
import styles from './FriendsTasksListStyles';

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
