import React from 'react'
import {View, Switch} from 'react-native'

const SwitchButton = ({value, handleToggleSwitch}) => {
    return(
        <View>
            <Switch
                value={value} 
                onValueChange={handleToggleSwitch}
            />
        </View>
    )
}

export default SwitchButton