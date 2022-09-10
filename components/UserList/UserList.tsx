import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserItem from '../UserItem/UserItem';


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        width: "100%",
        height: 100,
        paddingLeft: 2,
        paddingRight: 2,
    }
});

export default UserList;
