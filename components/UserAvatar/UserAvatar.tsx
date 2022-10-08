import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./UserAvatarStyles";


function UserAvatar({ avatar }: { avatar: string }) {
    const uploadAvatar = () => {
        console.log("uploading avatar")
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight activeOpacity={0.8} underlayColor="#b7b7b7"
                style={styles.container} onPress={() => uploadAvatar()} >
                {avatar ?
                    <Image style={styles.avatar} source={{ uri: avatar }} /> :
                    <View style={styles.defaultAvatar}>
                        <FontAwesome name="user" size={45} color="#F09B2A" />
                    </View>
                }
            </TouchableHighlight>
        </View>
    )
}

export default UserAvatar;