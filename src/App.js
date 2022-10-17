import React, { useEffect, useState } from "react";
import Todo from './components/Todo'
function App() {
  const [text, setText] = useState("");
  const [yapilacaklarDizisi, setYapilacaklarDizisi] = useState([]);

   useEffect(()=>{
    const fromLocaleStorage=localStorage.getItem('yapilacaklarDizisi')
    console.log(fromLocaleStorage);
    if(fromLocaleStorage === null){
      localStorage.setItem('yapilacaklarDizisi',JSON.stringify([]))
    }else{
      setYapilacaklarDizisi(JSON.parse(fromLocaleStorage));
    }
   },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text === "") {
      alert("Please Enter Todo");
      return;
    }
    const todo = {
      id: new Date().getTime(),
      text,
      isDone: false,
      createdAt: new Date().toLocaleDateString(),
    };
    setYapilacaklarDizisi([...yapilacaklarDizisi, todo]);
    localStorage.setItem('yapilacaklarDizisi',JSON.stringify([...yapilacaklarDizisi, todo]))
    setText('')
  };

  return (
    <div className="container m-5">
      <h1 className="m-5 text-center">My Todo List</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="Type your todo"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className="btn btn-info" type="submit" id="button-addon2">
            Button
          </button>
        </div>
      </form>
      <div>
        {yapilacaklarDizisi.length ? (
          yapilacaklarDizisi.map((todo) => (
            <Todo key={todo.id} todo={todo} setYapilacaklarDizisi={setYapilacaklarDizisi} yapilacaklarDizisi={yapilacaklarDizisi} text={text} setText={setText}/>
          ))
        ) : (
          <p className="text-center p-5">You don't type your todo yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
