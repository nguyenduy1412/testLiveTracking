import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tracking = () => {
  
  return (
    <View style={styles.container}>
      <Text>Tracking </Text>
    </View>
  )
}

export default Tracking

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})