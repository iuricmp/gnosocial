import { View, StyleSheet, Image } from "react-native";
import Text from "@gno/components/text";
import { colors } from "@gno/styles/colors";

function PersonItem({ userName }: { userName: string }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.gravatar.com/avatar/tmp" }} style={{ width: 48, height: 48, borderRadius: 24 }} />
      <View style={{ gap: 4, flex: 1, alignItems: "flex-start" }}>
        <Text.HeaderTitle>{userName}</Text.HeaderTitle>
      </View>
    </View>
  );
}

export default PersonItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    width: "100%",
    backgroundColor: colors.background.default,
    flexDirection: "row",
  },
});
