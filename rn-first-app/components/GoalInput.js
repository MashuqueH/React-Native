import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

const GoalInput = (props) => {
    const [enteredGoal, setEnteredGoal] = useState("");

    const handleSetenteredGoal = (enteredText) => {
        setEnteredGoal(() => enteredText);
    };

    const addGoalHandle = () => {
        if (enteredGoal.length === 0) {
            return;
        }
        props.handleSetcourseGoals(enteredGoal);
        setEnteredGoal(() => "");
    };

    return (
        <Modal visible={props.isVisible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Course Goal'
                    style={styles.input}
                    onChangeText={handleSetenteredGoal}
                    value={enteredGoal}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title='Cancel'
                            color='red'
                            onPress={props.onCancel}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title='Add' onPress={addGoalHandle} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        width: "80%",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        width: "60%",
    },
    button: {
        width: "40%",
        marginRight: 5,
    },
});
