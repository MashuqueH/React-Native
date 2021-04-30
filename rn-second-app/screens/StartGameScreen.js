import React, { useState } from "react";
import {
    Button,
    Keyboard,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/color";
import DefaultStyles from "../constants/defualt-styles";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window"));

    const updateLayout = () => {
        setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const resetImportHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };

    const confirmInputHanlder = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 100) {
            Alert.alert(
                "Invalid Number",
                "Number has to be a number between 1 and 99",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetImportHandler,
                    },
                ]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <Text
                            style={{ ...DefaultStyles.title, ...styles.title }}
                        >
                            Start a New Game!
                        </Text>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyles.bodyText}>
                                Select a Number
                            </Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={{ width: buttonWidth }}>
                                <View style={styles.button}>
                                    <Button
                                        title='Reset'
                                        color={Colors.accent}
                                        onPress={resetImportHandler}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title='Confirm'
                                        color={Colors.primary}
                                        onPress={confirmInputHanlder}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        width: Dimensions.get("window").width / 4,
    },
    input: {
        width: "10%",
        textAlign: "center",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});
