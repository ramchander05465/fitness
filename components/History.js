import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import UdacifitnessCalendar from 'udacifitness-calendar'

import { addEntry, recieveEntry} from '../actions'
import {timeToString, getReminderValue} from '../utils/helpers'
import {formatCalendarResults} from '../utils/_calendar'
import {fetchCalendarResults} from '../utils/api'
import {white} from '../utils/colors'
import DateHeader from './dateHeader'
import MetricCard from './MetricCard'

class History extends Component{
    componentDidMount(){
        const {dispatch} = this.props
        fetchCalendarResults()
            .then((entries) => dispatch(recieveEntry(entries)))
            .then(({entries}) => {              
               if(!entries[timeToString()]){
                    dispatch(addEntry({
                        [timeToString()]:getReminderValue()
                    }))
                }
            })
    }
    renderItem = ({today, ...metric}, formattedDate, keys) => (
        <View style={styles.item}>
            {today
                ?   <View>
                        <DateHeader date={formattedDate} />
                        <Text style={styles.noDataText}>{today}</Text>
                    </View>

                :   <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'EntryDetails',
                    {entryId:keys}
                    )}>
                        <MetricCard metrics={metric} date={formattedDate} />
                    </TouchableOpacity>
            }
        </View>
    )

    renderEmptyDate(formattedDate){
        <View style={styles.item}>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
                You don't log any data for this day!!
            </Text>
        </View>
    }

    render(){
        const {entries} = this.props
        return(
            <UdacifitnessCalendar 
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
} 

function mapStateToProps(entries){
    return{
        entries
    }
} 

const styles = StyleSheet.create({
    item:{
        backgroundColor:white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding:20,
        marginLeft:10,
        marginRight:10,
        marginTop:17,
        justifyContent:'center',
        shadowRadius:3,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,.24)',
        shadowOffset:{
            width:0,
            height:3
        }
    },
    noDataText:{
        fontSize:20,
        paddingTop:20,
        paddingBottom:20
    }     
})

export default connect(mapStateToProps)(History)