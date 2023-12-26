import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialYou, {
  MaterialYouPalette,
} from 'react-native-material-you-colors';
import {Appbar} from 'react-native-paper';
import {MainStackParams} from '../types/Navigator';

type LikeProps = NativeStackScreenProps<MainStackParams, 'Liked'>;
const Liked = ({navigation}: LikeProps) => {
  const palette = MaterialYou.getMaterialYouPalette();
  const styles = getStyle(palette);
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
