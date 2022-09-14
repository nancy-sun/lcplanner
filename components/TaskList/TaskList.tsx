import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";
import styles from "./TaskListStyles";
import { useQuery } from "@apollo/client";

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
const dummyID = "1";

/* list of tasks in a day */
function TaskList() {
    const [tasks, setTasks] = useState([]);

    const { data, error, loading } = useQuery(GET_TASK_LIST_QUERY, { variables: { id: "63168c69b4fe6b476cc13398" } });

    const createNewTask = (index: number) => {
        // const updatedTasks = [...tasks];
        // updatedTasks.splice(index, 0, {
        //     id: dummyID,
        //     title: "",
        //     date: Date.now().toString(),
        //     deadline: "",
        //     note: "",
        //     isCompleted: false,
        // })
        // setTasks(updatedTasks);
    }

    useEffect(() => {
        if (data) {
            setTasks(data.getTaskList);
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
                    {/* {loading && <ActivityIndicator color="#f09a2a" />} */}
                    {tasks && tasks.map((item, index) => <TaskItem key={index} task={item} handleSubmit={() => createNewTask(index + 1)} />)}
                    <Entypo name="add-to-list" style={styles.add} size={22} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}


export default TaskList;