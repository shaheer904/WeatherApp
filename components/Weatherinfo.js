import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "./utils";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;
export default function Weatherinfo({ currentWeather }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.weathericon} />
      <Text style={styles.weatherdescription}>{description}</Text>
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherdescription: { textTransform: "capitalize" },

  weathericon: { height: 100, width: 100 },
  textPrimary: { fontSize: 40, color: PRIMARY_COLOR },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    marginTop: 10,
  },
});