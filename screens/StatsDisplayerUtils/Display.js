import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {LineChart, BarChart} from 'react-native-chart-kit';
import { ScrollView } from "react-native-gesture-handler";

export default class Display extends React.Component {
	render() {
		const { navigation } = this.props;
		const ccwm = navigation.getParam('ccwm', "nodata");
		const sku = navigation.getParam('sku', "nodata");
		const max_score = navigation.getParam('max_score', "nodata");
		const rank = navigation.getParam('rank', "nodata");
		const name = navigation.getParam('name', "nodata");

		const chartConfig = {
			backgroundGradientFrom: '#ededed',
			backgroundGradientTo: '#dddddd',
			color: (opacity = 1) => `rgba(71, 71, 71, ${opacity})`,
			strokeWidth: 2 // optional, default 3
		}

		return (
			<ScrollView style={{flex: 1, backgroundColor: "#efefef"}} contentContainerStyle={styles.container}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.subtitle}>CCWM for the last five tournaments</Text>
				<LineChart
					data={{
					labels: sku,
					datasets: [{
						data: ccwm
					}]
					}}
					width={340} // from react-native
					height={320}
					chartConfig={chartConfig}
					bezier
					style={{
					marginVertical: 8,
					borderRadius: 16
					}}
				/>

				<Text style={styles.subtitle}>Max Score for the last five tournaments</Text>
				<BarChart
					style={{
					marginVertical: 8,
					borderRadius: 16
					}}
					data={{
						labels: sku,
						datasets: [{
							data: max_score
						}],
					}}
					width={340}
					height={320}
					gridMin={-5}
					chartConfig={chartConfig}
				/>
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
	subtitle: {
		color: "#474747",
		textAlign: "center",
		fontSize: 15,
		fontWeight: "200",
		marginTop: 50,
		marginBottom: 30
	}
});