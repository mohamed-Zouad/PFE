import { View, Text, Image , Pressable, TextInput, TouchableOpacity , Alert , ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from './color';
import { Ionicons } from "@expo/vector-icons";
import {Zocial} from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from './Button';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
         // Vérifier si tous les champs sont remplis
         if (!email || !password ) {
            // Afficher un message d'erreur si des champs sont manquants
            Alert.alert('Error','Please fill in all fields.');
            return;
        }

        // Vérifier si l'email est valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erreur', 'Please enter a valid email address.');
            return;
        }

        // Vérifier si le mot de passe est valide
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert(
                'Error',
                'The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number'
            );
            return;
        }
        if (email=="admin@gmail.com" || password=="Admin1234" ) {
            // Afficher un message d'erreur si des champs sont manquants
            navigation.navigate('Admin');
        }
        if (email=="form@gmail.com" || password=="Form1234" ) {
            // Afficher un message d'erreur si des champs sont manquants
            navigation.navigate('Formateur');
        }
        if (email=="stag@gmail.com" || password=="Stag1234" ) {
            // Afficher un message d'erreur si des champs sont manquants
            navigation.navigate('Stagiaire');
        }
        // Si toutes les validations passent, naviguer vers la vue Suite
        // navigation.navigate('Suite');
    }
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                    {/* <Zocial name={'email'}  marginRight={300} marginLeft = {-20} size={30} /> */}

                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            style={{
                                width: "100%",        
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            onChangeText={setPassword}
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <Button
                    title="Login"
                    onPress={(handleLogin)}
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;
