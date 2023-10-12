import { messageReducer } from './addMessagesSlice';

const { configureStore } = require('@reduxjs/toolkit');

let store = configureStore({
	reducer: {
		messageRedx: messageReducer,
	},
});

export default store;
