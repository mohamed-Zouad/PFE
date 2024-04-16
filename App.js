// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Login from './Login';
// import Welcome from './Welcome';
// import Formateur from './Formateur';
// import Admin from './Admin';
// import Vocal from './EnregistrerVocal';
// import Etudiant from './Etudiant';
// // import Liste from './liste';
// import Profile from './Profile';
// const Stack = createStackNavigator();
// export default function App() {
  
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName='Welcome'
//       >
//         <Stack.Screen
//           name="Welcome"
//           component={Welcome}
//           options={{
//             headerShown: false
//           }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             headerShown: false
//           }}
//         />
//         <Stack.Screen 
//           name="Formateur"
//           component={Formateur}
//           options={{
//             headerShown: false
//           }}
//        />
//         <Stack.Screen
//           name="Admin"
//           component={Admin}
//           options={{
//             headerShown: false
//           }}
//         />

//        <Stack.Screen 
//           name="Etudiant"
//           component={Etudiant}
//           options={{
//             headerShown: false
//           }}
//        />

//         <Stack.Screen 
//           name="Vocal"
//           component={Vocal}
//           options={{
//             headerShown: false
//           }}
//        />
//         <Stack.Screen 
//           name="AjouterStagiaires"
//           component={AjouterStagiaires}
//           options={{
//             headerShown: false
//           }}
//        />
//         <Stack.Screen 
//           name="ListeStagiaires_byFormateurs"
//           component={ListeStagiaires_byFormateurs}
//           options={{
//             headerShown: false
//           }}
//        />
//                <Stack.Screen 
//           name="Profile"
//           component={Profile}
//           options={{
//             headerShown: false
//           }}
//        />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }










import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import AjouterStagiaires_byAdmins from './screens/Admins/AjouterStagiaires';
import AjouterStagiaires__byFormateurs from './screens/Formateurs/AjouterStagiaires';
// import ListeStagiaires_byAdmins from './screens/Admins/ListeStagiaires';
// import ListeStagiaires_byFormateurs from './screens/Formateurs/ListeStagiaires';
// import AjouterFormateurs from './screens/Admins/AjouterFormateurs';
// import ListeFormateurs from './screens/Admins/ListeFormateurs';
// import ModulesAdmins from './screens/Admins/Modules';
// import ModulesFormateurs from './screens/Formateurs/Modules';
// import ModulesStagiaires from './screens/Stagiaires/Modules';
// import GroupesAdmins from './screens/Admins/Groupes';
// import GroupesFormateurs from './screens/Formateurs/Groupes';
// import CircularProgressBar from './screens/Admins/DashboardOfAbsence';
// import CalendarAdmins from './screens/Admins/Calendar';
// import CalendarFormateurs from './screens/Formateurs/Calendar';
// import CalendarStagiaires from './screens/Stagiaires/Calendar';
export default function App() {
  return (
    <>
    {/* <AjouterStagiaires_byAdmins/> */}
    <AjouterStagiaires__byFormateurs/>
    {/* <ListeStagiaires_byAdmins/> */}
    {/* <ListeStagiaires_byFormateurs/> */}

    {/* <AjouterFormateurs/> */}
    {/* <ListeFormateurs/> */}
    {/* <ModulesAdmins/> */}
    {/* <ModulesFormateurs/> */}
    {/* <ModulesStagiaires/> */}
    {/* <GroupesAdmins/> */}
    {/* <GroupesFormateurs/> */}
    {/* <CircularProgressBar/> */}
    {/* <CalendarAdmins/> */}
    {/* <CalendarFormateurs/> */}
    {/* <CalendarStagiaires/> */}
    </>
  );
}


