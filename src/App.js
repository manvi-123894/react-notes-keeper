import React, { useState } from 'react'
import Modal from './Modal.js'
import './App.css'
import {useGlobalContext} from './context'
import Navbar from './Navbar'
import Caution from './Caution'
import NoteContainer from './NoteContainer'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SingleNote from './SingleNote'

const App = () => {

 const {showModal,notesArray,cautionContent,filteredArray,searchArray} = useGlobalContext();
 
 return (
 <Router>
    <section className="app-main">
    {showModal && <Modal />}
    <Navbar />
    { cautionContent.value && 
    (
      <div className="caution-div">
        <Caution />
      </div>
    )
    }
    <Switch> 
      <Route path="/" exact component={NoteContainer}/>
      <Route path="/:id" exact component={SingleNote} /> 
    </Switch>
  </section>
 </Router>


 );
}

export default App;