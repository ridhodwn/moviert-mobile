import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/RT_TwitterCard_2018_2.png';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.bannerImage} source={logo}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.text}>TAP TO ENTER</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FE0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 365,
    height: 105,
    marginBottom: 30
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  text: {
    fontWeight: '600',
    color: '#FE0000'
  }
});