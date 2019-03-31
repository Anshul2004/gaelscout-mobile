import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

export default class Display extends React.Component {
	state = {
		blueAnim: new Animated.Value(0),
		redAnim: new Animated.Value(0)
	}
	componentDidMount() {
		const { navigation } = this.props;

		const rating1 = navigation.getParam('red1Rating', "nodata");
		const rating2 = navigation.getParam('red2Rating', "nodata");
		const rating3 = navigation.getParam('blue1Rating', "nodata");
		const rating4 = navigation.getParam('blue2Rating', "nodata");

		const val = (200-(getOutput([rating1, rating2, rating3, rating4])*200))+100;
		const val2 = ((getOutput([rating1, rating2, rating3, rating4])*200))+100;

		Animated.parallel([
			Animated.timing(
				this.state.blueAnim,
				{
				  toValue: val,
				  duration: 500,
				}
			).start(),
			Animated.timing(
				this.state.redAnim,
				{
				  toValue: val2,
				  duration: 500,
				}
			).start()  
		]);
	}

	render() {
		let { blueAnim, redAnim } = this.state;

		const { navigation } = this.props;

		const rating1 = navigation.getParam('red1Rating', "nodata");
		const rating2 = navigation.getParam('red2Rating', "nodata");
		const rating3 = navigation.getParam('blue1Rating', "nodata");
		const rating4 = navigation.getParam('blue2Rating', "nodata");

		const red1 = navigation.getParam('red1Name', "nodata");
		const red2 = navigation.getParam('red2Name', "nodata");
		const blue1 = navigation.getParam('blue1Name', "nodata");
		const blue2 = navigation.getParam('blue2Name', "nodata");

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Winning Percentages</Text>
				<Animated.View style={[styles.blueView, {...this.props.style, height:blueAnim}]}>
					<Text style={styles.text}>{blue1}</Text>
					<Text style={styles.textPercent}>{Number(((1-getOutput([rating1, rating2, rating3, rating4]))*100).toFixed(1))}%</Text>
					<Text style={styles.text}>{blue2}</Text>
					{this.props.children}
				</Animated.View>
				<Text style={styles.versus}>VS</Text>
				<Animated.View style={[styles.redView, {...this.props.style, height:redAnim}]}>
					<Text style={styles.text}>{red1}</Text>
					<Text style={styles.textPercent}>{Number(((getOutput([rating1, rating2, rating3, rating4]))*100).toFixed(1))}%</Text>
					<Text style={[styles.text]}>{red2}</Text>
				</Animated.View>
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
		fontSize: 30,
		fontWeight: "300",
		marginTop: 30
	},
	subtitle: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "200",
		marginTop: 50,
		marginBottom: 30
	},
	blueView: {
		width: 300,
		backgroundColor: "#42b3f4",
		borderRadius: 20,
		marginTop: 20,
	},
	redView: {
		width: 300,
		backgroundColor: "#ff4971",
		borderRadius: 20
	},
	text:{
		color: "#efefef",
		fontSize: 40,
		marginTop: 10,
		fontWeight: "200",
		marginLeft: 20,
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row',
	},
	textPercent:{
		color: "#efefef",
		fontSize: 40,
		fontWeight: "300",
		marginLeft: 180,
		marginTop:-20,
		marginBottom:-20
	},
	versus:{
		color: "#474747",
		fontSize: 30,
		zIndex: 5,
		fontWeight: "300",
		paddingTop: 10,
		paddingBottom: 10
	}
});

function getOutput(input) {
	return [1/(1+1/Math.exp((-0.026569411158561707-1.1713001728057861*1/(1+1/Math.exp((-0.17095446586608887+3.3968403339385986*input['0']-0.881209135055542*input['1']+0.49418675899505615*input['2']+0.9277241230010986*input['3'])))+1.4002971649169922*1/(1+1/Math.exp((-3.384709358215332+2.2812659740448*input['0']+1.1256029605865479*input['1']-2.106781005859375*input['2']-2.404764175415039*input['3'])))+0.9837648868560791*1/(1+1/Math.exp((0.0029993350617587566+4.060764789581299*input['0']+0.8080530166625977*input['1']-2.2866413593292236*input['2']+0.056719258427619934*input['3']))))))];
};