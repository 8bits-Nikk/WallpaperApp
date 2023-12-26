import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const getLikedArray = () => {
  const imageStrArray = storage.getString('likedPhotos') ?? '[]';
  const array = JSON.parse(imageStrArray) as Array<string>;
  return array;
};
