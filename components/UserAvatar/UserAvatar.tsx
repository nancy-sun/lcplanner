import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight, Button, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from "./UserAvatarStyles";
import { UPDATE_AVATAR_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../../graphql/queries";
import {
    S3Client,
    CreateBucketCommand,
    GetObjectCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3";

import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION, AWS_S3_IDENTITY_POOL_ID, AWS_S3_BUCKET_NAME } from "@env";
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';

const imgOptions = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    includeBase64: true,
}

function UserAvatar({ avatar, id }: { avatar: string, id: string }) {

    const [updateAvatar, { data, error, loading }] = useMutation(UPDATE_AVATAR_MUTATION, { refetchQueries: [{ query: GET_USER_QUERY, variables: { id: id } }] });

    const client = new S3Client({
        region: AWS_S3_REGION,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: AWS_S3_REGION }),
            identityPoolId: AWS_S3_IDENTITY_POOL_ID,
        }),
    });

    const createBucket = (arrayBuffer: object) => {

        const bucketParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
            Body: arrayBuffer,
            ContentType: "multipart/form-data"
        }

        client.send(new PutObjectCommand(bucketParams)).then((data) => {
            console.log(data)
        }).catch((e) => {
            console.log(e)
        })
    };

    const getAvatarFromS3 = async () => {
        const bucketParams = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: id,
        };

        try {
            // Create a helper function to convert a ReadableStream to a string.
            const streamToString = (stream) =>
                new Promise((resolve, reject) => {
                    const chunks = [];
                    stream.on("data", (chunk) => chunks.push(chunk));
                    stream.on("error", reject);
                    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
                });

            // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
            const data = await client.send(new GetObjectCommand(bucketParams));
            console.log(data.Body);
            // Convert the ReadableStream to a string.
            const bodyContents = await streamToString(data.Body);
            return bodyContents;
        } catch (err) {
            console.log("Error", err);
        }
    }

    useEffect(() => {
        const img = getAvatarFromS3();
        if (img) {
            console.log(img, "testing")
        }
    }, [id])


    const uploadAvatar = async () => {
        const result = await launchImageLibrary({ ...imgOptions });
        if (result.assets) {
            const imageURI = result.assets[0].base64;
            if (imageURI) {
                const arrayBuffer = Buffer.from(imageURI, "binary");
                createBucket(arrayBuffer);
                // const binData = Buffer.from(imageURI, "base64");
                // const updateAvatarVariables = {
                //     id: id,
                //     avatar: imageURI.split(",")[1]
                // }
                // updateAvatar({
                //     variables: { ...updateAvatarVariables }
                // });
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