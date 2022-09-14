import axios from 'axios';
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import { normalize, schema } from 'normalizr';

const defaultChannelId = 1;

const getNormalized = (data) => {
  const message = new schema.Entity('messages');
  const channel = new schema.Entity('channels');
  const { currentChannelId } = data;

  const mySchema = { channels: [channel], messages: [message], currentChannelId };
  return normalize(data, mySchema);
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (headers) => {
    const response = await axios.get(routes.dataPath(), {headers});
    const normalizedData = getNormalized(response);

    return { ...normalizedData.entities, currentChannelId: normalizedData.result.currentChannelId };
  }
);

const channelsAdapter = createEntityAdapter({ selectId: (channel) => channel.id });

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    setChannels(state, action) {
      channelsAdapter.setAll(state, action.payload);
    },
    setCurrentChannelId(state, { payload }) {
      const currentChannelId = payload ?? defaultChannelId;
      state.currentChannelId = currentChannelId;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchChannels.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchChannels.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.setAll(state, channels);
      state.currentChannelId = currentChannelId;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchChannels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;