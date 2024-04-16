//192.168.1.107 home
//192.168.1.81 green

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import axios from 'axios';

const BarChartComponent = ({ selectedGroupe, selectedYear }) => {
  const [absencesByMonth, setAbsencesByMonth] = useState([]);

  useEffect(() => {
    fetchAbsencesByMonth();
  }, [selectedGroupe, selectedYear]);

  const fetchAbsencesByMonth = async () => {
    try {
      const response = await axios.get(`http://192.168.1.81:5000/absencesByMonth?selectedGroupe=${selectedGroupe}&selectedYear=${selectedYear}`);
      const sortedAbsencesByMonth = response.data.absencesByMonth.sort((a, b) => a.month - b.month);
      setAbsencesByMonth(sortedAbsencesByMonth);
    } catch (error) {
      console.error('Error fetching absences by month:', error);
    }
  };

  const data = absencesByMonth.map(entry => ({
    month: entry.month,
    absenceCount: entry.absenceCount,
  }));

  const getMonthName = month => {
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return monthNames[month - 1];
  };
  
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <View key={index}>
        {/* Show number of absents above the bar */}
        <SvgText
          x={x(index) + bandwidth / 2}
          y={y(value.absenceCount) -10}
          fontSize={12}
          fill="black"
          textAnchor="middle"
        >
          {value.absenceCount}
        </SvgText>
        {/* Show month name below the bar */}
        <SvgText
          x={x(index) + bandwidth / 2}
          y={235} 
          fontSize={12}
          fill="white"
          textAnchor="middle"
        >
          {getMonthName(value.month)}
        </SvgText>
      </View>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistiques d'absence</Text>
      <View style={{ flexDirection: 'row' }}>
        <BarChart
          style={styles.chart}
          data={data}
          yAccessor={({ item }) => item.absenceCount}
          svg={{ fill: '#2ecc71' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Labels />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={data}
          formatLabel={() => ''}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'transparent' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2ecc71',
    textTransform: 'uppercase',
  },
  chart: {
    width: 300,
    height: 240,
    borderRadius: 16,
  },
});

export default BarChartComponent;





// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
// import axios from 'axios';

// const BarChartComponent = ({ selectedGroupe, selectedYear }) => {
//   const [absencesByMonth, setAbsencesByMonth] = useState([]);

//   useEffect(() => {
//     fetchAbsencesByMonth();
//   });

//   const fetchAbsencesByMonth = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/absencesByMonth?selectedGroupe=${selectedGroupe}&selectedYear=${selectedYear}`);
//       // Tri des données par mois avant de les définir dans le state
//       const sortedAbsencesByMonth = response.data.absencesByMonth.sort((a, b) => a.month - b.month);
//       setAbsencesByMonth(sortedAbsencesByMonth);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des absences par mois :', error);
//     }
//   };

//   // Préparation des données pour le composant BarChart
//   const data = {
//     labels: absencesByMonth.map(entry => entry.month),
//     datasets: [
//       {
//         data: absencesByMonth.map(entry => entry.absenceCount),
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//     <Text style={styles.title}>Statistiques d'absence</Text>
//     <BarChart
//         style={styles.chart}
//         data={data}
//         width={350}
//         height={220}
//         yAxisSuffix=" ab"
//         fromZero
//         yAxisInterval={1}
//         yAxisLabel=""
//         chartConfig={{
//             backgroundColor: '#ffffff',
//             backgroundGradientFrom: '#ffffff',
//             backgroundGradientTo: '#ffffff',
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
//             style: {
//                 borderRadius: 16,
//             },
//         }}
//         verticalLabelRotation={1}
//     />
// </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2ecc71', // Color of the title
//     textTransform: "uppercase",
//   },
//   chart: {
//     borderRadius: 16,
//   },
// });

// export default BarChartComponent;