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

const GroupesFormateurs = () => {
  const [groupes, setGroupes] = useState([]);
  const [groupesbyyear, setGroupesbyyear] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filieres, setFilieres] = useState([]);
  // const [id_Formateur, setId_Formateur] = useState('');
  const id_Formateur = 3; // Remplacer 3 par l'ID réel du formateur

  useEffect(() => {
    fetchGroupesbyyear();
    fetchGroupes();
    fetchFilieres();
    // fetchId_Formateur();
  }, []);

//   const fetchId_Formateur = async () => {
//     try {
//         const id = await AsyncStorage.getItem('id_formateur');
//         setId_Formateur(id);
//     } catch (error) {
//         console.error('Error fetching id_formateur from AsyncStorage:', error);
//     }
// };


  const fetchGroupes = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.81:5000/groupes/search_for_formateur?id_formateur=${id_Formateur}&nom_filiere=${selectedFiliere}&annee=${selectedYear}`
      );
      setGroupes(response.data);
    } catch (error) {
      console.error("Error fetching groupes:", error);
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
  const fetchGroupesbyyear = async () => {
    try {
      const response = await axios.get("http://192.168.1.81:5000/Groupes");
      const uniqueYears = Array.from(
        new Set(response.data.map((groupe) => groupe.annee))
      );
      setGroupesbyyear(uniqueYears);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des années des groupes :",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groupes List :</Text>
      <ScrollView style={styles.scrollView}>
        {groupes.map((groupe) => (
          <Text key={groupe.id_groupe} style={styles.groupeItem}>
            {groupe.nom_groupe}
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

        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
        >
          {groupesbyyear.map((year, index) => (
            <Picker.Item key={index} label={year} value={year} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={fetchGroupes}>
          <Text style={styles.buttonText}>Rechercher Groupes</Text>
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
  groupeItem: {
    padding: 10,
    fontSize: 18,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
    height: 50,
    width: 190,
    marginRight: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#228B22",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default GroupesFormateurs;
