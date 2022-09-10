import React, { useState } from "react";
import { View } from "../Themed";
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';

/* dummy data for testing */
const dummyTask = [
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
const dummyID = "300";

function TaskList() {
    const [tasks, setTasks] = useState(dummyTask);

    const addTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 0, {
            id: dummyID,
            title: "",
            date: Date.now().toString(),
            deadline: "",
            note: "",
            isCompleted: false,
        })
        setTasks(updatedTasks);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={"position"}
                    keyboardVerticalOffset={110}>
                    <FlatList
                        data={tasks}
                        renderItem={({ item, index }) =>
                            <TaskItem task={item} handleSubmit={() => addTask(index + 1)} />}
                        style={styles.list}
                    />
                    <Entypo name="add-to-list" style={styles.add} size={22} />
                </KeyboardAvoidingView>
            </ScrollView>
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