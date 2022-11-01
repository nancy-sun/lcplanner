import React from "react";
import { View } from "../Themed";
import { Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { ContributionChartValue } from "react-native-chart-kit/dist/contribution-graph/ContributionGraph";

function ProfileContributionGraph({ lcCalendarStat }: { lcCalendarStat: Array<any> }) {
    const screenWidth = Dimensions.get("window").width;

    const handleToolTip: any = {}

    return (
        <View>
            {lcCalendarStat &&
                <ContributionGraph
                    values={lcCalendarStat}
                    endDate={new Date(Date.now())}
                    numDays={105}
                    width={screenWidth}
                    height={220}
                    showOutOfRangeDays
                    style={{
                        borderRadius: 16,
                        marginLeft: -22
                    }}
                    chartConfig={chartConfig}
                    tooltipDataAttrs={(value) => handleToolTip}
                />
            }
        </View>
    );
};

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(240, 154, 42, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default ProfileContributionGraph;