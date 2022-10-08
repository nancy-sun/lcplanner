import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#b7b7b7",
        backgroundColor: "green",
    },
    defaultAvatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#b7b7b7",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;