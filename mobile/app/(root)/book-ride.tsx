import { useUser } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View, StyleSheet } from "react-native";

import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.find((driver) => +driver.id === selectedDriver);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.uber"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride">
        <>
          <Text style={styles.sectionTitle}>Ride Information</Text>

          <View style={styles.driverWrapper}>
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={styles.driverAvatar}
            />

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driverDetails?.title}</Text>
              <View style={styles.driverRating}>
                <Image source={icons.star} style={styles.starIcon} resizeMode="contain" />
                <Text style={styles.driverRatingText}>{driverDetails?.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ride Price</Text>
              <Text style={[styles.detailLabel, styles.price]}>${driverDetails?.price}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pickup Time</Text>
              <Text style={styles.detailLabel}>{formatTime(driverDetails?.time!)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Car Seats</Text>
              <Text style={styles.detailLabel}>{driverDetails?.car_seats}</Text>
            </View>
          </View>

          <View style={styles.addressWrapper}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.addressIcon} />
              <Text style={styles.addressText}>{userAddress}</Text>
            </View>
            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.addressIcon} />
              <Text style={styles.addressText}>{destinationAddress}</Text>
            </View>
          </View>

          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
			      driverId = {driverDetails?.id}
            rideTime={driverDetails?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: "JakartaSemiBold",
    marginBottom: 12,
  },
  driverWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
  driverAvatar: {
    width: 112, // w-28
    height: 112,
    borderRadius: 56,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
	},
  driverName: {
    fontSize: 18,
    fontFamily: "JakartaSemiBold",
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  driverRatingText: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  detailsCard: {
    width: "100%",
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#4F46E5", // bg-general-600
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
    color: "#FFFFFF",
  },
  price: {
    color: "#0CC25F",
  },
  addressWrapper: {
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#374151", // border-general-700
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  addressText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "JakartaRegular",
    color: "#FFFFFF",
  },
});
