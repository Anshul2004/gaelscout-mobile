import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import CustomBarChart from '../StatsUtils/BarChart'

var awayCCWM = 0;
var awayName = 0;
var awaySKU = 0;
var awayRank = 0;
var awayMaxScore = 0;

const parentHeight = 667;
const parentWidth =  375;

export default class MaxScore extends React.Component {
	constructor(props) {
		super(props)
	}

	CCWM = () => {
		this.props.navigation.navigate('CCWM', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	score = () => {
		this.props.navigation.navigate('MaxScore', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	ran_k = () => {
		this.props.navigation.navigate('Rank', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	back = () => {
		this.props.navigation.navigate('Choose', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}

	render() {
		const { navigation } = this.props;
		const ccwm = navigation.getParam('ccwm', "nodata");
        const name = navigation.getParam('name', "nodata");
		const sku = navigation.getParam('sku', "nodata");
		const rank = navigation.getParam('rank', "nodata");
		const max_score = navigation.getParam('max_score', "nodata");

		awayCCWM = ccwm;
		awayName = name;
		awaySKU = sku;
		awayRank = rank;
		awayMaxScore = max_score;

		return (
            <View style={styles.container}>
				<TouchableOpacity style={[styles.button, {marginTop:scale(50, parentHeight, Dimensions.get('window').height), marginLeft:scale(-250, parentWidth, Dimensions.get('window').width)}]} onPress={this.back}>
					<Text style={{color:"#474747"}}>Back</Text>
				</TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>Max Score in the last five tournaments</Text>
				<CustomBarChart labels={sku} data={max_score} width={scale(250, parentWidth, Dimensions.get('window').width)} height={scale(250, parentHeight, Dimensions.get('window').height)}/>
				<View style={[{flexDirection:'row', marginTop:scale(50, parentHeight, Dimensions.get('window').height)},styles.container]}>
					<TouchableOpacity style={styles.button} onPress={this.CCWM}>
						<Text style={{color:"#474747"}}>CCWM</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={this.score}>
						<Text style={{color:"#474747"}}>Max Score</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={this.ran_k}>
						<Text style={{color:"#474747"}}>Rank</Text>
					</TouchableOpacity>
				</View>
			</View>
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
		marginTop:scale(-20, parentHeight, Dimensions.get('window').height)
	},
	subtitle: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(20, parentHeight, Dimensions.get('window').height),
		fontWeight: "200",
		marginTop: scale(30, parentHeight, Dimensions.get('window').height),
		marginBottom: scale(20, parentHeight, Dimensions.get('window').height)
	},
	button: {
		marginLeft: scale(10, parentWidth, Dimensions.get('window').width),
		marginRight: scale(10, parentWidth, Dimensions.get('window').width),
		borderWidth: 1,
		padding: scale(15, parentHeight, Dimensions.get('window').height),
		borderColor: "#474747"
	}
});

function scale(val, parent, relative){
	return val * (relative/parent);
}