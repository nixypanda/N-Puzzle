import {
  blue400,
  blue500,
  darkBlack,
  grey100,
  grey500,
  grey300,
  lightBlack,
  pinkA200,
  teal400,
  white
} from 'material-ui/styles/colors';

import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue400,
    primary2Color: teal400,
    primary3Color: lightBlack,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    // disabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: blue500
  }
};
