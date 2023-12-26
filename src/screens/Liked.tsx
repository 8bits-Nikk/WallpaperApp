import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MaterialYou, {
  MaterialYouPalette,
} from 'react-native-material-you-colors';
import {Appbar, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';
import {MainStackParams} from '../types/Navigator';
import {getLikedArray} from '../utils/storage';

type LikeProps = NativeStackScreenProps<MainStackParams, 'Liked'>;
const Liked = ({navigation}: LikeProps) => {
  const palette = MaterialYou.getMaterialYouPalette();
  const styles = getStyle(palette);
  const [likedPhotos, setLikedPhotos] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<{id: string; image: string}>>([]);

  useFocusEffect(
    React.useCallback(() => {
      const array = getLikedArray();
      setLikedPhotos(array);
      const imgWithId = array.map(value => ({
        id: uuid.v4().toString(),
        image: value,
      }));
      setImages(imgWithId);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{backgroundColor: palette.system_accent1[3]}}
        elevated>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={palette.system_accent1[9]}
        />
        <Appbar.Content title={'Your Collection'} />
      </Appbar.Header>
      <FlatList
        style={{paddingTop: 8}}
        data={images}
        numColumns={2}
        contentContainerStyle={{gap: 4, marginHorizontal: 8}}
        renderItem={({item}) => (
          <ListItem
            item={item}
            key={item.id}
            navigation={navigation}
            likedPhotos={likedPhotos}
          />
        )}
        ListEmptyComponent={() => (
          <Text variant="labelLarge">Nothing to see here</Text>
        )}
      />
    </View>
  );
};
const getStyle = (palette: MaterialYouPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.system_accent1[2],
    },
  });

export default Liked;
