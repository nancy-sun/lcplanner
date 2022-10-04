import React, { useRef, useState, useEffect } from "react";
import { View } from "../Themed";
import { Alert, TextInput } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./TaskItemStyles";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK_MUTATION } from "../../graphql/mutations";
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";


interface TaskItemProps {
    task: {
        id: string,
        title: string,
        date: string,
        deadline: string,
        note: string,
        isCompleted: boolean,
    },
    id: string,
    index: number,
    tasksDate: string,
    lastIdx: number
}

function TaskItem({ task, id, index, tasksDate, lastIdx }: TaskItemProps) {

    const [checked, setChecked] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const inputRef = useRef<any>(null);

    const [createNewTask, { data: createNewTaskData, error: createNewTaskError }] = useMutation(CREATE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY }] });

    const addNewTask = (atIndex: number) => {
        const newTask = {
            title: title,
            tasksListID: id,
            date: tasksDate,
            deadline: "",
            note: ""
        };

        createNewTask({
            variables: newTask
        });
    }

    const handleDelete = ({ nativeEvent }: { nativeEvent: any }) => {
        if (nativeEvent.key === "Backspace" && title === "") {
            console.log("deleting") // use mutation
        }
    }

    useEffect(() => {
        if (task.title) {
            setChecked(task.isCompleted);
            setTitle(task.title);
        } else {
            setTitle("");
            inputRef.current.clear();
            if (index == lastIdx) {
                inputRef.current.focus();
            }
        }
    }, [task]);

    useEffect(() => {
        if (createNewTaskError) {
            Alert.alert(createNewTaskError.message);
        }
    }, [createNewTaskError])

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
                onSubmitEditing={() => addNewTask(index + 1)}
                onKeyPress={handleDelete}
            />
        </View>
    );
}

export default TaskItem;