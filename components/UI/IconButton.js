import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CSSGlobalStyles } from "../../constants/style";

export default function IconButton({
  icon,
  size,
  color,
  onPress,
  children,
  background,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ flex: 1 }, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.buttonContainer,
          background && { backgroundColor: background },
        ]}
      >
        <Ionicons
          name={icon}
          color={color}
          size={size}
          style={{ paddingRight: 8 }}
        />
        <Text style={[styles.text, { color: color }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 6,
    // marginHorizontal: 8,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: CSSGlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontFamily: "mulish",
  },
});
