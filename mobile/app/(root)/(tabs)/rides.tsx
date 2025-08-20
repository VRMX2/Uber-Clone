import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const Rides = () => {
  const { user } = useUser();

  const { data: recentRides, loading, error } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentRides}
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
                  accessibilityLabel="No recent rides found"
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
          <Text style={styles.headerTitle}>All Rides</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flatList: {
	paddingHorizontal: 20, // equivalent to px-5
  },
  flatListContent: {
    paddingBottom: 100,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  noResultImage: {
    width: 160, // w-40
    height: 160, // h-40
  },
  noResultText: {
    fontSize: 14, // text-sm
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 24, // text-2xl
    fontFamily: "JakartaBold",
    marginVertical: 20, // my-5
  },
});
