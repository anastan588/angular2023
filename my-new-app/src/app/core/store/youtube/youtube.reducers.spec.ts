import * as YOUTUBEActions from './youtube.actions';
import { IVideosTubeState, InitialVideosTubeState } from './youtube.state';
import { youTubeReducer } from './youtube.reducers';
import data from './../../data/response.json';

describe('youtubeReducer for tubeVideos state', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('loadVideosSuccess should load and set videosFromApi', () => {
    const action = YOUTUBEActions.loadVideosSuccess({ videos: data.items });
    const result = youTubeReducer(state, action);

    expect(result.tubeVideos).toBeDefined();
    expect(result.tubeVideos).toEqual(data.items);
    expect(result.tubeVideos).toBeTruthy();
  });

  it('removeTubeVideo should remove tubeVideo', () => {
    const loadAction = YOUTUBEActions.loadVideosSuccess({ videos: data.items });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.tubeVideos).toEqual(data.items);
    expect(loadresult.tubeVideos).toBeDefined();
    const action = YOUTUBEActions.removeTubeVideo({
      video: data.items[0],
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.tubeVideos).toBeDefined();
    expect(result.tubeVideos).toEqual(data.items.slice(1));
    expect(result.tubeVideos).toBeTruthy();
  });

  it('addTubeVideo should add tubeVideo', () => {
    const loadAction = YOUTUBEActions.loadVideosSuccess({ videos: data.items });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.tubeVideos).toEqual(data.items);
    expect(loadresult.tubeVideos).toBeDefined();
    const action = YOUTUBEActions.addTubeVideo({
      video: data.items[0],
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.tubeVideos).toBeDefined();
    expect(result.tubeVideos).toEqual([data.items[0], ...data.items]);
    expect(result.tubeVideos).toBeTruthy();
  });
});

describe('youtubeReducer for customVideos state', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('loadCustomVideo should load and set customVideos', () => {
    const action = YOUTUBEActions.LoadCustomVideos({ videos: data.items });
    const result = youTubeReducer(state, action);

    expect(result.customVideos).toBeDefined();
    expect(result.customVideos).toEqual(data.items);
    expect(result.customVideos).toBeTruthy();
  });

  it('addCustomVideo should add customVideo', () => {
    const loadAction = YOUTUBEActions.LoadCustomVideos({ videos: data.items });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.customVideos).toEqual(data.items);
    expect(loadresult.customVideos).toBeDefined();
    const action = YOUTUBEActions.addCustomVideo({
      video: data.items[0],
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.customVideos).toBeDefined();
    expect(result.customVideos).toEqual([data.items[0], ...data.items]);
    expect(result.customVideos).toBeTruthy();
  });

  it('removeCustomVideo should remove customVideo', () => {
    const loadAction = YOUTUBEActions.LoadCustomVideos({ videos: data.items });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.customVideos).toEqual(data.items);
    expect(loadresult.customVideos).toBeDefined();
    const action = YOUTUBEActions.removeCustomVideo({
      video: data.items[0],
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.customVideos).toBeDefined();
    expect(result.customVideos).toEqual(data.items.slice(1));
    expect(result.customVideos).toBeTruthy();
  });
});

describe('youtubeReducer for favouriteVideoItemsId state', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('loadFavoriteVideo should load and set favoriteVideos', () => {
    const action = YOUTUBEActions.loadFavoriteVideos({
      videoIds: [data.items[0].id.videoId, data.items[1].id.videoId],
    });
    const result = youTubeReducer(state, action);

    expect(result.favouriteVideoItemsId).toBeDefined();
    expect(result.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
    expect(result.favouriteVideoItemsId).toBeTruthy();
  });

  it('addFavoriteVideo should add favouriteVideoItemsId', () => {
    const loadAction = YOUTUBEActions.loadFavoriteVideos({
      videoIds: [data.items[0].id.videoId, data.items[1].id.videoId],
    });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
    expect(loadresult.favouriteVideoItemsId).toBeDefined();
    const action = YOUTUBEActions.addFavoriteVideo({
      videoId: data.items[0].id.videoId,
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.favouriteVideoItemsId).toBeDefined();
    expect(result.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      ...[data.items[0].id.videoId, data.items[1].id.videoId],
    ]);
    expect(result.favouriteVideoItemsId).toBeTruthy();
  });
  it('removeFavoriteVideo should remove favouriteVideoItemsId', () => {
    const loadAction = YOUTUBEActions.loadFavoriteVideos({
      videoIds: [data.items[0].id.videoId, data.items[1].id.videoId],
    });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
    expect(loadresult.favouriteVideoItemsId).toBeDefined();
    const action = YOUTUBEActions.removeFavoriteVideo({
      videoId: data.items[0].id.videoId,
    });
    const result = youTubeReducer(loadresult, action);
    expect(result.favouriteVideoItemsId).toBeDefined();
    expect(result.favouriteVideoItemsId).toEqual([data.items[1].id.videoId]);
    expect(result.favouriteVideoItemsId).toBeTruthy();
  });

  it('resetFavoriteVideo should reset favouriteVideoItemsId array', () => {
    const loadAction = YOUTUBEActions.loadFavoriteVideos({
      videoIds: [data.items[0].id.videoId, data.items[1].id.videoId],
    });
    const loadresult = youTubeReducer(state, loadAction);
    expect(loadresult.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
    expect(loadresult.favouriteVideoItemsId).toBeDefined();
    const action = YOUTUBEActions.resetFavoriteVideos();
    const result = youTubeReducer(loadresult, action);
    expect(result.favouriteVideoItemsId).toBeDefined();
    expect(result.favouriteVideoItemsId).toEqual([]);
    expect(result.favouriteVideoItemsId).toBeTruthy();
  });
});

describe('youtubeReducer for nextPageNumber state', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('setNextPage should load and set nextPageNumber', () => {
    const action = YOUTUBEActions.setNextPage({ pageToken: '123uyt' });
    const result = youTubeReducer(state, action);

    expect(result.nextPageNumber).toBeDefined();
    expect(result.nextPageNumber).toEqual('123uyt');
    expect(result.nextPageNumber).toBeTruthy();
  });
});

describe('youtubeReducer for prevPageNumber state', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('setPreviousPage should load and set prevPageNumber', () => {
    const action = YOUTUBEActions.setPreviousPage({ pageToken: '123uyt' });
    const result = youTubeReducer(state, action);

    expect(result.prevPageNumber).toBeDefined();
    expect(result.prevPageNumber).toEqual('123uyt');
    expect(result.prevPageNumber).toBeTruthy();
  });
});
