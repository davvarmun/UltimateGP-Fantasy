import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useAuth } from "../../../context/AuthContext";
const gs = require("../../../static/styles/globalStyles");

interface RiderStanding {
  piloto: string;
  pais: string;
  moto: string;
  puntos: number;
  posicion: number;
}

export default function PilotStandings() {
  const [standings, setStandings] = useState<RiderStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { token } = useAuth();

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/v1/clasificacion`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to fetch standings.");
        }

        const data = await res.json();
        setStandings(data);
      } catch (err: any) {
        console.error(err);
        setError("Unable to load standings.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[gs.container, { paddingVertical: 30 }]}>
        <Text style={gs.headerText}>Rider Standings</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={gs.errorText}>{error}</Text>
        ) : (
          <View style={[gs.card, { width: "100%", marginTop: 20 }]}>
            {standings.map((rider, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={[gs.bodyText, { flex: 1 }]}>{rider.posicion}º</Text>
                <Text style={[gs.bodyText, { flex: 3 }]}>{rider.piloto}</Text>
                <Text style={[gs.bodyText, { flex: 2 }]}>{rider.moto}</Text>
                <Text style={[gs.bodyText, { flex: 1, textAlign: "right" }]}>{rider.puntos} pts</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

