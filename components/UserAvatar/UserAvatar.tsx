import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight, Button, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from "./UserAvatarStyles";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { AWS_S3_REGION, AWS_S3_IDENTITY_POOL_ID, AWS_S3_BUCKET_NAME } from "@env";

const imgOptions = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    includeBase64: true,
}

function UserAvatar({ id }: { id: string }) {
    const [avatar, setAvatar] = useState<string>("");

    const client = new S3Client({
        region: AWS_S3_REGION,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: AWS_S3_REGION }),
            identityPoolId: AWS_S3_IDENTITY_POOL_ID,
        }),
    });

    const uploadToS3 = (arrayBuffer: object) => {
        const bucketParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
            Body: arrayBuffer,
            ContentType: "multipart/form-data"
        }

        client.send(new PutObjectCommand(bucketParams)).then((data) => {
            // console.log(data);
            return;
        }).catch((e) => {
            console.log(e)
        })
    };

    const streamToString = (stream: any) => {
        return new Promise((resolve, reject) => {
            if (stream instanceof ReadableStream === false) {
                reject(
                    "Expected stream to be instance of ReadableStream, but got " +
                    typeof stream
                );
            }
            let text = "";
            const decoder = new TextDecoder("utf-8");

            const reader = stream.getReader();
            const processRead = ({ done, value }: { done: any, value: any }) => {
                if (done) {
                    // resolve promise with chunks
                    resolve(text);
                    return;
                }

                text += decoder.decode(value);

                // Not done, keep reading
                reader.read().then(processRead);
            };

            // start read
            reader.read().then(processRead);
        });
    };


    const getAvatarFromS3 = async () => {

        const bucketParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
        }

        try {
            // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
            const data = await client.send(new GetObjectCommand(bucketParams));

            if (data.Body) {
                const bodyContents = await streamToString(data.Body as ReadableStream);
                setAvatar("data:image/jpeg;base64," + bodyContents);
            }
        } catch (err) {
            console.log("Error", err);
        }
    }

    const uploadAvatar = async () => {
        const result = await launchImageLibrary({ ...imgOptions });
        if (result.assets) {
            const imageBase64 = result.assets[0].base64;
            const imageURI = result.assets[0].uri;
            if (imageBase64 && imageURI) {
                setAvatar(imageURI);
                const arrayBuffer = Buffer.from(imageBase64, "binary");
                uploadToS3(arrayBuffer);
            }
        }
    }

    useEffect(() => {
        getAvatarFromS3();
    }, [id])

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