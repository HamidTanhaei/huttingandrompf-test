import actionsList from './actionsList'
export const setText = (text) => ({type: actionsList.SET_TEXT, text});
export const removeText = () => ({type: actionsList.REMOVE_TEXT});
