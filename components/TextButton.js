import React from 'react'
import {View, Text, TouchableOpacity, Platform} from 'react-native'
import {styles} from '../utils/helpers'

const TextButton = ({children, onPress}) => {
    return(
        <TouchableOpacity
            style={Platform.OS==='ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>{children}</Text>
        </TouchableOpacity>
    )
}

export default TextButton