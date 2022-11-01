import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_LC_DATA_QUERY, GET_TASK_LIST_QUERY, GET_USER_QUERY } from "../graphql/queries";
import ProfilePieChart from "../components/ProfilePieChart/ProfilePieChart";
import FriendsCalendar from "../components/FriendsCalendar/FriendsCalendar";
import FriendsTasksList from "../components/FriendsTasksList/FriendsTasksList";
import { getTasksByDate } from "../utils/utils";

type ViewOnlyTasksProps = {
    params: {
        id: string,
        username: string
    }
}

function ViewOnlyTasksScreen({ route }: { route: ViewOnlyTasksProps }) {

    const [tasks, setTasks] = useState<any>([]); // tasks from query
    const [lcSubmitStat, setLcSubmitStat] = useState<Array<any>>([]);
    const [showTasks, setShowTasks] = useState<string>(""); // selected task date
    const [showTasksList, setShowTasksList] = useState<Array<any>>([]);
    const { id, username } = route.params;

    const [getTasksListData, { data, error, loading }] = useLazyQuery(GET_TASK_LIST_QUERY);
    const [getLCData, { data: lcData, error: lcError, loading: lcLoading }] = useLazyQuery(GET_LC_DATA_QUERY);

    const getLCProgress = () => {
        getLCData({ variables: { username: username } });
    };

    useEffect(() => {
        if (username) {
            getLCProgress();
        }
    }, [username]);

    useEffect(() => {
        if (lcData) {
            setLcSubmitStat(lcData.getLCData.submitStats);
        }
    }, [lcData]);

    useEffect(() => {
        if (id) {
            console.log(id)
            getTasksListData({ variables: { id: id } });
        }
    }, [id])

    useEffect(() => {
        const dailyTasks = getTasksByDate(tasks, showTasks);
        let listToShow: Array<any> = [];
        dailyTasks.forEach(t => {
            let task = {
                title: t.title,
                isCompleted: t.isCompleted,
            }
            listToShow.push(task);
        })
        setShowTasksList(listToShow);
    }, [showTasks]);

    useEffect(() => {
        if (data) {
            setTasks(data.getTasksList.tasks);
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{username}</Text>
            {lcSubmitStat &&
                <ProfilePieChart lcSubmitStat={lcSubmitStat} />
            }
            <FriendsCalendar setShowTasks={setShowTasks} />
            <FriendsTasksList showTasksList={showTasksList} />
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