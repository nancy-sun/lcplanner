import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../components/TaskList/TaskList';

function TasksScreen({ navigation }: RootTabScreenProps<'Tasks'>) {

    const navigate = useNavigation();

    const isLoggedIn = async () => {
        const token = await AsyncStorage.getItem("token");
        return token != null;
    }

    const checkLoggedIn = async () => {
        if (!await isLoggedIn()) {
            navigate.navigate("SignIn");
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{new Date().toDateString()}</Text>
            <TaskList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#191919",
        padding: 6
    },

});

export default TasksScreen;