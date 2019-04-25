import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Platform, Dimensions, KeyboardAvoidingView, FlatList, AsyncStorage, Keyboard } from "react-native";
import {Header, Right, Icon} from "native-base";
import { ScrollView } from "react-native-gesture-handler";


var temp = [];
AsyncStorage.getItem("list").then((value) => {
  temp = JSON.parse(value);
  if(temp == null){
    temp = [];
  }
}).done();

export default class Choose extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      list: temp
  };
}
componentDidMount(){
}

getInitialState(){
  return { };
}

	render() {
        const { navigation } = this.props;

        const name = navigation.getParam('name', "nodata");
        const note = navigation.getParam('note', "nodata");
        const key = navigation.getParam('key', "nodata");
        if(name != "nodata"){
          for(i = 0; i < this.state.list.length; i++){
            if(this.state.list[i]["key"] == key){
              this.state.list[i]["subNote"] = note;
              this.state.list[i]["name"] = name;
            }
          }
        }
        AsyncStorage.setItem("list", JSON.stringify(this.state.list));
		return (
            <ScrollView>
              <Header style={styles.header}>
                <Right>
                  <Icon name="menu" style={{marginRight:20}}
                  onPress={()=>{
                    this.props.navigation.openDrawer();
                    Keyboard.dismiss();
                    }}/>
                </Right>
              </Header>
			      <View style={{marginTop: 1}}>
            {
                this.state.list.map((l) => (
                  <View>
                  <TouchableOpacity style={styles.remove} onPress={() => {
                    for(i = 0; i < this.state.list.length; i++){
                      if(this.state.list[i]["name"] == l.name){
                        this.state.list.splice(i, 1);
                        this.setState(this.state.list)
                        AsyncStorage.setItem("list", JSON.stringify(this.state.list));
                        break;
                      }
                    }
                  }}>
                      <Icon name="close" style={[{fontSize:40, color:"#474747", marginLeft:15}]}/>
                  </TouchableOpacity>
                    <TouchableOpacity key={l.name} style={styles.note} onPress={() => {
                      this.props.navigation.navigate('Display', {name:l.name, note:l.subNote, key:l.key});
                    }}>
                        <View>
                          <Text style={styles.title}>
                          {l.name}
                          </Text>
                          <Text style={{marginTop:10}}>
                          {l.subNote}
                          </Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                ))
            }
            <TouchableOpacity style={styles.note} onPress={() => {
                      var key = this.state.list.length + 1;
                      this.state.list.push({"name":"Note", "subNote":"Nothing Yet", "key":key});
                      this.props.navigation.navigate('Display', {name:"Note", note:"Nothing Yet", key:key});
                      AsyncStorage.setItem("list", JSON.stringify(this.state.list));
                    }}>
                        <Text style={[styles.titleNew]}>
                        New Note +
                        </Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
        )
	}
}

const styles = StyleSheet.create({
  header:{
		width: Dimensions.get('window').width,
    height: 80,
    marginTop:-5,
    backgroundColor: "white"
	},
  note: {
    padding: 15,
    margin: 1,
    backgroundColor: "#efefef",
  },
	title:{
    fontSize: 20
  },
  titleNew:{
    fontSize: 25,
    justifyContent: "center"
  },
  remove:{
    position: "absolute",
    zIndex: 100,
    marginLeft: Dimensions.get('window').width - 60,
    marginTop: 10,
    width: 50,
    height: 50
  }
});
