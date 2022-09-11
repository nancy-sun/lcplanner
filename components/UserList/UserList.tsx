import React, { useState } from 'react';
import { FlatList, View, ScrollView } from "react-native";
import UserItem from '../UserItem/UserItem';
import styles from './UserListStyles';

const dummyUsers = [
    {
        id: "1",
        name: "user1"
    },
    {
        id: "2",
        name: "user2"
    },
    {
        id: "3",
        name: "user3"
    },
    {
        id: "4",
        name: "user4"
    },
]

function UserList() {

    const [users, setUsers] = useState(dummyUsers);

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item, index }) =>
                    <UserItem user={item} />}
                style={styles.list}
            />
        </View>
    );
}

export default UserList;
