import React, {Component} from 'react' 
import {View, Text, TouchableHighlight, ScrollView, Image, Platform } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {getMetricMetaInfo, 
    timeToString, 
    getReminderValue,
    clearNotification,
    setLocalNotification, 
    styles} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './dateHeader'
import TextButton from './TextButton'
import SwitchButton from './SwitchButton'
import {submitEntry, removeEntry, clearEntry} from '../utils/api'
import { addEntry } from '../actions'

class AddEntry extends Component{
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0/*,
        switchToggle:false*/
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)        
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {        
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    range = (metric, value) => {
        this.setState(() => ({
            [metric]:value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.props.dispatch(addEntry({[key]:entry}))

        this.setState(() => ({
            run:0,
            bike:0,
            swim:0,
            sleep:0,
            eat:0,
        }))

        this.toHome()

        submitEntry({key, entry})

        clearNotification().then(setLocalNotification)
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry({
            [key]:getReminderValue()
        }))

        this.toHome()

        removeEntry(key)
    }
    
    clearStorrage = () => {
        clearEntry()
    }
    
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key:'AddEntry'
        }))
    }

    /*handleToggleSwitch = () => {
        this.setState(() => ({switchToggle: !this.state.switchToggle}))
    }*/

    render(){
        const metaInfo = getMetricMetaInfo()
        if(this.props.alreadyLogged){
            return(
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? "ios-happy-outline" : "md-happy"}
                        size={100}
                    />
                    <Text>You already logged information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }
        return(
            <ScrollView style={styles.container}>
                {/*<Image source={require('../images/download.jpg')} />*/}
                <DateHeader date={new Date().toLocaleDateString()} />
                {/*<Text>{JSON.stringify(this.state)}</Text>*/}
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return(
                       <View key={key} style={styles.row}>
                           {getIcon()}
                           {type === 'slider'
                           ? <UdaciSlider 
                                value={this.state[key]}
                                sliderType={key}
                                max={metaInfo[key].max}
                                step={metaInfo[key].step}
                                onChange={(metric, value) => this.range(metric, value)}
                                {...rest}
                                />
                            : <UdaciSteppers
                                value={value}
                                onIncrement={() => this.increment(key)}
                                onDecrement={() => this.decrement(key)}
                                {...rest}
                                />
                            }
                       </View>
                    ) 
                })}
                <TextButton onPress={this.submit}>
                        Submit
                </TextButton>
                <TextButton onPress={this.clearStorrage}>
                        Clear
                </TextButton>
                {/*<SwitchButton 
                    value={this.state.switchToggle}
                    handleToggleSwitch={this.handleToggleSwitch}
                />*/}
            </ScrollView>
        )
    }
}

function mapStateToProps(state){
    const key = timeToString()

    return{
        alreadyLogged: state[key] && typeof state[key].today ==='undefined'    
    }
}

export default connect(mapStateToProps)(AddEntry)