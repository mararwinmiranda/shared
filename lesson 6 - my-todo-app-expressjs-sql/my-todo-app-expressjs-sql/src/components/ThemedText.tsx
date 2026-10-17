import { StyleSheet, Text, useColorScheme, type TextProps } from "react-native";

import { Colors } from "./Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "link" | "defaultSemiBold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? "light";

  const color =
    colorScheme === "dark"
      ? (darkColor ?? Colors.dark.text)
      : (lightColor ?? Colors.light.text);

  return <Text {...rest} style={[{ color }, styles[type], style]} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2563EB",
  },
});
