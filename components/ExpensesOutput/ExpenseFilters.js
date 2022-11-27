import { StyleSheet, View, Text } from "react-native";
import { MONTHS, YEARS } from "../../constants/constants";
import { CSSGlobalStyles } from "../../constants/style";
import Dropdown from "../UI/Dropdown";

export default function ExpenseFilters({ filter, onFilter }) {
  return (
    <>
      <Text style={styles.title}>My expenses</Text>
      <View style={styles.container}>
        <Dropdown
          items={[{ name: "All months", id: 0 }, ...MONTHS]}
          defaultValue={filter.month}
          onFilter={onFilter}
          name="month"
        />
        <Text>&emsp;</Text>

        <Dropdown
          items={YEARS}
          defaultValue={filter.year}
          onFilter={onFilter}
          name="year"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: CSSGlobalStyles.colors.gray500,
    borderBottomWidth: 1,
    paddingBottom: 20,
    margin: 8,
  },
  title: {
    fontFamily: "mulish-bold",
    fontSize: 24,

    paddingVertical: 12,
  },
});
