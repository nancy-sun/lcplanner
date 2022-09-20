import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Pressable, ScrollView, Text } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import TaskItem from '../TaskItem/TaskItem';
import { GET_TASK_LIST_QUERY } from "../../graphql/queries";
import styles from "./TaskListStyles";
import { RouteProp, useRoute } from "@react-navigation/native";

const id = "63168c69b4fe6b476cc13398";

/* list of tasks in a day */
function TaskList() {
    const [tasks, setTasks] = useState<any>([]);

    // const route = useRoute();
    // const id = route.params.id;

    const { data, error, loading } = useQuery(GET_TASK_LIST_QUERY, { variables: { id } });



    useEffect(() => {
        if (data) {
            setTasks(data.getTasksList.tasks);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching tasks ${error.message}`);
        }
    }, [error]);


    return (
        <ScrollView style={styles.container} horizontal={false} centerContent={true}>
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
                                    index={index + 1} task={item} id={id}
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