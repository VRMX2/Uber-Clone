import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Map from "@/components/Map";
import { icons } from "@/constants";

const { height: screenHeight } = Dimensions.get("window");

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <View style={styles.backButton}>
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.titleText}>{title || "Go Back"}</Text>
          </View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
          {title === "Choose a Rider" ? (
            <BottomSheetView style={styles.bottomSheetContent}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView style={styles.bottomSheetContent}>
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    height: screenHeight,
    backgroundColor: "#0286FF", // blue-500
  },
  header: {
    position: "absolute",
    top: 60, // Adjust if needed
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  titleText: {
    fontSize: 20,
    fontFamily: "JakartaSemiBold",
    marginLeft: 20,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
});
