import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {/* Top Image + Title */}
        <View style={styles.heroContainer}>
          <Image source={images.signUpCar} style={styles.heroImage} />
          <Text style={styles.heroText}>Create Your Account</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

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

          <CustomButton title="Sign Up" onPress={onSignUpPress} style={styles.signUpBtn} />

          <OAuth />

          <Link href="/sign-in" style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.linkHighlight}>Log In</Text>
          </Link>
        </View>

        {/* Verification Modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Verification</Text>
            <Text style={styles.modalSubtitle}>
              We've sent a verification code to {form.email}.
            </Text>

            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />

            {verification.error && (
              <Text style={styles.errorText}>{verification.error}</Text>
            )}

            <CustomButton title="Verify Email" onPress={onPressVerify} style={styles.verifyBtn} />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={styles.modal}>
            <Image source={images.check} style={styles.successIcon} />
            <Text style={styles.successTitle}>Verified</Text>
            <Text style={styles.successSubtitle}>
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              style={styles.successBtn}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroContainer: {
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
  signUpBtn: {
    marginTop: 24,
  },
  linkText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#9CA3AF", // gray
  },
  linkHighlight: {
    color: "#2563EB", // primary blue
    fontFamily: "Jakarta-Bold",
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingVertical: 36,
    borderRadius: 20,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 8,
    fontFamily: "Jakarta-ExtraBold",
  },
  modalSubtitle: {
    marginBottom: 20,
    fontFamily: "Jakarta",
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
    color: "red",
  },
  verifyBtn: {
    marginTop: 20,
    backgroundColor: "#22C55E", // green
  },
  successIcon: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginVertical: 20,
  },
  successTitle: {
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Jakarta-Bold",
  },
  successSubtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    color: "#9CA3AF",
    fontFamily: "Jakarta",
  },
  successBtn: {
    marginTop: 20,
  },
});
