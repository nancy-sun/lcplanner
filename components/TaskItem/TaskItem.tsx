import React, { useState, useEffect } from "react";
import { View } from "../Themed";
import { StyleSheet, TextInput } from "react-native";
import Checkbox from "../Checkbox/Checkbox";

interface TaskItemProps {
    task: {
        id: String,
        title: string,
        date: string,
        deadline: string,
        note: string,
        isCompleted: boolean,
    }
}

function TaskItem({ task }: TaskItemProps) {
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!task) return;
        setChecked(task.isCompleted);
        setTitle(task.title);
    }, [task]);

    return (
        <View style={styles.container}>
            <Checkbox isChecked={checked} onPress={() => setChecked(!checked)} />
            <TextInput multiline style={styles.textInput} value={title} onChangeText={setTitle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 4,
    },
    textInput: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "#f09a2a",
        fontSize: 19,
        marginLeft: 8,
        padding: 3.5,
        color: "black",
    }
});

export default TaskItem;