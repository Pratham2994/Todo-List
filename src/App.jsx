import { useState, useRef, useEffect } from 'react'
import Nav from './components/Nav'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])



  const hanldechange = (e) => {
    settodo(e.target.value)
  }
  const saveTLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    saveTLS()
  }

  const changeval = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos)
    saveTLS()
  }


  const handleEdit = (e, id) => {
    let todoo = todos.filter(item => {
      return item.id === id
    })
    settodo(todoo[0].todo)
    let newtodos = todos.filter(item => {
      return item.id != id;
    })
    settodos(newtodos)
    saveTLS()
  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id != id;
    })
    settodos(newtodos)
    saveTLS()
  }
  return (
    <>
      <div className='container'>
        <Nav />
        <div className='mx-auto box '>
          <input type='text' onChange={hanldechange} value={todo} placeholder='Enter Task' className='in my-7' />
          <button type='submit' onClick={handleAdd} className='b1'>Save</button>
          <div className='todocontainer'>
            {todos.length === 0 && <div className='mx-12 text-white '><h1 className='text-4xl'> No Todos Yet </h1></div>}
            {todos.map(item => {
              return <div key={item.id} className="todo flex justify-between ">
                <div className='flex'>
                  <input class="checkbox__input" type="checkbox" id="myCheckbox01" name={item.id} value={item.iscompleted} onChange={changeval} />
                  <span class="checkbox__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                      <rect width="27" height="25" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3"></rect>
                      <path class="tick" stroke="#6EA340" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9"></path>
                    </svg>
                  </span>


                  <div className={item.iscompleted ? "line-through text " : "text"}>{item.todo} </div>
                </div>


                <div className="buttons2">

                  <button onClick={(e) => handleEdit(e, item.id)} className='editt'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z" /></svg></button>
                  <button onClick={(e) => handleDelete(e, item.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z" /></svg></button>

                </div>
              </div>
            })}
          </div>
        </div>


      </div>

    </>
  )
}

export default App
