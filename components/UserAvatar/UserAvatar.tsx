import React, { useEffect, useState } from "react";
import { Image, TouchableHighlight } from "react-native";
import { View } from "../Themed";
import { Buffer } from "buffer";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as ImagePicker from "expo-image-picker";
import { S3Client, GetObjectCommand, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import * as FileSystem from "expo-file-system";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_S3_REGION, AWS_S3_IDENTITY_POOL_ID, AWS_S3_BUCKET_NAME } from "@env";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./UserAvatarStyles";

const imgOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
    base64: true
};

// get avatar from s3 based on user id
function UserAvatar({ id, editable }: { id: string; editable: boolean }) {
    const [avatar, setAvatar] = useState<string>("");

    // declare s3 client with cognito
    const client = new S3Client({
        region: AWS_S3_REGION,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: AWS_S3_REGION }),
            identityPoolId: AWS_S3_IDENTITY_POOL_ID,
        }),
    });

    const uploadToS3 = (arrayBuffer: Buffer) => {
        const bucketParams: PutObjectCommandInput = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
            Body: arrayBuffer,
            ContentType: "multipart/form-data"
        };

        client.send(new PutObjectCommand(bucketParams)).then((data) => {
            if (data) {
                return;
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const getAvatarFromS3 = async () => {
        const bucketParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
        };
        try {
            const data = new GetObjectCommand(bucketParams);
            if (data) {
                const url = await getSignedUrl(client, data);
                setAvatar(url);
            }
        } catch (err) {
            console.log("Error", err);
            return;
        }
    };

    const uploadAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ ...imgOptions });
        if (!result.cancelled) {
            setAvatar(result.uri);
            const imageURI = result.uri;
            const imageBase64 = await FileSystem.readAsStringAsync(imageURI, {
                encoding: "base64",
            });
            if (imageBase64 && imageURI) {
                const arrayBuffer: Buffer = Buffer.from(imageBase64, "base64");
                uploadToS3(arrayBuffer);
                setAvatar(imageURI);
            }
        }
    };

    useEffect(() => {
        if (id) {
            getAvatarFromS3();
        }
    }, [id]);

    return (
        <View style={editable ? styles.container : styles.staticContainer}>
            {editable ?
                (<TouchableHighlight activeOpacity={0.8} underlayColor="#b7b7b7"
                    style={styles.container} onPress={() => uploadAvatar()} >
                    {avatar ?
                        <Image style={styles.avatar} source={{ uri: avatar, scale: 1 }} resizeMode="cover" /> :
                        <View style={styles.defaultAvatar}>
                            <FontAwesome name="user" size={45} color="#F09B2A" />
                        </View>
                    }
                </TouchableHighlight>)
                :
                (<View style={styles.staticContainer}>
                    {avatar ?
                        <Image style={styles.staticAvatar} source={{ uri: avatar, scale: 1 }} resizeMode="cover" /> :
                        <View style={styles.staticDefaultAvatar}>
                            <FontAwesome name="user" size={25} color="#F09B2A" />
                        </View>
                    }
                </View>)
            }
        </View>
    );
};

export default UserAvatar;