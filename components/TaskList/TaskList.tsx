import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Pressable, ScrollView, Text } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import { MY_TASKS_LIST_QUERY } from "../../graphql/queries";
import styles from "./TaskListStyles";
import { RouteProp, useRoute } from "@react-navigation/native";

/* list of tasks in a day */
interface TaskListQueryProps {
    data: any,
    loading: boolean
}

function TaskList({ data, loading }: TaskListQueryProps) {
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setTasks(data.myTasksList.tasks);
        }
    }, [data]);


    return (
        <ScrollView style={styles.container} horizontal={false} >
            <ScrollView style={styles.container} horizontal={true}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={"position"}
                    keyboardVerticalOffset={110}>
                    {loading && <ActivityIndicator color="#f09a2a" />}
                    {/* {tasks && tasks.map(({ item, index }: { item: object, index: number }) => <TaskItem key={index} index={index} task={item} id={id} />)} */}
                    <View>
                        <FlatList
                            data={tasks}
                            renderItem={({ item, index }) => (
                                <TaskItem
                                    index={index + 1} task={item} id={tasks.id}
                                />
                            )}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ScrollView>
    );
}


export default TaskList;