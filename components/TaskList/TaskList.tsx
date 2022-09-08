import React, { useState } from "react";
import { View } from "../Themed";
import { StyleSheet, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';

function TaskList() {

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
        {
            id: "218",
            title: "4 two sum",
            date: "sept 1",
            deadline: "november",
            note: "some notes",
            isCompleted: false,
        }

    ]
    const [tasks, setTasks] = useState(dummyTasks);

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem task={item} />}
                style={styles.list}
            />
            <Entypo name="add-to-list" style={styles.add} size={22} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    list: {
        width: "100%"
    },
    add: {
        color: "#b7b7b7",
        marginLeft: 4.5,
        marginTop: 3
    },
});

export default TaskList;