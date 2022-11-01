import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, ActivityIndicator } from "react-native";
import { View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { GET_LC_DATA_QUERY, GET_USER_QUERY } from "../graphql/queries";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfilePieChart from "../components/ProfilePieChart/ProfilePieChart";
import ProfileContributionGraph from "../components/ProfileContributionGraph/ProfileContributionGraph";

interface UserObj {
    id: string,
    name: string,
    email: string,
};

function ProfileScreen() {

    const [username, setUsername] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [lcSubmitStat, setLcSubmitStat] = useState<Array<any>>([]);
    const [lcCalendarStat, setLcCalendarStat] = useState<Array<any>>([]);

    const [getUser, { data, error, loading }] = useLazyQuery(GET_USER_QUERY);
    const [getLCData, { data: lcData, error: lcError, loading: lcLoading }] = useLazyQuery(GET_LC_DATA_QUERY);

    const navigate = useNavigation();

    const getProfile = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigate.navigate("SignIn");;
        } else {
            const decoded = jwt_decode<UserObj>(token);
            getUser({ variables: { id: decoded.id } });
        }
    };

    const getLCProgress = () => {
        getLCData({ variables: { username: username } });
    };

    const formatCalendarData = async (data: any) => {
        const dataArr = [];
        for (let key in data) {
            const date = new Date(Number(key) * 1000).toLocaleDateString("en-CA");
            const dailyData = {
                date: date,
                count: data[key]
            };

            dataArr.push(dailyData);
        }
        return dataArr;
    };

    useEffect(() => {
        if (data) {
            setUsername(data.getUser.name);
            setUserID(data.getUser.id);
        }
    }, [data]);

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (error) {
            Alert.alert(`Error fetching user ${error.message}`);
            navigate.navigate("SignIn");;
        }
    }, [error]);

    useEffect(() => {
        if (username) {
            getLCProgress();
        }
    }, [username]);

    const setContributionData = async (data: any) => {
        const calendarData = await formatCalendarData(data);
        setLcCalendarStat(calendarData);
    }

    useEffect(() => {
        if (lcData) {
            setLcSubmitStat(lcData.getLCData.submitStats);
            // setLcCalendarStat(lcData.submissionCalendar)
            // console.log(JSON.parse(lcData.getLCData.submissionCalendar));
            setContributionData(JSON.parse(lcData.getLCData.submissionCalendar));
        }
    }, [lcData]);

    useEffect(() => {
        if (lcError) {
            console.log(lcError);
        }
    }, [lcError]);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="#F09B2A" />}
            <ProfileHeader userID={userID} username={username} />
            {lcSubmitStat &&
                <ProfilePieChart lcSubmitStat={lcSubmitStat} />
            }
            <ProfileContributionGraph lcCalendarStat={lcCalendarStat} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        width: "100%",
    },
});

export default ProfileScreen;