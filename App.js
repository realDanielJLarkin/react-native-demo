import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import IconBtn from "./components/IconBtn";
import CircleButton from "./components/CircleBtn";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOpts, setShowAppOpts] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOpts(true);
    } else {
      alert("You did not select an image");
    }
  };

  const onReset = () => {
    setShowAppOpts(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImage = () => {
    // coming soon
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImg={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOpts ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconBtn icon="refresh" lable="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconBtn icon="save-alt" lable="Save" onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View styles={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImage} />
          <Button label="Use this photo" onPress={() => setShowAppOpts(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 125,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 90,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
