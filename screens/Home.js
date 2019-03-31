import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo";
import {Header, Right, Icon} from "native-base";

export default class Home extends React.Component {
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
						style={styles.cardHome}
						colors={["#FF4B2B", "#FF416C"]}
					>
						<View style={styles.titleWrapper}>
							<Image
								source={require("../assets/logo.png")}
								style={{
									width: 48,
									height: 48
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
		marginTop: -80,
		height: 80
	},
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#efefef",
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		color: "#e8e8e8",
		fontSize: 27,
		padding: 20
	},
	cardHome: {
		padding: 30,
		borderRadius: 15,
		justifyContent: "center",
		width: 335,
		height: 500,
		marginTop: 15
	},
	shadow: {
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.5
	},
	cardHomeTitle: {
		color: "#e8e8e8",
		fontSize: 25,
		fontWeight: '700'
	},
	cardHomeSubTitle: {
		color: "#e8e8e8",
		fontSize: 17,
		padding: 0,
		marginTop: 0,
		marginBottom: 10,
		fontWeight: "700"
	},
	cardHomeBody: {
		color: "#e8e8e8",
		fontSize: 12,
		flexDirection: "row",
		flex: 1,
		padding: 0,
		margin: 10
	},
	cardHomeBodyText: {
		color: "#e8e8e8",
		fontSize: 14,
		lineHeight: 20,
		padding: 0,
		margin:0,
		marginBottom: 15
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center"
	}
});