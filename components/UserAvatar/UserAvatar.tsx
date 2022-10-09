import React, { useEffect } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from "./UserAvatarStyles";
import { UPDATE_AVATAR_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../graphql/queries";

const imgOptions = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    includeBase64: true,
}

function UserAvatar({ avatar, id }: { avatar: string, id: string }) {

    const [updateAvatar, { data, error, loading }] = useMutation(UPDATE_AVATAR_MUTATION, { refetchQueries: [{ query: GET_USER_QUERY, variables: { id: id } }] });


    const uploadAvatar = async () => {
        const result = await launchImageLibrary({ ...imgOptions });
        if (result.assets) {
            const imageURI = result.assets[0].uri;
            if (imageURI) {
                const binData = Buffer.from(imageURI.split(",")[1], "base64");
                const updateAvatarVariables = {
                    id: id,
                    avatar: imageURI.split(",")[1]
                }
                updateAvatar({
                    variables: { ...updateAvatarVariables }
                });
            }
        }
    }

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

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