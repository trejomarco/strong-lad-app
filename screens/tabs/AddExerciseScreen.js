/* eslint-disable prettier/prettier */
import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Title} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import StackNavigator from '@react-navigation/stack';


class AddExerciseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  InsertExercises = () => {
    const {name} = this.state;

    if (name.length == 0) {
      Alert.alert('All fields required!');
    } else {
        fetch('http://localhost:8080/stronglad-backend/insert.php', {
              method: 'POST',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name,
              }),
            })
              .then((response) => response.json())
          
              .then((responseJson) => {
                Alert.alert(responseJson);
              })
              .catch((error) => {
                Alert.alert('Error' + error);
                console.error(error);
              });

        this.props.navigation.navigate('TemplateScreen');

    }

    
    // const ViewExerciseList = () => {
    //   this.props.navigation.navigate('AddExerciseScreen')
    // }


  };
  // InsertExercises = () => {
  //   const {name} = this.state;
  //   const {reps} = this.state;
  //   const {rest} = this.state;
  //   const {weight} = this.state;

  //   if (name.length == 0 || reps.length == 0 || rest.length == 0 || weight.length == 0) {
  //     Alert.alert('All fields required!');
  //   } else {
  //       fetch('http://localhost:8080/stronglad-backend/insert.php', {
  //             method: 'POST',
  //             headers: {
  //               'Accept' : 'application/json',
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               name: name,
  //               reps: reps,
  //               rest: rest,
  //               weight: weight,
  //             }),
  //           })
  //             .then((response) => response.json())
  //             .then(responseJson => {
  //               Alert.alert(responseJson);
  //             })
  //             .catch((error) => {
  //               Alert.alert('Error' + error);
  //               console.error(error);
  //             });



  //   }

  //   this.props.navigation.navigate('TemplateScreen');
  //   // const ViewExerciseList = () => {
  //   //   this.props.navigation.navigate('AddExerciseScreen')
  //   // }


  // };
  render() {
    return (
      <View style={styles.container}>
        <Text>Exercise name:</Text>
        <TextInput
          placeholder="Enter name"
          style={styles.input}
          onChangeText={textInput => this.setState({name: textInput})}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.button}
          onPress={this.InsertExercises}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.saveButton}>
            <Text style={styles.textSign}>Add Exercise</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddExerciseScreen;

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

// const AddExerciseScreen = ({ navigation }) => {

//     return (
//        <View>
//        <View style={styles.userInfoSection}>
//             <Title style={{fontSize: 30, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center'}}>Add Exercise</Title>

//        </View>

//              <View style={{flexDirection: 'row', marginTop:30, alignItems:'center', justifyContent: 'space-around'}}>
//                 <TouchableOpacity onPress={() => {}}>
//                     <LinearGradient
//                         colors={['#08d4c4', '#01ab9d']}
//                         style={styles.saveButton}
//                     >
//                         <Text style={styles.textSign}>Save</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => navigation.navigate('TemplateScreen')}>
//                     <LinearGradient
//                         colors={['#dc143c', '#8b0000']}
//                         style={styles.saveButton}
//                     >
//                         <Text style={styles.textSign}>Cancel</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//                 </View>
//         </View>

//     )
// }

// export default AddExerciseScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     container2: {
//         width: '100%',
//         height: 150,
//         padding: 16,
//         paddingTop: 50,
//       },
//     userInfoSection: {
//         paddingHorizontal: 30,
//         marginTop: 30
//     },

//     saveButton: {
//         width: 120,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 20,

//     },
//     textSign: {
//         color: 'white',
//         fontWeight: 'bold'
//     },
//     cell: {
//         borderWidth: 1,
//         borderColor: 'black',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//     }
// )
