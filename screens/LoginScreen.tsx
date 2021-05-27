import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { API_URL } from "../constants/secrets";

export default function Login({ setIsAuthenticated }: any) {
  const [username, setUsername] = useState("chance");
  const [password, setPassword] = useState("password");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fluidi</Text>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => login(username, password)}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
  async function login(username: string, password: string) {
    const url = `${API_URL}/users/login`;
    const payload = {
      user: {
        username,
        password,
      },
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      // if successful (meaning we got here), set authenticated to true
      setIsAuthenticated(true);
    } catch (err) {
      console.log("error", err)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F80ED",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
  },
  form: {
    width: Dimensions.get("screen").width,
    height: 300,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#2F80ED",
    width: "90%",
    borderRadius: 50,
    height: 30,
    borderBottomWidth: 1,
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 7.5,
    padding: 10,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
  },
});
