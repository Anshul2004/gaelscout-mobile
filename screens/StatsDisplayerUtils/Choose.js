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
			`https://api.vexdb.io/v1/get_rankings?season=Turning%20Point&team=${this.state.input}`
		);
		var ccwm = [];
		var tournaments = [];
		var max_score = [];
		var rank = [];
		let name = this.state.input;

		var lowestRank = 0;

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

		this.props.navigation.navigate('Display', {ccwm: ccwm, sku: tournaments, max_score: max_score, rank: rank, name:name});
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
						colors={["#42b3f4", "#1cabff"]}
					>
						<View style={styles.contentWrapper}>
							<Image
								source={require("../../assets/logo.png")}
								style={{
									width: 48,
									height: 48
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
		height:Dimensions.get('window').height
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
		width: 330
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
		marginBottom: 20,
		marginTop: 5,
		fontSize: 15
	},
	contentWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: -30
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
		width: 117
	},
	buttonText: {
		color: "#efefef"
	}
});