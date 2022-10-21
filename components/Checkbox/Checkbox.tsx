import React from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./CheckboxStyles";

interface CheckBoxProps {
    isChecked: boolean,
    onPress: () => void
};

function Checkbox({ isChecked, onPress }: CheckBoxProps) {
    const name = isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline";
    return (
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons name={name} size={24} style={styles.checkbox} />
        </Pressable>
    );
};

export default Checkbox;