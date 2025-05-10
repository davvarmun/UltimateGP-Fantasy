import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { storeToken } from "../utils/jwtStorage";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, router } from "expo-router";

// Asegúrate de que tu clientId de Google esté configurado correctamente
const CLIENT_ID = '74295351194-crl719vhp3sept2jau18c6b0ad61f1jr.apps.googleusercontent.com'; // Usa tu Client ID aquí

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { checkAuth } = useAuth();
  
  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      console.log("Enviando login:", {
        username,
        password,
        url: `${apiUrl}/api/v1/auth/signin`,
      });
      
      const response = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      const text = await response.text();
      console.log("Respuesta status:", response.status);
      console.log("Respuesta body:", text);

      if (!response.ok) {
        setErrorMessage("Algo no ha ido bien. Verifica tus credenciales.");
        return;
      }

      const data = await response.json();
      await storeToken(data.token);
      await checkAuth();
      router.replace("/recipes");
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    try {
      const { credential } = response;
      console.log("Google ID Token:", credential);
  
      // DEBUG extra para verificar el payload
      const decoded = JSON.parse(atob(credential.split(".")[1]));
      console.log("Decoded Google ID Token Payload:", decoded);
  
      const authResponse = await fetch(`${apiUrl}/api/v1/auth/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credential,
        }),
      });
  
      if (!authResponse.ok) {
        const text = await authResponse.text();
        console.error("Google auth failed:", text);
        setErrorMessage("Error con la autenticación de Google.");
        return;
      }
  
      const data = await authResponse.json();
      await storeToken(data.token);
      await checkAuth();
      router.replace("/recipes");
    } catch (error) {
      console.error("Error en la autenticación de Google: ", error);
      setErrorMessage("Error inesperado en la autenticación.");
    }
  };
  

  // Modificación del onError sin parámetros
  const handleGoogleFailure = () => {
    setErrorMessage("Hubo un problema al iniciar sesión con Google.");
    console.error("Google login failed");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[gs.container, { justifyContent: "center", alignItems: "center", flex: 1, paddingVertical: 40 }]}>
        <Image source={require("../static/images/profile.webp")} style={gs.profileImage} />

        <View style={[gs.card, { maxWidth: 400, width: "90%", alignItems: "center" }]}>
          <Text style={gs.headerText}>Iniciar Sesión</Text>
          <Text style={gs.bodyText}>
            Introduce tu cuenta de siempre en UltimateGP Fantasy o regístrate si es tu primera vez.
          </Text>

          <TextInput
            style={[gs.input, { marginBottom: 10 }]}
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />

          <TextInput
            style={gs.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />

          {errorMessage ? <Text style={gs.errorText}>{errorMessage}</Text> : null}

          <Link href={"/signup"} style={{ marginTop: 10 }}>
            <Text style={gs.linkText}>¿No tienes cuenta? ¡Regístrate!</Text>
          </Link>

          <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSubmit}>
            <Text style={gs.mainButtonText}>Ingresar</Text>
          </TouchableOpacity>

          {/* Botón de inicio de sesión con Google */}
          <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            // Agregar un marginTop para separar el botón de Google
            containerProps={{
              style: { marginTop: 30 } // Esta línea añade separación
            }}
            />
          </GoogleOAuthProvider>
        </View>
      </View>
    </ScrollView>
  );
}



