import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import tomatoRotten from '../assets/1061px-Rotten_Tomatoes_rotten.png';
import tomatoGood from '../assets/1009px-Rotten_Tomatoes.png';
import tomatoFresh from '../assets/cf-lg.png';

const MovieCard = ({item}) => {
  let tomatoRating = '';
  if (item.rating >= 75) {
    tomatoRating = tomatoFresh;
  } else if (item.rating >= 60) {
    tomatoRating = tomatoGood;
  } else {
    tomatoRating = tomatoRotten;
  }

  const navigation = useNavigation();
  const singleTapGesture = Gesture.Tap().onStart(() => {
    navigation.navigate('Movie Detail', {itemId: item.id})
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={singleTapGesture}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{uri: item.imgUrl}}/>
          <Text style={styles.cardText}>{item.title}</Text>
          <View style={{alignItems: 'center'}}>
            <View style={styles.ratingView}>
              <Image style={styles.tomato} source={tomatoRating}/>
              <Text style={styles.ratingText}>{item.rating}%</Text>
            </View>
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    card: {
      width: 200,
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
      marginEnd: 10
    },
    cardImage: {
      width: '100%',
      height: 300,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    cardText: {
      fontWeight: '600',
      fontSize: 20,
      textAlign: 'center'
    },
    ratingView: {
      flexDirection: 'row',
      marginVertical: 5
    },
    tomato: {
      width: 20,
      height: 20,
      marginEnd: 5
    },
    ratingText: {
      fontWeight: '500',
      fontSize: 13
    }
});

export default MovieCard;