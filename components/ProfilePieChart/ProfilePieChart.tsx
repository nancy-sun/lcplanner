import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


function ProfilePieChart() {

    const screenWidth = Dimensions.get("window").width;

    const getLCProgress = () => {

    }

    useEffect(() => {
        getLCProgress();
    }, [])

    return (
        <View>
            {/* <PieChart
                // data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
            /> */}
        </View>
    )
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};


export default ProfilePieChart;