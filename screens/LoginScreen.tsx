import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
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
import useStore from "../store";

export default function Login() {
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
          style={styles.loginButton}
          onPress={() => {
            socket?.emit("login", { username, password });
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text>New? Click here to register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
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
    paddingHorizontal: 40,
    alignItems: "center",
  },
  registerLink: {
    borderWidth: 1,
    borderRadius: 7.5,
    padding: 10,
  },
});
