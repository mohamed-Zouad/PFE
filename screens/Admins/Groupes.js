//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const GroupesAdmins = () => {
  const [groupes, setGroupes] = useState([]);
  const [filteredGroupes, setFilteredGroupes] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filieres, setFilieres] = useState([]);
  const [annees, setAnnees] = useState([]);

  useEffect(() => {
    fetchGroupes();
    fetchFilieres();
    fetchAnnees();
  }, []);

  const fetchGroupes = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/Groupes');
      setGroupes(response.data);
    } catch (error) {
      console.error('Error fetching groupes:', error);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/Filieres');
      setFilieres(response.data);
    } catch (error) {
      console.error('Error fetching filieres:', error);
    }
  };

  const fetchAnnees = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/Groupes');
      const uniqueAnnees = Array.from(new Set(response.data.map(groupe => groupe.annee)));
      setAnnees(uniqueAnnees);
    } catch (error) {
      console.error('Error fetching annees:', error);
    }
  };

  const searchGroupesByFiliereAndYear = async () => {
    try {
      const response = await axios.get(`http://192.168.1.81:5000/groupes/searchbyfiliereandyear?nom_filiere=${selectedFiliere}&annee=${selectedYear}`);
      setFilteredGroupes(response.data);
    } catch (error) {
      console.error('Error searching groupes by filiere and year:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groupes List :</Text>
      <ScrollView style={styles.scrollView}>
        {groupes.map((groupe) => (
          <Text key={groupe.id_groupe} style={styles.groupeItem}>{groupe.nom_groupe}</Text>
        ))}
      </ScrollView>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFiliere}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedFiliere(itemValue)}
        >
          {filieres.map((filiere) => (
            <Picker.Item key={filiere.id_filiere} label={filiere.nom_filiere} value={filiere.nom_filiere} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
        >
          {annees.map((annee, index) => (
            <Picker.Item key={index} label={annee.toString()} value={annee} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={searchGroupesByFiliereAndYear}>
          <Text style={styles.buttonText}>Rechercher Groupes</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Filtered Groupes :</Text>
      <ScrollView style={styles.scrollView}>
        {filteredGroupes.map((groupe) => (
          <Text key={groupe.id_groupe} style={styles.groupeItem}>{groupe.nom_groupe}</Text>
        ))}
      </ScrollView>
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
    marginTop: 20,
    marginBottom:10,
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
  pickerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 190,
    marginBottom: 20,
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



export default GroupesAdmins;
