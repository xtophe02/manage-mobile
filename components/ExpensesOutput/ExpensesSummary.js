import { StyleSheet, Text, View } from "react-native";
import { CSSGlobalStyles, JSGlobalStyles } from "../../constants/style";

export default function ExpensesSummary({ expenses }) {
  const expensesSum = expenses?.reduce(
    (sum, expense) => sum + expense.total,
    0
  );
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={JSGlobalStyles.subtitleTitle}>My expenses</Text>
      <View style={styles.container}>
        <Text style={styles.sum}>{expensesSum.toFixed(2)} &euro;</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: CSSGlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sum: {
    fontSize: 16,
    fontFamily: "mulish-bold",
    color: CSSGlobalStyles.colors.primary500,
  },
});
