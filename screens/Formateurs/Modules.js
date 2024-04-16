//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const ModulesFormateurs = () => {
  const [modules, setModules] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [filieres, setFilieres] = useState([]);
  // const [id_Formateur, setId_Formateur] = useState("");
  const id_Formateur = 3; // Remplacer 1 par l'ID réel du formateur

  useEffect(() => {
    fetchModules();
    fetchFilieres();
    // fetchId_Formateur();
  }, []);

  // const fetchId_Formateur = async () => {
  //   try {
  //     const id = await AsyncStorage.getItem("id_formateur");
  //     setId_Formateur(id);
  //   } catch (error) {
  //     console.error("Error fetching id_formateur from AsyncStorage:", error);
  //   }
  // };

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.81:5000/modules/search_fo?id_formateur=${id_Formateur}&nom_filiere=${selectedFiliere}`
      );
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axios.get("http://192.168.1.81:5000/Filieres");
      setFilieres(response.data);
    } catch (error) {
      console.error("Error fetching filieres:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modules List :</Text>
      <ScrollView style={styles.scrollView}>
        {modules.map((module) => (
          <Text key={module.id_module} style={styles.moduleItem}>
            {module.titre_module}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <Picker
          selectedValue={selectedFiliere}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFiliere(itemValue)
          }
        >
          {filieres.map((filiere) => (
            <Picker.Item
              key={filiere.id_filiere}
              label={filiere.nom_filiere}
              value={filiere.nom_filiere}
            />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={fetchModules}>
          <Text style={styles.buttonText}>Rechercher Modules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#228B22",
    textTransform: "uppercase",
  },
  scrollView: {
    maxHeight: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
  },
  moduleItem: {
    padding: 10,
    fontSize: 18,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pickerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 190,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModulesFormateurs;
