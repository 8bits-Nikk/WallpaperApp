import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialYou from 'react-native-material-you-colors';
import {ActivityIndicator, Icon, Surface} from 'react-native-paper';

type Props = {
  item: {id: string; image: string};
};
const ListItem = ({item}: Props) => {
  const {width} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const palette = MaterialYou.getMaterialYouPalette();

  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
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
      <TouchableOpacity style={styles.like}>
        <Icon
          source="heart-outline"
          color={palette.system_accent1[2]}
          size={24}
        />
      </TouchableOpacity>
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
  like: {position: 'absolute', bottom: 4, right: 4},
});

export default ListItem;
