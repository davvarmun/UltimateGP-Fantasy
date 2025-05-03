'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getToken } from "../../../utils/jwtStorage";

type Rider = {
  id: number;
  name: string;
  surname: string;
  bikeNumber: number;
  nationality: string;
  points: number;
};

type Team = {
  id: number;
  name: string;
  constructor: string;
  points: number;
  riders: Rider[];
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const getFlagEmoji = (country: string) => {
  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function TeamPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const getUserToken = async () => {
      // const token = await getToken();
      // setJwt(token);
      setJwt("FAKE-TOKEN");
    };
    getUserToken();
  }, []);

  useEffect(() => {
    if (!jwt) return;

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/team`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        const text = await response.text();
        if (!response.ok) throw new Error('Error al obtener los equipos: ' + response.statusText);
        if (!text) throw new Error('Respuesta vacía del servidor');

        const data = JSON.parse(text);
        console.log('Equipos obtenidos:', data);
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [jwt]);

  if (loading) {
    return (
      <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 10 }}>Cargando equipos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#F0F4FF' }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4338CA',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        🏆 Equipos
      </Text>

      {teams.map((team) => (
        <View
          key={team.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4F46E5' }}>
            {team.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            Constructor: <Text style={{ fontWeight: '600' }}>{team.constructor}</Text>
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            backgroundColor: '#E0E7FF',
            borderRadius: 12,
            padding: 10,
          }}>
            <Text style={{ color: '#3730A3', fontWeight: '600' }}>
              🥇 {team.points} puntos
            </Text>
            <Text style={{ color: '#4B5563' }}>
              👥 {team.riders.length} piloto(s)
            </Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#4338CA',
              marginBottom: 6,
            }}>
              Pilotos
            </Text>

            {team.riders.length === 0 ? (
              <Text style={{ fontStyle: 'italic', color: '#9CA3AF', fontSize: 13 }}>
                Sin pilotos asignados.
              </Text>
            ) : (
              team.riders.map((rider) => (
                <View
                  key={rider.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#EEF2FF',
                    borderColor: '#C7D2FE',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: '600', color: '#1E3A8A', fontSize: 14 }}>
                      #{rider.bikeNumber} {rider.name} {rider.surname}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>
                      {getFlagEmoji(rider.nationality)} {rider.nationality}
                    </Text>
                  </View>
                  <Text style={{ fontWeight: 'bold', color: '#4F46E5', fontSize: 14 }}>
                    {rider.points} pts
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
