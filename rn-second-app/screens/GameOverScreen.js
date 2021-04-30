import React from "react";
import {
    Button,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import DefaultStyles from "../constants/defualt-styles";
import Colors from "../constants/color";
import MainButton from "../components/MainButton";

const { height, width } = Dimensions.get("window");

const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Game over!</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/success.png")}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text
                        style={{
                            ...DefaultStyles.bodyText,
                            ...styles.resultText,
                        }}
                    >
                        Your phone needed{" "}
                        <Text
                            style={{
                                ...DefaultStyles.title,
                                ...styles.highlight,
                            }}
                        >
                            {props.numbRounds}
                        </Text>{" "}
                        rounds to guess the number{" "}
                        <Text
                            style={{
                                ...DefaultStyles.title,
                                ...styles.highlight,
                            }}
                        >
                            {props.userNumber}
                        </Text>
                    </Text>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    imageContainer: {
        borderRadius: (width * 0.7) / 2,
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.7,
        height: width * 0.7,
        overflow: "hidden",
        marginVertical: height / 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        marginVertical: 15,
        marginHorizontal: height / 60,
        fontSize: height < 400 ? 16 : 20,
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
    },
});
