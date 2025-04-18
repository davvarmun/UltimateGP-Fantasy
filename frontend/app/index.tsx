import { View, Text, Dimensions, Image } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import TopNavBar from "../app/(tabs)/navBar/topNavBar";

export default function Index() {
  const { height } = Dimensions.get("window");
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);

  const gs = require("../static/styles/globalStyles");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Dimensions.get("window").width < 768);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => subscription?.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    "Loubag-Regular": require("../assets/fonts/Loubag-Regular.ttf"),
    "Loubag-Medium": require("../assets/fonts/Loubag-Medium.ttf"),
    "Loubag-Bold": require("../assets/fonts/Loubag-Bold.ttf"),
    "Loubag-Light": require("../assets/fonts/Loubag-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={[gs.container, { height }]}>
      {/* Barra de navegación en la parte superior */}
      <TopNavBar />

      <Image
        source={require("../static/images/profile.webp")}
        style={[
          gs.profileImage,
          {
            width: isMobile ? 120 : 160,
            height: isMobile ? 120 : 160,
            borderRadius: (isMobile ? 120 : 160) / 2,
            marginBottom: 30,
          },
        ]}
      />

      <Text
        style={[
          gs.headerText,
          {
            fontFamily: "Loubag-Bold",
            fontSize: isMobile ? 28 : 36,
            textAlign: "center",
          },
        ]}
      >
        UltimateGP Fantasy
      </Text>

      <Text
        style={[
          gs.subHeaderText,
          {
            fontFamily: "Loubag-Light",
            fontSize: isMobile ? 16 : 18,
            textAlign: "center",
            marginBottom: 30,
          },
        ]}
      >
        ¡Vive MotoGP como nunca antes!
      </Text>

      <Link href="/signin" style={gs.mainButton}>
        <Text style={[gs.mainButtonText, { fontFamily: "Loubag-Medium" }]}>
          Empezar
        </Text>
      </Link>
    </View>
  );
}
