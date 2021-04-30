import React, { useState, useRef, useEffect } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/defualt-styles";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>
            #{listLength - itemData.index}
        </Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "greater" && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [
                {
                    text: "Sorry!",
                    style: "cancel",
                },
            ]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );

        setCurrentGuess(nextNumber);
        setPastGuesses((pastGuesses) => [
            ...pastGuesses,
            nextNumber.toString(),
        ]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses
                        .reverse()
                        .map((guess, index) =>
                            renderListItem(guess, pastGuesses.length - index)
                        )}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                ></FlatList>
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 400,
        maxWidth: "90%",
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    },
    list: {
        flexGrow: 1,
        // alignItems: "center",
        justifyContent: "flex-end",
    },
    listItem: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        padding: 15,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
