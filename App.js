import React from 'react'
import {View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducers from './reducers'
import {purple, white} from './utils/colors'

import History from './components/History'
import AddEntry from './components/addEntry'
import EntryDetails from './components/EntryDetails'
import UdaciStatusbar from './components/UdaciStatusbar'
import Live from './components/Live'

import {setLocalNotification} from './utils/helpers'


const Tabs = TabNavigator({
  History:{
    screen:History,
    navigationOptions:{
      tabBarLabel:'History',
      tabBarIcon:({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry:{
    screen:AddEntry,
    navigationOptions:{
      tabBarLabel:'Add Entry',
      tabBarIcon:({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  Live:{
    screen:Live,
    navigationOptions:{
      tabBarLabel:'Live',
      tabBarIcon:({tintColor}) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
})

const MainNavigation = StackNavigator({
  History:{
    screen:Tabs,
    navigationOptions:{
      title:'Home'
    }
  },
  EntryDetails:{
    screen:EntryDetails
  }
}) 

export default class App extends React.Component {  
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducers)}>
      <View style={{'flex':1}}>
        <UdaciStatusbar backgroundColor={purple} barStyle='light-content' />
        <MainNavigation />
      </View>
      </Provider>
    );
  }
}

const styles = {
  container:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    alignItems:'center',
    justifyContent:'center'
  },
  btn:{
    backgroundColor:'#E53224',
    padding:10,
    paddingLeft: 50,
    paddingRight:50,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:5
  },
  btnText:{
    color:'#fff'
  }
}
