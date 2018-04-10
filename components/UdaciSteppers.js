import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'

const UdaciSteppers = ({max, step, unit, value, onIncrement, onDecrement}) => {
    return(
        <View style={[styles.row, {justifyContent:'space-between'}]}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    style={styles.iosButton}
                    onPress={onDecrement}>
                    <FontAwesome name="minus" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iosButton}
                    onPress={onIncrement}>
                    <FontAwesome name="plus" size={30} color={"white"} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize:25, textAlign:'center'}}>{value}</Text>
                <Text style={{fontSize:18, color:'gray'}}>{unit}</Text>
            </View> 
        </View>
    )
}
const styles = StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    iosButton:{
        backgroundColor:'purple',
        borderColor:'#fff',
        borderWidth:1,
        padding:5,
        paddingLeft:10,
        paddingRight:10
    },
    metrixCounter:{
        width:85,
        justifyContent: 'center',
        alignItems:'center'
    }
})
export default UdaciSteppers