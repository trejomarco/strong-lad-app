/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {transform} from '@babel/core';
import React, {useState, Component, useIsFocused, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'stronglad-db.db',
});

class ModalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      exerciseName: '',
    };
  }

  createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        "Select name FROM sqlite_master WHERE type='table' AND name='Exercises'",
        [],
        function(tx, res) {
          console.log('item: ', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Exercises', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Exercises(ExerciseID INT PRIMARY KEY, ExerciseName VARCHAR(30))',
              []
            );
          }
        }
      );
    });
       console.log('Table created successfully');
  };

componentDidMount() {
  this.createTable();
}

  insertExercise = () => {
    if (this.state.exerciseName == '') {
      Alert.alert('Please Enter Exercise');
    } else {
    db.transaction(tx => {
      tx.executeSql( 'INSERT INTO Exercises(ExerciseName) VALUES(?)',
      [this.state.exerciseName],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
           Alert.alert('Successfully added new exercise');
           console.log('Success');
        } else  {Alert.alert('Failed to add exercise');}
      }
      );
    });
  }
  }



  stateUpdate = () => {
    this.setState({show: false});
    this.insertExercise();
    this.props.handleAddTable(this.state.exerciseName);
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({show: true});
          }}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.addExercise}>
            <Text style={styles.textSign}>Add Exercise</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Modal
          transparent={true}
          isVisible={this.state.show}
          animationIn="pulse"
          animationOut="fadeOut"> 
          <View style={{flex: 1}}>
            <View style={styles.modalContainer}>
              <Text>Input Below:</Text>
              <TextInput
                placeholder="Enter Exercise"
                style={styles.input}
                value={this.state.exerciseName}
                onChangeText={textInput => this.setState({exerciseName: textInput})}
              />
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.saveButton}
                onPress={this.stateUpdate}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.saveButton}>
                  <Text style={styles.textSign}>Add</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({show: false});
                }}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.cancelButton}>
                  <Text style={styles.textSign}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default ModalScreen;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 250,
    marginBottom: 250,
    marginLeft: 30,
    marginRight: 30,
    padding: 40,
    paddingTop: 60,
    paddingBottom: 60,
    borderRadius: 10,
    flex: 1,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
    width: '120%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 10,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cancelButton: {
    marginTop: 20,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addExercise: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
});
