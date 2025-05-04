'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

type Rider = {
  name: string;
  bikeNumber: string;
  team: string;
  nationality: string;
};

const apiUrl = 'http://localhost:8080/api/v1/riders/scrape';  // URL de tu servidor Spring Boot

const getFlagEmoji = (country: string) => {
  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function RiderPage() {
  const [riders, setRiders] = useState<Rider[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(apiUrl);
    
        if (!response.ok) {
          const errorText = await response.text(); // por si hay texto de error
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
    
        const text = await response.text(); // primero obtenemos el texto
        if (!text) {
          throw new Error("La respuesta está vacía.");
        }
    
        const data = JSON.parse(text); // solo si hay texto
        setRiders(data);
      } catch (error) {
        console.error('Error al obtener los pilotos:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchRiders();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 10 }}>Cargando pilotos...</Text>
      </View>
    );
  }

  if (!riders || riders.length === 0) {
    return (
      <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No hay pilotos disponibles.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#F0F4FF' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4338CA', textAlign: 'center', marginBottom: 20 }}>
        🏍️ Pilotos
      </Text>

      {riders.map((rider, index) => (
        <View
          key={index}
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
            {rider.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            Número de moto: {rider.bikeNumber}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Equipo: {rider.team}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              backgroundColor: '#E0E7FF',
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Text style={{ color: '#3730A3', fontWeight: '600' }}>
              🥇 Puntos
            </Text>
            <Text style={{ color: '#4B5563' }}>
              {getFlagEmoji(rider.nationality)} {rider.nationality}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
