import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function IconBtn({ icon, lable, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{lable}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
