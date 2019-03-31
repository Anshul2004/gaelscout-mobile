import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {LineChart, BarChart} from 'react-native-chart-kit';
import { ScrollView } from "react-native-gesture-handler";

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
			</ScrollView>
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
		fontSize: 30,
		fontWeight: "300",
		marginTop: 30
	},
	text: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		marginTop: 50
	},
});