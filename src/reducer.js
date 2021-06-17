export const reducer = (state,action) => {
 if(action.type === "SET_ITEM"){
  return {
   ...state,
   notesArray : action.payload()
  }
 }

 if(action.type === "TOGGLE_NAV"){
  return {
   ...state,
   showNav : !(state.showNav)
  }
 }
 if(action.type === "TOGGLE_MODAL"){
  return {
   ...state,
   showModal : !(state.showModal)
  }
 }
 if(action.type === "TOGGLE_CAUTION"){
  return {
   ...state,
   cautionContent : {
    value : action.payload.value,
    type : action.payload.type,
    message : action.payload.message
   }
  }
 }

 if(action.type === "ADD_NOTE"){
  return {
   ...state,
   notesArray : [...state.notesArray,action.payload],
   showModal : !(state.showModal)
  }
 }
 if(action.type === "DELETE_NOTE"){
  const newItem = state.notesArray.filter( note => note.id !== action.payload);
  return {
   ...state,
   notesArray : newItem
  };
 }

 if(action.type === "UPDATE_NOTE"){
    const newItems = state.notesArray.map(note => {
        if(note.id!== action.payload.editId)
            return note;

        return action.payload.newItem 
    })
    return {
        ...state,
        notesArray : newItems,
        showModal : !(state.showModal)
    }
 }

 throw new Error("No Matching Type");
}