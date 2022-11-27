import { ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import ImageDisplay from "../components/UI/ImageDisplay";
import { Ionicons } from "@expo/vector-icons";
import { CSSGlobalStyles } from "../constants/style";
import { getFormattedDate } from "../util/date";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export default function ExpenseSummary({ route, navigation }) {
  const {
    fileMimeType,
    amount,
    description,
    effectiveDate,
    expenseType,
    typeId,
    total,
    fileUrl,
    unitPrice,
  } = route.params;

  console.log("PARAMS", route.params);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Thank you! {"\n"}Your expense has been sent for approval
        </Text>
        <Text style={styles.subtitle}>Summary</Text>
        <View style={styles.summaryContainer}>
          <Input
            icon={
              <Ionicons
                name="calendar-outline"
                size={18}
                color={CSSGlobalStyles.colors.primary500}
              />
            }
            label="Effective date"
            textInputConfig={{
              editable: false,
              placeholder: getFormattedDate(new Date(effectiveDate)),
              placeholderTextColor: CSSGlobalStyles.colors.primary500,
            }}
          />

          <Input
            icon={
              <Ionicons
                name="pricetag-outline"
                size={18}
                color={CSSGlobalStyles.colors.primary500}
              />
            }
            label="Select a type of expense"
            textInputConfig={{
              editable: false,
              // value: expenseType,
              placeholder: expenseType,
              placeholderTextColor: CSSGlobalStyles.colors.primary500,
            }}
          />

          {typeId === 3 ? (
            <View style={styles.rowContainer}>
              <View style={{ flex: 1 }}>
                <Input
                  label="KM amount"
                  textInputConfig={{
                    editable: false,
                    placeholder: `${Number(amount).toFixed(2)} km x ${Number(
                      unitPrice
                    ).toFixed(2)} €`,
                    placeholderTextColor: CSSGlobalStyles.colors.primary500,
                  }}
                />
              </View>

              <Text>&emsp;</Text>
              <View style={{ flex: 1 }}>
                <Input
                  label="KM amount"
                  textInputConfig={{
                    editable: false,
                    placeholder: `${Number(amount * unitPrice).toFixed(2)} €`,
                    placeholderTextColor: CSSGlobalStyles.colors.primary500,
                  }}
                />
              </View>
            </View>
          ) : (
            <>
              <Input
                icon={
                  <Ionicons
                    name="pencil"
                    size={18}
                    color={CSSGlobalStyles.colors.primary500}
                  />
                }
                label="Description"
                textInputConfig={{
                  editable: false,
                  placeholder: description,
                  placeholderTextColor: CSSGlobalStyles.colors.primary500,
                }}
              />
              <Input
                icon={
                  <Ionicons
                    name="logo-euro"
                    size={18}
                    color={CSSGlobalStyles.colors.primary500}
                  />
                }
                label="Total"
                textInputConfig={{
                  editable: false,
                  placeholder: total.toString(),
                  placeholderTextColor: CSSGlobalStyles.colors.primary500,
                }}
              />
            </>
          )}

          <Text style={{ fontFamily: "mulish-bold", marginVertical: 10 }}>
            Proof of expense
          </Text>
          <ImageDisplay fileUrl={fileUrl} fileMimeType={fileMimeType} />

          <View>
            <Button
              onPress={() => navigation.navigate("ManageExpense")}
              background={CSSGlobalStyles.colors.white}
            >
              Add a new expense
            </Button>
            <Button onPress={() => navigation.navigate("AllExpenses")}>
              Back to dashboard
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "mulish-bold",
    color: CSSGlobalStyles.colors.primary500,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 12,
    padding: 16,
  },
  subtitle: {
    fontFamily: "mulish-bold",
    fontSize: 16,
    marginVertical: 10,
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: "rgba(30, 20, 51, 0.1)",
    borderRadius: 5,
    padding: 16,
    backgroundColor: "#FBFAFF",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: { width: "100%", height: 200, marginVertical: 8 },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
