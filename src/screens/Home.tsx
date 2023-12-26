import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MaterialYou, {
  MaterialYouPalette,
} from 'react-native-material-you-colors';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';
import {MainStackParams} from '../types/Navigator';

type HomeProps = NativeStackScreenProps<MainStackParams, 'Home'>;
const Home = ({navigation}: HomeProps) => {
  const palette = MaterialYou.getMaterialYouPalette();

  const [images, setImages] = useState<Array<{id: string; image: string}>>([]);

  const getTenImages = () => {
    const newArray = new Array(10).fill(0).map((_, i) => ({
      id: uuid.v4().toString(),
      image: `https://picsum.photos/id/${images.length + i}/1080/1920`,
    }));
    setImages(prv => prv.concat(newArray));
  };

  useEffect(() => {
    const splashTimeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
    return () => clearTimeout(splashTimeOut);
  }, []);

  useEffect(() => {
    getTenImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = getStyle(palette);

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{backgroundColor: palette.system_accent1[3]}}
        elevated>
        <Appbar.Content title={'Wallpapers'} />
        <Appbar.Action
          icon="heart"
          onPress={() => {
            navigation.navigate('Liked');
          }}
          iconColor={palette.system_accent1[9]}
        />
      </Appbar.Header>
      <FlatList
        style={{paddingTop: 8}}
        data={images}
        numColumns={2}
        contentContainerStyle={{gap: 4, marginHorizontal: 8}}
        renderItem={({item}) => <ListItem item={item} key={item.id} />}
        onEndReached={() => getTenImages()}
        ListFooterComponent={() => (
          <ActivityIndicator color={palette.system_accent1[9]} />
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

export default Home;
