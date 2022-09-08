import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import TaskItem from '../components/TaskItem/TaskItem';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const dummyTasks = [
        {
            id: "213",
            title: "1 two sum",
            date: "sept 1",
            deadline: "november",
            note: "some notes",
            isCompleted: false,
        },
        {
            id: "214",
            title: "2 hello",
            date: "sept 1",
            deadline: "november",
            note: "some notes",
            isCompleted: false,
        },
        {
            id: "215",
            title: "3 two sum",
            date: "sept 1",
            deadline: "november",
            note: "some notes",
            isCompleted: false,
        },

    ]

    const [tasks, setTasks] = useState(dummyTasks);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>hi</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem task={item} />}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#191919"
    },
    list: {
        width: "100%",
    }
});
