import Home from "./screens/Home";
import MatchPredictor from "./screens/MatchPredictor";
import StatsDisplayer from "./screens/StatsDisplayer";
import Notes from "./screens/Notes";
import TeamInfo from "./screens/TeamInfo";
import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import {createDrawerNavigator, SafeAreaView, DrawerItems, createAppContainer} from "react-navigation"
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from "native-base"

const CustomDrawerComponent = (props) =>(
  <SafeAreaView style={{flex:1}}>
    <Icon name="close" style={[{fontSize:40, color:"#474747", marginTop:20}, styles.exit]}
      onPress={()=>props.navigation.closeDrawer()}/>
		<View style={{alignItems:"center", justifyContent:"center", height:100}}>
			<Image source={require("./assets/logo.png")} style={{width:100, height:100, marginTop:-20, marginBottom:30}}/>
		</View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  exit:{
    marginLeft: 30
  }
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home:Home,
		Predictor:MatchPredictor,
    Statistics:StatsDisplayer,
    Team_Search:TeamInfo,
    Notes:Notes
  },
  {
		contentComponent:CustomDrawerComponent,
    drawerPosition: 'right',
    contentOptions:{
      activeTintColor:"orange"
    }
  }
)



export default createAppContainer(AppDrawerNavigator);