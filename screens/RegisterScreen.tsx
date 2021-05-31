import { useNavigation } from "@react-navigation/core";
import axios from "axios";
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

import useStore from "../store";

export default function Register() {
  const [username, setUsername] = useState("chance");
  const [password, setPassword] = useState("password");
  const navigation = useNavigation();
  const socket = useStore((state) => state.socket);

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
          style={styles.registerButton}
          onPress={() => {
            register(username, password);
          }}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Already have an account? Click here to login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );

  async function register(username: string, password: string) {
    axios
      .post(`${API_URL}/auth/register`, { username, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
  registerButton: {
    borderWidth: 1,
    borderRadius: 7.5,
    padding: 10,
    width: Dimensions.get("screen").width / 3,
    alignItems: "center",
  },
  loginLink: {
    borderWidth: 1,
    borderRadius: 7.5,
    padding: 10,
  },
});
