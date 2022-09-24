import React from "react";
import { Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from "./SignOutButtonStyles";


function SignOutButton() {

    const navigate = useNavigation();

    const handlePress = async () => {
        await AsyncStorage.removeItem("token");
        navigate.navigate("SignIn");
    }

    return (
        <Pressable onPress={handlePress}>
            <MaterialIcons name="logout" size={29} style={styles.button} />
        </Pressable>
    )
}

export default SignOutButton;