import { TextInput, View, Text, StyleSheet } from "react-native";
import { JSGlobalStyles } from "../../constants/style";

export default function Input({
  label,
  textInputConfig,
  style,
  invalid,
  icon,
}) {
  const inputStyles = [JSGlobalStyles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(JSGlobalStyles.inputMultiline);
  }

  return (
    <View style={[JSGlobalStyles.inputContainer, style]}>
      <Text
        style={[JSGlobalStyles.label, invalid && JSGlobalStyles.invalidLabel]}
      >
        {label}
      </Text>

      {icon ? (
        <View
          style={[
            JSGlobalStyles.inputWithIcon,
            invalid && JSGlobalStyles.invalidInput,
          ]}
        >
          <TextInput {...textInputConfig} style={{ flex: 1 }} />
          {icon}
        </View>
      ) : (
        <TextInput
          {...textInputConfig}
          style={[inputStyles, invalid && JSGlobalStyles.invalidInput]}
        />
      )}
    </View>
  );
}
