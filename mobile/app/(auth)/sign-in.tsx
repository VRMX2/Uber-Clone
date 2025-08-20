import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image source={images.signUpCar} style={styles.heroImage} />
          <Text style={styles.heroText}>Welcome 👋</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton title="Sign In" onPress={onSignInPress} style={styles.signInBtn} />

          <OAuth />

          <Link href="/sign-up" style={styles.linkText}>
            Don’t have an account?{" "}
            <Text style={styles.linkHighlight}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff",
	},
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  heroImage: {
    width: "100%",
    height: 250,
  },
  heroText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 22,
    color: "#000",
    fontFamily: "Jakarta-SemiBold",
  },
  form: {
    padding: 20,
  },
  signInBtn: {
    marginTop: 24,
  },
  linkText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#9CA3AF", // gray
  },
  linkHighlight: {
    color: "#2563EB", // primary blue
    fontFamily: "Jakarta-Bold",
  },
});
