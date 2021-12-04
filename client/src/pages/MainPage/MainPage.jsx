import './MainPage.scss'
import 'react-quill/dist/quill.snow.css'

import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'

import { AuthContext } from '../../context/AuthContext'

import axios from 'axios'

import MyModal from '../../components/modal'
import Cards from '../../components/Cards';

export default function MainPage() {
  const {userId} = useContext(AuthContext)

  const [ text, setText ] = useState('')

  const [ notes, setNotes ] = useState([])

  const [ content, setContent ] = useState('')

  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const getNote = useCallback(async () => {
    try {
      await axios.get('api/note', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          userId
        }
      })
        .then(res => setNotes(res.data))
    } catch (error) {
      console.log(error)
    }
  }, [ userId ])

  useEffect(async () => {
    await getNote()
  }, [ getNote ])

  const createNote = useCallback(async () => {
    if (!text) return
    try {
      await axios.post('api/note/add', {
        text,
        userId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          setNotes([
            ...notes,
            res.data
          ])
          setText('')
        })
    } catch (error) {
      console.log(error)
    }
  }, [ text, userId, notes ])

  const deleteNote = useCallback(async (id) => {
    try {
      await axios.delete(`/api/note/delete/${ id }`, {id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => getNote())
    } catch (error) {
      console.log(error)
    }
  }, [ getNote ])

  const openModal = () => setModalIsOpen(!modalIsOpen)

  const openContent = (value) => {
    openModal()
    setContent(value)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setContent('')
  }

  const test = (text) => setText(text)

  return (
    <div className="container">
      <div className="main-page"></div>
      <h4>Add Note</h4>
      <div className="row">
        <form className="col s12" onSubmit={ e => e.preventDefault() }>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                style={ {whiteSpace: 'pre-wrap'} }
                value={text}
                onChange={ (e) => setText(e.target.value) }
              ></textarea>
              <label htmlFor="textarea1">Textarea</label>
            </div>
          </div>
          <div className="row">
            <button
              className="wawes-effect wawes-light btn"
              onClick={ createNote }
            ><i className="material-icons left">save</i>
              Add Note
            </button>
          </div>
        </form>
        <h3>My Notes</h3>
        <Cards notes={ notes } onDelete={deleteNote} onEdit={test} />
        <MyModal modalIsOpen={ modalIsOpen } closeModal={ closeModal } content={ content }/>
      </div>
    </div>
  )
}