'use client';

import { useEffect, useState } from 'react';
import { getToken } from "../../../utils/jwtStorage"; // Aquí puedes usar tu función de token si es necesario

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

const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Asegúrate de que esta variable esté definida

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
      setJwt("FAKE-TOKEN"); // ⚠️ SOLO TEMPORAL mientras se implementa login
    };
    getUserToken();
  }, []);
  
  // Obtener los pilotos usando el JWT
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
    
        const text = await response.text(); // 👈 leer como texto primero
        if (!response.ok) throw new Error('Error al obtener los pilotos: ' + response.statusText);
        if (!text) throw new Error('Respuesta vacía del servidor'); // 👈
    
        const data = JSON.parse(text); // 👈 luego lo parseas tú
        console.log('Pilotos obtenidos:', data);
        setRiders(data);
      } catch (error) {
        console.error('Error fetching riders:', error);
        setLoading(false);
      }
    };

    fetchRiders();
  }, [jwt]);

  if (loading) return <p className="p-4">Cargando pilotos...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        🏍️ Pilotos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {riders.map((rider) => (
          <div
            key={rider.id}
            className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-indigo-600">
                {rider.name || 'Nombre no disponible'} {rider.surname || 'Apellido no disponible'}
              </h2>
              <p className="text-sm text-gray-500">
                Número de moto: <span className="font-semibold">{rider.bikeNumber || 'N/A'}</span>
              </p>
              <p className="text-sm text-gray-500">
                Equipo: <span className="font-semibold">{rider.team?.name || 'Equipo no asignado'}</span>
              </p>
            </div>

            <div className="flex items-center justify-between bg-indigo-100 rounded-xl p-4 mb-4">
              <span className="text-indigo-700 font-medium text-sm flex items-center gap-2">
                🥇 {rider.points || 0} puntos
              </span>
              <span className="text-gray-600 text-sm flex items-center gap-2">
                {getFlagEmoji(rider.nationality || 'XX')} {rider.nationality || 'Desconocido'}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Piloto #{rider.bikeNumber || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
