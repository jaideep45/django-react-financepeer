import logo from './logo.svg';
import './App.css';
import { readFile } from './utils';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedin,setLoggedin] = useState(false);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  const getCookie =  function(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          let cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  const handleChangeUser = function(e) {
    setUser(e.target.value);
  }

  const handleChangePass = function(e) {
    setPass(e.target.value);
  }

  const handleSubmit = function(e){
    e.preventDefault();
    fetch("/basic/login/",{
      body: JSON.stringify({
        username: user,
        password: pass,
    }),
      method: 'POST',
      headers:{
        'X-CSRFToken': getCookie('csrftoken')
      }
    }).then((resp)=>{resp.json().then((r)=>{
      console.log(r);
      if (r.result=='failure'){
        setLoginMessage(r.message);
      }else if(r.result=='success'){
        setLoggedin(true);
      }
    })});
  }

  let buildEntries = function () {
    fetch('/basic/fetch-all/?format=json')
      .then((resp) => {resp.json().then((res) => {
        setEntries(res);
      });})
  }

  const inputFileRef = useRef();
  useEffect(() => {
    buildEntries();
  }, [])

  const handleFileSelector = (event) => {
    const upload = function(b){
      fetch("basic/upload/",{
        body: b,
        method: 'POST'
      }).then((resp)=>{resp.json().then((r)=>{setMessage(r.message);buildEntries()})});
    }

    console.log(event);
    readFile(event.target.files[0]).then((resp) => upload(resp)).finally(() => {
      inputFileRef.current.value = null;
    });
  }

  useEffect(() => {
    // const fileSelector = inputFileRef.current;
    if (isLoggedin){
      inputFileRef.current.addEventListener('change', handleFileSelector);
      return () => { inputFileRef.current.removeEventListener('change', handleFileSelector); }  
    }
    // fileSelector.addEventListner('change', handleFileSelector);
    // return fileSelector.removeEventListener('change', handleFileSelector);
  }, [])

  const handleFileClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="App">
      {!isLoggedin && <div className='login-screen'>
      <form className='auth' onSubmit={handleSubmit} style={{width:'300px'}}>
        <label style={{textAlign:'left'}}>Username</label>
        <input type="text" value={user} onChange={handleChangeUser} style={{height:'32px'}}/>
        <label style={{textAlign:'left',marginTop:'8px'}}>Password</label>
        <input type="password" value={pass} onChange={handleChangePass} style={{height:'32px'}}/>
        <input type="submit" value="Log in" style={{height:'48px',marginTop:'16px'}}/>
      </form>
        <div className='login-message' style={{marginTop:"24px"}}>{loginMessage}</div>
      </div>}
      {isLoggedin && <div className='content'>
      <div className='header'> <div className='title'>Entries</div>
        <button className='but' onClick={() => handleFileClick()} >Upload JSON</button> 
        <input ref={inputFileRef} type='file' hidden accept='json' />
      </div>
      {message!='' && <div className='message'>{message}</div>}
      <table className = "table">
        <thead className = "thead">
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody className = "tbody">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.userId}</td>
              <td>{entry.title}</td>
              <td>{entry.body}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>}
    </div>
  );
}

export default App;
