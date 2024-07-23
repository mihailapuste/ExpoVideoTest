// In App.js in a new project

import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useVideoPlayer, VideoPlayer, VideoView} from 'expo-video';
import {MobXProviderContext, Provider} from 'mobx-react';
import RootStore from './stores/RootStore';

const rootStore = RootStore.create();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Video Player"
        onPress={() => navigation.navigate('Video Player')}
      />
    </View>
  );
}

function VideoPlayerScreen() {
  const initialSource = {
    uri: 'https://www.shutterstock.com/shutterstock/videos/6908191/preview/stock-footage-chimpanzee-eating-banana.mp4',
  };

  const store = React.useContext(MobXProviderContext);

  const videoPlayer: VideoPlayer = useVideoPlayer(
    initialSource,
    //  Setup function
    (setupPlayer: VideoPlayer) => {
      setupPlayer.loop = true;
      setupPlayer.muted = false;
      setupPlayer.playing = false;
      setupPlayer.currentTime = 0;
      setupPlayer.staysActiveInBackground = false;

      // set the video player object in the store
      store.rootStore.setVideoPlayerObj(setupPlayer);

      // play the video after setup
      setupPlayer.play();
    },
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Video Screen</Text>

      <VideoView
        player={videoPlayer}
        style={{
          width: 100,
          height: 100,
        }}
        // allow native controls in debug mode / workout instructions
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider rootStore={rootStore} {...rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Video Player" component={VideoPlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
