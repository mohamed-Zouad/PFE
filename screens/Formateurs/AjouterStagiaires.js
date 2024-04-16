//192.168.1.107 home
//192.168.43.5 green

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ScrollView,TouchableOpacity } from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import { parse } from 'papaparse';

const AjouterStagiaires_byFormateurs = () => {
  const [cef, setCef] = useState("");
  const [nom_stagiaire, setNom_stagiaire] = useState("");
  const [prenom_stagiaire, setPrenom_stagiaire] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(null);

  useEffect(() => {
    fetchGroupes();
  }, []);

  const fetchGroupes = async () => {
    try {
      const response = await axios.get('http://192.168.43.5:5000/groupes');
      setGroupes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des groupes:', error);
      Alert.alert("Erreur", "Erreur lors de la récupération des groupes");
    }
  };
  
  const pickDocument = async () => {
  try {
  const result = await DocumentPicker.getDocumentAsync();
  if (result["assets"][0]["name"] !== '') {
  const response = await fetch(result["assets"][0]["uri"]);
  const text = await response.text();
  const { data } = parse(text);
  const dataWithoutHeader = data.slice(1);
  //pour ignorer l’entête du fishier csv
  console.log('données CSV analysées:', dataWithoutHeader);
  console.log('Data envoyée pour insertion:', dataWithoutHeader);
  Alert.alert("Success", "Données ajoutées avec succès");
  await axios.post('http://192.168.43.5:5000/Stagiaires/insert-from-csv', 
  dataWithoutHeader);
  } else {
  console.log('Selection annulée ou echouée');
  }
  } catch (error) {
  console.error('Erreur selection de document:', error);
  Alert.alert("Erreur", "erreur lors du selection du fichier");
  }
  }; 
  
  const handleInsertFromForm = () => {
    // Validation des champs
  if (!cef || !nom_stagiaire || !prenom_stagiaire || !email || !mot_de_passe || !selectedGroupe) {
    Alert.alert("Erreur", "Veuillez remplir tous les champs.");
    return;
  }

  // Validation des données avec des expressions régulières
  const nameRegex = /^[a-zA-Z]+$/; // Regex pour les noms ne contenant que des lettres
  const cefRegex = /^\d{13}$/; // Regex pour le CEF ne contenant que des chiffres
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour une adresse email valide
  const passwordRegex = /^[^<>\/]+$/; // Regex pour le mot de passe ne contenant pas <, > ou /

  const nameValid = nameRegex.test(nom_stagiaire) && nameRegex.test(prenom_stagiaire);
  const cefValid = cefRegex.test(cef);
  const emailValid = emailRegex.test(email) && email.length <= 60;
  const passwordValid = passwordRegex.test(mot_de_passe);

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

  // Envoi de la requête si toutes les validations sont réussies
    axios
      .post("http://192.168.43.5:5000/Stagiaires/insert-from-form", {
        cef,
        nom_stagiaire,
        prenom_stagiaire,
        email,
        mot_de_passe,
        id_groupe: selectedGroupe // Ajout de l'id_groupe sélectionné dans la requête
      })
      .then(() => {
        setCef("");
        setNom_stagiaire("");
        setPrenom_stagiaire("");
        setEmail("");
        setMot_de_passe("");
        setSelectedGroupe(null); // Réinitialisation de la sélection du groupe

        Alert.alert("Succès", "Stagiaire ajouté avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du stagiaire :", error);
        Alert.alert("Erreur", "Erreur lors de l'ajout du stagiaire");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Ajouter un stagiaire :</Text>
        <TextInput
          style={styles.input}
          placeholder="CEF"
          value={cef}
          onChangeText={(text) => setCef(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom_stagiaire}
          onChangeText={(text) => setNom_stagiaire(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom_stagiaire}
          onChangeText={(text) => setPrenom_stagiaire(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={mot_de_passe}
            onChangeText={(text) => setMot_de_passe(text)}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            style={styles.togglePasswordVisibility}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <AntDesign name={hidePassword ? 'eye' : 'eyeo'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Sélectionner un groupe :</Text>
          <Picker
            selectedValue={selectedGroupe}
            onValueChange={(itemValue, itemIndex) => setSelectedGroupe(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label=" Choisir groupe " value={null} />
            {groupes.map((groupe) => (
              <Picker.Item key={groupe.id_groupe} label={groupe.nom_groupe} value={groupe.id_groupe} />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleInsertFromForm}>
            <Text style={styles.buttonText}>Insérer et inscrire un stagiaire depuis le formulaire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={pickDocument}>
            <Text style={styles.buttonText}>Insérer un stagiaire depuis un fichier CSV</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E8B57',
    textAlign: 'center',
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  togglePasswordVisibility: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2E8B57',
  },
  picker: {
    backgroundColor: '#2E8B57',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ced4da',
    color:"white",
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2E8B57',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default AjouterStagiaires_byFormateurs;