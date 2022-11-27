import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, Image, Pressable } from "react-native";

import { CSSGlobalStyles } from "../constants/style";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
import LougoutIcon from "../components/UI/LogoutIcon";

export default function LogoutScreen({ logout }) {
  const [modalVisible, setModalVisible] = useState(true);
  const { user } = useContext(AuthContext);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <Image
              style={{ width: 150, height: 50 }}
              source={require("../assets/images/manage.png")}
              resizeMode="contain"
            />
            <Pressable onPress={() => setModalVisible(false)}>
              <Ionicons
                name="close"
                size={32}
                color={CSSGlobalStyles.colors.white}
              />
            </Pressable>
          </View>

          <Text style={styles.title}>Your account</Text>
          <View style={styles.row}>
            <LougoutIcon user={user} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.textStyle, { fontFamily: "mulish-bold" }]}
              >{`${user.givenName} ${user.familyName}`}</Text>
              <Text style={styles.textStyle}>{user.primaryEmail}</Text>
            </View>
          </View>

          <Pressable onPress={logout}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: CSSGlobalStyles.colors.white,
                paddingVertical: 6,
                paddingHorizontal: 8,
                marginTop: 20,
              }}
            >
              <Ionicons
                name="exit-outline"
                size={18}
                color={CSSGlobalStyles.colors.white}
              />
              <Text>&emsp;</Text>
              <Text
                style={{
                  color: CSSGlobalStyles.colors.white,
                  fontFamily: "mulish",
                }}
              >
                Log out
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "mulish-bold",
    marginBottom: 8,
    color: CSSGlobalStyles.colors.white,
    paddingVertical: 10,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-start",
    alignItems: "stretch",
    // marginTop: 22,
  },
  modalView: {
    // flex: 1,

    // margin: 20,
    backgroundColor: CSSGlobalStyles.colors.primary500,
    // borderRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontFamily: "mulish",
    paddingVertical: 3,
    // fontWeight: "bold",
    // textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "mulish",
  },
});
