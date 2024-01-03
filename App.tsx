/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  NativeModules,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Share, {Social} from 'react-native-share';

const {LNExtensionExecutorModule} = NativeModules;
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button
        title="WhatsApp"
        onPress={() => {
          LNExtensionExecutorModule.shareWithWhatsApp(
            'https://www.hackingwithswift.com',
          );
        }}
      />

      <Button
        title="Instagram"
        onPress={() => {
          LNExtensionExecutorModule.shareWithInstagram(
            'https://www.hackingwithswift.com',
          );
        }}
      />
      <Button
        title="Snapchat"
        onPress={() => {
          LNExtensionExecutorModule.shareWithSnapchat(
            'https://www.hackingwithswift.com',
          );
        }}
      />

      <Button
        title="Messages"
        onPress={() => {
          Share.shareSingle({
            social: Social.Sms,
            message: 'Hello how are you ?',
            recipient: '',
          });
        }}
      />
    </SafeAreaView>
  );
}

export default App;
