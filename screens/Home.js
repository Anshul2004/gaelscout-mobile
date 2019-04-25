import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo";
import {Header, Right, Icon} from "native-base";

const parentHeight = 667;
const parentWidth =  375;

export default class Home extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Header style={styles.header}>
					<Right>
						<Icon name="menu" style={{marginRight:scale(20, parentWidth, Dimensions.get('window').width)}}
						onPress={()=>this.props.navigation.openDrawer()}/>
					</Right>
				</Header>
				<View style={styles.shadow}>
					<LinearGradient
						style={styles.cardHome}
						colors={["#FF4B2B", "#FF416C"]}
					>
						<View style={styles.titleWrapper}>
							<Image
								source={require("../assets/logo.png")}
								style={{
									width: scale(48, parentWidth, Dimensions.get('window').width),
									height: scale(48, parentHeight, Dimensions.get('window').height)
								}}
							/>
							<Text style={styles.title}>GaelScout</Text>
						</View>
						<Text style={styles.cardHomeSubTitle}>
							Built on Neural Networks
						</Text>
						<Text style={styles.cardHomeBodyText}>
							GaelScout mobile uses previous records of teams and
							processes them with cutting edge algorithms to make
							predictions. The model used for its network runs on
							3000 matches from the Turning Point season. This
							makes its match prediction results 85% accurate on
							average—effective considering that matches do not
							always have systematic outcomes.
						</Text>
						<Text style={styles.cardHomeSubTitle}>
							Beautiful Data Visualizations
						</Text>
						<Text style={styles.cardHomeBodyText}>
							GaelScout mobile provides a beautiful statistics
							visualizer that teams can use to quickly and
							efficiently scout different teams. This visualizer
							allows anyone to visualize exactly how a team is
							doing given data from the open source VEX Database.
						</Text>
					</LinearGradient>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header:{
		width: Dimensions.get('window').width,
		marginTop:scale(-20, parentHeight, Dimensions.get('window').height),
		height: scale(80, parentHeight, Dimensions.get('window').height),
		backgroundColor: "white"
	},
	container: {
		padding: scale(15, parentWidth, Dimensions.get('window').width),
		backgroundColor: "#efefef",
		alignItems: "center",
		height: Dimensions.get('window').height
	},
	title: {
		color: "#e8e8e8",
		fontSize: scale(25, parentWidth, Dimensions.get('window').width),
		padding: scale(20, parentWidth, Dimensions.get('window').width)
	},
	cardHome: {
		padding: scale(30, parentWidth, Dimensions.get('window').width),
		borderRadius: 15,
		justifyContent: "center",
		width: scale(335, parentWidth, Dimensions.get('window').width),
		height: scale(520, parentHeight, Dimensions.get('window').height),
		marginTop: scale(30, parentHeight, Dimensions.get('window').height)
	},
	shadow: {
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.5
	},
	cardHomeTitle: {
		color: "#e8e8e8",
		fontSize: scale(20, parentHeight, Dimensions.get('window').height),
		fontWeight: '700'
	},
	cardHomeSubTitle: {
		color: "#e8e8e8",
		fontSize: scale(15, parentHeight, Dimensions.get('window').height),
		padding: 0,
		marginTop: 0,
		marginBottom: scale(10, parentHeight, Dimensions.get('window').height),
		fontWeight: "700"
	},
	cardHomeBody: {
		color: "#e8e8e8",
		fontSize: scale(15, parentHeight, Dimensions.get('window').height),
		flexDirection: "row",
		flex: 1,
		padding: 0,
		margin: scale(10, parentHeight, Dimensions.get('window').height)
	},
	cardHomeBodyText: {
		color: "#e8e8e8",
		fontSize: scale(15, parentHeight, Dimensions.get('window').height),
		lineHeight: scale(20, parentHeight, Dimensions.get('window').height),
		padding: 0,
		margin:0,
		marginBottom: scale(15, parentHeight, Dimensions.get('window').height)
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center"
	}
});

function scale(val, parent, relative){
	return val * (relative/parent);
}