//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Circle, Text as SvgText } from 'react-native-svg';
import { Svg } from 'react-native-svg';
import { Picker as RNPicker } from '@react-native-picker/picker';
import axios from 'axios';
import BarChartComponent from './BarChartComponent'; 
const CircularProgress = ({ radius, value, textColor, fontSize, valueSuffix, inActiveStrokeColor, inActiveStrokeOpacity, inActiveStrokeWidth, duration }) => {
  const circumference = 2 * Math.PI * radius;
  const progress = value / 100 * circumference;
  
  return (
    <Svg height={radius * 2} width={radius * 2}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - inActiveStrokeWidth / 2}
        stroke={inActiveStrokeColor}
        strokeWidth={inActiveStrokeWidth}
        fill="none"
        opacity={inActiveStrokeOpacity}
      />
      <Circle
        cx={radius}
        cy={radius}
        r={radius - inActiveStrokeWidth / 2}
        stroke="#2ecc71"
        strokeWidth={inActiveStrokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        duration={`${duration}ms`}
      />
      <SvgText
        x={radius}
        y={radius}
        fontSize={fontSize}
        fill={textColor}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {value === 0 ? "0 absents" : `${value} absents`}
      </SvgText>
    </Svg>
  );
};

const CircularProgressBar = () => {
  const [groupes, setGroupes] = useState([]);
  const [annees, setAnnees] = useState([]);
  const [valuemax, setValuemax] = useState(0);
  const [selectedGroupe, setSelectedGroupe] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchGroupes();
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

  const fetchAnnees = async () => {
    try {
      const response = await axios.get('http://192.168.1.81:5000/Groupes');
      const uniqueAnnees = Array.from(new Set(response.data.map(groupe => groupe.annee)));
      setAnnees(uniqueAnnees);
    } catch (error) {
      console.error('Error fetching annees:', error);
    }
  };

  const fetchAbsentCount = async () => {
    try {
      const response = await axios.get(`http://192.168.1.81:5000/absentCount?groupe=${selectedGroupe}&annee=${selectedYear}`);
      setValuemax(response.data.absentCount);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setShowChart(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez le groupe:</Text>
      <RNPicker
        selectedValue={selectedGroupe}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedGroupe(itemValue)}
      >
        {groupes.map((groupe, index) => (
          <RNPicker.Item key={index} label={groupe.nom_groupe} value={groupe.nom_groupe} />
        ))}
      </RNPicker>

      <Text style={styles.title}>Choisissez l'année:</Text>
      <RNPicker
        selectedValue={selectedYear}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
      >
        {annees.map((annee, index) => (
          <RNPicker.Item key={index} label={annee.toString()} value={annee} />
        ))}
      </RNPicker>

      <TouchableOpacity style={styles.button} onPress={fetchAbsentCount}>
        <Text style={styles.buttonText}>les absents pendant toute l'année</Text>
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        <CircularProgress
          radius={90}
          value={valuemax}
          textColor='tomato'
          fontSize={20}
          valueSuffix={''}
          inActiveStrokeColor={'#2ecc71'}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={6}
          duration={3000}
        />
      </View>
      {showChart && (
        <View style={styles.chartContainer}>
          <BarChartComponent selectedGroupe={selectedGroupe} selectedYear={selectedYear} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:5,
    color: '#2ecc71', // Color of the title
    textTransform: "uppercase",
  },
  picker: {
    width: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 20,
  },
});

export default CircularProgressBar;