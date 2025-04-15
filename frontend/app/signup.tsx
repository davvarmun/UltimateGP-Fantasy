import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView, Modal, Pressable } from "react-native";
import { storeToken } from "../utils/jwtStorage";
import { Ionicons } from "@expo/vector-icons"; // Importamos iconos de Expo
import { useFonts } from "expo-font";

export default function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const [modalVisible, setModalVisible] = useState(false);

  const [askForEmailToken, setAskForEmailToken] = useState(false);
  const [emailToken, setEmailToken] = useState<string>("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const gs = require("../static/styles/globalStyles");

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

    const [fontsLoaded] = useFonts({
      "Loubag-Regular": require("../assets/fonts/Loubag-Regular.ttf"),
      "Loubag-Medium": require("../assets/fonts/Loubag-Medium.ttf"),
      "Loubag-Bold": require("../assets/fonts/Loubag-Bold.ttf"),
      "Loubag-Light": require("../assets/fonts/Loubag-Light.ttf"),
    });

  const validEmail = (email: string) => {
    if (email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      return true;
    }
    return false;
  };

  const validPassword = (password: string) => {
    if (password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
      return true;
    }
    return false;
  }

  const handleSubmit = async () => {
    const newFieldErrors = {
      name: !name,
      surname: !surname,
      username: !username,
      email: !email,
      password: !password,
      repeatPassword: !repeatPassword,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some(Boolean)) {
      setErrorMessage("Debes rellenar todos los campos.");
      return;
    }

    if (!validEmail(email)) {
      setFieldErrors(prev => ({ ...prev, email: true }));
      setErrorMessage("El email no es válido.");
      return;
    }

    if (name.length < 3) {
      setFieldErrors(prev => ({ ...prev, name: true }));
      setErrorMessage("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (surname.length < 3) {
      setFieldErrors(prev => ({ ...prev, surname: true }));
      setErrorMessage("El apellido debe tener al menos 3 caracteres.");
      return;
    }

    if (username.length < 3) {
      setFieldErrors(prev => ({ ...prev, username: true }));
      setErrorMessage("Tu nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (!validPassword(password)) {
      setFieldErrors(prev => ({ ...prev, password: true }));
      setErrorMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }

    if (password !== repeatPassword) {
      setFieldErrors(prev => ({ ...prev, repeatPassword: true }));
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const validEmailResponse = await fetch(`${apiUrl}/api/v1/auth/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      });

      if (!validEmailResponse.ok) {
        const data = await validEmailResponse.json();
        setErrorMessage(data.message);
        return;
      } 
      setAskForEmailToken(true);

    } catch (error) {
      console.error("An error ocurred: ", error);
    }
};

  const handleConfirmToken = async () => {

    if (emailToken.length != 6) {
      setErrorMessage("El token debe ser de 6 dígitos");
      return;
    }

    try {
      const signupResponse = await fetch(`${apiUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          email: email,
          password: password,
          code: emailToken
        }),
      });

      if (!signupResponse.ok) {
        setErrorMessage("Algo no ha ido bien.");
        return;
      }

      const data = await signupResponse.json();
      await storeToken(data.token);
      router.push("/recipes");

    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[gs.container, { justifyContent: "center", alignItems: "center", flex: 1, paddingVertical: 40 }]}>        
        <Image source={require("../static/images/profile.webp")} style={gs.profileImage} />

        {askForEmailToken ? (
          <View style={[gs.card, { maxWidth: 400, width: "90%" }]}>            
            <Text style={gs.headerText}>Revisa tu email</Text>
            <TextInput
              style={[gs.input, { padding: 12 }]}
              placeholder="Código de validación"
              value={emailToken}
              onChangeText={setEmailToken}
            />
            <TouchableOpacity style={gs.mainButton} onPress={handleConfirmToken}>
              <Text style={gs.mainButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[gs.card, { maxWidth: 400, width: "90%" }]}>            
            <Text style={gs.headerText}>Regístrate</Text>

            <TextInput
              style={gs.input}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={gs.input}
              placeholder="Apellido"
              value={surname}
              onChangeText={setSurname}
            />
            <TextInput
              style={gs.input}
              placeholder="Nombre de usuario"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={gs.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={{ position: "relative" }}>
              <TextInput
                style={gs.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={gs.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
              <TextInput
                style={gs.input}
                placeholder="Repite la contraseña"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={gs.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
              </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={gs.errorText}>{errorMessage}</Text> : null}

            <Link href={"/signin"} style={{ marginTop: 10 }}>
              <Text style={gs.linkText}>¿Ya tienes cuenta? ¡Inicia sesión!</Text>
            </Link>

            <TouchableOpacity style={[gs.mainButton, { marginTop: 20 }]} onPress={handleSubmit}>
              <Text style={gs.mainButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}