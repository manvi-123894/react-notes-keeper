import React, { useContext, useState, useReducer, useEffect } from 'react'
import { reducer} from './reducer'
import { useLocalStorage} from './useLocalStorage'

const AppContext = React.createContext();

const initialState = {
 showModal : false,
 showNav : false,
 cautionContent : {
  value : false,
  type : "",
  message : ""
 },
 notesArray : []
}

const AppProvider = ({children}) => {
 const [state, dispatch] = useReducer(reducer, initialState);
 const [isEditing,setIsEditing] = useState(false);
 const [details,setDetails] = useState({ subject : "", title : "", notes : "" });
 const [editId, setEditId] = useState(null);
 const [filteredArray,setFilteredArray] = useState([]);
 const [searchArray,setSearchArray] = useState([]);


useEffect(() => {
    dispatch({type : "SET_ITEM", payload : useLocalStorage});
    setFilteredArray([...state.notesArray]);
}, []);

useEffect(() => {
    localStorage.setItem('notes-array',JSON.stringify(state.notesArray));
    setFilteredArray([...state.notesArray]);
}, [state.notesArray]);

const subjectArray = ["All",...new Set( state.notesArray.map(note => note.subject) )];


const handleSubmit =(e) => {
    e.preventDefault();
    if(!details.subject || !details.title || !details.notes){
    showCaution(true,"fail", "Please fill all the fields !!")
    }else if(isEditing && details.subject && details.title && details.notes){
        const newItem = {
            id : new Date().getTime().toLocaleString(),
            ...details
        }
    dispatch({type : "UPDATE_NOTE",payload : { newItem, editId}});
    showCaution(true,"success","Your Note is Updated.")
    setIsEditing(false);
    setEditId(null);
    setDetails({
        subject : "", title : "", notes : ""
    });
    }else{
    showCaution(true,"success","Your Note is added.")
    const newItem = {
    
    id : new Date().getTime().toLocaleString(),
    ...details
    }
    dispatch({type : "ADD_NOTE", payload : newItem});
    setDetails({
        subject : "", title : "", notes : ""
    });
    }
}

 const handleDelete = (id) => {
    showCaution(true,"fail","Your Item is deleted");
    dispatch({type : "DELETE_NOTE",payload : id});
 }

 const handleEdit = (id) => {
    setIsEditing(true);
    setEditId(id);
    const editableItem = state.notesArray.find( note => note.id === id);
    setDetails(
        {
            subject : editableItem.subject,
            title : editableItem.title,
            notes : editableItem.notes
        }
    );
    dispatch({type : "TOGGLE_MODAL"});
 }

 const showCaution = (value=false,type="",message="") => {
  dispatch({type : "TOGGLE_CAUTION", payload : { value, type, message }})
 }

 const filterArray = (e) => {
    console.log(state.notesArray);
    const currentSubject = e.target.innerText.toLowerCase();
    let newItems = [...state.notesArray];
    console.log(newItems);
    switch (currentSubject) {
        case 'all':
            setFilteredArray(newItems);
            break;
    
        default:
            newItems = state.notesArray.filter(note => note.subject.toLowerCase() === currentSubject);
            setFilteredArray(newItems);
            break;
    }
    dispatch({type: "TOGGLE_NAV"})
 }

 const searchFilter = (search) => {
    const searchTerm = search.toLowerCase();

    const newItems = state.notesArray.filter(note =>  {
        
    if(note.title.toLowerCase().includes(searchTerm) || note.subject.toLowerCase().includes(searchTerm) || note.notes.toLowerCase().includes(searchTerm) ){
        return note;
    }
        
    });
    if(newItems.length)
        setFilteredArray(newItems);
}

 return (
  <AppContext.Provider value={ {...state, dispatch,details, setDetails,handleSubmit,showCaution,handleDelete,handleEdit,filteredArray,subjectArray, filterArray, searchFilter,searchArray}}>
   {children}
  </AppContext.Provider>
 )
}

const useGlobalContext = () => {
 return useContext(AppContext);
}

export {useGlobalContext, AppProvider};