import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialYou from 'react-native-material-you-colors';
import {ActivityIndicator, IconButton, Surface} from 'react-native-paper';
import {getLikedArray, storage} from '../utils/storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../types/Navigator';

type Props = {
  item: {id: string; image: string};
  navigation: NativeStackNavigationProp<MainStackParams, 'Home' | 'Liked'>;
  likedPhotos: Array<string>;
};
const ListItem = ({item, navigation, likedPhotos}: Props) => {
  const {width} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const palette = MaterialYou.getMaterialYouPalette();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const array = getLikedArray();
    if (array instanceof Array) {
      setIsLiked(array.includes(item.image));
    }
  }, [item, likedPhotos.length]);

  return (
    <Surface style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Wallpaper', item);
        }}>
        <FastImage
          source={{
            uri: item.image,
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          style={[
            {
              width: width / 2 - 10,
            },
            styles.image,
          ]}>
          {isLoading && <ActivityIndicator color={palette.system_accent1[9]} />}
        </FastImage>
      </TouchableOpacity>

      <IconButton
        onPress={() => {
          if (isLiked) {
            const array = getLikedArray();
            const newArray = array.filter(value => value !== item.image);
            storage.set('likedPhotos', JSON.stringify(newArray));
          } else {
            const array = getLikedArray();
            const newArray = array.concat(item.image);
            storage.set('likedPhotos', JSON.stringify(newArray));
          }
          setIsLiked(prv => !prv);
        }}
        style={styles.like}
        icon={isLiked ? 'heart' : 'heart-outline'}
        size={24}
        iconColor={palette.system_accent1[2]}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {borderRadius: 8, marginEnd: 4},
  image: {
    aspectRatio: 0.5625,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: {position: 'absolute', bottom: -4, right: -4},
});

export default ListItem;
