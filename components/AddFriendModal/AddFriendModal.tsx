import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Text, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import { View } from "../Themed";
import { useMutation } from "@apollo/client";
import { ADD_TASKS_LIST_USER_MUTATION } from "../../graphql/mutations";
import styles from "./AddFriendModalStyles";

interface ModalProps {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    tasksListID: string
};

function AddFriendModal(props: ModalProps) {

    const [email, setEmail] = useState<string>("");
    const [AddTasksListUser, { data, error, loading }] = useMutation(ADD_TASKS_LIST_USER_MUTATION);

    const handleSubmit = () => {
        if (!email) {
            Alert.alert("Please enter email address.");
        }
        AddTasksListUser({ variables: { tasksListID: props.tasksListID, userEmail: email } });
    };

    useEffect(() => {
        if (data) {
            Alert.alert("Successfully added friend.");
            props.setModalVisible(false);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Alert.alert(error.message);
        }
    }, [error]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPressOut={() => { props.setModalVisible(false) }}
                >
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.title}>Add Peer</Text>
                                <TextInput
                                    autoFocus
                                    placeholder="email"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    keyboardType="email-address"
                                />
                                <Pressable
                                    style={styles.submitButton}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.submitText}>Add</Text>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default AddFriendModal;