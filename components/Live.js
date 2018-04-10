import React, {Component} from 'react'
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'
import {Location, Permissions} from 'expo'
import {calculateDirection} from '../utils/helpers'

class Live extends Component{
    state={
        coords:null,
        status:null,
        direction:'',
        bounceValue:new Animated.Value(1)
    }

    componentWillMount = () => {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                console.log(status)
                if(status === 'granted'){
                    //return this.setLocation()
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.log('Error getting location permission: ', error)
                this.setState(() => ({status:'undetermined'}))
            })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if(status==='granted'){
                    //return this.setLocation()
                } 
                
                this.setState(() => ({status}))
            })
            .catch((error) => console.log('error asking location permissiont: ', error))
    }

    setLocation = () => {
        console.log('set location method')
       var logg = Location.watchPositionAsync({
            enableHighAccuracy:true,
            timeInterval: 100,
            distanceInterval: 100
       },({coords}) => {
            console.log('set coords callback method')
            const newDirection = calculateDirection(coords.heading)
            const {direction, bounceValue} = this.state
            
            if(newDirection !== direction){
                Animated.sequence([
                    Animated.timing(bounceValue, {duretion:200, toValue:1.04}),
                    Animated.spring(bounceValue, {toValue:1, friction:4})
                ]).start()
            }

            this.setState(() => ({
                coords,
                status:'granted',
                direction:newDirection
            }))
        })
    }

    getLocation = (position) => {
        console.log(position);
    }

    render(){
        const {status, coords, direction} = this.state
        console.log('log from render method', status)
        if(status === null){
            return <ActivityIndicator style={{marginTop:30}} />
        }

        if(status === 'denied'){
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>You denied you location. 
                        You can fix this by visiting your setting and enabl the location
                        service. 
                    </Text>
                </View>
            )
        }

        if(status === 'undetermined'){
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>You need to enabl location services for this app</Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>You are Heading</Text>
                    <Animated.Text style={styles.direction}>{/*direction*/ 'NORTH' }</Animated.Text>
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, {color:white}]}>Altitude</Text>
                        <Text style={[styles.subHeader, {color:white}]}>
                        {/*Math.round(coords.altitude * 3.2808)*/ 200} Feet
                        </Text>
                    </View>
                    <View style={styles.metric}>
                        <Text style={[styles.header, {color:white}]}>Speed</Text>
                        <Text style={[styles.subHeader, {color:white}]}>{/*(coords.speed * 2.2369).toFixed(1)*/300} MHP</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between'
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        marginRight:30
    },
    button:{
        padding:10,
        backgroundColor:purple,
        alignSelf:'center',
        borderRadius:5,
        margin:20
    },
    buttonText:{
        color:white,
        fontSize:20
    },
    directionContainer:{
        flex:1,
        justifyContent:'center'
    },
    header:{
        fontSize:20,
        textAlign:'center'
    },
    direction:{
        color:purple,
        fontSize:35,
        textAlign:'center'
    },
    metricContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:purple
    },
    metric:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'rgba(255,255,255,0.1)',
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10
    },
    subHeader:{
        fontSize:25,
        textAlign:'center',
        marginTop:5
    }    
})
export default Live