import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/actions/places-actions';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  if(places.length === 0){
    return <View style={styles.noProductsText}>
        <Text>No Places found! Do Add </Text>
    </View>
}

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
        />
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Place List",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
      );
    },
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({  
  noProductsText:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
},
})
