import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo";
const axios = require("axios");
import {Header, Right, Icon} from "native-base";

var data = [];

const parentHeight = 667;
const parentWidth =  375;

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
		if(this.state.input == ""){
			Alert.alert("A team has not been inputted", "Please input a team");
		}
		else if(this.state.input.toLowerCase() == "5327s"){
			console.log("5327s");
			this.props.navigation.navigate('CCWM', {ccwm: [4.42806,7.07174,14.7051,3.35713,-3.40498], sku: ["VRC-5","VRC-4","VRC-3","VRC-2","VRC-1"], max_score: [32,29,34,25,25], rank: [0, 6, 9, 4, -15], name:"5327S"});
		}
		else{
		let dat_a = await axios(
			`https://api.vexdb.io/v1/get_rankings?season=Turning%20Point&team=${this.state.input}`
		);
		var ccwm = [];
		var tournaments = [];
		var max_score = [];
		var rank = [];
		let name = this.state.input;

		var lowestRank = 0;

		if(dat_a.data.result.length > 0){

		for(i = 0; i < dat_a.data.result.length; i++){
			if(i == 5){
				break;
			}
			if(dat_a.data.result[i]["rank"] > lowestRank){
				lowestRank = dat_a.data.result[4-i]["rank"];
			}
			ccwm.push(dat_a.data.result[4-i]["ccwm"]);
			tournaments.push("VRC-"+(5-i));
			max_score.push(dat_a.data.result[4-i]["max_score"]);
		}

		for(i = 0; i < dat_a.data.result.length; i++){
			if(i == 5){
				break;
			}
			rank.push(lowestRank-dat_a.data.result[4-i]["rank"]);
		}
		this.props.navigation.navigate('CCWM', {ccwm: ccwm, sku: tournaments, max_score: max_score, rank: rank, name:name});
		
		}
		else{
			Alert.alert(this.state.input + " is not a valid team", "Please choose a valid team to search");
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
						colors={["#42b3f4", "#1cabff"]}
					>
						<View style={styles.contentWrapper}>
							<Image
								source={require("../../assets/logo.png")}
								style={{
									width: scale(48, parentWidth, Dimensions.get('window').width),
									height: scale(48, parentHeight, Dimensions.get('window').height)
								}}
							/>
							<Text style={styles.title}>GaelScout Statistics</Text>
						</View>
						<View style={styles.contentWrapperBody}>
							<TextInput
							style={styles.input}
							placeholder="Team Name"
							onChangeText={(text) => this.setState({input: text})}
							/>
							<Text style={styles.cardStatsBodyTextRight}>• Search for any team in the world.</Text>
						</View>
						<Text style={styles.cardStatsBodyText}>• Quickly and efficiently get team stats for thorough analysis.</Text>
						<Text style={styles.cardStatsBodyText}>• Beautiful graphs provide an appealing visualization to your eyes.</Text>
						<TouchableOpacity onPress={this.computeOutput} style={styles.button}>
							<Text style={styles.buttonText}>Find Statistics</Text>
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
		marginLeft: scale(20, parentWidth, Dimensions.get('window').width),
		marginTop: scale(40, parentHeight, Dimensions.get('window').height),
		width: scale(140, parentWidth, Dimensions.get('window').width)
	},
	cardStatsBodyText: {
		color: "#e8e8e8",
		lineHeight: scale(20, parentHeight, Dimensions.get('window').height),
		padding: 0,
		margin:0,
		marginBottom: scale(30, parentHeight, Dimensions.get('window').height),
		marginTop: scale(10, parentHeight, Dimensions.get('window').height),
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