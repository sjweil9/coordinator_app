import React from 'react';
import { TextInput, View, Text } from 'react-native';

const TextField = (props) => {
  const { containerStyle, inputStyle } = styles;
  const { 
    onChangeText, 
    value, 
    placeholder, 
    autoFocus, 
    autoCorrect, 
    textContentType, 
    secureTextEntry 
  } = props;

  return(
    <View style={containerStyle}>
      <TextInput 
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        placeholderTextColor='#6a7a82'
        textContentType={textContentType}
        underlineColorAndroid={'#003C5A'}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputStyle: {
    lineHeight: 18,
    fontSize: 14,
    padding: 10,
    width: 250,
  }
}

export { TextField };