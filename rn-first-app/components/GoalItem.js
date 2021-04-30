import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const GoalItem = ({ title, goalId, onDelete }) => {
    return (
        <TouchableOpacity onPress={onDelete.bind(this, goalId)}>
            <View style={styles.listItem}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default GoalItem;

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: "#ccc",
        borderColor: "black",
        borderWidth: 1,
        marginVertical: 10,
    },
});
