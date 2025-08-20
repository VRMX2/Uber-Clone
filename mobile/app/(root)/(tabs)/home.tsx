import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
	};

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyWrapper}>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={styles.noResultImage}
                  resizeMode="contain"
                />
                <Text style={styles.noResultText}>No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.welcomeText}>
                Welcome {user?.firstName}👋
              </Text>
              <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
                <Image source={icons.out} style={styles.logoutIcon} />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <Text style={styles.sectionTitle}>Your current location</Text>
            <View style={styles.mapWrapper}>
              <Map />
            </View>

            <Text style={styles.sectionTitle}>Recent Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366F1", // bg-general-500 (example: indigo-500)
  },
  flatList: {
    paddingHorizontal: 20, // px-5
  },
  flatListContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20, // my-5
  },
  welcomeText: {
    fontSize: 24, // text-2xl
    fontFamily: "JakartaExtraBold",
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  logoutIcon: {
    width: 16, // w-4
    height: 16, // h-4
  },
  sectionTitle: {
    fontSize: 20, // text-xl
    fontFamily: "JakartaBold",
    marginTop: 20,
    marginBottom: 12,
  },
  mapWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 300,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultImage: {
    width: 160, // w-40
    height: 160, // h-40
  },
  noResultText: {
    fontSize: 14, // text-sm
  },
});
