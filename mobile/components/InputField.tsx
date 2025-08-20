import React from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  className, // not used since we’re keeping styles inside
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          {/* ✅ Custom font applied here */}
          <Text style={styles.label}>{label}</Text>

          <View style={styles.container}>
            {icon && <Image source={icon} style={styles.icon} />}

            {/* ✅ Custom font applied here */}
            <TextInput
              style={styles.input}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "Jakarta-Bold",
    color: "#111",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 9999, // full round
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    textAlign: "left",
    borderRadius: 9999,
    fontFamily: "Jakarta-SemiBold",
	color: "#111",
  },
});
