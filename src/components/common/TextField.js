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
    secureTextEntry,
    placeholderTextColor,
    multiline,
    maxLength,
    numberOfLines
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
        placeholderTextColor={placeholderTextColor}
        textContentType={textContentType}
        underlineColorAndroid={'#003C5A'}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#003c5a',
  },
  inputStyle: {
    lineHeight: 18,
    fontSize: 14,
    padding: 5,
    width: 200,
  }
}

export { TextField };