import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
const axios = require("axios");
import {Header, Right, Icon} from "native-base"

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
		
		if(dat_a1 != undefined && dat_a2 != undefined && dat_a3 != undefined && dat_a4 != undefined){
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
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={0}>
				<Header style={styles.header}>
					<Right>
						<Icon name="menu" style={{marginRight:20}}
						onPress={()=>this.props.navigation.openDrawer()}/>
					</Right>
				</Header>
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
	header:{
		width: Dimensions.get('window').width,
		marginTop: -115,
		height: 80
	},
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#efefef",
		alignItems: "center",
		justifyContent: "center"
	},
	blueView: {
		...Platform.select({
			ios: {
				width: 300,
				height: 0,
				borderTopColor: "#42b3f4",
				borderTopWidth: 350,
				borderLeftWidth: 0,
				borderRightWidth: 230,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: -20,
				padding: 40,
				marginTop: -20,
				borderRadius: 20
			},
			android: {
				width: 300,
				height: 0,
				borderTopColor: "#42b3f4",
				borderTopWidth: 280,
				borderLeftWidth: 0,
				borderRightWidth: 230,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: -20,
				marginTop: -50,
				padding: 40,
				borderRadius: 20,
			},
		  }),
	},
	redView: {
		...Platform.select({
			ios: {
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
			android: {
				width: 300,
				height: 0,
				borderBottomColor: "#ff4971",
				borderBottomWidth: 280,
				borderLeftWidth: 230,
				borderRightWidth: 0,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: 20,
				marginTop: -210,
				padding: 40,
				borderRadius: 20,
			},
		  }),
	},
	input: {
		backgroundColor: "#efefef",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: 10,
		color: "#4c4c4c",
		marginTop: 25,
		...Platform.select({
			ios: {
				width: 130,
			},
			android: {
				width: 100,
			},
		  }),
	},
	subTitleRed: {
		color: "#efefef",
		fontSize: 30,
		fontWeight: '300',
		marginLeft: 0
	},
	subTitleBlue: {
		color: "#efefef",
		fontSize: 30,
		fontWeight: '300',
		marginLeft: 10
	},
	shiftBlue: {
		...Platform.select({
			ios: {
				marginTop: -400,
				marginLeft: -150,
				zIndex: 100
			},
			android: {
				marginTop: -340,
				marginLeft: -175,
				zIndex: 100,
			},
		  }),
	},
	shiftRed: {
		...Platform.select({
			ios: {
				marginTop: -220,
				marginLeft: 150
			},
			android: {
				marginTop: -220,
				marginLeft: 195,
			},
		  }),
	},
	button: {
		...Platform.select({
			ios: {
				borderColor: "#474747",
				borderWidth: 2,
				padding: 10,
				borderRadius: 10,
				width: 117,
				marginTop: 70,
				marginBottom: -40
			},
			android: {
				borderColor: "#474747",
				borderWidth: 2,
				padding: 10,
				borderRadius: 10,
				width: 117,
				marginTop: 50,
				marginBottom: -70
			},
		  }),
	},
	buttonText: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20
	}
});