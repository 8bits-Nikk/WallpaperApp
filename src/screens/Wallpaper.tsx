import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialYou from 'react-native-material-you-colors';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
} from 'react-native-paper';
import {MainStackParams} from '../types/Navigator';
import {getLikedArray, storage} from '../utils/storage';
//@ts-ignore
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import RNFetchBlob from 'rn-fetch-blob';

type WallpaperProps = NativeStackScreenProps<MainStackParams, 'Wallpaper'>;
const Wallpaper = ({navigation, route}: WallpaperProps) => {
  const palette = MaterialYou.getMaterialYouPalette();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [visible, setVisible] = useState(false);

  const onStateChange = ({open}: {open: boolean}) => setIsOpen(open);
  const {image} = route.params;

  useEffect(() => {
    const array = getLikedArray();
    if (array instanceof Array) {
      setIsLiked(array.includes(image));
    }
  }, [image]);

  const downloadFile = async (imgurl: string) => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (hasPermission) {
      await startDownload(imgurl);
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (result === 'denied') {
        await startDownload(imgurl);
      }
    }
  };

  const startDownload = async (imgurl: string) => {
    const {config, fs, android} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    try {
      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification: true,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          title: Date.now() + '_wp.png',
          mime: 'image/png',
          description: 'Your awesome Wallpaper is on the way.',
          // mediaScannable: true,
          path: RootDir + '/Wallpapers/' + Date.now() + '_wp.png',
        },
      }).fetch('GET', imgurl);
      if (res.path()) {
        android.actionViewIntent(res.path(), 'image/png');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error downloading');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{backgroundColor: palette.system_accent1[3]}}
        elevated>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          iconColor={palette.system_accent1[9]}
        />
        <Appbar.Content title={'Set Wallpaper'} />
      </Appbar.Header>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: image,
          }}
          resizeMode={'stretch'}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          style={[{height: '100%', width: '100%'}]}>
          {isLoading && <ActivityIndicator color={palette.system_accent1[9]} />}
        </FastImage>
      </View>
      <Portal>
        <FAB.Group
          color={palette.system_accent1[9]}
          open={isOpen}
          backdropColor={`${palette.system_accent1[2]}EE`}
          visible
          variant="surface"
          icon={isOpen ? 'close' : 'plus'}
          actions={[
            {
              icon: 'download',
              label: 'Download',
              color: palette.system_accent1[9],
              onPress: () => {
                downloadFile(image);
              },
            },
            {
              icon: 'share',
              label: 'Share',
              color: palette.system_accent1[9],
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: isLiked ? 'heart' : 'heart-outline',
              color: palette.system_accent1[9],
              label: isLiked ? 'Remove from collection' : 'Add to Collection',
              onPress: () => {
                if (isLiked) {
                  const array = getLikedArray();
                  const newArray = array.filter(value => value !== image);
                  storage.set('likedPhotos', JSON.stringify(newArray));
                } else {
                  const array = getLikedArray();
                  const newArray = array.concat(image);
                  storage.set('likedPhotos', JSON.stringify(newArray));
                }
                setIsLiked(prv => !prv);
              },
            },
            {
              icon: 'cellphone-play',
              color: palette.system_accent1[9],
              label: 'Set Wallpaper',
              onPress: () => {
                setVisible(true);
              },
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (isOpen) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Content>
            <Text variant="headlineSmall">
              Where you want to apply Wallpaper?
            </Text>
          </Dialog.Content>
          <Dialog.Content style={{gap: 4}}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                ManageWallpaper.setWallpaper(
                  {
                    uri: image,
                  },
                  () => {
                    setVisible(false);
                  },
                  TYPE.HOME,
                );
              }}>
              HOME
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => {
                ManageWallpaper.setWallpaper(
                  {
                    uri: image,
                  },
                  () => {
                    setVisible(false);
                  },
                  TYPE.LOCK,
                );
              }}>
              LOCK
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => {
                ManageWallpaper.setWallpaper(
                  {
                    uri: image,
                  },
                  () => {
                    setVisible(false);
                  },
                  TYPE.BOTH,
                );
              }}>
              BOTH
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wallpaper;
