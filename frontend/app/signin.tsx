import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { storeToken } from "../utils/jwtStorage";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { checkAuth } = useAuth();

  const gs = require("../static/styles/globalStyles");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

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
        </View>
      </View>
    </ScrollView>
  );
}

