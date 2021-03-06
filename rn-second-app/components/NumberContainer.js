import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/color";

const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
    },
});
