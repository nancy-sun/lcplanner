import React from 'react';
import { View } from 'react-native';
import UserItem from '../UserItem/UserItem';
import styles from './UserListstyles';

function UserList() {
    return (
        <View style={styles.container}>
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
        </View>
    );
}

export default UserList;
