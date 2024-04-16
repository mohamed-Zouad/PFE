//192.168.1.107 home
//192.168.43.5 

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const ListeStagiaires_byFormateurs = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [updatedCef, setUpdatedCef] = useState("");
  const [updatedNom_stagiaire, setUpdatedNom_stagiaire] = useState("");
  const [updatedPrenom_stagiaire, setUpdatedPrenom_stagiaire] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedMot_de_passe, setUpdatedMot_de_passe] = useState("");
  const [groupes, setGroupes] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [stagiairesResponse, groupesResponse] = await Promise.all([
        axios.get("http://192.168.43.5:5000/Stagiaires"),
        axios.get("http://192.168.43.5:5000/Groupes"),
      ]);
      setStagiaires(stagiairesResponse.data);
      setGroupes(groupesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données initiales:", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer."
      );
    }
  };

  const fetchStagiairesByGroup = (id_groupe) => {
    setSelectedGroupe(id_groupe);
    axios
      .get(`http://192.168.43.5:5000/Stagiaires/findgroupe/${id_groupe}`)
      .then((response) => {
        setStagiaires(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des stagiaires par groupe :", error);
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite lors de la récupération des stagiaires. Veuillez réessayer."
        );
      });
  };

  const handleDelete = (id_stagiaire) => {
    axios
      .delete(`http://192.168.43.5:5000/Stagiaires/${id_stagiaire}`)
      .then(() => {
        setStagiaires(stagiaires.filter((stagiaire) => stagiaire.id_stagiaire !== id_stagiaire));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du stagiaire :", error);
      });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce stagiaire ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = () => {
// Validation des champs
if (!updatedCef || !updatedNom_stagiaire || !updatedPrenom_stagiaire || !updatedEmail || !updatedMot_de_passe ) {
  Alert.alert("Erreur", "Veuillez remplir tous les champs.");
  return;
}

// Validation des données avec des expressions régulières
const nameRegex = /^[a-zA-Z]+$/; // Regex pour les noms ne contenant que des lettres
const cefRegex = /^\d{13}$/; // Regex pour le CEF ne contenant que des chiffres
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour une adresse email valide
const passwordRegex = /^[^<>\/]+$/; // Regex pour le mot de passe ne contenant pas <, > ou /

const nameValid = nameRegex.test(updatedNom_stagiaire) && nameRegex.test(updatedPrenom_stagiaire);
const cefValid = cefRegex.test(updatedCef);
const emailValid = emailRegex.test(updatedEmail) && updatedEmail.length <= 60;
const passwordValid = passwordRegex.test(updatedMot_de_passe);

// Affichage des messages d'erreur
if (!nameValid) {
  Alert.alert("Erreur", "Les champs Nom et Prénom ne doivent contenir que des lettres.");
  return;
}
if (!cefValid) {
  Alert.alert("Erreur", "Le champ CEF doit contenir 13 chiffres.");
  return;
}
if (!emailValid) {
  Alert.alert("Erreur", "Veuillez saisir une adresse e-mail valide (max 60 caractères).");
  return;
}
if (!passwordValid) {
  Alert.alert("Erreur", "Le mot de passe ne doit pas contenir les caractères <, > ou /.");
  return;
}

    axios
      .put(`http://192.168.43.5:5000/Stagiaires/${selectedStagiaire}`, {
        cef: updatedCef,
        nom_stagiaire: updatedNom_stagiaire,
        prenom_stagiaire: updatedPrenom_stagiaire,
        email: updatedEmail,
        mot_de_passe: updatedMot_de_passe,
      })
      .then(() => {
        const updatedStagiaires = stagiaires.map((stagiaire) => {
          if (stagiaire.id_stagiaire === selectedStagiaire) {
            return {
              ...stagiaire,
              cef: updatedCef,
              nom_stagiaire: updatedNom_stagiaire,
              prenom_stagiaire: updatedPrenom_stagiaire,
              email: updatedEmail,
              mot_de_passe: updatedMot_de_passe,
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
    <View style={styles.container}>
      <Text style={styles.header}>Liste des stagiaires :</Text>
      <Picker
        selectedValue={selectedGroupe}
        onValueChange={(itemValue, itemIndex) => fetchStagiairesByGroup(itemValue)}
      >
        <Picker.Item label="Choisir un groupe" value={null} />
        {groupes.map((groupe) => (
          <Picker.Item key={groupe.id_groupe} label={groupe.nom_groupe} value={groupe.id_groupe} />
        ))}
      </Picker>
      <FlatList
        data={stagiaires}
        keyExtractor={(item) => item.id_stagiaire.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>CEF: {item.cef}</Text>
            <Text style={styles.itemText}>Nom: {item.nom_stagiaire}</Text>
            <Text style={styles.itemText}>Prenom: {item.prenom_stagiaire}</Text>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <Text style={styles.itemText}>Password: {item.mot_de_passe}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => setSelectedStagiaire(item.id_stagiaire)}
              >
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => confirmDelete(item.id_stagiaire)}
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
            placeholder="Cef"
            value={updatedCef}
            onChangeText={(text) => setUpdatedCef(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={updatedNom_stagiaire}
            onChangeText={(text) => setUpdatedNom_stagiaire(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={updatedPrenom_stagiaire}
            onChangeText={(text) => setUpdatedPrenom_stagiaire(text)}
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
            value={updatedMot_de_passe}
            onChangeText={(text) => setUpdatedMot_de_passe(text)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#228B22",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  itemContainer: {
    marginBottom: 10,
    marginTop: 20,
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
    justifyContent: "space-between",
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
    marginTop: 15,
    color: "#228B22",
    textTransform: "uppercase",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10,
  },
});

export default ListeStagiaires_byFormateurs;
