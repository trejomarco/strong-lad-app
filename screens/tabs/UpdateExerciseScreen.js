import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class UpdateExerciseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      reps: '',
      rest: '',
      weight: '',
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.route.params.id,
      name: this.props.route.params.name,
      reps: this.props.route.params.reps,
      rest: this.props.route.params.rest,
      weight: this.props.route.params.weight,
    });
  }

  updateExercise = () => {
    fetch('http://localhost:8080/stronglad-backend/update.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        reps: this.state.reps,
        rest: this.state.rest,
        weight: this.state.weight,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        Alert.alert('Error' + error);
        console.error(error);
      });
    this.props.navigation.navigate('TemplateScreen');
  };

  deleteExercise = () => {
    fetch('http://localhost:8080/stronglad-backend/delete.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        Alert.alert('Error' + error);
        console.error(error);
      });
    this.props.navigation.navigate('TemplateScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Exercise Information:</Text>
        <TextInput
          value={this.state.name}
          placeholder="Enter name"
          style={styles.input}
          onChangeText={textInput => this.setState({name: textInput})}
        />
        <TextInput
          value={this.state.reps}
          placeholder="Enter reps"
          style={styles.input}
          onChangeText={textInput => this.setState({reps: textInput})}
        />
        <TextInput
          value={this.state.rest}
          placeholder="Enter rest time"
          style={styles.input}
          onChangeText={textInput => this.setState({rest: textInput})}
        />
        <TextInput
          value={this.state.weight}
          placeholder="Enter weight"
          style={styles.input}
          onChangeText={textInput => this.setState({weight: textInput})}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={this.updateExercise}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.saveButton}>
            <Text style={styles.textSign}>Update Exercise</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={this.deleteExercise}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.saveButton}>
            <Text style={styles.textSign}>Delete Exercise</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UpdateExerciseScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    marginTop: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
    width: '90%',
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
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
