import { FlatList, Text } from "react-native";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ expenses, filter, onFilter }) {
  return (
    <FlatList
      ListHeaderComponent={
        <ExpenseFilters filter={filter} onFilter={onFilter} />
      }
      data={expenses}
      renderItem={({ item }) => <ExpenseItem {...item} />}
      keyExtractor={({ uuid }) => uuid}
      maxToRenderPerBatch={6}
    />
  );
}
