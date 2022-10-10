import { View, Text } from 'react-native'
import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './ProfileHeaderStyles';

function ProfileHeader({ userID, username }: { userID: string, username: string }) {
    return (
        <View style={styles.container}>
            <UserAvatar id={userID} />
            <Text style={styles.name}>
                {username}
            </Text>
        </View>
    )
}


export default ProfileHeader;