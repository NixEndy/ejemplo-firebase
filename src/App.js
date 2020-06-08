import React, {useEffect,useState} from 'react';
import {firebase} from './firebase'

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = useState([])
  const [descripcion, setDescripcion] = useState([])
  const [prioridad, setPrioridad] = useState([])
  const [editMode,setEditMode] = useState(false)
  const [todoID,setTodoID] = useState("");
  

  useEffect(()=>{
    
      const getData=async ()=>{
        const db=firebase.firestore()
        try{
          const data=await db.collection('todos').get()
          const arrayData = data.docs.map(doc=>({id:doc.id, ...doc.data()}))
          console.log(arrayData )
          setTodos(arrayData)
        }catch(error){
          console.log(error)
        } 
      }
      getData()
  },[])

  const add=async(e)=>{
      e.preventDefault()
      console.log("ejecuto")
      if(!todo.trim()){
        console.log("sin texto")
        return
      }

      try{
          const db=firebase.firestore()
          const data =await db.collection("todos").add({
            name:todo,
            descripcion: descripcion,
            prioridad: prioridad
          })

          const todoNew={
            name:todo,
            descripcion: descripcion,
            prioridad: prioridad
          }

          setTodos([...todos,{id: data.id,... todoNew}
 ])
          setTodo("")
          setDescripcion("")
          setPrioridad("")
      }catch(error){
          console.log(error)
      }
  }

  const deleteTodo=async(id)=>{
      try{
        const db=firebase.firestore()
        await db.collection("todos").doc(id).delete()

        const todosFilter=todos.filter(item=>item.id!==id)
          setTodos(todosFilter)

      }catch(error){
        console.log(error)
      }
  }

  const edit = async(e) => {
    e.preventDefault()
    
    if(!todo.trim()){
      console.log("sin text")
      return
    }
    console.log(todoID);
    try{
      const db = firebase.firestore()
      await db.collection("todos").doc(todoID).update({
        name:todo,
        descripcion:descripcion,
        prioridad:prioridad
      })
      const arrayEdit = todos.map(item =>(
        item.id === todoID? {id :todoID, name : todo, descripcion : descripcion, prioridad : prioridad} : item
      ))
      setTodos(arrayEdit)
      setTodo("")
      setTodoID("")
      setDescripcion("")
      setPrioridad("")
      setEditMode(false)
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <div className="p-3 border bg-light">
      <h3 className="display-4">
        Editor de lista de tareas
      </h3>
      <p className="lead">
          {
            editMode ? "Editar todo" : "Agregar todo"
          }
        </p>
        <form onSubmit={ editMode ? edit : add} className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <label form="inputText" className="sr-only">Agregar un pendiente</label>
                <input type="text" 
                className="form-control" 
                id="inputText"
                placeholder="Agregar un pendiente" 
                value={todo}
                onChange={e=>setTodo(e.target.value)}
                name="Todo"
                />
            <div>
                  <label form="Descripcion" className="sr-only">Agregar descripcion</label>
                  <input
                  type="text"
                  placeholder="Descripción"
                  onChange={e => setDescripcion(e.target.value)}
                  value={descripcion}
                  className="form-control"
                  id="Descripcion"/>
            </div>
            <div>
               <label form="Prioridad"></label>
                  <select 
                    id="Prioridad"
                    placeholder="Prioridad"
                    onChange={e => setPrioridad(e.target.value)} 
                    value={prioridad}
                    className="form-control">
                      <option value="OPCION">   </option>
                      <option value="Urgente">Urgente</option>
                      <option value="No Urgente">No Urgente</option>
                  </select>
            </div>
                <button type="submit" className="btn btn-outline-success my-2 my-sm-0">{editMode ? "Editar tarea" : "Agregar tarea"} 
                </button>
          </div>
        </form>
        <hr />
        <ul className="list-group" >
           {
          todos.map(todo =>(
            <li className="list-group-item" key={todo.id}>{todo.name}
            <ul className="list-group">
              <li className="list-group-item"><p className="font-weight-bold">Descripcion de la tarea: </p> {todo.descripcion}</li>
              <li className="list-group-item"><p className="font-weight-bold">Prioridad de la tarea: </p>{todo.prioridad}</li>
            </ul>
              <button 
                type="button" className="btn btn-outline-primary" 
                onClick={()=>{deleteTodo(todo.id)}}>Eliminar</button> 
                <button onClick={() => {setTodo(todo.name); setTodoID(todo.id); setEditMode(todo.id); 
                setDescripcion(todo.descripcion); setPrioridad(todo.prioridad)}} className="btn btn-outline-primary my-2 my-sm-0"
                style={{margin:20}}>Editar
              </button>
            </li>
             ))
           }
        </ul>
    </div>
  );
}

export default App;
