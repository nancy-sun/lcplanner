import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";
import { CREATE_TASK_MUTATION } from "../../graphql/mutations";
import styles from "./TaskListStyles";

const id = "63168c69b4fe6b476cc13398";

/* list of tasks in a day */
function TaskList() {
    const [tasks, setTasks] = useState<any>([]);

    const { data, error, loading } = useQuery(GET_TASK_LIST_QUERY, { variables: { id } });

    const [createNewTask, { data: createNewTaskData, error: createNewTaskError }] = useMutation(CREATE_TASK_MUTATION);

    const addNewTask = (index: number) => {

        const newTask = {
            title: "title",
            tasksListID: id,
            date: Date.now(),
            deadline: "deadline",
            note: ""
        };

        createNewTask({
            variables: newTask
        });
        // tasks["tasks"].push(newTask) // to be fixed
    }

    useEffect(() => {
        if (data) {
            setTasks(data["getTasksList"]);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching tasks ${error.message}`);
        }
    }, [error]);


    return (
        <ScrollView style={styles.container}>
            <View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={"position"}
                    keyboardVerticalOffset={110}>
                    {loading && <ActivityIndicator color="#f09a2a" />}
                    {tasks["tasks"] && tasks["tasks"].map((item: { id: String; title: string; date: string; deadline: string; note: string; isCompleted: boolean; }, index: React.Key | null | undefined) => <TaskItem key={index} task={item} handleSubmit={() => addNewTask(Number(index) + 1)} />)}
                    <Entypo name="add-to-list" style={styles.add} size={22} onPress={() => addNewTask(tasks.length)} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}


export default TaskList;