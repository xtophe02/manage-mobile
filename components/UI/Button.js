import { Pressable, StyleSheet, View, Text } from "react-native";
import { CSSGlobalStyles } from "../../constants/style";

export default function Button({ children, mode, style, onPress, background }) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            background && { backgroundColor: background },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              background && { color: CSSGlobalStyles.colors.primary500 },
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: CSSGlobalStyles.colors.primary500,
    marginVertical: 6,
    borderColor: CSSGlobalStyles.colors.primary500,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: CSSGlobalStyles.colors.white,
    textAlign: "center",
    fontFamily: "mulish",
  },
  flatText: {
    color: CSSGlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: CSSGlobalStyles.colors.primary100,
    borderRadius: 5,
  },
});
