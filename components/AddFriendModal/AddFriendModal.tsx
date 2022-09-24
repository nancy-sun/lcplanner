import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import styles from "./AddFriendModalStyles";

function AddFriendModal() {

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
            // visible={modalVisible}
            // onRequestClose={() => {
            //     setModalVisible(!modalVisible);
            // }}
            >
                {/* <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Hello World!</Text>
                        <Pressable
                            // style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text >Hide Modal</Text>
                        </Pressable>
                    </View>
                </View> */}
            </Modal>
        </View>
    );
};

export default AddFriendModal;