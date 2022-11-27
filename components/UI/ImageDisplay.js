import { useContext } from "react";
import { Text, Image, StyleSheet, View, Pressable, Alert } from "react-native";
import { createManageHeaders, MANAGE_API_URL } from "../../constants/constants";
import { AuthContext } from "../../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { CSSGlobalStyles } from "../../constants/style";

export default function ImageDisplay({ fileUrl, fileMimeType, width, height }) {
  // console.log(fileUrl);

  const { token } = useContext(AuthContext);
  let content;
  if (fileUrl && fileMimeType.split("/")[0] === "image") {
    let imageUrl = /\.(gif|jpg|jpeg|tiff|png)$/i.test(fileUrl)
      ? fileUrl
      : `${MANAGE_API_URL}${fileUrl}`;

    content = (
      <Image
        source={{ uri: imageUrl, headers: createManageHeaders(token) }}
        style={[styles.image, width && { width }, height && { height }]}
        resizeMode="cover"
        // onLoadStart={() => setLoading(true)}
        // onLoadEnd={() => setLoading(false)}
        // onLoad={() => setLoading(false)}
      />
    );
  } else {
    content = (
      <Pressable
        onPress={() =>
          Alert.alert("Download Attachment", "It will be done later!")
        }
      >
        <View style={styles.docContainer}>
          <Ionicons
            name="document-attach-outline"
            size={16}
            color={CSSGlobalStyles.colors.primary500}
          />
          <Text style={styles.doc}>download attachment</Text>
        </View>
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  docContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  doc: {
    textDecorationLine: "underline",
    color: CSSGlobalStyles.colors.primary500,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginVertical: 12,
  },
});
