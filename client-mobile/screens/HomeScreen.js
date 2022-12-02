import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import logo from '../assets/Rotten_Tomatoes_logo.png';
import banner from '../assets/3000-years-of-longing-banner.jpeg';
import MovieCard from '../components/MovieCard';
import { GET_MOVIES } from '../queries';

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if(loading) {
    return <ActivityIndicator size='large' color='#0000ff'/>
  }

  if(error) {
    return <Text>Ouch, it seems we ran into some troubles. Please try again in a few minutes.</Text>
  }

  const renderItem = ({ item }) => <MovieCard item={item}/>;

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.logo} 
          source={logo}/>
        <Image style={styles.bannerImage} 
          source={banner}/>
      </View>
      <View style={styles.viewListText}>
        <Text style={styles.listText}>MOVIES LIST</Text>
      </View>
      <StatusBar style="auto" />
      <View>
        <FlatList 
          data={data.findMovies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id }
          horizontal={true}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5
  },
  logo: {
    width: 263,
    height: 75,
    marginBottom: 15,
    marginTop: 15
  },
  bannerImage: {
    width: 400,
    height: 200,
    marginBottom: 15
  },
  viewListText: {
    borderStartWidth: 4,
    borderStartColor: '#FE0000',
    paddingStart: 6,
    marginBottom: 10
  },
  listText: {
    fontWeight: '700',
    fontSize: 15
  }
});