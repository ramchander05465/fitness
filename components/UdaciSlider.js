import React from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'

const UdaciSlider = (props) => {
    return(
        <View style={styles.row}>
            <Slider 
                style={{flex:1}}
                value={props.value} 
                maximumValue={props.max}
                step={props.step}
                onValueChange={(value) => props.onChange(props.sliderType, value)} />
                <View style={styles.matricContainer}>
                    <Text style={{fontSize:25, textAlign:'center'}}>{props.value}</Text>
                    <Text style={{fontSize:18, color:'gray'}}>{props.unit}</Text>
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
    matricContainer:{
       width:85,
       alignItems:'center',
       justifyContent:'center' 
    }
})
export default UdaciSlider