import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from "react-native-chart-kit";

type PieChartItem = {
    name: String,
    count: number,
    color: string,
    legendFontColor: string,
    legendFontSize: number,
};

function ProfilePieChart({ lcSubmitStat }: { lcSubmitStat: Array<any> }) {

    const screenWidth = Dimensions.get("window").width;
    const [pieChartData, setPieChartData] = useState<Array<PieChartItem>>();
    const [totalProblemsDone, setTotalProblemsDone] = useState<number>(0);

    const generateChartData = () => {
        const data: Array<PieChartItem> = [];
        lcSubmitStat.forEach((stat) => {
            if (stat.difficulty !== "All") {
                const difficulty: string = stat.difficulty.toLowerCase();
                const statData = {
                    name: difficulty,
                    count: stat.count,
                    color: pieChatColorTheme.get(difficulty) || "black",
                    legendFontColor: "#191919",
                    legendFontSize: 17
                };
                data.push(statData);
            }
        });
        setTotalProblemsDone(lcSubmitStat[0]?.count);
        setPieChartData(data);
    }

    useEffect(() => {
        generateChartData();
    }, [lcSubmitStat]);

    return (
        <View>
            {pieChartData &&
                <PieChart
                    data={pieChartData}
                    width={screenWidth}
                    height={180}
                    chartConfig={chartConfig}
                    accessor={"count"}
                    backgroundColor={"transparent"}
                    paddingLeft={totalProblemsDone > 0 ? "25" : "-155"}
                    absolute
                />
            }
        </View>
    )
};

const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5,
};

const pieChatColorTheme = new Map([
    ["easy", "#448f4b"],
    ["medium", "#f09a2a"],
    ["hard", "#eb445a"],
]);

export default ProfilePieChart;