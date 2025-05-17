import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { storeToken } from "../utils/jwtStorage";
import { useAuth } from "../context/AuthContext";
import { router, Link } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";

// Asegúrate de usar tu CLIENT_ID correcto de Google
const CLIENT_ID = "74295351194-crl719vhp3sept2jau18c6b0ad61f1jr.apps.googleusercontent.com"; // Web Client ID
const gs = require("../static/styles/globalStyles");

// Esto es necesario para completar la autenticación
WebBrowser.maybeCompleteAuthSession();

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { checkAuth } = useAuth();

  // Usamos makeRedirectUri para obtener la URL de redirección adecuada
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID, // Usa solo `clientId` para la web
    redirectUri: makeRedirectUri(), // Se genera la URI de redirección automáticamente
    responseType: "id_token",
    scopes: ["profile", "email"],
    selectAccount: true,
  });


  // Efecto que maneja la respuesta de Google
  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const idToken = (response.authentication as { idToken?: string }).idToken;
      if (idToken) {
        handleGoogleToken(idToken);
      } else {
        setErrorMessage("No se recibió el token de Google");
      }
    }
  }, [response]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text();
      if (!response.ok) {
        console.log("Error:", text);
        setErrorMessage("Algo no ha ido bien. Verifica tus credenciales.");
        return;
      }

      const data = JSON.parse(text);
      await storeToken(data.token);
      await checkAuth();
      router.replace("/recipes");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Error inesperado. Inténtalo de nuevo.");
    }
  };

  const handleGoogleToken = async (idToken: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/google-signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Google auth failed:", text);
        setErrorMessage("Error con la autenticación de Google.");
        return;
      }

      const data = await response.json();
      await storeToken(data.token);
      await checkAuth();
      router.replace("/recipes");
    } catch (error) {
      console.error("Google auth error:", error);
      setErrorMessage("Error inesperado con Google.");
    }
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

          {/* Botón de Google */}
          <TouchableOpacity
            style={[gs.secondaryButton, { marginTop: 30 }]}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={gs.secondaryButtonText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
