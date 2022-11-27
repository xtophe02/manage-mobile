import { useContext, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { CSSGlobalStyles } from "../constants/style";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";
import { AuthContext } from "../store/auth-context";

import {
  deleteHttpExpense,
  storeExpense,
  storeMileage,
  updateHttpExpense,
  updateHttpMileage,
} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const editedExpenseId = route.params?.expenseId;

  const { updateExpense, addExpense, expenses } = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);
  let initialData;
  if (editedExpenseId) {
    initialData = expenses.expenses.find((exp) => exp.uuid === editedExpenseId);
  }

  function onCancel() {
    navigation.goBack();
  }
  async function onConfirm(expenseData) {
    setIsLoading(true);
    if (editedExpenseId) {
      try {
        // console.log(editedExpenseId);
        // const expenseTypeCtx = expenses.specialTypes.filter(
        //   (it) => it.id === expenseData.expenseType
        // )[0];
        if (expenseData.expenseType === 3) {
          const res = await updateHttpMileage(
            editedExpenseId,
            expenseData,
            token
          );
          updateExpense(editedExpenseId, {
            ...expenseData,
            expenseType: res.expense.expenseType,
            fileMimeType: res.expense.fileMimeType,
            unitPrice: res.expense.unitPrice,
            uuid: res.uuid,
            fileUrl: expenseData.file.uri,
          });
        } else {
          const res = await updateHttpExpense(
            editedExpenseId,
            expenseData,
            token
          );
          updateExpense(editedExpenseId, {
            ...expenseData,
            expenseType: res.expense.expenseType,
            fileMimeType: res.expense.fileMimeType,
            unitPrice: res.expense.unitPrice,
            uuid: res.uuid,
            total: res.expense.total,
            amount: res.expense.amount,
            fileUrl: expenseData.file.uri,
          });
        }

        navigation.goBack();
      } catch (error) {
        setError("Could not fetch expenses!");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        if (expenseData.expenseType === 3) {
          const res = await storeMileage(expenseData, token);

          addExpense({
            ...expenseData,
            expenseType: res.expense.expenseType,
            fileMimeType: res.expense.fileMimeType,
            unitPrice: res.expense.unitPrice,
            uuid: res.uuid,
            fileUrl: expenseData.file.uri,
          });
          navigation.navigate("ExpenseSummary", {
            ...res.expense,
            typeId: expenseData.expenseType,
            fileUrl: expenseData.file.uri,
          });
        } else {
          // const expenseTypeCtx = expenses.specialTypes.filter(
          //   (it) => it.id === expenseData.expenseType
          // )[0];
          // console.log(expenseData);
          const res = await storeExpense(expenseData, token);
          addExpense({
            ...expenseData,
            expenseType: res.expense.expenseType,
            fileMimeType: res.expense.fileMimeType,
            unitPrice: res.expense.unitPrice,
            uuid: res.uuid,
            fileUrl: expenseData.file.uri,
          });

          navigation.navigate("ExpenseSummary", {
            ...res.expense,
            typeId: expenseData.expenseType,
            fileUrl: expenseData.file.uri,
          });
        }
      } catch (error) {
        console.log("ERROR:", error);
        setError("Could add expenses!");
        // navigation.push("AllExpenses");
      } finally {
        setIsLoading(false);
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!editedExpenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, editedExpenseId]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={onCancel}
        onSubmit={onConfirm}
        initialData={initialData}
        specialTypes={expenses.specialTypes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: CSSGlobalStyles.colors.white,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: CSSGlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
