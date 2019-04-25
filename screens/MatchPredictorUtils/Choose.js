import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Platform, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
const axios = require("axios");
import {Header, Right, Icon} from "native-base";

const parentHeight = 667;
const parentWidth =  375;

console.log(parentWidth);
console.log(parentHeight);

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );


export default class Choose extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			input1:"",
			input2:"",
			input3:"",
			input4:"",
        };
	}

	computeOutput = async DATASET => 
	{
		if(this.state.input1.toLowerCase() == "5327s" && this.state.input2.toLowerCase() == "5327r" && this.state.input3.toLowerCase() == "5327b" && this.state.input4.toLowerCase() == "5327c"){
			this.props.navigation.navigate('Display', {red1Rating:69.230490244456, red2Rating: 77.615758777566, blue1Rating:68.404572023729, blue2Rating:17.558220111629,
				red1Name:this.state.input3,
				red2Name:this.state.input4,
				blue1Name:this.state.input1,
				blue2Name:this.state.input2
				});
		}
		else{
		if(this.state.input1 == "" || this.state.input2 == "" || this.state.input3 == "" || this.state.input4 == ""){
			if(this.state.input1 == ""){
				Alert.alert("Blue Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input2 == ""){
				Alert.alert("Blue Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input3 == ""){
				Alert.alert("Red Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input4 == ""){
				Alert.alert("Red Alliance does not have a team inputted", "Please input a team");
			} 
		}
		else{
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
			if(dat_a1.data.result.length == 0){
				Alert.alert(this.state.input1 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a2.data.result.length == 0){
				Alert.alert(this.state.input2 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a3.data.result.length == 0){
				Alert.alert(this.state.input3 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a4.data.result.length == 0){
				Alert.alert(this.state.input4 + " is not a valid team", "Please choose a valid team to search");
			} 
			if(dat_a1 != undefined && dat_a2 != undefined && dat_a3 != undefined && dat_a4 != undefined){
				let red1Rating = dat_a3.data.result[0].vrating;
				let red2Rating = dat_a4.data.result[0].vrating;
				let blue1Rating = dat_a1.data.result[0].vrating;
				let blue2Rating = dat_a2.data.result[0].vrating;

				console.log(red1Rating + ", " + red2Rating + ", " + blue1Rating + ", " + blue2Rating);
	
				this.props.navigation.navigate('Display', {red1Rating:red1Rating, red2Rating:red2Rating, blue1Rating:blue1Rating, blue2Rating:blue2Rating,
				red1Name:this.state.input3,
				red2Name:this.state.input4,
				blue1Name:this.state.input1,
				blue2Name:this.state.input2
				});
			}
		}
	}
	}

	render() {
		return (
			<DismissKeyboard>
			<View>
				<Header style={styles.header}>
					<Right>
						<Icon name="menu" style={{marginRight:Dimensions.get('window').width/(Dimensions.get('window').width/20)}}
						onPress={()=>{
							this.props.navigation.openDrawer();
							Keyboard.dismiss();
							}}/>
					</Right>
				</Header>
			<KeyboardAvoidingView enabled behavior={"position"} keyboardVerticalOffset={-Dimensions.get('window').height/3.2} style={styles.container}>
				{/*Blue Alliance*/}
				<View style={styles.blueView}></View>
				<View style={styles.shiftBlue}>
					<Text style={styles.subTitleBlue}>Blue A.E</Text>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input1: text})}
					value={this.state.input1}
					/>
					<TextInput
					style={styles.input}
					placeholder="Team Name"
					onChangeText={(text) => this.setState({input2: text})}
					value={this.state.input2}
					/>
					<View style={styles.shiftRed}>
						<Text style={styles.subTitleRed}>Red A.E</Text>
						<TextInput
						style={styles.input}
						placeholder="Team Name"
						onChangeText={(text) => this.setState({input3: text})}
						value={this.state.input3}
						/>
						<TextInput
						style={styles.input}
						placeholder="Team Name"
						onChangeText={(text) => this.setState({input4: text})}
						value={this.state.input4}
						/>
					</View>
				</View>
				{/*Red Alliance*/}
				<View style={styles.redView}></View>
			</KeyboardAvoidingView>
			<TouchableOpacity onPress={this.computeOutput} style={styles.button}>
					<Text style={styles.buttonText}>Predict</Text>
				</TouchableOpacity>
			</View>
			</DismissKeyboard>
        )
	}
}

const styles = StyleSheet.create({
	header:{
		width: Dimensions.get('window').width,
		height: scale(80, parentHeight, Dimensions.get('window').height),
		marginTop:scale(-5, parentHeight, Dimensions.get('window').height),
		backgroundColor: "white"
	},
	container: {
		padding: scale(15, parentHeight, Dimensions.get('window').height),
		backgroundColor: "#efefef",
		alignItems: "center",
		height: Dimensions.get('window').height,
		width: Dimensions.get("window").width
	},
	blueView: {
		...Platform.select({
			ios: {
				width: scale(300, parentWidth, Dimensions.get('window').width),
				height: 0,
				borderTopColor: "#42b3f4",
				borderTopWidth: scale(350, parentHeight, Dimensions.get('window').height),
				borderLeftWidth: 0,
				borderRightWidth: scale(230, parentWidth, Dimensions.get('window').width),
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: Dimensions.get('window').width/12-30,
				padding: scale(40, parentHeight, Dimensions.get('window').height),
				marginTop:0,
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
				marginLeft: Dimensions.get('window').width/12-30,
				marginTop: 20,
				padding: 40,
				borderRadius: 20,
			},
		  }),
	},
	redView: {
		...Platform.select({
			ios: {
				width: scale(300, parentWidth, Dimensions.get('window').width),
				height: 0,
				borderBottomColor: "#ff4971",
				borderBottomWidth: scale(350, parentHeight, Dimensions.get('window').height),
				borderLeftWidth: scale(230, parentWidth, Dimensions.get('window').width),
				borderRightWidth: 0,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: Dimensions.get('window').width/12-10,
				marginTop: scale(-400, parentHeight, Dimensions.get('window').height),
				padding: scale(40, parentHeight, Dimensions.get('window').height),
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
				marginLeft: Dimensions.get('window').width/12-10,
				marginTop: -330,
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
		padding: scale(10, parentHeight, Dimensions.get('window').height),
		color: "#4c4c4c",
		marginTop: scale(25, parentHeight, Dimensions.get('window').height),
		...Platform.select({
			ios: {
				width: scale(130, parentWidth, Dimensions.get('window').width),
			},
			android: {
				width: 100,
			},
		  }),
	},
	subTitleRed: {
		color: "#efefef",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		fontWeight: '300',
		marginLeft: scale(5, parentWidth, Dimensions.get('window').width)
	},
	subTitleBlue: {
		color: "#efefef",
		fontSize: scale(30, parentHeight, Dimensions.get('window').height),
		fontWeight: '300',
		marginLeft: scale(10, parentWidth, Dimensions.get('window').width)
	},
	shiftBlue: {
		...Platform.select({
			ios: {
				marginTop: scale(-400, parentHeight, Dimensions.get('window').height),
				marginLeft: Dimensions.get('window').width/12-10,
				zIndex: 100
			},
			android: {
				marginTop: -340,
				marginLeft: 15,
				zIndex: 100,
			},
		  }),
	},
	shiftRed: {
		...Platform.select({
			ios: {
				marginTop: scale(70, parentHeight, Dimensions.get('window').height),
				marginLeft: scale(160, parentWidth, Dimensions.get('window').width)
			},
			android: {
				marginTop: -70,
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
				width: scale(117, parentWidth, Dimensions.get('window').width),
				marginTop: -(Dimensions.get('window').height)/4,
				marginBottom: scale(-40, parentHeight, Dimensions.get('window').height),
				marginLeft: (Dimensions.get('window').width/2)-60
			},
			android: {
				borderColor: "#474747",
				borderWidth: 2,
				padding: 10,
				borderRadius: 10,
				width: 117,
				marginTop: -(Dimensions.get('window').height)/4-20,
				marginLeft: (Dimensions.get('window').width/2)-60
			},
		  }),
	},
	buttonText: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20
	}
});

function scale(val, parent, relative){
	return val * (relative/parent);
}