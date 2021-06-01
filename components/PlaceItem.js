import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../components/UI/Card';

const PlaceItem = props => {
  let TouchableCmp = TouchableOpacity;
  return (
    <Card style={styles.place}>
    <View style={styles.touchable}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
    </Card>

  );
};

const styles = StyleSheet.create({
  place: {
    height: 200,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '95%'
  },
  details: {
    alignItems: 'center',
    height: 10,
    padding: 5
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 0
  },
});

export default PlaceItem;
