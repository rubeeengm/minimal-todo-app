import { Text, View } from "react-native";
import CheckBox from "./CheckBox";
import moment from "moment";
import * as React from "react";

export default function Todo({ id, text, isCompleted, isToday, hour }) {
    const [localHour, setLocalHour] = React.useState(new Date(hour));

    return (
        <View style={styles.container}>
            <CheckBox
                id={id}
                text={text}
                isCompleted={isCompleted}
                isToday={isToday}
                hour={hour}
            />
            <View>
                <Text
                    style={
                        isCompleted
                            ? [
                                  styles.text,
                                  {
                                      textDecorationLine: "line-through",
                                      color: "#73737330",
                                  },
                              ]
                            : styles.text
                    }
                >
                    {text}
                </Text>
                <Text
                    style={
                        isCompleted
                            ? [
                                  styles.time,
                                  {
                                      textDecorationLine: "line-through",
                                      color: "#73737330",
                                  },
                              ]
                            : styles.time
                    }
                >
                    {moment(localHour).format("LT")}
                </Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        color: "#737373",
    },
    time: {
        fontSize: 13,
        fontWeight: "500",
        color: "#a3a3a3",
    },
};
