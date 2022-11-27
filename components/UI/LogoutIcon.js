import { View, Text, StyleSheet } from "react-native";
import { CSSGlobalStyles } from "../../constants/style";

export default function LougoutIcon({ user }) {
  return (
    <View style={styles.rounded}>
      <Text style={styles.letters}>{`${user.givenName.charAt(
        0
      )}${user.familyName.charAt(0)}`}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  rounded: {
    borderWidth: 2,
    borderColor: CSSGlobalStyles.colors.white,
    borderRadius: 100,
    padding: 10,
    margin: 10,
  },
  letters: {
    fontFamily: "mulish-bold",
    fontSize: 18,
    color: CSSGlobalStyles.colors.white,
  },
});
