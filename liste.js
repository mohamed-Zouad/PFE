//http://192.168.1.106:3000/stagiaires

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert , ScrollView} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "./color";
const Liste = () => {
  const [Stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [updatedNom, setUpdatedNom] = useState("");
  const [updatedPrenom, setUpdatedPrenom] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedDaten, setUpdatedDaten] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.1.128:3000/Stagiaires")
      .then((response) => {
        setStagiaires(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des Stagiaires :", error);
      });
  }, []);

  const handleDelete = (cef) => {
    axios
      .delete(`http://192.168.1.106/3000/Stagiaires/${cef}`)
      .then(() => {
        setStagiaires(stagiaires.filter((stagiaire) => stagiaire.cef !== cef));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du stagiaire :", error);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://192.168.1.106/3000/Stagiaires/${selectedStagiaire}`, {
        nom: updatedNom,
        prenom: updatedPrenom,
        email: updatedEmail,
        pass: updatedPassword,
        daten: updatedDaten,
      })
      .then(() => {
        const updatedStagiaires = stagiaires.map((stagiaire) => {
          if (stagiaire.cef === selectedStagiaire) {
            return {
              ...stagiaire,
              nom: updatedNom,
              prenom: updatedPrenom,
              email: updatedEmail,
              pass: updatedPassword,
              daten: updatedDaten,
            };
          }
          return stagiaire;
        });
        setStagiaires(updatedStagiaires);
        setSelectedStagiaire(null);
        Alert.alert("Success", "Stagiaire mis à jour avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du stagiaire :", error);
      });
  };

  return (
    <LinearGradient
    style={{
        flex: 1
    }}
    colors={[COLORS.secondary, COLORS.primary]}
>
    <ScrollView>
    <View colors={[COLORS.secondary, COLORS.primary]}>
      <Text style={styles.header}>Liste des stagiaires :</Text>
      <FlatList
        data={Stagiaires}
        keyExtractor={(item) => item.cef.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>CEF : {item.cef}</Text>
            <Text style={styles.itemText}>Nom : {item.nom}</Text>
            <Text style={styles.itemText}>Prenom : {item.prenom}</Text>
            <Text style={styles.itemText}>Email : {item.email}</Text>
            <Text style={styles.itemText}>Password : {item.pass}</Text>
            {/* <Text style={styles.itemText}>Daten : {item.daten}</Text> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => setSelectedStagiaire(item.cef)}
              >
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.cef)}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {selectedStagiaire && (
        <View style={styles.updateForm}>
          <Text style={styles.updateHeader}>Modifier le stagiaire :</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={updatedNom}
            onChangeText={(text) => setUpdatedNom(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={updatedPrenom}
            onChangeText={(text) => setUpdatedPrenom(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={updatedEmail}
            onChangeText={(text) => setUpdatedEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={updatedPassword}
            onChangeText={(text) => setUpdatedPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date de naissance"
            value={updatedDaten}
            onChangeText={(text) => setUpdatedDaten(text)}
          />
          <TouchableOpacity style={[styles.button,styles.updateButton]} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setSelectedStagiaire(null)}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </ScrollView>

   </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(187 247 208)",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 50,
    color: "#333",
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  updateForm: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  updateHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",}
  });
export default Liste;