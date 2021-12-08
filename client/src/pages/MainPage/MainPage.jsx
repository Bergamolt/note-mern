import './MainPage.scss'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

import axios from 'axios'

import Cards from '../../components/Cards'

export default function MainPage() {
  const { userId } = useContext(AuthContext)

  const [ text, setText ] = useState('')

  const [ editId, setEditId ] = useState('')

  const [ notes, setNotes ] = useState([])

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
  }, [])

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
            res.data,
            ...notes,
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

  const editNote = useCallback(async () => {
    if (!text) return

    try {
      await axios.put(`/api/note/edit/`, { id: editId, text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          setEditId('')
          setText('')
          getNote([ ...notes, response.data ])
        })
    } catch (error) {
      console.log(error)
    }
  }, [ getNote, editId, text ])

  const onEdit = (text, id) => {
    setText(text)
    setEditId(id)
  }

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
              onClick={ !editId ? createNote : editNote }
            ><i className="material-icons left">save</i>
              { !editId ? 'Add Note' : 'Save Note' }
            </button>
          </div>
        </form>
        <h3>My Notes</h3>
        <Cards notes={ notes } onDelete={deleteNote} onEdit={onEdit} />
      </div>
    </div>
  )
}