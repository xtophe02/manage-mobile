import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CSSGlobalStyles } from "../../constants/style";

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={CSSGlobalStyles.colors.primary500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: CSSGlobalStyles.colors.white,
  },
});
