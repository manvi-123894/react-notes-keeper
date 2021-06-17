import React from 'react';
import {useGlobalContext} from './context'
import Notes from './Notes'

const NoteContainer = () => {


 const {showModal,filteredArray} = useGlobalContext();

 return (
   <div className={`app-note-area ${showModal ? "transparent" : ""}`}>
      {
      filteredArray.length === 0 ? <h1 className="app-note-area-heading">  Your Notes <br /> will appear here.</h1>  : (
       <div className="app-note-area-container">
        {
           filteredArray.map((note) => {
           return (
            <Notes {...note} key={note.id}/>
           )
         })
        }
       </div>
      )
      }
   </div>
 );
}

export default NoteContainer;