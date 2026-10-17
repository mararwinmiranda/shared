import { useColorScheme, View, type ViewProps } from "react-native";

import { Colors } from "./Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";

  const backgroundColor =
    colorScheme === "dark"
      ? (darkColor ?? Colors.dark.background)
      : (lightColor ?? Colors.light.background);

  return <View {...rest} style={[{ backgroundColor }, style]} />;
}
