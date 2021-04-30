import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";

import GoalItem from "./components/GoalItem";

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const handleSetcourseGoals = (goal) => {
        setCourseGoals((currentGoals) => [
            ...currentGoals,
            { id: Math.random().toString(), value: goal },
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = (goalId) => {
        setCourseGoals((currentGoals) => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <Button title='Add new goal' onPress={() => setIsAddMode(true)} />
            <GoalInput
                handleSetcourseGoals={handleSetcourseGoals}
                isVisible={isAddMode}
                onCancel={cancelGoalAdditionHandler}
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={courseGoals}
                renderItem={(itemData) => (
                    <GoalItem
                        title={itemData.item.value}
                        goalId={itemData.item.id}
                        onDelete={removeGoalHandler}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
});
