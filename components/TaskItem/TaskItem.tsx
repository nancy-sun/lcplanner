import React, { useRef, useState, useEffect } from "react";
import { View } from "../Themed";
import { Alert, TextInput } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./TaskItemStyles";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "../../graphql/mutations";
import { MY_TASKS_LIST_QUERY } from "../../graphql/queries";

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
    showTasksList: any,
    setShowTasksList: (showTasksList: Array<any>) => void
};

function TaskItem({ task, tasksListID, index, tasksDate, lastIdx, showTasksList, setShowTasksList }: TaskItemProps) {

    const [checked, setChecked] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const inputRef = useRef<any>(null);

    const [updateTask, { data, error }] = useMutation(UPDATE_TASK_MUTATION, { refetchQueries: [{ query: MY_TASKS_LIST_QUERY }] });
    const [createNewTask, { data: createNewTaskData, error: createNewTaskError }] = useMutation(CREATE_TASK_MUTATION, { refetchQueries: [{ query: MY_TASKS_LIST_QUERY }] });
    const [deleteTask, { data: deleteTaskData, error: deleteTaskError }] = useMutation(DELETE_TASK_MUTATION, { refetchQueries: [{ query: MY_TASKS_LIST_QUERY }] });

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
    };

    const handleCreateNewTask = () => {
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
        showTasksList.push({});
    };

    const handleDelete = ({ nativeEvent }: { nativeEvent: any }) => {
        if (!task.id) {
            return;
        }
        if (nativeEvent.key === "Backspace" && title === "") {
            deleteTask({
                variables: {
                    id: task.id
                }
            });
        }
    };

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
        });
        if (index == lastIdx) {
            showTasksList.push({});
        }
    };

    const taskHandler = () => {
        if (title === "") {
            return;
        }
        if (task.id) {
            handleTaskUpdate();
        } else {
            handleCreateNewTask();
        }
    };

    const checkTaskHandler = () => {
        if (title === "" || !task.id) {
            return;
        } else {
            handleTaskUpdate();
        }
    };

    const handleCheckBoxPress = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        handleTaskLoad();
    }, [task]);

    useEffect(() => {
        checkTaskHandler();
    }, [checked]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef?.current?.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        if (deleteTaskData) {
            showTasksList.splice(index, 1);
        }
    }, [deleteTaskData]);

    /* error alerts */
    useEffect(() => {
        if (deleteTaskError) {
            Alert.alert("fail deleting task ", deleteTaskError.message);
        }
    }, [deleteTaskError]);

    useEffect(() => {
        if (createNewTaskError) {
            Alert.alert("fail editing task ", createNewTaskError.message);
        }
    }, [createNewTaskError]);

    useEffect(() => {
        if (error) {
            Alert.alert("fail editing task ", error.message);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <Checkbox isChecked={checked} onPress={handleCheckBoxPress} />
            <TextInput blurOnSubmit
                ref={inputRef}
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={() => taskHandler()}
                onKeyPress={handleDelete}
            />
        </View>
    );
};

export default TaskItem;