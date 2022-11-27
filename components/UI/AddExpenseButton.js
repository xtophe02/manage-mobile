import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CSSGlobalStyles } from "../../constants/style";

export default function AddExpenseButton({ specialTypes }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("ManageExpense")}>
      <View style={styles.container}>
        <Text style={styles.text}>
          <Ionicons name="add" size={20} />
          Add Expense
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CSSGlobalStyles.colors.primary500,
  },
  text: {
    textAlign: "center",
    color: CSSGlobalStyles.colors.white,
    fontFamily: "mulish",
    fontSize: 16,
  },
});
