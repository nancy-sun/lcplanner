import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CheckBoxProps {
    isChecked: boolean,
    onPress: () => void
}

function Checkbox(props: CheckBoxProps) {
    const name = props.isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline";
    const { onPress, isChecked } = props;
    return (
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons name={name} size={24} style={styles.checkbox} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        marginTop: 4.5,
        color: "#f09a2a"
    },
});

export default Checkbox;