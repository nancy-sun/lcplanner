import React, { useRef, useState, useEffect } from "react";
import { View } from "../Themed";
import { TextInput } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./TaskItemStyles";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK_MUTATION } from "../../graphql/mutations";
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";


interface TaskItemProps {
    task: {
        id: String,
        title: string,
        date: string,
        deadline: string,
        note: string,
        isCompleted: boolean,
    },
    id: string,
    index: number
}

function TaskItem({ task, id, index }: TaskItemProps) {
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const inputRef = useRef<any>(null);

    const [createNewTask, { data: createNewTaskData, error: createNewTaskError }] = useMutation(CREATE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY }] });

    const addNewTask = () => {
        const newTask = {
            title: title,
            tasksListID: id,
            date: Date.now().toString(),
            deadline: "",
            note: ""
        };

        createNewTask({
            variables: newTask
        });
        console.log(createNewTaskError)
        console.log(createNewTaskData)
    }

    const handleDelete = ({ nativeEvent }: { nativeEvent: any }) => {
        if (nativeEvent.key === "Backspace" && title === "") {
            console.log("deleting") // axios call
        }
    }

    // useEffect(() => {
    // if (task){
    //     setChecked(task.isCompleted);
    //     setTitle(task.title);
    // }
    // }, [task]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <View style={styles.container}>
            <Checkbox isChecked={checked} onPress={() => setChecked(!checked)} />
            <TextInput multiline blurOnSubmit
                ref={inputRef}
                style={styles.textInput}
                value={task.title}
                onChangeText={setTitle}
                onSubmitEditing={() => addNewTask()}
                onKeyPress={handleDelete}
            />
        </View>
    );
}

export default TaskItem;