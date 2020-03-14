import {StyleSheet} from 'react-native';
import colors from '../colors/colors';

export default StyleSheet.create({
  //LOGIN|REGISTER================================================================================================================
  subCont: {
    marginTop: 16,
    paddingBottom: 32,
  },
  subButton: {
    color: colors.LightBackground,
    textAlign: 'center',
    fontSize: 12,
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  formLogin: {
    width: '90%',
    marginTop: '20%',
  },
  textInput: {
    backgroundColor: colors.DarkForm,
    color: colors.LightForm,
    borderRadius: 4,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  button: {
    color: colors.LightBackground,
    backgroundColor: colors.primary,
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    fontSize: 16,
  },
  buttonCont: {
    marginTop: 24,
    width: '90%',
  },
  //==============================================================================================================================
});
