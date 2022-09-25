import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    modalView: {
        margin: 8,
        marginBottom: 95,
        width: "90%",
        justifyContent: "space-between",
        height: "25%",
        backgroundColor: "#f3f3f3",
        borderRadius: 4,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        color: "#191919",
        fontSize: 20,
        width: "100%",
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#b7b7b7",
        paddingLeft: 12,
        paddingRight: 12,
        height: 42,
        backgroundColor: "white"
    },
    title: {
        fontSize: 23,
        fontWeight: "600",
        marginBottom: 5
    },
    submitButton: {
        height: 35,
        width: "48%",
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f09a2a",
        marginTop: 2
    },
    submitText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white",
    },
});

export default styles;