'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getToken } from "../../../utils/jwtStorage"; // Opcional según tu autenticación

type Rider = {
  id: number;
  name: string;
  surname: string;
  bikeNumber: number;
  nationality: string;
  points: number;
  team: {
    name: string;
  };
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const getFlagEmoji = (country: string) => {
  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function RiderPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const getUserToken = async () => {
      // const token = await getToken();
      // setJwt(token);
      setJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNjY2NTYwNzkzLCJzdWIiOiJqb2huZG9lQGV4YW1wbGUuY29tIn0.kHq7bVgSjehz1ZK0j3mM0IGMIQ6t2hlH0dZtU4mlyJ4"); // ⚠️ Temporal
    };
    getUserToken();
  }, []);

  useEffect(() => {
    if (!jwt) return;

    const fetchRiders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/riders`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log("Status:", response.status);
        console.log("Headers:", [...response.headers.entries()]);
        const text = await response.text();
        console.log("Raw response text:", text);

        //const text = await response.text();
        if (!response.ok) throw new Error('Error al obtener los pilotos: ' + response.statusText);
        if (!text) throw new Error('Respuesta vacía del servidor');

        const data = JSON.parse(text);
        console.log('Pilotos obtenidos:', data);
        setRiders(data);
      } catch (error) {
        console.error('Error fetching riders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, [jwt]);

  if (loading) {
    return (
      <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 10 }}>Cargando pilotos...</Text>
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
        🏍️ Pilotos
      </Text>

      {riders.map((rider) => (
        <View
          key={rider.id}
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
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4F46E5' }}>
            {rider.name || 'Nombre no disponible'} {rider.surname || 'Apellido no disponible'}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            Número de moto: {rider.bikeNumber || 'N/A'}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Equipo: {rider.team?.name || 'Equipo no asignado'}
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
              🥇 {rider.points || 0} puntos
            </Text>
            <Text style={{ color: '#4B5563' }}>
              {getFlagEmoji(rider.nationality || 'XX')} {rider.nationality || 'Desconocido'}
            </Text>
          </View>

          <Text style={{ marginTop: 8, fontSize: 12, color: '#6B7280' }}>
            Piloto #{rider.bikeNumber || 'N/A'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
