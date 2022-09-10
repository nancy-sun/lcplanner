import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import UserList from '../components/UserList/UserList';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <UserList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: 14,
    }
});
