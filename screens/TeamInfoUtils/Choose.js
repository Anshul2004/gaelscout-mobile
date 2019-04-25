import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo";
const axios = require("axios");
import {Header, Right, Icon} from "native-base";

var data = [];

const parentHeight = 667;
const parentWidth = 375;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );

export default class Choose extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			input:""
        };
	}

	computeOutput = async DATASET => 
	{
		if(this.state.input.toLowerCase() == "5327s"){
			this.props.navigation.navigate('Display', {name:"5327S",teamName:"Gael Force S", organization:"Dublin High School", region:"California", country:"United States", city:"Dublin", level:"High School"});
		}
		else{
		let dat_a = await axios(
			`https://api.vexdb.io/v1/get_teams?team=${this.state.input}`
		);
		if(this.state.input == ""){
			Alert.alert("A team has not been inputted", "Please input a team");
		}
		else{

		if(dat_a.data.result.length > 0){

		let teamName = dat_a.data.result[0]["team_name"];
		let organization = dat_a.data.result[0]["organisation"];
		let region = dat_a.data.result[0]["region"];
		let country = dat_a.data.result[0]["country"];
		let city = dat_a.data.result[0]["city"];
		let level = dat_a.data.result[0]["grade"];
		let name = dat_a.data.result[0]["number"];
		this.props.navigation.navigate('Display', {name:name,teamName:teamName, organization:organization, region:region, country:country, city:city, level:level});
		}
		else{
			Alert.alert(this.state.input + " is not a valid team", "Please choose a valid team to search");
		}
	}
	}
	}


	render() {
		return (
			<DismissKeyboard>
			<View style={styles.container}>
				<Header style={styles.header}>
					<Right>
						<Icon name="menu" style={{marginRight:scale(20, parentWidth, Dimensions.get('window').width)}}
						onPress={()=>{
							this.props.navigation.openDrawer();
							Keyboard.dismiss();
							}}/>
					</Right>
				</Header>
				<View style={styles.shadow}>
					<LinearGradient
						style={styles.cardStats}
						colors={["#3eb8d1", "#34bdd8"]}
					>
						<View style={styles.contentWrapper}>
							<Image
								source={require("../../assets/logo.png")}
								style={{
									width: scale(48, parentWidth, Dimensions.get('window').width),
									height: scale(48, parentHeight, Dimensions.get('window').height)
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
			</DismissKeyboard>
        )
	};
}

const styles = StyleSheet.create({
	header:{
		width: Dimensions.get('window').width,
		height: scale(80, parentHeight, Dimensions.get('window').height),
		marginTop:scale(-5, parentHeight, Dimensions.get('window').height),
		backgroundColor: "white"
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
		padding: scale(10, parentHeight, Dimensions.get('window').height),
		color: "#4c4c4c",
		width: scale(130, parentWidth, Dimensions.get('window').width),
		marginTop: scale(65, parentHeight, Dimensions.get('window').height)
	},
	title: {
		color: "#e8e8e8",
		fontSize: scale(20, parentHeight, Dimensions.get('window').height),
		padding: scale(20, parentHeight, Dimensions.get('window').height)
	},
	cardStats: {
		padding: scale(30, parentHeight, Dimensions.get('window').height),
		borderRadius: 15,
		justifyContent: "center",
		margin: scale(10, parentHeight, Dimensions.get('window').height),
		marginTop: scale(70, parentHeight, Dimensions.get('window').height),
		marginBottom: scale(90, parentHeight, Dimensions.get('window').height),
		width: scale(330, parentWidth, Dimensions.get('window').width),
	},
	shadow: {
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.5
	},
	cardStatsTitle: {
		color: "#e8e8e8",
		fontSize: scale(25, parentHeight, Dimensions.get('window').height),
		fontWeight: '700'
	},
	cardStatsSubTitle: {
		color: "#e8e8e8",
		fontSize: scale(17, parentHeight, Dimensions.get('window').height),
		padding: 0,
		marginTop: 0,
		marginBottom: scale(10, parentHeight, Dimensions.get('window').height),
		fontWeight: "700"
	},
	cardStatsBodyTextRight: {
		color: "#e8e8e8",
		fontSize: scale(15, parentHeight, Dimensions.get('window').height),
		lineHeight: scale(20, parentHeight, Dimensions.get('window').height),
		padding: 0,
		margin:0,
		marginBottom: scale(15, parentHeight, Dimensions.get('window').height),
		marginLeft: scale(20, parentHeight, Dimensions.get('window').height),
		marginTop: scale(40, parentHeight, Dimensions.get('window').height),
		width: scale(140, parentWidth, Dimensions.get('window').width)
	},
	cardStatsBodyText: {
		color: "#e8e8e8",
		lineHeight: scale(20, parentHeight, Dimensions.get('window').height),
		padding: 0,
		margin:0,
		marginBottom: scale(30, parentHeight, Dimensions.get('window').height),
		marginTop: scale(25, parentHeight, Dimensions.get('window').height),
		fontSize: scale(15, parentHeight, Dimensions.get('window').height)
	},
	contentWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scale(-20, parentHeight, Dimensions.get('window').height)
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
		padding: scale(10, parentHeight, Dimensions.get('window').height),
		color: "#4c4c4c",
		width: scale(130, parentWidth, Dimensions.get('window').width),
		marginTop: scale(30, parentHeight, Dimensions.get('window').height)
	},
	button: {
		borderColor: "#efefef",
		borderWidth: 2,
		padding: scale(10, parentHeight, Dimensions.get('window').height),
		borderRadius: 10,
		width: scale(132, parentWidth, Dimensions.get('window').width)
	},
	buttonText: {
		color: "#efefef"
	}
});

function scale(val, parent, relative){
	return val * (relative/parent);
}