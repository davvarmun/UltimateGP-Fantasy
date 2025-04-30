import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { useAuth } from '../../context/AuthContext';
// import { useEffect } from 'react';

export default function TabLayout() {
  // const { isAuthenticated, isLoading, checkAuth } = useAuth();

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const isAuth = await checkAuth();
  //     if (!isAuth) {
  //       router.replace('/signin'); // Redirige si no está autenticado
  //     }
  //   };

  //   verifyAuth();
  // }, []);

  // if (isLoading || !isAuthenticated) {
  //   return null;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
        },
      }}
    >
      {/* Pantalla de Equipos */}
      <Tabs.Screen
        name="team"
        options={{
          headerShown: false,
          lazy: true,
          tabBarLabel: 'Equipos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bicycle" color={color} size={24} />
          ),
        }}
      />

      {/* Pantalla de Pilotos */}
      <Tabs.Screen
        name="rider"  // Nombre de la pantalla para Pilotos
        options={{
          headerShown: false,
          lazy: true,
          tabBarLabel: 'Pilotos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />  // Icono para Pilotos
          ),
        }}
      />
    </Tabs>
  );
}
