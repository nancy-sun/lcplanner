import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../components/TaskList/TaskList';
import AddFriendButton from "../components/AddFriendButton/AddFriendButton";
import AddFriendModal from "../components/AddFriendModal/AddFriendModal";
import { useQuery } from "@apollo/client";
import { MY_TASKS_LIST_QUERY } from "../graphql/queries";

function TasksScreen({ navigation }: RootTabScreenProps<'Tasks'>) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [tasksListID, setTasksListID] = useState<string>("");
    const navigate = useNavigation();

    const { data, error, loading } = useQuery(MY_TASKS_LIST_QUERY);

    const isLoggedIn = async () => {
        const token = await AsyncStorage.getItem("token");
        return token != null;
    }

    const checkLoggedIn = async () => {
        if (!await isLoggedIn()) {
            navigate.navigate("SignIn");
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AddFriendButton setModalVisible={setModalVisible} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        checkLoggedIn();
    }, [])

    useEffect(() => {
        if (data) {
            setTasksListID(data.myTasksList.id);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching tasks ${error.message}`);
        }
    }, [error])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={"position"}
                keyboardVerticalOffset={45}
                style={styles.keyboardAvoid}
            >
                <TaskList data={data} loading={loading} />
                <AddFriendModal modalVisible={modalVisible} setModalVisible={setModalVisible} tasksListID={tasksListID} />
            </KeyboardAvoidingView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        width: "100%",
    },
    keyboardAvoid: {
        flex: 1,
        minWidth: "100%"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#191919",
        padding: 6
    },

});

export default TasksScreen;