import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

import './AuthPage.scss'

const AuthPage = () => {
  const initForm = {
    email: '',
    password: ''
  }

  const history = useHistory()
  const { login } = useContext(AuthContext)

  const [form, setForm] = useState(initForm)

  const changeHandler = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const registerHandler = async () => {
    try {
      await axios.post('/api/auth/registration', { ...form }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      history.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  const loginHandler = async () => {
    try {
      await axios.post('/api/auth/login', { ...form }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          const { token, userId: id } = res.data
          login(token, id)
          console.log(res)
        })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          <div className='container'>
            <div className="auth-page">
              <Route path='/login'>
                <h3>Sign in to your account</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type='email'
                        name='email'
                        className='validate'
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type='password'
                        name='password'
                        className='validate'
                        onChange={changeHandler}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className='wawes-effect wawes-light btn'
                      onClick={loginHandler}
                    >
                      Sign in
                    </button>
                    <Link to="registration" className="btn-outline btn-reg">Don't have an account?</Link>
                  </div>
                </form>
              </Route>
              <Route path='/registration'>
                <h3>Create an account</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type='email'
                        name='email'
                        className='validate'
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type='password'
                        name='password'
                        className='validate'
                        onChange={changeHandler}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className='wawes-effect wawes-light btn'
                      onClick={registerHandler}
                    >
                      Registration
                    </button>
                    <Link to="login" className="btn-outline btn-reg">Have an account?</Link>
                  </div>
                </form>
              </Route>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  )
}

export default AuthPage