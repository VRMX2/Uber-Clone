import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.emptyWrapper}>
          <Image
            source={images.message}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptyText}>
            Start a conversation with your friends and family
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // p-5
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24, // text-2xl
    fontFamily: "JakartaBold",
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 160, // h-40
  },
  emptyTitle: {
    marginTop: 12, // mt-3
    fontSize: 24, // text-3xl
    fontFamily: "JakartaBold",
  },
  emptyText: {
    marginTop: 8, // mt-2
    fontSize: 16, // text-base
    textAlign: "center",
    paddingHorizontal: 28, // px-7
  },
});
