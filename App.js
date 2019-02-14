import React, { Component, useState } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [text, setText] = useState("kukkuu")

  return <View>
    <Text>{text}</Text>
  </View>
}

export default App
