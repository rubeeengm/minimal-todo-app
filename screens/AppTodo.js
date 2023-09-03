import * as React from "react";
import {
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AddTodo() {
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [showPicker, setShowPicker] = React.useState(false);
    const [isToday, setIsToday] = React.useState(false);

    const listTodos = useSelector((state) => state.todos.todos);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // TODO UUID should be implemented
    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: date.toString(),
            isToday: isToday,
            isCompleted: false,
        };
        try {
            await AsyncStorage.setItem(
                "@Todos",
                JSON.stringify([...listTodos, newTodo]),
            );
            dispatch(addTodoReducer(newTodo));
            console.log("Todo saved correctly");
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Task"
                    placeholderTextColor={"#00000030"}
                    onChangeText={(text) => {
                        setName(text);
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Hour</Text>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode={"time"}
                        is24Hour={true}
                        onChange={(event, selectedDate) =>
                            setDate(selectedDate)
                        }
                        style={{ width: "80%" }}
                    />
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => {
                        setIsToday(value);
                    }}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>

            <Text style={{ color: "#00000060" }}>
                If you disable today,the task will be considered as tomorrow
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 24,
    },
    textInput: {
        borderBottomColor: "#00000030",
        borderBottomWidth: 1,
        width: "80%",
    },
    inputContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        height: 46,
        borderRadius: 11,
    },
});
