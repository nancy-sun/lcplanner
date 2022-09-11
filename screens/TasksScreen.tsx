import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import TaskList from '../components/TaskList/TaskList';

function TasksScreen({ navigation }: RootTabScreenProps<'Tasks'>) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>hi</Text>
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
    },

});

export default TasksScreen;