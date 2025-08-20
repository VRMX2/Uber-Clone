import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>My profile</Text>

        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              
				editable = {false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}

				editable = {false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
				
				editable = {false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              
				editable = {false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20, // px-5
  },
  scrollContent: {
    paddingBottom: 120,
  },
  title: {
    fontSize: 24, // text-2xl
    fontFamily: "JakartaBold",
    marginVertical: 20, // my-5
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20, // my-5
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 20, // px-5
    paddingVertical: 12, // py-3
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    padding: 14, // p-3.5
  },
});
