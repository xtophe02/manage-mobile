import { StyleSheet, Text } from "react-native";

export const CSSGlobalStyles = {
  colors: {
    primary50: "#e4d9fd",
    primary100: "#bcb3f2",
    primary200: "#ACA0F9",
    primary400: "#5721d4",
    primary500: "#5A41F3",
    primary700: "#2d0689",
    primary800: "#200364",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#EC295C",
    gray500: "#D2D0D6",
    gray700: "#221c30",
    white: "#fff",
    whitish: "rgba(246, 245, 254, 0.5)",
  },
};

export const JSGlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: CSSGlobalStyles.colors.white,
  },
  mainTitle: {
    fontFamily: "mulish-bold",
    fontSize: 32,
    textAlign: "center",
    paddingVertical: 32,
  },
  subtitleTitle: {
    fontFamily: "mulish-bold",
    fontSize: 24,

    paddingVertical: 12,
  },
  inputContainer: {
    // marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    fontFamily: "mulish-bold",
    marginBottom: 4,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "mulish",
    borderColor: CSSGlobalStyles.colors.gray500,
    borderWidth: 1,
  },
  inputWithIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: CSSGlobalStyles.colors.gray500,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "mulish",
  },
  invalidLabel: {
    color: CSSGlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: CSSGlobalStyles.colors.error50,
  },
  statusText: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    borderRadius: 50,
    color: "white",
    fontFamily: "mulish-bold",
  },
});

export function checkStatus(num) {
  switch (num) {
    case 1:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#5A41F3" }]}
        >
          To check
        </Text>
      );
    case 2:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#FFBB2A" }]}
        >
          Pending
        </Text>
      );
    case 3:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#33ABF2" }]}
        >
          To pay
        </Text>
      );
    case 4:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#007970" }]}
        >
          Paid
        </Text>
      );
    case 5:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#EC295C" }]}
        >
          Declined
        </Text>
      );
    case 6:
      return (
        <Text
          style={[JSGlobalStyles.statusText, { backgroundColor: "#5A41F3" }]}
        >
          Payment in progress
        </Text>
      );
    default:
      break;
  }
}
