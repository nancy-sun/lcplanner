import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import { MY_TASKS_LIST_QUERY } from "../../graphql/queries";
import styles from "./TaskListStyles";
import TasksCalendar from "../TasksCalendar/TasksCalendar";

/* list of tasks in a day */
interface TaskListQueryProps {
    data: any,
    loading: boolean,
}

function TaskList({ data, loading }: TaskListQueryProps) {
    const [tasks, setTasks] = useState<any>([]);
    const [tasksListID, setTasksListID] = useState<string>("");
    const [showTasks, setShowTasks] = useState<string>(""); // selected task date
    const [dateMarks, setDateMarks] = useState<Array<string>>([]);
    const [showTasksList, setShowTasksList] = useState<Array<any>>([]);
    const [lastIdx, setLastIdx] = useState<number>(0);

    const getDateMarks = (tasks: Array<any>) => {
        const dates = dateMarks;
        tasks.forEach((task) => {
            dates.push(task.date);
        });
        setDateMarks(dates);
    }

    const getTasksByDate = (tasks: Array<any>) => {
        return tasks.filter((task) => task.date === showTasks);
    }

    useEffect(() => {
        getDateMarks(tasks);
    }, [tasks])

    useEffect(() => {
        if (data) {
            setTasks(data.myTasksList.tasks);
            setTasksListID(data.myTasksList.id);
        }
    }, [data]);

    useEffect(() => {
        const dailyTasks = getTasksByDate(tasks);
        if (dailyTasks.length !== showTasks.length || dailyTasks[dailyTasks.length - 1]) {
            dailyTasks.push({});
        }

        for (let i = 0; i < dailyTasks.length - 1; i++) {
            if (dailyTasks[i].title === "") {
                dailyTasks.splice(i, 1);
                i--;
            }
        }
        setShowTasksList(dailyTasks);
    }, [showTasks])

    useEffect(() => {
        setLastIdx(showTasksList.length - 1);
    }, [showTasksList])

    return (
        <View style={styles.container}>
            <TasksCalendar setShowTasks={setShowTasks} showTasks={showTasks} dateMarks={dateMarks} />
            {loading && <ActivityIndicator color="#F09B2A" />}
            <View style={styles.listContainer}>
                <FlatList
                    data={showTasksList}
                    renderItem={({ item, index }) => (
                        <TaskItem
                            index={index} task={item} tasksListID={tasksListID} tasksDate={showTasks} lastIdx={lastIdx} showTasksList={showTasksList} setShowTasksList={setShowTasksList}
                        />
                    )}
                />
            </View>
        </View>
    );
}


export default TaskList;

// {/* <ScrollView style={styles.container} horizontal={false} >
// <ScrollView style={styles.container} horizontal={true}>
//     <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={"position"}
//         keyboardVerticalOffset={110}>
//         {loading && <ActivityIndicator color="#F09B2A" />}
//         {/* {tasks && tasks.map(({ item, index }: { item: object, index: number }) => <TaskItem key={index} index={index} task={item} id={id} />)} */}
//         <View>
//             <FlatList
//                 data={tasks}
//                 renderItem={({ item, index }) => (
//                     <TaskItem
//                         index={index + 1} task={item} id={tasks.id}
//                     />
//                 )}
//             />
//         </View>
//     </KeyboardAvoidingView>
// </ScrollView>
// </ScrollView> */}