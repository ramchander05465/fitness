import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import MetricCard from './MetricCard'
import { removeEntry } from '../utils/api';
import {addEntry} from '../actions'
import {timeToString, getReminderValue} from '../utils/helpers'
import TextButton from './TextButton'

class EntryDetails extends Component{
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params

        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        return {
            title:`${month}/${day}/${year}`
        }
    }

    shouldComponentUpdate(nextProps){
        return nextProps.metric !== null && !nextProps.metric.today
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props
        remove()
        goBack()
        removeEntry(entryId)
    } 

    render(){
        const {metric} = this.props
        return(
            <View>
                <MetricCard metrics={metric} />
                <TextButton onPress = {this.reset} style={{margin:20}}>
                    Reset
                </TextButton>
            </View>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    const {entryId} = navigation.state.params

    return{
        entryId,
        metric:state[entryId]
    }
}

const mapDispatchToProps = (dispatch, {navigation}) => {
    const {entryId} = navigation.state.params

    return{
        remove:() => dispatch(addEntry({
            [entryId]:entryId===timeToString() ? getReminderValue() : null
        })),
        goBack:() => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails)