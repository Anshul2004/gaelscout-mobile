import React from "react";
import { StyleSheet, View, Text, Animated, Platform, Dimensions } from "react-native";

const parentHeight = 667;
const parentWidth =  375;

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

		var val = ((getOutput([rating1, rating2, rating3, rating4])*100));
		var val2 = (100-val);

		val += 100;
		val2 += 100;

		val = scale(val, parentHeight, Dimensions.get('window').height);
		val2 = scale(val2, parentHeight, Dimensions.get('window').height);

		Animated.parallel([
			Animated.timing(
				this.state.blueAnim,
				{
				  toValue: val2,
				  duration: 500,
				}
			).start(),
			Animated.timing(
				this.state.redAnim,
				{
				  toValue: val,
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
		fontWeight: "300",
		...Platform.select({
			ios: {
				marginTop: scale(40, parentHeight, Dimensions.get('window').height),
				fontSize: scale(30, parentHeight, Dimensions.get('window').height),
			},
			android: {
				marginTop: 10,
				fontSize: 25,
			},
		  }),
		
	},
	subtitle: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(20, parentHeight, Dimensions.get('window').height),
		fontWeight: "200",
		marginTop: scale(50, parentHeight, Dimensions.get('window').height),
		marginBottom: scale(30, parentHeight, Dimensions.get('window').height)
	},
	blueView: {
		width: scale(300, parentWidth, Dimensions.get('window').width),
		backgroundColor: "#42b3f4",
		borderRadius: 20,
		...Platform.select({
			ios: {
				marginTop: scale(40, parentHeight, Dimensions.get('window').height),
			},
			android: {
				marginTop: 10,
			},
		  }),
	},
	redView: {
		width: scale(300, parentWidth, Dimensions.get('window').width),
		backgroundColor: "#ff4971",
		borderRadius: 20
	},
	text:{
		color: "#efefef",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		marginTop: scale(10, parentHeight, Dimensions.get('window').height),
		fontWeight: "200",
		marginLeft: scale(20, parentWidth, Dimensions.get('window').width),
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flexDirection: 'row',
	},
	textPercent:{
		color: "#efefef",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		fontWeight: "300",
		marginLeft: scale(180, parentWidth, Dimensions.get('window').width),
		marginTop:scale(-20, parentHeight, Dimensions.get('window').height),
		marginBottom:scale(-20, parentHeight, Dimensions.get('window').height)
	},
	versus:{
		color: "#474747",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		zIndex: 5,
		fontWeight: "300",
		paddingTop: scale(10, parentHeight, Dimensions.get('window').height),
		paddingBottom: scale(10, parentHeight, Dimensions.get('window').height)
	}
});

function getOutput(input
	) {
	return [1/(1+1/Math.exp((-0.3922092020511627+0.3162389099597931*1/(1+1/Math.exp((0.013108721934258938+0.033557482063770294*input['0']+0.5222335457801819*input['1']-0.15054690837860107*input['2']-0.12744693458080292*input['3'])))-0.3630855679512024*1/(1+1/Math.exp((0.0939134880900383-0.16257411241531372*input['0']-0.3279244899749756*input['1']+0.40965336561203003*input['2']+0.2748454213142395*input['3'])))+0.263888418674469*1/(1+1/Math.exp((-0.15169325470924377+0.11653333902359009*input['0']+0.3039103150367737*input['1']-0.07774156332015991*input['2']+0.24211826920509338*input['3'])))-0.3056022822856903*1/(1+1/Math.exp((0.1043500304222107-0.38164040446281433*input['0']+0.06145370006561279*input['1']-0.09906911104917526*input['2']-0.138063445687294*input['3'])))-0.4916907548904419*1/(1+1/Math.exp((0.05646932125091553-0.3669894337654114*input['0']-0.13202665746212006*input['1']+0.14550672471523285*input['2']+0.23406876623630524*input['3'])))+0.18856896460056305*1/(1+1/Math.exp((0.2573460638523102+0.32990750670433044*input['0']+0.23807381093502045*input['1']-0.19523613154888153*input['2']-0.19522564113140106*input['3'])))-0.6097868084907532*1/(1+1/Math.exp((0.07462022453546524+0.15110571682453156*input['0']-0.4459998905658722*input['1']+0.4813065528869629*input['2']+0.12977148592472076*input['3'])))+0.2955615520477295*1/(1+1/Math.exp((0.16979102790355682+0.15218445658683777*input['0']+0.0021818922832608223*input['1']-0.1454796940088272*input['2']+0.14412866532802582*input['3'])))+0.5197640061378479*1/(1+1/Math.exp((-0.16576220095157623-0.02014867402613163*input['0']+0.5134390592575073*input['1']-0.15078696608543396*input['2']-0.4600842595100403*input['3'])))-0.15099668502807617*1/(1+1/Math.exp((0.07109500467777252-0.32857194542884827*input['0']+0.1999216377735138*input['1']+0.21740467846393585*input['2']+0.015901362523436546*input['3'])))+0.5153652429580688*1/(1+1/Math.exp((-0.060951072722673416+0.14066064357757568*input['0']-0.01801208034157753*input['1']-0.26968103647232056*input['2']-0.2980997562408447*input['3'])))+0.390982061624527*1/(1+1/Math.exp((0.1528329849243164+0.022318892180919647*input['0']+0.35932549834251404*input['1']+0.2641114592552185*input['2']-0.3280896842479706*input['3'])))+0.5156033635139465*1/(1+1/Math.exp((0.0379013828933239+0.4065030515193939*input['0']+0.45593100786209106*input['1']+0.09987016022205353*input['2']-0.7006406188011169*input['3'])))-0.31110289692878723*1/(1+1/Math.exp((-0.12285605072975159-0.11879485100507736*input['0']+0.10374077409505844*input['1']+0.302619993686676*input['2']-0.2238491326570511*input['3'])))+0.3419131338596344*1/(1+1/Math.exp((-0.11886301636695862+0.4504755139350891*input['0']-0.11964046210050583*input['1']-0.28020989894866943*input['2']-0.320864737033844*input['3'])))-0.19364424049854279*1/(1+1/Math.exp((-0.1006392240524292+0.08945257216691971*input['0']+0.2365732043981552*input['1']+0.15991559624671936*input['2']-0.10053309053182602*input['3'])))+0.47198405861854553*1/(1+1/Math.exp((0.20075596868991852+0.36048465967178345*input['0']+0.12039798498153687*input['1']+0.35071179270744324*input['2']-0.37199491262435913*input['3'])))-0.15513207018375397*1/(1+1/Math.exp((0.17521096765995026-0.11562464386224747*input['0']-0.2421899139881134*input['1']-0.09313775599002838*input['2']-0.11933774501085281*input['3'])))-0.49035996198654175*1/(1+1/Math.exp((-0.025453783571720123-0.6216002702713013*input['0']-0.072133369743824*input['1']+0.5154775381088257*input['2']+0.17082032561302185*input['3'])))-0.3630855679512024*1/(1+1/Math.exp((-0.031579289585351944-0.15033209323883057*input['0']-0.2022930085659027*input['1']+0.18021050095558167*input['2']+0.18274220824241638*input['3']))))))];
	}

	function scale(val, parent, relative){
		return val * (relative/parent);
	}