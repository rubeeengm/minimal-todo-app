import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckBox({ id, text, isCompleted, isToday, hour }) {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);

    const handleCheckBox = () => {
        try {
            dispatch(updateTodoReducer({ id, isCompleted }));
            AsyncStorage.setItem(
                "@Todos",
                JSON.stringify(
                    todos.map((todo) => {
                        if (todo.id === id) {
                            return { ...todo, isCompleted: !todo.isCompleted };
                        }
                        return todo;
                    }),
                ),
            );

            console.log("Todo saved correctly");
        } catch (e) {
            console.log(e);
        }
    };

    return isToday ? (
        <TouchableOpacity
            onPress={handleCheckBox}
            style={isCompleted ? styles.checked : styles.unChecked}
        >
            {isCompleted && <Entypo name="check" size={16} color="#FAFAFA" />}
        </TouchableOpacity>
    ) : (
        <View style={styles.isToday} />
    );
}

const styles = StyleSheet.create({
    checked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6,
        backgroundColor: "#262626",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    unChecked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        borderRadius: 6,
        backgroundColor: "#fff",
        marginLeft: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    isToday: {
        width: 10,
        height: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#262626",
        marginRight: 13,
        marginLeft: 13,
    },
});
