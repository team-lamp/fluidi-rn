import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet} from 'react-native';

import LoginScreen from './LoginScreen';

const FluidiContainer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    if (isAuthenticated) {
        return <HomeScreen />
    } else {
        return <LoginScreen />
    }
}

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default FluidiContainer