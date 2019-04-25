import React from "react";
import { StyleSheet, View, Text, Animated, Platform, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, AsyncStorage, Dimensions } from "react-native";

var note;

const parentHeight = 667;
const parentWidth =  375;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            text: navigation.getParam('note', "nodata"),
            name: navigation.getParam('name', "nodata"),
            key: navigation.getParam('key', "nodata")
        };
    }

	render() {
		const { navigation } = this.props;

        const name = navigation.getParam('name', "nodata");

		return (
            <DismissKeyboard>
			<View style={styles.container}>
                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Choose', {name:this.state.name, note:this.state.text, key:this.state.key});
                  }} style={[{marginTop:scale(50, parentHeight, Dimensions.get('window').height)}, styles.button]}>
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
                <TextInput
                style={styles.title}
                onChangeText={(name) =>{
                    (name) = this.setState({name});
                }}
                value={this.state.name}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text) =>{
                    (text) = this.setState({text});
                }}
                value={this.state.text}
                numberOfLines = {4}
                multiline = {true}
                />
            </View>
            </DismissKeyboard>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        backgroundColor: "#efefef"
    },
    button: {
		marginLeft:scale(-230, parentWidth, Dimensions.get('window').width),
		marginRight: 10,
		borderWidth: 1,
		padding: 15,
        borderColor: "#474747",
        width: 65,
        marginTop: 60,
    },
    title:{
        fontSize: 20,
        borderColor: "#474747",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    input:{
        height: 40,
        width: 300,
        height: 200,
        marginTop: 30,
        borderColor: "#474747",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10
    }
});

function scale(val, parent, relative){
	return val * (relative/parent);
}