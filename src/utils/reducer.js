import { reducerCases } from "./constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "37i9dQZEVXbK4NvPi6Sxit",
  selectedPlaylist: null,
  searchData: null,
  releaseData: null,
  topData:null,
  currentTrackData:null,
  currentPlaying: null,
  playerState: false,
  clientId:"3980a8c6c5ba4feba48b4c9c8f677ac1",
  alert:false
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USERINFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_PLAYLIST_DATA: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_SEARCH_DATA: {
      return {
        ...state,
        searchData: action.searchData,
      };
    }
    case reducerCases.SET_RELEASE_DATA: {
      return {
        ...state,
        releaseData: action.releaseData,
      };
    }
    case reducerCases.SET_TOP_DATA: {
      return {
        ...state,
        topData: action.topData,
      };
    }
    case reducerCases.SET_CURRENT_DATA: {
      return {
        ...state,
        currentTrackData: action.currentTrackData,
      };
    }
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
      case reducerCases.SET_CLIENT_ID:
      return {
        ...state,
        clientId: action.clientId,
      };
      case reducerCases.SET_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    default:
      return state;
  }
};

export default reducer;

