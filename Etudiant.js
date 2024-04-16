// import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import { FontAwesome } from '@expo/vector-icons';

// export default function Etudiant() {
//   const [recording, setRecording] = React.useState();
//   const [recordings, setRecordings] = React.useState([]);

//   async function startRecording() {
//     try {
//       const perm = await Audio.requestPermissionsAsync();
//       if (perm.status === "granted") {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true
//         });
//         const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//         setRecording(recording);
//       }
//     } catch (err) {}
//   }

//   async function stopRecording() {
//     setRecording(undefined);

//     await recording.stopAndUnloadAsync();
//     let allRecordings = [...recordings];
//     const { sound, status } = await recording.createNewLoadedSoundAsync();
//     allRecordings.push({
//       sound: sound,
//       duration: getDurationFormatted(status.durationMillis),
//       file: recording.getURI()
//     })

//     setRecordings(allRecordings);
//   }

//   function getDurationFormatted(milliseconds) {
//     const minutes = milliseconds / 1000 / 60;
//     const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
//     return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
//   }

//   function getRecordingLines() {
//     return recordings.map((recordingLine, index) => {
//       return (
//         <View key={index} style={styles.row}>
//           <Text style={styles.fill}>
//             Recording #{index + 1} | {recordingLine.duration}
//           </Text>
//           <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"/>
//         </View>
//       );
//     });
//   }

//   function clearRecordings() {
//     setRecordings([])
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <FontAwesome name="microphone" size={32} color="black" onPress={recording ? stopRecording : startRecording} />
//         <Button title={recording ? 'Stop' : 'Start'} onPress={recording ? stopRecording : startRecording} />
//       </View>
//       {getRecordingLines()}
//       {recordings.length > 0 && <Button title="Clear Recordings" onPress={clearRecordings} />}
//       <View style={styles.footer}>
//         <Button title="Send" onPress={() => console.log('Sending...')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 10,
//     marginRight: 40
//   },
//   fill: {
//     flex: 1,
//     margin: 15
//   }
// });



import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import COLORS from "./color";
import Login from "./Login";

export default function Etudiant() {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);

  useEffect(() => {

    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });

        // This is for simply playing the sound back
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <LinearGradient
      style={{
        flex: 1
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <ScrollView>

        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
            <FontAwesome name={recording ? 'microphone' : 'microphone-slash'} size={64} color="white" />
          </TouchableOpacity>
          <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
        </View>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.secondary,
    color: COLORS.primary
  },
  button: {
    marginTop : 250,
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 20,
  },
});
{/* <LinearGradient>
    <ScrollView>
        
    </ScrollView>
</LinearGradient> */}