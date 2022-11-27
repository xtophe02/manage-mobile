import { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import Button from "../components/UI/Button";
import { CSSGlobalStyles } from "../constants/style";

function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Welcome on board!</Text>
          <Text style={styles.modalText}>
            You can already use this new mobile application to submit your
            expenses in a few clicks. Don't worry, soon you will be able to use
            it for many other things! Stay tuned!
          </Text>

          <Button onPress={() => setModalVisible(false)}>
            Got it, go to the homepage
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontFamily: "mulish-bold",
    marginBottom: 8,
    color: CSSGlobalStyles.colors.primary500,
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
    alignItems: "stretch",
    // marginTop: 22,
  },
  modalView: {
    // flex: 1,

    // margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "mulish",
  },
});
