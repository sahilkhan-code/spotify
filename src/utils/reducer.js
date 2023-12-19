import { reducerCases } from "./constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "6sGmp58d4QIMJXic5XZ6Lr",
  selectedPlaylist: null,
  searchData: null,
  releaseData: null,
  topData:null,
  currentTrackData:null
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
    default:
      return state;
  }
};

export default reducer;

