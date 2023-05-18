import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todo,setTodo] = useState([]);
  const [check, setCheck] = useState(true);
  const [btnstatus, setBtnStatus] = useState(true);
  const [inputValue,setInputValue] = useState('');
  const [updateIndex,setUpdateIndex] = useState('');

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((res)=>{
      setTodo(res.data);
    })
    .catch((error)=>{
      console.error(error);
      alert(error.message);
    })
  },[]);

  const checkUnCheckTodo = (completed,index) => {
    if (completed == true) {
      todo[index].completed = false;
      setCheck(false);
      setTodo(todo);
    } else {
      todo[index].completed = true;
      setCheck(true);
      setTodo(todo);
    }
  }

  const deleteTodo = (index) => {
      let temp = [...todo];
      temp.splice(index,1);
      setTodo(temp);
  }

  const editTodo = (value,index) => {
    setBtnStatus(false);
    setInputValue(value.title);
    setUpdateIndex(index);
  }

  const updateTodo = (index) => {
      let temp = [...todo];
      temp[index].title = inputValue;
      setTodo(temp);
      setBtnStatus(true);
      setInputValue('');
      setUpdateIndex('');
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const addTodo = () => {
    let temp = [...todo];
    let newData = {
      "userId": temp.length+1,
      "id": temp.length+1,
      "title": inputValue,
      "completed": false
      };
    temp.push(newData);
    setTodo(temp);
  }


  return (
    <div className="App">
    {btnstatus ? 
    <div><input type='text' onChange={handleInputChange}/>
    <input type='submit'  value='add' onClick={()=>{addTodo()}}/></div> 
    : 
    <div><input type='text' value={inputValue} onChange={handleInputChange}/>
    <input type='submit'  value='update' onClick={()=>{updateTodo(updateIndex)}}/></div>}
    <br/>
    <br/>
      {
        todo.map((value,index)=>(
          <div key={index}>
          {value.title}
          {value.completed ? <input type="checkbox" defaultChecked={check} onClick={() => { checkUnCheckTodo(true, index) }} /> : <input type="checkbox" onClick={() => { checkUnCheckTodo(false, index) }} />}
          <button onClick={()=>{editTodo(value,index)}}>Edit</button>
          <button onClick={()=>{deleteTodo(index)}}>Delete</button>
          </div>
        )).reverse()
      }
    </div>
  );
}

export default App;
