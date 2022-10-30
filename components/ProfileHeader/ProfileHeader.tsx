import { Text } from "react-native";
import { View } from "../Themed";
import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./ProfileHeaderStyles";

function ProfileHeader({ userID, username }: { userID: string, username: string }) {
    return (
        <View style={styles.container}>
            <UserAvatar id={userID} editable={true} />
            <Text style={styles.name}>
                {username}
            </Text>
        </View>
    );
};

export default ProfileHeader;