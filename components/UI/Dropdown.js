import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, View, Platform, Text } from "react-native";
import { CSSGlobalStyles } from "../../constants/style";

export default function Dropdown({
  items,
  defaultValue,
  onFilter,
  name,
  withDescription = false,
}) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => {
            onFilter(name, itemValue);
            setSelected(itemValue);
          }}
          // itemStyle={{ fontSize: 8 }}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.name}
              value={item.id}
              style={styles.valueStyle}
            />
          ))}
        </Picker>
      </View>
      {withDescription && selected !== 3 && (
        <Text style={styles.withDescription}>
          *{items.filter((it) => it.id === selected)[0]?.description}
        </Text>
      )}
    </>
  );
}
const android = Platform.OS === "android";
const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    borderWidth: android && 1,
    borderColor: android && CSSGlobalStyles.colors.gray500,
    borderRadius: android && 5,
    marginBottom: 8,
  },
  valueStyle: {
    fontFamily: "mulish",
  },
  withDescription: {
    fontFamily: "mulish",
    fontStyle: "italic",
    fontSize: 10,
  },
});
