import React, {
  useState,
  useEffect,
  Component,
  useRef,
  useIsFocused,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {DataTable} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalScreen from './Modal';
import {openDatabase} from 'react-native-sqlite-storage';
import Modal from './Modal';

const db = openDatabase({
  name: 'stronglad-db.db',
});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [{id: 0, rows: [], name: 'Bench'}],
      items: [],
      empty: [],
    };
  }

  handleChange = idx => e => {
    // getting the value and the name of the input which triggered the change
    const {name, value} = e.target;
    // getting the previous the input's state
    const rows = [...this.state.rows];
    // updating the rows state at idx with new values
    rows[idx] = {
      [name]: value,
    };
    // setting all that to the state rows
    this.setState({
      rows,
    });
  };

  handleAddRow = idx => {
    let array = [...this.state.tables];
    let row = array[idx].rows.length
      ? [...array[idx].rows, {name: '', mobile: ''}]
      : [{name: '', mobile: ''}];
    array[idx] = {...array[idx], rows: row};
    this.setState({tables: array});
  };

  handleAddTable = exerciseName => {
    this.setState({
      tables: [
        ...this.state.tables,
        {rows: [], id: this.state.tables.length, name: exerciseName},
      ],
    });
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };

  handleRemoveSpecificRow = (idx, index) => () => {
    let array = [...this.state.tables];
    let row = array[idx].rows.filter((row, i) => i !== index);
    array[idx] = {...array[idx], rows: row};
    this.setState({tables: array});
  };

  deleteTab = idx => () => {
    console.log('🚀 ~ file: Table.js ~ line 45 ~ Table ~ deleteTab ~ idx', idx);
    let array = this.state.tables.filter((row, i) => i !== idx);
    this.setState({tables: array});
  };

  exerciseTable = () => {
    return (
      <View style={{flex: 1}}>
        {this.state.tables.map((table, idx) => (
          <DataTable>
            <DataTable.Row style={{flexDirection: 'row'}}>
              <DataTable.Cell>
                <Text>{table.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={this.deleteTab(idx)}>
                  <Icon name="delete" size={20} color="#8b0000" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Header style={{borderBottomWidth: 0}}>
              <DataTable.Title style={styles.titleStyle}>
                <Text style={{color: 'black'}}>#</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                <Text style={{color: 'black'}}>Reps</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                <Text style={{color: 'black'}}>Weight</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titleStyle}>
                <Text style={{color: 'black'}} />
              </DataTable.Title>
            </DataTable.Header>

            <DataTable>
              {!!table.rows?.length &&
                table.rows.map((item, index) => (
                  <DataTable.Row key={index} style={{borderBottomWidth: 0}}>
                    <DataTable.Cell style={styles.titleStyle}>
                      <Text style={{color: 'black'}}>{idx}</Text>
                    </DataTable.Cell>
                    <TextInput
                      style={styles.input}
                      value={item.name}
                      onChange={this.handleChange(idx)}
                    />

                    <TextInput
                      style={styles.input}
                      value={item.mobile}
                      onChange={this.handleChange(idx)}
                    />
                    <DataTable.Cell style={styles.titleStyle}>
                      <TouchableOpacity
                        onPress={this.handleRemoveSpecificRow(idx, index)}>
                        <Text>Remove</Text>
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              <DataTable.Row style={{flexDirection: 'row'}}>
                <DataTable.Cell
                  style={{marginTop: 15, justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => this.handleAddRow(idx)}>
                    <LinearGradient
                      colors={['#dc143c', '#8b0000']}
                      style={styles.addSet}>
                      <Text style={styles.textSign}>Add Set</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </DataTable>
        ))}
      </View>
    );
  };

  viewExercises = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Exercises', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setItems(temp);

        if (results.rows.length >= 1) {
          this.setEmpty(false);
        } else {
          this.setEmpty(true);
        }
      });
    });
  };

  componentDidMount() {
    this.viewExercises();
  }

  listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  emptyMSG = status => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          No Record Inserted Database is Empty...
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingTop: 50,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          {this.exerciseTable()}
        </View>

        <View style={styles.inputContainer}>
          <Modal handleAddTable={this.handleAddTable} />
        </View>
      </View>
    );
  }
}

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addTable: {
    width: 100,
    height: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
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
  input: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    width: '25%',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
  },
});
