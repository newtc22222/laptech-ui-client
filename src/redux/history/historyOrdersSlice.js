import { createSlice } from '@reduxjs/toolkit';

export const historyOrders = createSlice({
    name: 'historyOrders',
    initialState: {
        historyOrder: {
            data: [],
            cancel: [],
            complete: [],
            delivering: [],
        },
    },

    reducers: {
        getHistoryOrder: (state, action) => {
            state.historyOrder.data = action.payload.data;
        },
        getCancel: (state, action) => {
            state.historyOrder.cancel = action.payload.data;
        },
        getComplete: (state, action) => {
            state.historyOrder.complete = action.payload.data;
        },
        getDelivering: (state, action) => {
            state.historyOrder.delivering = action.payload.data;
        },
    },
});
export const { getHistoryOrder, getCancel, getComplete, getDelivering } = historyOrders.actions;
export default historyOrders.reducer;
