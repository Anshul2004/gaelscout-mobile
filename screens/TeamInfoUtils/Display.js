import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const parentHeight = 667;
const parentWidth =  375;

export default class Display extends React.Component {
	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', "nodata");
		const teamName = navigation.getParam('teamName', "nodata");
		const organization = navigation.getParam('organization', "nodata");
		const region = navigation.getParam('region', "nodata");
		const country = navigation.getParam('country', "nodata");
		const city = navigation.getParam('city', "nodata");
		const level = navigation.getParam('level', "nodata");
		
		return (
			<ScrollView style={{flex: 1, backgroundColor: "#efefef"}} contentContainerStyle={styles.container}>
				<Text style={styles.title}>Results for team {name}</Text>
				<Text style={styles.text}>Official name: {teamName}</Text>
				<Text style={styles.text}>Organization: {organization}</Text>
				<Text style={styles.text}>Country: {country}</Text>
				<Text style={styles.text}>Region: {region}</Text>
				<Text style={styles.text}>City: {city}</Text>
				<Text style={styles.text}>Grade level: {level}</Text>
			</ScrollView> // returns as a tuple?
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		fontWeight: "300",
		marginTop: scale(30, parentHeight, Dimensions.get('window').height)
	},
	text: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(20, parentHeight, Dimensions.get('window').height),
		fontWeight: "700",
		marginTop: scale(50, parentHeight, Dimensions.get('window').height)
	},
});

function scale(val, parent, relative){
	return val * (relative/parent);
}