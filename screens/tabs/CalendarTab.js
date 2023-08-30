import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'


const CalendarTab = () => {
return (
        <SafeAreaView style={styles.container}>
            <Text>Calendar</Text>
        </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default CalendarTab