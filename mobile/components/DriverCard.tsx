import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.container,
        selected === item.id ? styles.selected : styles.unselected,
      ]}
    >
      <Image source={{ uri: item.profile_image_url }} style={styles.profileImage} />

      <View style={styles.infoWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.ratingWrapper}>
            <Image source={icons.star} style={styles.starIcon} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Image source={icons.dollar} style={styles.detailIcon} />
            <Text style={styles.detailText}>${item.price}</Text>
          </View>

          <Text style={styles.separator}>|</Text>

          <Text style={styles.detailText}>{formatTime(item.time!)}</Text>

          <Text style={styles.separator}>|</Text>

          <Text style={styles.detailText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={styles.carImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20, // py-5
    paddingHorizontal: 12, // px-3
    borderRadius: 12,
    marginVertical: 5,
  },
  selected: {
	backgroundColor: "#4F46E5", // bg-general-600
  },
  unselected: {
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 28,
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 12, // mx-3
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // mb-1
  },
  title: {
    fontSize: 16, // text-lg
    fontFamily: "JakartaRegular",
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8, // ml-2
  },
  starIcon: {
    width: 14, // w-3.5
    height: 14, // h-3.5
  },
  ratingText: {
    fontSize: 12, // text-sm
    fontFamily: "JakartaRegular",
    marginLeft: 2,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    width: 16, // w-4
    height: 16, // h-4
  },
  detailText: {
    fontSize: 12, // text-sm
    fontFamily: "JakartaRegular",
    marginLeft: 4,
    color: "#1F2937", // text-general-800
  },
  separator: {
    fontSize: 12,
    fontFamily: "JakartaRegular",
    marginHorizontal: 4, // mx-1
    color: "#1F2937", // text-general-800
  },
  carImage: {
    width: 56, // w-14
    height: 56, // h-14
  },
});
