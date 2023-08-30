import React, {useState, useEffect, Component, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import {DataTable, Title} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import StackNavigator from '@react-navigation/stack';
import AddExerciseScreen from './AddExerciseScreen';
import ModalScreen from './Modal';
import SQLite from 'react-native-sqlite-storage';
import Table from './Table';
import Modal from './Modal'

const db = SQLite.openDatabase({
  name: 'exercise-db',
  createFromLocation: '~assets/exercise-db.sqlite',
});

class TemplateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseTables: [],
      exercises: this.props.exercises
    };
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
            <TouchableOpacity
              style={{left: 0}}
              onPress={() => this.props.navigation.navigate('HomeTab')}>
              <LinearGradient
                colors={['#dc143c', '#8b0000']}
                style={styles.saveButton}>
                <Text style={styles.textSign}>Go Back</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() =>
                this.props.navigation.navigate('Table')
              }>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.saveButton}>
                <Text style={styles.textSign}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              placeholder="Template Name"
              value=""
              style={styles.textInput}
              onChangeText={() => {}}
            />
          </View>
        </View>

        <View style={styles.footer1}>
          <Title style={{paddingLeft: 30}}>Exercises:</Title>

          <ScrollView style={styles.container}>
           <Table/>
          </ScrollView>



            <View style={styles.inputContainer}>
            
            </View>
          </View>
      </SafeAreaView>
    );
  }
}

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 10, //Here is the trick
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  textInput: {
    marginTop: 10,
    height: 35,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    marginTop: 30,
  },
  footer1: {
    flex: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    // paddingHorizontal: -20,
    paddingVertical: 30,
  },
  addExercise: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  saveButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addSet: {
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
  },
  rowStyle: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
  },
  input: {
    backgroundColor: 'blue',
  },
});

