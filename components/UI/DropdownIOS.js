import { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
// You can import from local files
import DropDownPicker from "react-native-dropdown-picker";
import { CSSGlobalStyles } from "../../constants/style";

export default function DropdownIOS({
  items,
  defaultValue,
  onFilter,
  name,
  withDescription = false,
}) {
  let itemsArr = [];
  items.map((el) => itemsArr.push({ label: el.name, value: el.id }));
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [itemsVal, setItemsVal] = useState(itemsArr);

  return (
    <>
      <View style={styles.container}>
        <DropDownPicker
          textStyle={{
            fontSize: 16,
            fontFamily: "mulish",
          }}
          style={{
            borderColor: CSSGlobalStyles.colors.gray500,
            borderRadius: 5,
          }}
          open={open}
          value={value}
          items={itemsVal}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItemsVal}
          listMode="MODAL"
          onChangeValue={(value) => {
            onFilter(name, value);
          }}
        />
      </View>
      {withDescription && value !== 3 && (
        <Text style={styles.withDescription}>
          *{items.filter((it) => it.id === value)[0]?.description}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "mulish",
    textAlign: "center",
  },
  withDescription: {
    fontFamily: "mulish",
    fontStyle: "italic",
    fontSize: 10,
  },
});
