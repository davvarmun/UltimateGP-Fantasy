'use strict';
import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D", // Negro Racing
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E10600", // Rojo MotoGP
    marginBottom: 16,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#C0C0C0", // Gris metálico
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    marginVertical: 5,
  },
  linkText: {
    fontSize: 16,
    color: "#E10600", // Rojo MotoGP
    textDecorationLine: "underline",
  },

  mainButton: {
    backgroundColor: "#E10600", // Rojo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  mainButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#E10600",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#E10600",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#666",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "90%",
    alignSelf: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // Más oscuro para resaltar el modal
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1C1C1C', // Negro mate
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFF",
    marginBottom: 15,
    textAlign: 'center',
  },
  
  input: {
    height: 50,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#222", // Gris oscuro
    color: "#FFF",
  },
  inputFocused: {
    borderColor: "#E10600",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },

  card: {
    width: "90%",
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#B0B0B0",
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginVertical: 16,
  },

  navbarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E10600",
  },

  modalContent: {
    backgroundColor: "#1C1C1C",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  navBar: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#000",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal: 5,
  },

  content: {
    flex: 1,
    paddingTop: 80,
  }, 
  
  reviewsContainer: {
    marginTop: -100,
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E10600",
    marginBottom: 20,
    textAlign: "center",
  },
  reviewCard: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    width: '80%',
    marginBottom: 30,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  reviewText: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
  },

  footerContainer: {
    width: '100%',
    backgroundColor: "#111",
    paddingVertical: 60,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#E10600",
    textDecorationLine: "underline",
  },
});
