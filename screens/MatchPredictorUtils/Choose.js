import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView } from "react-native";
const axios = require("axios");

export default class Choose extends React.Component {
	constructor(props) {
		super(props)
	}

	computeOutput = async DATASET => 
	{
		let dat_a1 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${this.state.input1}`
		);
		let dat_a2 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${this.state.input2}`
		);
		let dat_a3 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${this.state.input3}`
		);
		let dat_a4 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${this.state.input4}`
		);

		let red1Rating = dat_a3.data.result[0].vrating;
		let red2Rating = dat_a4.data.result[0].vrating;;
		let blue1Rating = dat_a1.data.result[0].vrating;;
		let blue2Rating = dat_a2.data.result[0].vrating;;

		this.props.navigation.navigate('Display', {red1Rating:red1Rating, red2Rating:red2Rating, blue1Rating:blue1Rating, blue2Rating:blue2Rating,
		red1Name:this.state.input3,
		red2Name:this.state.input4,
		blue1Name:this.state.input1,
		blue2Name:this.state.input2
		});
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={30}>
				{/*Blue Alliance*/}
				<View style={styles.blueView}></View>
				<View style={styles.shiftBlue}>
					<Text style={styles.subTitleBlue}>Blue A.E</Text>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input1: text})}
					/>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input2: text})}
					/>
				</View>
				{/*Red Alliance*/}
				<View style={styles.redView}></View>
				<View style={styles.shiftRed}>
					<Text style={styles.subTitleRed}>Red A.E</Text>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input3: text})}
					/>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input4: text})}
					/>
				</View>

				<TouchableOpacity onPress={this.computeOutput} style={styles.button}>
					<Text style={styles.buttonText}>Predict</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
        )
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#efefef",
		alignItems: "center",
		justifyContent: "center"
	},
	blueView: {
		width: 300,
		height: 0,
		borderTopColor: "#42b3f4",
		borderTopWidth: 350,
		borderLeftWidth: 0,
		borderRightWidth: 230,
		borderRightColor: 'transparent',
		borderLeftColor: 'transparent',
		marginLeft: -20,
		marginTop: 0,
		padding: 40,
		borderRadius: 20
	},
	redView: {
		width: 300,
		height: 0,
		borderBottomColor: "#ff4971",
		borderBottomWidth: 350,
		borderLeftWidth: 230,
		borderRightWidth: 0,
		borderRightColor: 'transparent',
		borderLeftColor: 'transparent',
		marginLeft: 20,
		marginTop: -170,
		padding: 40,
		borderRadius: 20
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
	subTitleRed: {
		color: "#efefef",
		fontSize: 30,
		fontWeight: '300',
		marginLeft: 20
	},
	subTitleBlue: {
		color: "#efefef",
		fontSize: 30,
		fontWeight: '300',
		marginLeft: 10
	},
	shiftBlue: {
		marginTop: -400,
		marginLeft: -150,
		zIndex: 100
	},
	shiftRed: {
		marginTop: -220,
		marginLeft: 150
	},
	button: {
		borderColor: "#474747",
		borderWidth: 2,
		padding: 10,
		borderRadius: 10,
		width: 117,
		marginTop: 60,
		marginBottom: -40
	},
	buttonText: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20
	}
});