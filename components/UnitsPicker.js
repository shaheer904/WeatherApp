import { View,StyleSheet,Platform} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'

export default function UnitsPicker({unitsSystem,setUnitsSystem}) {
  return (
    <View style={styles.unitsSystem}>
<Picker selectedValue={unitsSystem} onValueChange={(item)=>{setUnitsSystem(item)}} mode='dropdown' itemStyle={{fontSize:20}} >
<Picker.Item label='C°' value='metric'></Picker.Item>
<Picker.Item label='F°' value='imperial'></Picker.Item>


</Picker>
    </View>
  )
}




const styles= StyleSheet.create({

unitsSystem:{
  position:'absolute',
  ...Platform.select({
    ios: {top:-20}
  ,
  android:{top:20}
  
  }),
  left:20,
  height:50,
  width:100
}

})