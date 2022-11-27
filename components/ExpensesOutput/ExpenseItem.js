import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { createManageHeaders, MANAGE_API_URL } from "../../constants/constants";
import { checkStatus, CSSGlobalStyles } from "../../constants/style";
import { AuthContext } from "../../store/auth-context";
import { ExpensesContext } from "../../store/expenses-context";
import { getFormattedDate } from "../../util/date";
import { deleteHttpExpense } from "../../util/http";
import ErrorOverlay from "../UI/ErrorOverlay";
import IconButton from "../UI/IconButton";
import ImageDisplay from "../UI/ImageDisplay";
import LoadingOverlay from "../UI/LoadingOverlay";

export default function ExpenseItem(data) {
  const {
    uuid,
    effectiveDate,
    status,
    statusComment,
    expenseType,
    description,
    unitPrice,
    amount,
    total,
    fileUrl,
    fileMimeType,
  } = data;
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const { deleteExpense } = useContext(ExpensesContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <LoadingOverlay />;
  }
  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  async function deleteHandler(uuid) {
    setLoading(true);
    try {
      await deleteHttpExpense(uuid, token);
      // navigation.push("AllExpenses");
      deleteExpense(uuid);
    } catch (error) {
      console.log(error);
      setError("Could not fetch expenses!");
    } finally {
      setLoading(false);
    }
  }

  // console.log(description);
  return (
    <View style={styles.container}>
      <View style={styles.containerBorderBottom}>
        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.textExpenseType}>{expenseType}</Text>
            <Text
              style={[
                styles.textBase,
                { color: CSSGlobalStyles.colors.primary500 },
              ]}
            >
              {getFormattedDate(new Date(effectiveDate))}
            </Text>
          </View>
          <View>{checkStatus(Number(status))}</View>
        </View>
      </View>
      {statusComment && (
        <Text style={styles.statusComment}>{statusComment}</Text>
      )}
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.expenseItem}>
        <Text style={styles.math}>
          {Number(amount).toFixed(2)} x {Number(unitPrice).toFixed(2)} &euro;
        </Text>
        <Text style={styles.total}>-{total.toFixed(2)}&euro;</Text>
      </View>

      <ImageDisplay fileMimeType={fileMimeType} fileUrl={fileUrl} />
      {status === 1 && (
        <View style={styles.expenseItem}>
          <IconButton
            icon="pencil"
            color={CSSGlobalStyles.colors.white}
            onPress={() =>
              navigation.navigate("ManageExpense", {
                expenseId: uuid,
              })
            }
          >
            Edit
          </IconButton>
          <Text>&emsp;</Text>
          <IconButton
            icon="trash"
            color={CSSGlobalStyles.colors.white}
            background={CSSGlobalStyles.colors.error500}
            onPress={() => deleteHandler(uuid)}
          >
            Delete
          </IconButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    padding: 12,
    margin: 8,

    backgroundColor: CSSGlobalStyles.colors.whitish,
    borderRadius: 6,
    borderColor: "rgba(30, 20, 51, 0.1)",
    borderWidth: 1,
  },
  containerBorderBottom: {
    borderBottomColor: CSSGlobalStyles.colors.gray500,
    borderBottomWidth: 1,
    paddingBottom: 14,
    marginBottom: 14,
  },
  expenseItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textBase: {
    fontFamily: "mulish",
  },
  description: {
    fontSize: 12,
    marginVertical: 8,
    fontFamily: "mulish",
  },
  textExpenseType: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "mulish-bold",
  },

  total: {
    color: CSSGlobalStyles.colors.error500,
    fontFamily: "mulish-bold",
  },
  math: {
    fontFamily: "mulish-bold",
    fontSize: 14,
    color: "rgba(30, 20, 51, 0.5)",
  },
  statusComment: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(30, 20, 51, 0.1)",
    borderRadius: 5,
    padding: 12,
    fontSize: 12,
    fontFamily: "mulish",
    marginVertical: 8,
  },
});
