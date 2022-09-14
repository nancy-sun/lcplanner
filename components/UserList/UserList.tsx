import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, ActivityIndicator } from "react-native";
import { useQuery } from '@apollo/client';
import UserItem from '../UserItem/UserItem';
import { TASKS_LIST_QUERY } from '../../graphql/queries';
import styles from './UserListStyles';

function UserList() {

    const [users, setUsers] = useState([]);

    const { data, error, loading } = useQuery(TASKS_LIST_QUERY);

    useEffect(() => {
        if (data) {
            setUsers(data.myTasksList);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            Alert.alert(`Error getting tasks data, ${error.message}`);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="#f09a2a" />}
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <UserItem user={item} key={item["id"]} />}
                style={styles.list}
            />
        </View>
    );
}

export default UserList;
