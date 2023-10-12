import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export let sendMessage = createAsyncThunk(
	'messages/sendMessage',
	async ({ messageContent, receivedId }) => {
		try {
			const response = await axios.post(
				'https://sara7aiti.onrender.com/api/v1/message',
				{
					messageContent,
					receivedId,
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export let getMessages = createAsyncThunk(
	'messages/getMessages',
	async function () {
		let { data } = await axios.get(
			'https://sara7aiti.onrender.com/api/v1/message',
			{
				headers: { token: localStorage.getItem('userToken') },
			}
		);
		console.log(data, 'dd');

		return data;
	}
);

let initialState = { messages: null, data: [] };
let messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.messages = action.payload;
		});
		builder.addCase(getMessages.fulfilled, (state, action) => {
			state.data = action.payload;
			console.log(state.data, 'sr');
		});
	},
});

export let messageReducer = messageSlice.reducer;
