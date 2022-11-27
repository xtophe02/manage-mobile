import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { CSSGlobalStyles, JSGlobalStyles } from "../../constants/style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "../UI/Dropdown";
import { KM_UNIT_PRICE } from "../../constants/constants";
import UploadButtons from "../Upload/UploadButtons";
import DropdownIOS from "../UI/DropdownIOS";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  initialData,
  specialTypes,
}) {
  const [inputs, setInputs] = useState({
    total: {
      value: initialData ? initialData.total.toString() : "",
      isValid: true,
    },
    amount: {
      value: initialData ? initialData.amount.toString() : "",
      isValid: true,
    },
    effectiveDate: {
      value: initialData ? new Date(initialData.effectiveDate) : new Date(),
      isValid: true,
    },
    description: {
      value: initialData ? initialData.description : "",
      isValid: true,
    },
    expenseType: {
      value: initialData
        ? Number(
            specialTypes.filter(
              (it) =>
                it.name.toLowerCase() === initialData.expenseType.toLowerCase()
            )[0].id
          )
        : 4,
      isValid: true,
    },
    file: {
      value: {
        uri: initialData ? initialData.fileUrl : "",
        type: initialData ? initialData.fileMimeType : "",
      },
      isValid: true,
    },
    calendarShow: initialData ? false : false,
  });

  function inputChangeHandler(identifier, enteredValue) {
    if (typeof identifier === "object") {
      setInputs((prev) => ({
        ...prev,
        effectiveDate: {
          value: enteredValue,
          isValid: true,
        },
        calendarShow: false,
      }));
      return;
    }
    if (identifier === "total") {
      setInputs((prev) => ({
        ...prev,
        total: { value: enteredValue, isValid: true },
        amount: { value: 1, isValid: true },
      }));
    }
    if (identifier === "amount") {
      setInputs((prev) => ({
        ...prev,
        total: {
          value: (+KM_UNIT_PRICE * +enteredValue).toString(),
          isValid: true,
        },
        amount: { value: enteredValue, isValid: true },
      }));
      return;
    }
    setInputs((prev) => ({
      ...prev,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  }
  function submitHandler() {
    const expenseData = {
      total: +inputs.total.value,
      amount: +inputs.amount.value,
      effectiveDate: getFormattedDate(inputs.effectiveDate.value),
      description: inputs.description.value,
      file: inputs.file.value,
      expenseType: inputs.expenseType.value,
    };

    const totalIsValid = !isNaN(expenseData.total) && expenseData.total > 0;
    const amountIsValid =
      !isNaN(expenseData.amount) && 6500 >= expenseData.amount > 0;
    const dateIsValid = expenseData.effectiveDate.toString() !== "Invalid Date";
    const descriptionIsValid =
      Number(expenseData.value) !== 3 &&
      expenseData.description?.trim().length > 0;
    const fileIsValid = Object.values(expenseData.file).length > 0;

    if (
      !totalIsValid ||
      !dateIsValid ||
      (!descriptionIsValid && expenseData.expenseType !== 3) ||
      !fileIsValid ||
      !amountIsValid
    ) {
      // Alert.alert("Invalid input", "Please check your invalid ipnut values");
      // console.log(
      //   totalIsValid,
      //   dateIsValid,
      //   descriptionIsValid,
      //   fileIsValid,
      //   amountIsValid
      // );
      setInputs((prev) => ({
        total: { value: prev.total.value, isValid: totalIsValid },
        amount: { value: prev.amount.value, isValid: amountIsValid },
        effectiveDate: {
          value: prev.effectiveDate.value,
          isValid: dateIsValid,
        },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
        file: {
          value: prev.file.value,
          isValid: fileIsValid,
        },
        expenseType: { ...prev.expenseType },
      }));
      return;
    }
    // setInputs({
    //   total: {
    //     value: "",
    //     isValid: true,
    //   },
    //   amount: {
    //     value: "",
    //     isValid: true,
    //   },
    //   effectiveDate: {
    //     value: new Date(),
    //     isValid: true,
    //   },
    //   description: {
    //     value: "",
    //     isValid: true,
    //   },
    //   expenseType: {
    //     value: 4,
    //     isValid: true,
    //   },
    //   file: {
    //     value: {
    //       uri: "",
    //       type: "",
    //     },
    //     isValid: true,
    //   },
    //   calendarShow: false,
    // });

    onSubmit(expenseData);
  }
  const formIsInvalid =
    !inputs.total.isValid ||
    !inputs.amount.isValid ||
    !inputs.effectiveDate.isValid ||
    !inputs.description.isValid ||
    !inputs.file.isValid;
  // console.log(inputs);

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{ marginHorizontal: 8 }}>
        {inputs.calendarShow && (
          <DateTimePicker
            value={inputs.effectiveDate.value}
            onChange={inputChangeHandler}
            display={Platform.OS === "android" ? "default" : "spinner"}
          />
        )}
        <Text style={JSGlobalStyles.label}>Effective date</Text>
        <Pressable
          onPress={() =>
            setInputs((prev) => ({
              ...prev,
              calendarShow: !prev.calendarShow,
            }))
          }
        >
          <View style={styles.inputContainer}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={CSSGlobalStyles.colors.primary500}
              style={{ paddingRight: 4 }}
            />
            <Text style={styles.effectiveDateText}>
              {getFormattedDate(inputs.effectiveDate.value)}
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: CSSGlobalStyles.colors.gray500,
            marginTop: 30,
            paddingTop: 10,
          }}
        >
          <Text style={styles.title}>Add an expense</Text>

          <Text style={JSGlobalStyles.label}>Select a type of expense</Text>
          {Platform.OS === "ios" ? (
            <DropdownIOS
              items={specialTypes}
              defaultValue={inputs.expenseType.value}
              name="expenseType"
              onFilter={inputChangeHandler}
              withDescription={true}
            />
          ) : (
            <Dropdown
              items={specialTypes}
              defaultValue={inputs.expenseType.value}
              name="expenseType"
              onFilter={inputChangeHandler}
              withDescription={true}
            />
          )}

          {inputs.expenseType.value === 3 ? (
            <Input
              icon={
                <Ionicons
                  name="map-outline"
                  size={18}
                  color={CSSGlobalStyles.colors.primary500}
                />
              }
              style={styles.inputRow}
              label="Mileage amout"
              invalid={!inputs.amount.isValid}
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: (value) => inputChangeHandler("amount", value),
                value: inputs.amount.value,
              }}
            />
          ) : (
            <Input
              icon={
                <Ionicons
                  name="cash-outline"
                  size={18}
                  color={CSSGlobalStyles.colors.primary500}
                />
              }
              style={styles.inputRow}
              label="Total"
              invalid={!inputs.total.isValid}
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: (value) => inputChangeHandler("total", value),

                value: inputs.total.value,
              }}
            />
          )}
        </View>

        {inputs.expenseType.value === 3 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              icon={
                <Ionicons
                  name="logo-euro"
                  size={18}
                  color={CSSGlobalStyles.colors.gray500}
                />
              }
              style={styles.inputRow}
              label="Unit Price"
              textInputConfig={{
                editable: false,
                value: KM_UNIT_PRICE.toFixed(2),
              }}
            />
            <Text>&emsp;</Text>
            <Input
              icon={
                <Ionicons
                  name="logo-euro"
                  size={18}
                  color={CSSGlobalStyles.colors.gray500}
                />
              }
              style={styles.inputRow}
              label="Total"
              textInputConfig={{
                editable: false,
                value: Number(inputs.total.value).toFixed(2),
              }}
            />
          </View>
        ) : (
          <Input
            icon={
              <Ionicons
                name="pencil"
                size={18}
                color={CSSGlobalStyles.colors.primary500}
                // style={{ paddingRight: 4 }}
              />
            }
            label="Description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
              multiline: true,
              numberLines: 4,
              //autoCorrect: false
              //autoCapitalize:'words'

              onChangeText: (value) => inputChangeHandler("description", value),
              value: inputs.description.value,
            }}
          />
        )}
        <View style={{ marginVertical: 8 }}>
          <Text style={JSGlobalStyles.label}>Proof of expense</Text>
          <UploadButtons
            onChangeFile={inputChangeHandler}
            value={inputs.file.value}
            error={!inputs.file.isValid}
          />
        </View>
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data! {"\n"}
            in case of km you can&apos;t exceed 6500km {"\n"} or replace all
            &quot;,&quot; by &quot;.&quot;
          </Text>
        )}
        <View>
          <Button onPress={submitHandler} style={{ flex: 1 }}>
            {!!initialData?.uuid ? "Update" : "Submit"}
          </Button>
          {!!initialData?.uuid && (
            <Button
              onPress={onCancel}
              style={{ flex: 1 }}
              background={CSSGlobalStyles.colors.white}
            >
              Cancel
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flex: 1,
  },
  text: {
    fontFamily: "mulish",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CSSGlobalStyles.colors.gray500,
    // marginVertical: 8,
  },
  effectiveDateText: {
    color: CSSGlobalStyles.colors.primary500,
    fontFamily: "mulish",
  },
  errorText: {
    textAlign: "center",
    color: CSSGlobalStyles.colors.error500,
    margin: 8,
  },
  title: {
    fontFamily: "mulish-bold",
    fontSize: 18,
    paddingVertical: 10,
  },
});
