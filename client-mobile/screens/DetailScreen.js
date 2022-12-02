import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import logo from '../assets/Rotten_Tomatoes_logo.png';
import { GET_MOVIE_DETAIL } from '../queries';

import tomatoRotten from '../assets/1061px-Rotten_Tomatoes_rotten.png';
import tomatoGood from '../assets/1009px-Rotten_Tomatoes.png';
import tomatoFresh from '../assets/cf-lg.png';

const MovieCast = ({item}) => {
    return (
      <View style={styles.castCard}>
        <Image style={styles.profileImage} source={{uri: item.profilePict}}/>
        <View style={{justifyContent: 'center', padding: 3}}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
      </View>
    );
};

export default function DetailScreen({ route, navigation }) {
  const { itemId } = route.params
  const { loading, error, data } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      findMovieByIdId: itemId
    }
  });

  if(loading) {
    return <ActivityIndicator size='large' color='#0000ff'/>
  }

  if(error) {
    return <Text>Ouch, it seems we ran into some troubles. Please try again in a few minutes.</Text>
  }

  const user = data.findMovieById.User;

  const renderItem = ({ item }) => <MovieCast item={item}/>;

  let tomatoRating = '';
  if (data.findMovieById.rating >= 75) {
    tomatoRating = tomatoFresh;
  } else if (data.findMovieById.rating >= 60) {
    tomatoRating = tomatoGood;
  } else {
    tomatoRating = tomatoRotten;
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled = {true}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.logo} source={logo}/>
      </View>
      <View style={styles.mainCard}>
        <Image style={styles.poster} source={{uri: data.findMovieById.imgUrl}}/>
        <View style={styles.mainInfo}>
          <View style={{height: 225}}>
            <View style={{height: 81}}>
              <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
                nestedScrollEnabled = {true}>
                <Text style={styles.cardText}>{data.findMovieById.title}</Text>
              </ScrollView>
            </View>
            <View style={{alignItems: 'center', marginTop: 7}}>
              <Text style={styles.tomatometer}>Tomatometer:</Text>
              <View style={styles.ratingView}>
                <Image style={styles.tomato} source={tomatoRating}/>
                <Text style={styles.ratingText}>{data.findMovieById.rating}%</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button}
            onPress={() => Linking.openURL(data.findMovieById.trailerUrl)}>
            <Text style={styles.textButton}>Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View style={styles.movieInfoView}>
          <Text style={styles.movieInfoText}>MOVIE INFO</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.movieInfoBody}>Genre:</Text>
          <Text style={styles.movieInfoBodyContent}>{data.findMovieById.Genre.name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.movieInfoBody}>Synopsis:</Text>
          <Text style={styles.movieInfoBodyContent}>{data.findMovieById.synopsis}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.movieInfoPosted}>Posted by {user.username}</Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View style={styles.movieInfoView}>
          <Text style={styles.movieInfoText}>CAST</Text>
        </View>
        <FlatList 
          data={data.findMovieById.Casts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id }
          horizontal={true} />
      </View>
      <StatusBar style="auto" />
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
    marginBottom: 20,
    marginTop: 15
  },
  mainCard: {
    width: '100%',
    height: 300,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#f3f3f3'
  },
  poster: {
    flex: 1,
    height: 300,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  mainInfo: {
    flex: 1,
    height: 'auto',
    marginTop: 7
  },
  titleView: {
    alignItems: 'center'
  },
  cardText: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center'
  },
  tomatometer: {
    fontWeight: '500',
    fontSize: 12
  },
  ratingView: {
    flexDirection: 'row',
    marginVertical: 5
  },
  tomato: {
    width: 40,
    height: 40,
    marginEnd: 5
  },
  ratingText: {
    fontWeight: '600',
    fontSize: 25
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '77%',
    padding: 10,
    borderRadius: 10
  },
  textButton: {
    fontWeight: '600',
    color: '#FFFFFF'
  },
  movieInfoView: {
    borderStartWidth: 4,
    borderStartColor: '#FE0000',
    paddingStart: 6,
    marginBottom: 10
  },
  movieInfoText: {
    fontWeight: '700',
    fontSize: 15
  },
  movieInfoBody: {
    fontWeight: '400',
    fontSize: 12,
    flex: 1,
    marginStart: 6
  },
  movieInfoPosted: {
    fontWeight: '300',
    fontSize: 9,
    color: '#999999',
    flex: 1,
    marginStart: 6,
    marginTop: 5
  },
  movieInfoBodyContent: {
    fontWeight: '400',
    fontSize: 12,
    flex: 4
  },
  castCard: {
    width: 140,
    height: 'auto',
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
    backgroundColor: 'white',
    marginEnd: 7
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  nameText: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center'
  }
});