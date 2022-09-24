import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, Text, Pressable, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./AddFriendModalStyles";

interface ModalProps {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

function AddFriendModal(props: ModalProps) {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        // addFriend({ variables: { email } });
        console.log("submitting")
        // if(submitted) props.setModalVisible(false)
    }

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
                                <Text style={styles.title} >Add Friend</Text>
                                <TextInput
                                    placeholder="email"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
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