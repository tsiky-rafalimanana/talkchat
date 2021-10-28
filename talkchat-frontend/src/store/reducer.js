export const StoreActions = {
    SET_CURRENT_CHANNEL_ID: 'SET_CURRENT_CHANNEL_ID',
}
const Reducer = (state, action) => {
  switch (action.type) {
      case 'SET_CURRENT_CHANNEL_ID':
          return {
              ...state,
              currentChannelId: action.payload
          };
      default:
          return state;
  }
};

export default Reducer;