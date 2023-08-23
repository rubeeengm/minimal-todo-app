import { Image, StyleSheet, Text, View } from "react-native";
import TodoList from "../components/TodoList";
import { todosData } from "../data/todos";

export default function Home() {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cleaning-1593202999.jpg",
                }}
                style={styles.pic}
            />

            <Text style={styles.title}>Today</Text>
            <TodoList todosData={todosData.filter((todo) => todo.isToday)} />

            <Text style={styles.title}>Tomorrow</Text>
            <TodoList todosData={todosData.filter((todo) => !todo.isToday)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: "flex-end",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 35,
        marginTop: 10,
    },
});
