import {VideoPlayer} from 'expo-video';
import {types} from 'mobx-state-tree';

const RootStore = types
  .model('RootStore', {
    videoPlayerObj: types.maybeNull(types.frozen<VideoPlayer | null>()),
  })
  .actions(self => ({
    setVideoPlayerObj(videoPlayer: VideoPlayer) {
      self.videoPlayerObj = videoPlayer;
    },
  }));

export default RootStore;
