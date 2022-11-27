import { View, Text, Pressable, StyleSheet } from "react-native";
import { CSSGlobalStyles, JSGlobalStyles } from "../../constants/style";
import Input from "../ManageExpense/Input";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../UI/Button";

export default function Login({ onPassword, onLogin, onChangeInput, inputs }) {
  const [secure, setSecure] = useState(true);
  return (
    <View style={[JSGlobalStyles.container, styles.containerJustifyBetween]}>
      <View>
        <Text style={JSGlobalStyles.mainTitle}>Hi and welcome to Manage !</Text>
        <Input
          icon={
            <Ionicons
              name="mail"
              size={18}
              color={CSSGlobalStyles.colors.primary200}
              style={{ paddingRight: 10 }}
            />
          }
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: (value) => onChangeInput("email", value),
            value: inputs.email.value,
            keyboardType: "email-address",
          }}
        />
        <Input
          icon={
            <Pressable onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye" : "eye-off"}
                size={18}
                color={CSSGlobalStyles.colors.primary200}
                style={{ paddingRight: 10 }}
              />
            </Pressable>
          }
          label="Password"
          invalid={!inputs.password.isValid}
          textInputConfig={{
            onChangeText: (value) => onChangeInput("password", value),
            value: inputs.password.value,
            secureTextEntry: secure,
          }}
        />
      </View>
      <View>
        <Button onPress={onLogin}>Log in</Button>
        <Button background={CSSGlobalStyles.colors.white} onPress={onPassword}>
          Forgot your password ?
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerJustifyBetween: {
    justifyContent: "space-around",
    paddingBottom: 10,
  },
});
