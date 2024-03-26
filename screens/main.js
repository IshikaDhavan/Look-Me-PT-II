import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { StatusBar } from "expo-status-bar";
import Filter1 from "./filter1";

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        };

        this.onFacesDetected = this.onFacesDetected.bind(this)
    }
    async componentDidMount() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === "granted" });
    }
    onFacesDetected({ faces }) {
        this.setState({ faces: faces });
    }
    onFacesDetectionError({ error }){
        console.log(error)
    }
    render() {
        const { hasCameraPermission } = this.state;
        if(hasCameraPermission === null){
            return(<View/>)
        }
        if(hasCameraPermission === false){
            return(
                <View style = {styles.container}>
                    <Text>Access Not Granted</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <SafeAreaView style={styles.safeArea} />

                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>Look Me</Text>
                </View>

                <View style = {styles.cameraStyle}>
                <Camera
                style={{flex : 1}}
                type={Camera.Constants.Type.front}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                    runClassifications: FaceDetector.FaceDetectorClassifications.all
                }}
                onFacesDetected={this.onFacesDetected}
                onFacesDetectionError={this.onFacesDetectionError}
                />
                {this.state.faces.map((face) => (
                    <Filter1 key={`face-id-${face.faceID}`} 
                    face = {face}/>
                ))}
                </View>

                <View style = {styles.filterContainer}>

                </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {

    },
    actionContainer: {

    }
})