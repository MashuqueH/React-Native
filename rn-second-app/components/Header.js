import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/color";
import DefaultStyles from "../constants/defualt-styles";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={{ ...styles.headerTitle, ...DefaultStyles.title }}>
                {props.title}
            </Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 80,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: 24,
    },
});
