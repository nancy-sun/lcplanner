import React, { useRef, useState, useEffect, SyntheticEvent } from "react";
import { View } from "../Themed";
import { Alert, TextInput } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "../../graphql/mutations";
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./TaskItemStyles";

interface TaskItemProps {
    task: {
        id: string,
        title: string,
        date: string,
        deadline: string,
        note: string,
        isCompleted: boolean,
    },
    tasksListID: string,
    index: number,
    tasksDate: string,
    lastIdx: number,
    showTasksList: any
}

function TaskItem({ task, tasksListID, index, tasksDate, lastIdx, showTasksList }: TaskItemProps) {

    const [checked, setChecked] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const inputRef = useRef<any>(null);

    const [updateTask, { data, error }] = useMutation(UPDATE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY, variables: { id: tasksListID } }] });
    const [createNewTask, { data: createNewTaskData, error: createNewTaskError }] = useMutation(CREATE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY, variables: { id: tasksListID } }] });
    const [deleteTask, { data: deleteTaskData, error: deleteTaskError }] = useMutation(DELETE_TASK_MUTATION, { refetchQueries: [{ query: GET_TASK_LIST_QUERY, variables: { id: tasksListID } }] });

    const handleTaskLoad = () => {
        if (task.title) {
            setChecked(task.isCompleted);
            setTitle(task.title);
        } else {
            setTitle("");
            inputRef.current.clear();
            if (index === lastIdx) {
                inputRef.current.focus();
            }
        }
    }

    const handleCreateNewTask = (atIndex: number) => {
        const newTask = {
            title: title,
            tasksListID: tasksListID,
            date: tasksDate,
            deadline: "",
            note: ""
        };
        createNewTask({
            variables: newTask
        });
    }

    const handleDelete = ({ nativeEvent }: { nativeEvent: any }) => {
        if (!task.id) {
            return;
        }
        if (nativeEvent.key === "Backspace" && title === "") {
            deleteTask({
                variables: {
                    id: task.id
                }
            })
        }
        // if (nativeEvent.key === "Enter" && title !== "") {
        //     showTasksList.splice(index + 1, 0, []);
        // }
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
        if (title === "") {
            return;
        }
        if (task.id) {
            handleTaskUpdate();
        } else {
            handleCreateNewTask(index);
        }
        showTasksList.push([]);
    }

    const checkTaskHandler = () => {
        if (title === "" || !task.id) {
            return;
        } else {
            handleTaskUpdate();
        }
    }

    const handleCheckBoxPress = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        handleTaskLoad();
    }, [task]);

    useEffect(() => {
        checkTaskHandler();
    }, [checked])

    useEffect(() => {
        if (inputRef.current) {
            inputRef?.current?.focus();
        }
    }, [inputRef]);

    /* error alerts */
    useEffect(() => {
        if (deleteTaskError) {
            Alert.alert("fail deleting task ", deleteTaskError.message);
        }
    }, [deleteTaskError])

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
            <TextInput blurOnSubmit
                ref={inputRef}
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={taskHandler}
                onEndEditing={taskHandler}
                onKeyPress={handleDelete}
            />
        </View>
    );
}

export default TaskItem;