import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo";
const axios = require("axios");
import {Header, Right, Icon} from "native-base"

var data = [];

export default class Choose extends React.Component {
	constructor(props) {
		super(props)
	}

	computeOutput = async DATASET => 
	{
		let dat_a = await axios(
			`https://api.vexdb.io/v1/get_teams?team=${this.state.input}`
		);

		let teamName = dat_a.data.result[0]["team_name"];
		let organization = dat_a.data.result[0]["organisation"];
		let region = dat_a.data.result[0]["region"];
		let country = dat_a.data.result[0]["country"];
		let city = dat_a.data.result[0]["city"];
		let level = dat_a.data.result[0]["grade"];
		let name = dat_a.data.result[0]["number"];

		this.props.navigation.navigate('Display', {name:name,teamName:teamName, organization:organization, region:region, country:country, city:city, level:level});
	}


	render() {
		return (
			<View style={styles.container}>
				<Header style={styles.header}>
					<Right>
						<Icon name="menu" style={{marginRight:20}}
						onPress={()=>this.props.navigation.openDrawer()}/>
					</Right>
				</Header>
				<View style={styles.shadow}>
					<LinearGradient
						style={styles.cardStats}
						colors={["#DE6E4B", "#d87a5d"]}
					>
						<View style={styles.contentWrapper}>
							<Image
								source={require("../../assets/logo.png")}
								style={{
									width: 48,
									height: 48
								}}
							/>
							<Text style={styles.title}>Team Information</Text>
						</View>
						<TextInput
							style={styles.input}
							placeholder="Team Name"
							onChangeText={(text) => this.setState({input: text})}
						/>
						<Text style={styles.cardStatsBodyText}>Get background information on any team in the world almost instantaneously with the information finder.</Text>
						<TouchableOpacity onPress={this.computeOutput} style={styles.button}>
							<Text style={styles.buttonText}>Find Information</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</View>
        )
	};
}

const styles = StyleSheet.create({
	header:{
		width: Dimensions.get('window').width,
		height: 80,
		marginTop:-5,
	},
	container: {
		backgroundColor: "#efefef",
		alignItems: "center",
		height: Dimensions.get('window').height
	},
	input: {
		backgroundColor: "#efefef",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: 10,
		color: "#4c4c4c",
		width: 130,
		marginTop: 65
	},
	title: {
		color: "#e8e8e8",
		fontSize: 20,
		padding: 20
	},
	cardStats: {
		padding: 30,
		borderRadius: 15,
		justifyContent: "center",
		margin: 10,
		marginTop: 70,
		marginBottom: 90,
		width: 330,
	},
	shadow: {
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.5
	},
	cardStatsTitle: {
		color: "#e8e8e8",
		fontSize: 25,
		fontWeight: '700'
	},
	cardStatsSubTitle: {
		color: "#e8e8e8",
		fontSize: 17,
		padding: 0,
		marginTop: 0,
		marginBottom: 10,
		fontWeight: "700"
	},
	cardStatsBodyTextRight: {
		color: "#e8e8e8",
		fontSize: 15,
		lineHeight: 20,
		padding: 0,
		margin:0,
		marginBottom: 15,
		marginLeft: 20,
		marginTop: 40,
		width: 140
	},
	cardStatsBodyText: {
		color: "#e8e8e8",
		lineHeight: 20,
		padding: 0,
		margin:0,
		marginBottom: 30,
		marginTop: 25,
		fontSize: 15
	},
	contentWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: -20
	},
	contentWrapperBody: {
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		backgroundColor: "#efefef",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: 10,
		color: "#4c4c4c",
		width: 130,
		marginTop: 30
	},
	button: {
		borderColor: "#efefef",
		borderWidth: 2,
		padding: 10,
		borderRadius: 10,
		width: 132
	},
	buttonText: {
		color: "#efefef"
	}
});