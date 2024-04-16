
import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React  from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons, EvilIcons , MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from './color';
import MainDrawer from './MainDrawer';
import Button from './Button';
import { useRouter } from "expo-router";
const Admin = ({ navigation }) => {
    const handleListeStagiaires = ()=>{
        navigation.navigate("Liste")
    }
    const handleAjoute = () =>{
        navigation.navigate("AjouterStagiaire")
    }
    return (

        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <ScrollView>
            
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 80, marginRight: 242 }}>
                    <Pressable
                        
                        style={{
                            width : 150,
                            height : 150,
                            backgroundColor: "rgb(187 247 208)",
                            padding: 10,
                            marginLeft: 70,
                            // marginTop: 100,
                            marginHorizontal : 15,
                            marginVertical : 5,
                            marginTop : 80,
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                width: 100,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Feather name="users" size={30} color="black" />
                        </View>
                        <Text style={{ marginTop: 10, fontWeight: "800" }}>
                            Formateur List
                        </Text>
                    </Pressable>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -185, marginRight: -480 }} >
                        <Pressable
                            style={{
                                marginTop :40,
                                width : 150,
                                height : 150,
                                backgroundColor: "rgb(187 247 208)",
                                padding: 40,
                                marginRight: 55,
                                marginHorizontal : 10,
                                marginVertical : 30,
                                borderRadius: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    width: 100,
                                    height: 65,
                                    marginTop: -18,
                                    borderRadius: 40,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Feather name="users" size={30} color="black" onPress={handleListeStagiaires} />
                            </View>
                            <Text style={{ marginTop: 10, fontWeight: "800" }}>
                                Stagiaire List 
                            </Text>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                            backgroundColor: "white",
                            paddingVertical: 200,
                            borderRadius: 7,
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: "rgb(187 247 208)",
                                borderRadius: 6,
                                padding: 4,
                                flexDirection: "row",
                                marginTop: -220,
                                marginVertical: 20,
                                marginHorizontal: -300,
                                marginLeft: -70
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                }}
                            >
                                <Feather name="user-plus" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop : 20,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                Ajouter Stagiaire
                            </Text>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop : 10,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Entypo name="chevron-right" size={24} color="black" onPress={handleAjoute}/>
                            </View>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            marginTop: -320,
                            backgroundColor: "white",
                            paddingVertical: 200,
                            borderRadius: 7,
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: "rgb(187 247 208)",
                                borderRadius: 6,
                                padding: 4,
                                flexDirection: "row",
                                marginTop: -220,
                                marginVertical: 20,
                                marginHorizontal: -300,
                                marginLeft: -70
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                }}
                            >
                                <Feather name="user-plus" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop : 20,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                Ajouter Formateur
                            </Text>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop : 10,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </Pressable>
                    </View>

                    <View>
                        <Pressable
                            style={{
                                backgroundColor: "rgb(187 247 208)",
                                borderRadius: 6,
                                padding: 4,
                                flexDirection: "row",
                                marginTop: -340,
                                marginVertical: 20,
                                marginHorizontal: -300,
                                marginLeft: -70
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                }}
                            >
                                <Octicons name="history" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop : 20,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                Historique Des Presences
                            </Text>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop : 10,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            marginTop: 5,
                            // backgroundColor: "white",
                            paddingHorizontal: 320,
                            paddingVertical: -150,
                            borderRadius: 7,
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: "rgb(187 247 208)",
                                borderRadius: 6,
                                padding: 4,
                                flexDirection: "row",
                                marginTop: -265,
                                marginVertical: 20,
                                marginHorizontal: -300,
                                marginLeft: -70
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                }}
                            >
                                <EvilIcons name="calendar" size={29} color="black" />
                            </View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop : 20,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                Calendrier
                            </Text>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop : 10,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                        </Pressable>
                        
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                            backgroundColor: "white",
                            paddingVertical: 200,
                            borderRadius: 7,
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: "rgb(187 247 208)",
                                borderRadius: 6,
                                padding: 4,
                                flexDirection: "row",
                                marginTop: -405,
                                marginVertical: 20,
                                marginHorizontal: -300,
                                marginLeft: -70
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                }}
                            >
                                <MaterialIcons name="dashboard" size={28} color="black" />
                            </View>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    marginTop : 20,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                Tableau De Bord
                            </Text>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop : 10,
                                    borderRadius: 7,
                                    backgroundColor: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            backgroundColor: "rgb(187 247 208)",
                            width: 150,
                            height: 100,
                            marginLeft: 455,
                             marginTop: -500,
                            borderRadius: 50,
                            padding: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 7,
                                // backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MaterialIcons name="groups" size={40} color="black" />
                        </View>
                        <Text style={{ marginTop: 7, fontWeight: "700" }}>Groups</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "rgb(187 247 208)",
                            width: 150,
                            height: 100,
                            marginRight: -25,
                            marginTop: -100,
                            borderRadius: 50,
                            padding: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 7,
                                // backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Entypo name="chevron-right" size={30} color="black" />
                        </View>
                        <Text style={{ marginTop: 7, fontWeight: "700" }}>Modules</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
export default Admin