import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

// Components imports
import Weatherinfo from "./components/Weatherinfo";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./components/utils";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
//keys and url for weather API
const WEATHER_API_KEY = "7bb22f23deeb3d2c00bea8004a43d757";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function App() {
  // States
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    // Calling the Load function
    load();
  }, [unitsSystem]);

  // load function to fetch data from the API
  const load = async () => {
    setCurrentWeather(null);
    // setErrorMessage(null);
    try {
      // Get the permission from the user access his location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Access is needed to run the App");
        return;
      }
      // Get the location Coords
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      // alert(`${longitude},${latitude}`)
      const weatherUrl = `${BASE_WEATHER_URL}?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

      // alert(`Latitude :  ${latitude},                      Longtitude : ${longitude}`)
    } catch (err) {}
  };
  // if we get the reponse successfully
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <Weatherinfo currentWeather={currentWeather} />
        </View>
<WeatherDetails currentWeather={currentWeather}  unitsSystem={unitsSystem} />
      </View>
    );
  } else if (errorMessage) {
    // When we did not get the response
    return (
      <View style={styles.container}>
          <ReloadIcon load={load} />

        <Text style={{textAlign:'center'}}>{errorMessage}</Text>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
