import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TopNavBar() {
    const gs = require("../../../static/styles/globalStyles");

  return (
    <View style={gs.navBar}>
      {/* Nombre de la app a la izquierda */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={[gs.navText, { color: "#E10600", fontSize: 18 }]}>
          UltimateGP Fantasy
        </Text>
      </View>

      {/* Enlaces de navegación a la derecha */}
      <View style={{ flexDirection: "row", gap: 15 }}>
        <TouchableOpacity onPress={() => router.push("/team")}>
          <Text style={gs.navText}>Equipo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/leagues")}>
          <Text style={gs.navText}>Ligas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/stats")}>
          <Text style={gs.navText}>Estadísticas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}