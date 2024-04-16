//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ModulesStagiaires = () => {
  const [modules, setModules] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedGroupe, setSelectedGroupe] = useState('');
  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);
  // const [id_Stagiaire, setId_Stagiaire] = useState('');

  const id_Stagiaire = 1;
  
  useEffect(() => {
    fetchFilieres();
    fetchGroupes();
    // fetchId_Stagiaire();
  }, []);

// const fetchId_Stagiaire = async () => {
//     try {
//         const id = await AsyncStorage.getItem('id_stagiaire');
//         setId_Stagiaire(id);
//     } catch (error) {
//         console.error('Error fetching id_stagiaire from AsyncStorage:', error);
//     }
// };

// Utilisez idStagiaire pour récupérer les modules du stagiaire

  const fetchFilieres = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/Filieres');
      setFilieres(response.data);
    } catch (error) {
      console.error('Error fetching filieres:', error);
    }
  };

  const fetchGroupes = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/groupes');
      setGroupes(response.data);
    } catch (error) {
      console.error('Error fetching groupes:', error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(`http://192.168.1.81:5000/modules/search_st?id_stagiaire=${id_Stagiaire}&id_filiere=${selectedFiliere}&id_groupe=${selectedGroupe}`);
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modules List :</Text>
      <ScrollView style={styles.scrollView}>
        {modules.map((module) => (
          <Text key={module.id_module} style={styles.moduleItem}>{module.titre_module}</Text>
        ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <Picker
          selectedValue={selectedFiliere}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedFiliere(itemValue)}
        >
          
          {filieres.map((filiere) => (
            <Picker.Item key={filiere.id_filiere} label={filiere.nom_filiere} value={filiere.id_filiere} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedGroupe}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedGroupe(itemValue)}
        >
          
          {groupes.map((groupe) => (
            <Picker.Item key={groupe.id_groupe} label={groupe.nom_groupe} value={groupe.id_groupe} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#228B22',
    textTransform: 'uppercase',
  },
  scrollView: {
    maxHeight: 200,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
  },
  moduleItem: {
    padding: 10,
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  picker: {
    height: 50,
    width: 190,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#228B22',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ModulesStagiaires;
