import { Image, Text, View, StyleSheet } from "react-native";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.mapImage}
          />

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Driver</Text>
            <Text style={styles.value}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Car Seats</Text>
            <Text style={styles.value}>{ride.driver.car_seats}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment Status</Text>
            <Text
              style={[
                styles.value,
                ride.payment_status === "paid" ? styles.paid : styles.unpaid,
              ]}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#d1d5db",
    shadowOffset: { width: 0, height: 1 },
	shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  content: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 12,
  },
  addressContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  addressText: {
    fontSize: 16,
    fontFamily: "JakartaMedium",
    marginLeft: 5,
  },
  infoCard: {
    marginTop: 20,
    backgroundColor: "#e5e7eb", // bg-general-500
    borderRadius: 12,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "JakartaMedium",
    color: "#6b7280", // gray-500
  },
  value: {
    fontSize: 16,
    fontFamily: "JakartaBold",
  },
  paid: {
    color: "#10b981", // green-500
  },
  unpaid: {
    color: "#ef4444", // red-500
  },
});
