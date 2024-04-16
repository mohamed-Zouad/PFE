//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, ScrollView} from "react-native";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import { parse } from 'papaparse';

const AjouterFormateurs = () => {
  const [cin, setCin] = useState("");
  const [nom_formateur, setNom_formateur] = useState("");
  const [prenom_formateur, setPrenom_formateur] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

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
  await axios.post('http://192.168.1.81:5000/Formateurs/insert-from-csv', 
  dataWithoutHeader);
 // Rafraîchir les données après l'insertion
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
  if (!cin || !nom_formateur || !prenom_formateur || !email || !mot_de_passe ) {
    Alert.alert("Erreur", "Veuillez remplir tous les champs.");
    return;
  }

  // Validation des données avec des expressions régulières
  const nameRegex = /^[a-zA-Z]+$/; // Regex pour les noms ne contenant que des lettres
  const cinRegex = /^[A-Z]{1,2}\d{4,}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour une adresse email valide
  const passwordRegex = /^[^<>\/]+$/; // Regex pour le mot de passe ne contenant pas <, > ou /

  const nameValid = nameRegex.test(nom_formateur) && nameRegex.test(prenom_formateur);
  const cinValid = cinRegex.test(cin) && cin.length <= 10;
  const emailValid = emailRegex.test(email) && email.length <= 60;
  const passwordValid = passwordRegex.test(mot_de_passe);

  // Affichage des messages d'erreur
  if (!nameValid) {
    Alert.alert("Erreur", "Les champs Nom et Prénom ne doivent contenir que des lettres.");
    return;
  }
  if (!cinValid) {
    Alert.alert("Erreur", "Le champ CIN doit se débuter par au moins une lettre et des chiffres.");
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
      .post("http://192.168.1.81:5000/Formateurs/insert-from-form", {
        cin,
        nom_formateur,
        prenom_formateur,
        email,
        mot_de_passe,
      })
      .then(() => {
        setCin("");
        setNom_formateur("");
        setPrenom_formateur("");
        setEmail("");
        setMot_de_passe("");

        Alert.alert("Success", "Formateur ajouté avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du formateur :", error);
        Alert.alert("Erreur", "Erreur lors de l'ajout du formateur");
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Ajouter un formateur :</Text>
        <TextInput
          style={styles.input}
          placeholder="Cin"
          value={cin}
          onChangeText={(text) => setCin(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom_formateur}
          onChangeText={(text) => setNom_formateur(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom_formateur}
          onChangeText={(text) => setPrenom_formateur(text)}
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
            secureTextEntry={hidePassword} // Hide password characters if hidePassword is true
          />
          <TouchableOpacity
            style={styles.togglePasswordVisibility}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <AntDesign name={hidePassword ? 'eye' : 'eyeo'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleInsertFromForm}>
            <Text style={styles.buttonText}>Insérer depuis le formulaire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={pickDocument}>
            <Text style={styles.buttonText}>Insérer depuis un fichier CSV</Text>
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

export default AjouterFormateurs;