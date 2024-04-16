//192.168.1.107 home
//192.168.1.81 green

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';

const CalendarFormateurs = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [seances, setSeances] = useState([]);
  const [noSeances, setNoSeances] = useState(false);

  const fetchSeances = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/seances/formateur', {
        params: {
          date: date.toISOString().split('T')[0],
          time: time,
          id_formateur: 1 // Remplacez 123 par l'ID du formateur actuellement connecté
        }
      });
      if (response.data.length === 0) {
        setSeances([]);
        setNoSeances(true);
      } else {
        setSeances(response.data);
        setNoSeances(false);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      Alert.alert('Error', 'An error occurred while fetching sessions.');
    }
  };
  
  const handleShowSeances = () => {
    if (!time) {
      Alert.alert('Error', 'Please select a time.');
      return;
    }
    fetchSeances();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.dateButton}  onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <View style={styles.space}></View>
      <TouchableOpacity  style={styles.timeButton}  onPress={() => setShowTimePicker(true)}>
        <Text style={styles.label}>Select Time: {time}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.button} onPress={handleShowSeances}>
        <Text style={styles.buttonText}>Show Seances</Text>
      </TouchableOpacity>
      {noSeances && (
        <Text style={styles.noSeancesText}>Il n'y a aucune séance ce jour là.</Text>
      )}
      <ScrollView>
        {seances.map(seance => (
          <View key={seance.id_seance} style={styles.seanceContainer}>
            <Text style={styles.seanceText}>Module: {seance.titre_module}</Text>
            <Text style={styles.seanceText}>Groupe: {seance.nom_groupe}</Text>
            <Text style={styles.seanceText}>Heure Début: {seance.heure_debut}</Text>
            <Text style={styles.seanceText}>Heure Fin: {seance.heure_fin}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    
  },
  timeButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  seanceContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  seanceText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  space: {
    height: 20,
  },
  noSeancesText: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 20,
  },
});

export default CalendarFormateurs;
