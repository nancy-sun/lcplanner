import * as WebBrowser from "expo-web-browser";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function EditScreenInfo({ path }: { path: string }) {

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text
                    style={[styles.getStartedText, styles.getStartedTextFirst]}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    This is Nancy. 🫡  I built this fullstack app with React Native & Node.js.
                </Text>

                <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    Know more about this project or reach me at:
                </Text>
            </View>

            <View style={styles.linksContainer}>
                <Entypo name="linkedin-with-circle" size={30} color="#222222" onPress={linkToLinkedin} />
                <AntDesign name="github" size={28} color="#222222" onPress={linkToGithub} />
                <Entypo name="email" size={28} color="#222222" onPress={linkToEmail} />
            </View>
        </View>
    );
};

function linkToLinkedin() {
    WebBrowser.openBrowserAsync(
        "https://www.linkedin.com/in/-nancy-sun/"
    );
};

function linkToGithub() {
    WebBrowser.openBrowserAsync(
        "https://github.com/nancy-sun"
    );
};

function linkToEmail() {
    Linking.openURL("mailto:nancysnx1110@gmail.com");
};

const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 45,
        justifyContent: "space-between",
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
    },
    getStartedTextFirst: {
        marginBottom: 10
    },
    linksContainer: {
        marginTop: 40,
        marginHorizontal: 100,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: "center",
    },
});
