import {MapPaletteToThemeType} from 'react-native-material-you-colors';

export interface IColor extends MapPaletteToThemeType {
  colors: Colors;
}

export interface Colors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  elevation: Elevation;
  surfaceDisabled: string;
  onSurfaceDisabled: string;
  backdrop: string;
}

export interface Elevation {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}
