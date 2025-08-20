import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]): ViewStyle => {
  switch (variant) {
    case "secondary":
      return { backgroundColor: "#6B7280" }; // gray-500
    case "danger":
      return { backgroundColor: "#EF4444" }; // red-500
    case "success":
      return { backgroundColor: "#22C55E" }; // green-500
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D1D5DB", // neutral-300
        borderWidth: 0.5,
      };
    default:
      return { backgroundColor: "#0286FF" };
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return { color: "#000" };
    case "secondary":
      return { color: "#F3F4F6" };
    case "danger":
      return { color: "#FEE2E2" };
    case "success":
      return { color: "#DCFCE7" };
    default:
      return { color: "#fff" };
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant), style]}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  text: {
    fontSize: 18,
    fontFamily: "Jakarta-Bold",
  },
});

export default CustomButton;
