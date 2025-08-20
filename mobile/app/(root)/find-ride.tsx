import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View style={styles.inputGroup}>
        <Text style={styles.label}>From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle={styles.fromInputContainer}
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={styles.toInputContainer}
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Find Now"
          onPress={() => router.push(`/(root)/confirm-ride`)}
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 12, // my-3
  },
  label: {
    marginBottom: 12, // mb-3
    fontSize: 16,     // text-lg
    fontFamily: "JakartaSemiBold",
  },
  fromInputContainer: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
  },
  toInputContainer: {
    backgroundColor: "transparent",
  },
  buttonWrapper: {
    marginTop: 20, // mt-5
  },
});
