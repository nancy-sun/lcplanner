import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRoute, RouteProp } from "@react-navigation/native";

type AppRouteParamList = {
    user: { id: string } | undefined
};

function ViewOnlyTasksScreen() {
    const route = useRoute<RouteProp<AppRouteParamList, "user">>();
    const userID = route.params?.id;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{userID}</Text>
        </View>
    );
};

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

export default ViewOnlyTasksScreen;