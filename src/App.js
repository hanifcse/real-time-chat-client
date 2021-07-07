import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import './App.css';
import { FaTelegramPlane } from 'react-icons/fa';

const socket = io('http://localhost:7000')
const userName = 'User ' + parseInt(Math.random() * 10)
function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message', { userName, message })
    setMessage('')
  };
  return (
    <div className="main-container text-white m-auto my-5">
      <div className="row">
        <div className="col">
          <div className="row welcome-container py-5">
            <div className="col">
              <h5 className="text-center">Welcome to Ehsan Marketing</h5>
            </div>
          </div>
          <div className="row chat-container ps-3">
            <div className="col">
              {chat.map((payload, index) => {
                return (
                  <p key={index}>{payload.userName}: <span>{payload.message}</span></p>
                )
              })}
            </div>
          </div>
          <div className="row m-auto py-3">
            <div className="col">
              <form onSubmit={sendMessage} className="d-flex">
                <input type="text" name="message"
                  placeholder='Type message'
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }}
                  required
                  className="form-control"
                ></input>
                <button className="btn btn-lg btn-info px-4 d-flex align-items-center ms-2" type='submit'><span className="me-2">Send</span> <FaTelegramPlane /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
