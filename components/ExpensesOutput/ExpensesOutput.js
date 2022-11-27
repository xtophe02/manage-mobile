import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { CSSGlobalStyles, JSGlobalStyles } from "../../constants/style";
import ExpenseFilters from "./ExpenseFilters";
import LoadingOverlay from "../UI/LoadingOverlay";

export default function ExpensesOutput({
  expenses,
  fallBackText,
  filter,
  onFilter,
  loading,
}) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;
  if (true) {
    content = (
      <ExpensesList expenses={expenses} filter={filter} onFilter={onFilter} />
    );
  }
  return (
    <View style={styles.container}>
      {/* <ExpensesSummary expenses={!loading ? expenses : []} /> */}
      {/* <ExpenseFilters filter={filter} onFilter={onFilter} /> */}
      {loading ? <LoadingOverlay /> : content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: CSSGlobalStyles.colors.white,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
