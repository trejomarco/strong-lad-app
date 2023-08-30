import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const HomeTab = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View>
          <Title style={{fontSize: 30, fontWeight: 'bold', marginTop: 30}}>
            Begin Workout
          </Title>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('TemplateScreen')}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.addTemplate}>
            <Text style={styles.textSign}>Add Workout Template</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View>
          <Title>Saved Templates</Title>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TemplateScreen')}>
            <LinearGradient
              colors={['#696969', '#a9a9a9']}
              style={styles.templateSign}>
              <Text style={styles.textSign}>Click to View/EditTemplate</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TemplateScreen')}>
            <LinearGradient
              colors={['#696969', '#a9a9a9']}
              style={styles.templateSign}>
              <Text style={styles.textSign}>Click to View/EditTemplate</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TemplateScreen')}>
            <LinearGradient
              colors={['#696969', '#a9a9a9']}
              style={styles.templateSign}>
              <Text style={styles.textSign}>Click to View/EditTemplate</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  addTemplate: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },

  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  templateSign: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
});
