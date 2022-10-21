import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./AddFriendButtonStyles";

function AddFriendButton({ setModalVisible }: any) {
    return (
        <Pressable
            onPress={() => setModalVisible(true)}
        >
            <Ionicons name="add-circle" size={28} style={styles.button} />
        </Pressable>
    );
};

export default AddFriendButton;
