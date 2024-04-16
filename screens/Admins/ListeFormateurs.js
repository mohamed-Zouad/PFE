//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

const ListeFormateurs = () => {
  const [formateurs, setFormateurs] = useState([]);
  const [selectedFormateur, setSelectedFormateur] = useState(null);
  const [updatedCin, setUpdatedCin] = useState("");
  const [updatedNom_formateur, setUpdatedNom_formateur] = useState("");
  const [updatedPrenom_formateur, setUpdatedPrenom_formateur] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedMot_de_passe, setUpdatedMot_de_passe] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [formateursResponse, filieresResponse] = await Promise.all([
        axios.get('http://192.168.1.81:5000/Formateurs'),
        axios.get('http://192.168.1.81:5000/Filieres')
      ]);
      setFormateurs(formateursResponse.data);
      setFilieres(filieresResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données initiales:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.");
    }
  };

  const handleFiliereChange = (value) => {
    setSelectedFiliere(value);
    axios
      .get(`http://192.168.1.81:5000/Formateurs/filiere/${value}`)
      .then((response) => {
        setFormateurs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des formateurs par filière :", error);
        Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des formateurs. Veuillez réessayer.");
      });
  };

  const handleDelete = (id_formateur) => {
    axios
      .delete(`http://192.168.1.81:5000/Formateurs/${id_formateur}`)
      .then(() => {
        setFormateurs(formateurs.filter((formateur) => formateur.id_formateur !== id_formateur));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du formateur :", error);
        Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression du formateur. Veuillez réessayer.");
      });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce formateur ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => handleDelete(id)
        }
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = () => {
    // Validation des champs
    if (!updatedCin || !updatedNom_formateur || !updatedPrenom_formateur || !updatedEmail || !updatedMot_de_passe ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // Validation des données avec des expressions régulières
    const cinRegex = /^[A-Z]{1,2}\d{4,}$/; 
    const nameRegex = /^[a-zA-Z]+$/;// Regex pour les noms ne contenant que des lettres
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour une adresse email valide
    const passwordRegex = /^[^<>\/]+$/; // Regex pour le mot de passe ne contenant pas <, > ou /

    const nameValid = nameRegex.test(updatedNom_formateur) && nameRegex.test(updatedPrenom_formateur);
    const cinValid = cinRegex.test(updatedCin) && updatedCin.length <= 10;
    const emailValid = emailRegex.test(updatedEmail) && updatedEmail.length <= 60;
    const passwordValid = passwordRegex.test(updatedMot_de_passe);

    // Affichage des messages d'erreur
    if (!nameValid) {
      Alert.alert("Erreur", "Les champs Nom et Prénom ne doivent contenir que des lettres.");
      return;
    }
    if (!cinValid) {
      Alert.alert("Erreur", "Le champ CIN doit se débuter par au moins une lettre majuscule suivie des chiffres.");
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

    // Si les validations passent, effectuer la mise à jour
    axios
      .put(`http://192.168.1.81:5000/Formateurs/${selectedFormateur}`, {
        cin: updatedCin,
        nom_formateur: updatedNom_formateur,
        prenom_formateur: updatedPrenom_formateur,
        email: updatedEmail,
        mot_de_passe: updatedMot_de_passe
      })
      .then(() => {
        const updatedFormateurs = formateurs.map((formateur) => {
          if (formateur.id_formateur === selectedFormateur) {
            return {
              ...formateur,
              cin: updatedCin,
              nom_formateur: updatedNom_formateur,
              prenom_formateur: updatedPrenom_formateur,
              email: updatedEmail,
              mot_de_passe: updatedMot_de_passe
            };
          }
          return formateur;
        });
        setFormateurs(updatedFormateurs);
        setSelectedFormateur(null);
        Alert.alert("Succès", "Formateur mis à jour avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du formateur :", error);
        Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour du formateur. Veuillez réessayer.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des formateurs :</Text>
      <Text style={styles.label}>Sélectionner une filière :</Text>
      <Picker
        selectedValue={selectedFiliere}
        onValueChange={(itemValue, itemIndex) => handleFiliereChange(itemValue)}
      >
        <Picker.Item label="Choisir une filière" value={null} />
        {filieres.map((filiere) => (
          <Picker.Item key={filiere.id_filiere} label={filiere.nom_filiere} value={filiere.id_filiere} />
        ))}
      </Picker>
      <FlatList
        data={formateurs}
        keyExtractor={(item) => item.id_formateur.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>CIN: {item.cin}</Text>
            <Text style={styles.itemText}>Nom: {item.nom_formateur}</Text>
            <Text style={styles.itemText}>Prenom: {item.prenom_formateur}</Text>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <Text style={styles.itemText}>Password: {item.mot_de_passe}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => setSelectedFormateur(item.id_formateur)}
              >
                <Text style={styles.buttonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => confirmDelete(item.id_formateur)}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {selectedFormateur && (
        <View style={styles.updateForm}>
          <Text style={styles.updateHeader}>Modifier le formateur :</Text>
          <TextInput
            style={styles.input}
            placeholder="CIN"
            value={updatedCin}
            onChangeText={(text) => setUpdatedCin(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={updatedNom_formateur}
            onChangeText={(text) => setUpdatedNom_formateur(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={updatedPrenom_formateur}
            onChangeText={(text) => setUpdatedPrenom_formateur(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={updatedEmail}
            onChangeText={(text) => setUpdatedEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={updatedMot_de_passe}
            onChangeText={(text) => setUpdatedMot_de_passe(text)}
            secureTextEntry={true} // pour masquer les caractères du mot de passe
          />
          <TouchableOpacity style={[styles.button,styles.updateButton]} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setSelectedFormateur(null)}
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
    fontWeight: 'bold',
    marginTop: 20,
    color: '#228B22',
    textTransform: 'uppercase',
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    marginTop:15,
    marginBottom: 5,
    color: '#2E8B57',
    alignSelf: "center",
  },
  itemContainer: {
    marginTop: 20,
    marginBottom: 10,
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
    fontWeight: 'bold',
    marginTop: 15,
    color: '#228B22',
    textTransform: 'uppercase',
    alignSelf: "center",
    marginBottom:10,
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
  }
});

export default ListeFormateurs;