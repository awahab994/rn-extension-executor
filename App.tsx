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
        onPress={async () => {
          try {
            let response = await LNExtensionExecutorModule.socialShare(
              'net.whatsapp.WhatsApp.ShareExtension',
              'Checkout this website',
              'https://www.hackingwithswift.com',
            );

            console.log(response);
          } catch (e) {
            console.log(e);
          }
        }}
      />

      <Button
        title="Instagram"
        onPress={async () => {
          try {
            let response = await LNExtensionExecutorModule.socialShare(
              'com.burbn.instagram.shareextension',
              'Check out this website',
              'https://www.hackingwithswift.com',
            );

            console.log(response);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <Button
        title="Snapchat"
        onPress={async () => {
          try {
            let response = await LNExtensionExecutorModule.socialShare(
              'com.toyopagroup.picaboo.share',
              'Checkout this website',
              'https://www.hackingwithswift.com',
            );

            console.log(response);
          } catch (e) {
            console.log(e);
          }
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
