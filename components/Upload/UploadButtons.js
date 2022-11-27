import { View, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePick from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { CSSGlobalStyles } from "../../constants/style";

import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import ImageDisplay from "../UI/ImageDisplay";

export default function UploadButtons({ onChangeFile, value, error }) {
  const [status, requestPermission] = ImagePick.useCameraPermissions();
  const { token } = useContext(AuthContext);

  async function verifyPermission() {
    // console.log("STATUS:", status);
    if (status.status === ImagePick.PermissionStatus.UNDETERMINED) {
      try {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      } catch (error) {
        console.log("PERMISSIONS", error);
      }
    }
    if (status.status === ImagePick.PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      try {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      } catch (error) {
        console.log("PERMISSIONS", error);
      }
      // return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      let result = await ImagePick.launchCameraAsync({
        mediaTypes: ImagePick.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [16, 9],
        quality: 0.5,
      });
      if (!result.canceled) {
        const { type, uri } = result.assets[0];

        const mimeType = uri.split(".").pop();
        onChangeFile("file", {
          uri,
          type: `${type}/${mimeType}`,
          name: new Date().toISOString(),
        });
        // setImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function imageLibraryHandler() {
    try {
      let result = await DocumentPicker.getDocumentAsync();
      if (!result.canceled) {
        onChangeFile("file", {
          uri: result.uri,
          type: result.mimeType,
          name: result.name,
        });
        // setImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("VALUE:", value);
  let content;
  //EDIT
  if (value.uri && value.uri?.split("/").pop() === "download") {
    // console.log("EDIT");
    content = (
      <>
        <ImageDisplay
          fileUrl={value.uri}
          fileMimeType={value.type}
          // width={100}
          height={100}
        />
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              error && {
                backgroundColor: CSSGlobalStyles.colors.error50,
              },
            ]}
            onPress={imageLibraryHandler}
          >
            <Ionicons
              name="document-attach-outline"
              size={18}
              color={CSSGlobalStyles.colors.primary500}
            />
            <Text style={styles.textButton}>Upload a file from your phone</Text>
          </Pressable>
          <Text>&nbsp;</Text>
          <Pressable
            style={[
              styles.button,
              error && {
                backgroundColor: CSSGlobalStyles.colors.error50,
              },
            ]}
            onPress={takeImageHandler}
          >
            <Ionicons
              name="camera-outline"
              size={18}
              color={CSSGlobalStyles.colors.primary500}
            />
            <Text style={styles.textButton}>Take a pic with your camera</Text>
          </Pressable>
        </View>
      </>
    );
  }
  //ADD PIC Or ATACH
  if (
    value.uri &&
    value.uri?.split("/").pop() !== "download" &&
    value.uri?.trim().length > 0
  ) {
    // console.log("ADD PIC or ATT");
    content = (
      <ImageDisplay
        fileUrl={value.uri}
        fileMimeType={value.type}
        // width={100}
        // height={200}
      />
    );
  }
  if (value.uri?.trim().length === 0 || value.uri === undefined) {
    // console.log("ELSE");

    content = (
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.button,
            error && {
              backgroundColor: CSSGlobalStyles.colors.error50,
            },
          ]}
          onPress={takeImageHandler}
        >
          <Ionicons
            name="camera-outline"
            size={18}
            color={CSSGlobalStyles.colors.primary500}
          />
          <Text style={styles.textButton}>Take a pic with your camera</Text>
        </Pressable>
        <Text>&emsp;</Text>
        <Pressable
          style={[
            styles.button,
            error && {
              backgroundColor: CSSGlobalStyles.colors.error50,
            },
          ]}
          onPress={imageLibraryHandler}
        >
          <Ionicons
            name="document-attach-outline"
            size={18}
            color={CSSGlobalStyles.colors.primary500}
          />

          <Text style={styles.textButton}>Upload a file from your phone</Text>
        </Pressable>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 5,
    padding: 20,
    borderWidth: 1.3,
    borderColor: "rgba(30, 20, 51, 0.1)",
    borderRadius: 5,
    borderStyle: "dashed",
  },
  textButton: {
    paddingTop: 10,
    color: CSSGlobalStyles.colors.primary500,
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
