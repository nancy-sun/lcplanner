import React, { useState } from "react";
import { View } from "../Themed";
import { FlatList, KeyboardAvoidingView, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import styles from "./TaskListStyles";

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

/* list of tasks in a day */
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
        <ScrollView style={styles.container}>
            <View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={"position"}
                    keyboardVerticalOffset={110}>
                    {tasks.map((item, index) => <TaskItem key={index} task={item} handleSubmit={() => addTask(index + 1)} />)}
                    <Entypo name="add-to-list" style={styles.add} size={22} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}


export default TaskList;