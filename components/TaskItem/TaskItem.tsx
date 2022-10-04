import React, { useRef, useState, useEffect } from "react";
import { View } from "../Themed";
import { Alert, TextInput } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./TaskItemStyles";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "../../graphql/mutations";
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
    const [updateTask, { error }] = useMutation(UPDATE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY }] });

    const handleTaskLoad = () => {
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
    }

    const handleCreateNewTask = (atIndex: number) => {
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

    const handleTaskUpdate = () => {
        const updatedTask = {
            taskID: task.id,
            title: title,
            deadline: "",
            note: "",
            isCompleted: checked
        };
        updateTask({
            variables: updatedTask
        })
    }

    const taskHandler = () => {
        if (task.id) {
            handleTaskUpdate();
        } else {
            handleCreateNewTask(index);
        }
    }

    const handleCheckBoxPress = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        handleTaskLoad();
    }, [task]);

    useEffect(() => {
        taskHandler();
    }, [checked])

    useEffect(() => {
        if (inputRef.current) {
            inputRef?.current?.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        if (createNewTaskError) {
            Alert.alert("fail editing task ", createNewTaskError.message);
        }
    }, [createNewTaskError])

    useEffect(() => {
        if (error) {
            Alert.alert("fail editing task ", error.message);
        }
    }, [error])

    return (
        <View style={styles.container}>
            <Checkbox isChecked={checked} onPress={handleCheckBoxPress} />
            <TextInput multiline blurOnSubmit
                ref={inputRef}
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={() => taskHandler()}
                onKeyPress={handleDelete}
            />
        </View>
    );
}

export default TaskItem;