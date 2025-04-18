'use client';

import { useEffect, useState } from 'react';
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
      setJwt("FAKE-TOKEN"); // ⚠️ SOLO TEMPORAL mientras se implementa login
    };
    getUserToken();
  }, []);
  

  // Obtener los equipos usando el JWT
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
    
        const text = await response.text(); // 👈 leer como texto primero
        if (!response.ok) throw new Error('Error al obtener los equipos: ' + response.statusText);
        if (!text) throw new Error('Respuesta vacía del servidor'); // 👈
    
        const data = JSON.parse(text); // 👈 luego lo parseas tú
        console.log('Equipos obtenidos:', data);
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };    

    fetchTeams();
  }, [jwt]);

  if (loading) return <p className="p-4">Cargando equipos...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        🏆 Equipos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-indigo-600">{team.name}</h2>
              <p className="text-sm text-gray-500">Constructor: <span className="font-semibold">{team.constructor}</span></p>
            </div>

            <div className="flex items-center justify-between bg-indigo-100 rounded-xl p-4 mb-4">
              <span className="text-indigo-700 font-medium text-sm flex items-center gap-2">
                🥇 {team.points} puntos
              </span>
              <span className="text-gray-600 text-sm flex items-center gap-2">
                👥 {team.riders.length} piloto(s)
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Pilotos</h3>
              {team.riders.length === 0 ? (
                <p className="text-sm italic text-gray-400">Sin pilotos asignados.</p>
              ) : (
                <ul className="space-y-3">
                  {team.riders.map((rider) => (
                    <li
                      key={rider.id}
                      className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200 shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-indigo-800 text-sm">
                          #{rider.bikeNumber} {rider.name} {rider.surname}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getFlagEmoji(rider.nationality)} {rider.nationality}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-indigo-600 font-bold text-sm">{rider.points} pts</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
