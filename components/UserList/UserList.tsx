import React, { useEffect, useState } from "react";
import { FlatList, Alert, ActivityIndicator } from "react-native";
import { View } from "../Themed";
import { useQuery } from "@apollo/client";
import UserItem from "../UserItem/UserItem";
import { GET_ACCESS_TASKS_LIST_QUERY } from "../../graphql/queries";
import styles from "./UserListStyles";

function UserList() {

    const [users, setUsers] = useState<Array<any>>([]); // list of accessible taskslists

    const { data, error, loading } = useQuery(GET_ACCESS_TASKS_LIST_QUERY);

    useEffect(() => {
        if (data) {
            setUsers(data.getAccessTasksList);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Alert.alert(`Error getting tasks data, ${error.message}`);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="#F09B2A" />}
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <UserItem user={item} key={item["id"]} />}
                style={styles.list}
            />
        </View>
    );
};

export default UserList;
