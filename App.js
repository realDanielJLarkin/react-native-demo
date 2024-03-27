import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import IconBtn from "./components/IconBtn";
import CircleButton from "./components/CircleBtn";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  // Permissions
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  // Refs
  const imageRef = useRef();

  // State
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

  const onSaveImage = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImg={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
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
      <StatusBar style="light" />
    </GestureHandlerRootView>
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
