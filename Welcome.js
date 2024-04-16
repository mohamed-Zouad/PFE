import React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import COLORS from './color';
import Button from './Button';

const Welcome = ({ navigation }) => {
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <ScrollView>
                <View>
                    <Image
                        source={require("./assets/Learning_bro.png")}
                        style={{
                            height: 400,
                            width: 400,
                            borderRadius: 20,
                            position: "absolute",
                            top: -15,
                            marginLeft: -15,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "10deg" }
                            ]
                        }}
                    />
                </View>

                <View style={{ paddingHorizontal: 22 }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '800',
                        color: COLORS.white,
                        marginTop: 400 // Adjust this value according to the image height
                    }}>Manage student</Text>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>absences with voice </Text>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>recognition</Text>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Started</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 20,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Efficiently track and record student absences using our mobile app's cutting-edge voice recognition technology.</Text>
                    </View>
                    <Button
                        title="Join Now"
                        onPress={() => navigation.navigate("Login")}
                        style={{
                            top:-15,
                            marginTop: 1,
                            width: "100%"
                        }}
                    />

                    {/* <View style={{
                        flexDirection: "row",
                        marginTop: 15,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            top:-17,
                            color: COLORS.white
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("")}
                        >
                            <Text style={{
                                fontSize: 16,
                                top:-17,
                                color: COLORS.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>
                    </View> */}
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Welcome;



// import React from 'react';
// import { View, Text, Pressable, Image, useWindowDimensions, ScrollView } from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
// import COLORS from './color';
// import Button from './Button';

// const Welcome = ({ navigation }) => {
//     const windowWidth = useWindowDimensions().width;

//     // Adjust styles based on screen width
//     const styles = {
//         imageContainer: {
//             height: windowWidth * 0.9,
//             width: windowWidth * 0.9,
//         },
//         image: {
//             height: windowWidth * 0.9,
//             width: windowWidth * 0.9,
//             borderRadius: 20,
//             position: "absolute",
//             top: -15,
//             marginLeft: -15,
//             transform: [
//                 { translateX: windowWidth * 0.05 },
//                 { translateY: windowWidth * 0.13 },
//                 { rotate: "10deg" }
//             ]
//         },
//         contentContainer: {
//             paddingHorizontal: windowWidth * 0.05,
//             paddingTop: windowWidth * 0.9, // Adjusted for image height
//             width: "100%"
//         },
//         title: {
//             fontSize: windowWidth * 0.08,
//             fontWeight: '800',
//             color: COLORS.white
//         },
//         subTitle: {
//             fontSize: windowWidth * 0.06,
//             color: COLORS.white,
//             marginVertical: windowWidth * 0.02
//         },
//         description: {
//             fontSize: windowWidth * 0.04,
//             color: COLORS.white,
//             marginVertical: windowWidth * 0.03
//         },
//         button: {
//             marginTop: windowWidth * 0.005,
//             width: "100%"
//         },
//         loginContainer: {
//             flexDirection: "row",
//             marginTop: windowWidth * 0.01,
//             justifyContent: "center"
//         },
//         loginText: {
//             fontSize: windowWidth * 0.032,
//             color: COLORS.white
//         },
//         loginLink: {
//             fontSize: windowWidth * 0.032,
//             color: COLORS.white,
//             fontWeight: "bold",
//             marginLeft: 4
//         }
//     };

//     return (
//         <LinearGradient
//             style={{ flex: 1 }}
//             colors={[COLORS.secondary, COLORS.primary]}
//         >
//             <ScrollView>
//                 <View style={{ flex: 1 }}>
//                     <Image
//                         source={require("./assets/Learning_bro.png")}
//                         style={styles.image}
//                     />

//                     <View style={styles.contentContainer}>
//                         <Text style={styles.title}>Manage student</Text>
//                         <Text style={styles.subTitle}>absences with voice </Text>
//                         <Text style={styles.subTitle}>recognition</Text>
//                         <Text style={styles.title}>Let's Get</Text>
//                         <Text style={styles.title}>Started</Text>

//                         <Text style={styles.description}>Efficiently track and record student absences using our mobile app's cutting-edge voice recognition technology.</Text>

//                         <Button
//                             title="Join Now"
//                             onPress={() => navigation.navigate("Signup")}
//                             style={styles.button}
//                         />

//                         <View style={styles.loginContainer}>
//                             <Text style={styles.loginText}>Already have an account ?</Text>
//                             <Pressable
//                                 onPress={() => navigation.navigate("Login")}
//                             >
//                                 <Text style={styles.loginLink}>Login</Text>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//         </LinearGradient>
//     )
// }

// export default Welcome;

