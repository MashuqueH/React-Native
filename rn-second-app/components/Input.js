import React from "react";
import { StyleSheet, TextInput } from "react-native";

import DefaultStyles from "../constants/defualt-styles";

const Input = (props) => {
    return (
        <TextInput
            {...props}
            style={{
                ...styles.input,
                ...props.style,
                ...DefaultStyles.bodyText,
            }}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});
