import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        backgroundColor: "white",
    },
    input: {
        color: "#191919",
        fontSize: 20,
        width: "100%",
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#b7b7b7",
        padding: 12,
        height: 40,
    },

    submitButton: {
        height: 40,
        width: "100%",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f09a2a",
        marginTop: 14,
    },
    submitText: {
        fontSize: 21,
        fontWeight: "500",
        color: "white",
        marginHorizontal: 10,
    },
    signUpButton: {
        height: 39.8,
        width: "100%",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#f09a2a",
        marginTop: 14,
        marginLeft: 10,
        marginRight: 10,
    },
    signUpText: {
        fontSize: 19.8,
        fontWeight: "500",
        color: "#f09a2a",
    }
});

export default styles;