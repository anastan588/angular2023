import * as YOUTUBEActions from './youtube.actions';
import * as YOUTUBESelectors from './youtube.selectors';
import { IVideosTubeState, InitialVideosTubeState } from './youtube.state';
import { youTubeReducer } from './youtube.reducers';
import data from './../../data/response.json';

describe('youtubeSelector', () => {
  let state: IVideosTubeState;
  beforeEach(() => {
    state = InitialVideosTubeState;
  });

  it('selectSearchVideos should load and set videosFromApi', () => {
    const action = YOUTUBEActions.loadVideosSuccess({ videos: data.items });
    const resultReducer = youTubeReducer(state, action);
    expect(resultReducer.tubeVideos).toBeDefined();
    expect(resultReducer.tubeVideos).toEqual(data.items);
    expect(resultReducer.tubeVideos).toBeTruthy();
    const result = YOUTUBESelectors.selectSearchVideos.projector(resultReducer);
    expect(result).toBeTruthy();
    expect(result).toEqual(data.items);
  });

  it('selectCustomVideos should load and set customVideos', () => {
    const action = YOUTUBEActions.LoadCustomVideos({ videos: data.items });
    const resultReducer = youTubeReducer(state, action);
    expect(resultReducer.customVideos).toBeDefined();
    expect(resultReducer.customVideos).toEqual(data.items);
    expect(resultReducer.customVideos).toBeTruthy();
    const result = YOUTUBESelectors.selectCustomVideos.projector(resultReducer);
    expect(result).toBeTruthy();
    expect(result).toEqual(data.items);
  });

  it('selectfavouriteVideos should load favouriteVideoItemsId', () => {
    const action = YOUTUBEActions.loadFavoriteVideos({
      videoIds: [data.items[0].id.videoId, data.items[1].id.videoId],
    });
    const resultReducer = youTubeReducer(state, action);
    expect(resultReducer.favouriteVideoItemsId).toBeDefined();
    expect(resultReducer.favouriteVideoItemsId).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
    expect(resultReducer.favouriteVideoItemsId).toBeTruthy();
    const result =
      YOUTUBESelectors.selectFavouriteVideos.projector(resultReducer);
    expect(result).toBeTruthy();
    expect(result).toEqual([
      data.items[0].id.videoId,
      data.items[1].id.videoId,
    ]);
  });

  it('selectPageNumberNext should set nextPageNumber', () => {
    const action = YOUTUBEActions.setNextPage({
      pageToken: '123Ui',
    });
    const resultReducer = youTubeReducer(state, action);
    expect(resultReducer.nextPageNumber).toBeDefined();
    expect(resultReducer.nextPageNumber).toEqual('123Ui');
    expect(resultReducer.nextPageNumber).toBeTruthy();
    const result =
      YOUTUBESelectors.selectPageNumberNext.projector(resultReducer);
    expect(result).toBeTruthy();
    expect(result).toEqual('123Ui');
  });

  it('selectPageNumberPrevious should set  prevPageNumber', () => {
    const action = YOUTUBEActions.setPreviousPage({
      pageToken: '123Ui',
    });
    const resultReducer = youTubeReducer(state, action);
    expect(resultReducer.prevPageNumber).toBeDefined();
    expect(resultReducer.prevPageNumber).toEqual('123Ui');
    expect(resultReducer.prevPageNumber).toBeTruthy();
    const result =
      YOUTUBESelectors.selectPageNumberPrevious.projector(resultReducer);
    expect(result).toBeTruthy();
    expect(result).toEqual('123Ui');
  });
});
