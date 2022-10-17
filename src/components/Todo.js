import React, {   useState } from 'react'

const Todo = (props) => {
  const { todo, setYapilacaklarDizisi, yapilacaklarDizisi, setText, text} = props
    const [isEdit, setIsEdit] = useState(false)
    const [editText, setEditText]=useState(todo.text)

    

    const handleBtn = item =>{
        const updateArray=[]
        const update=yapilacaklarDizisi.filter((element,index) => {
            if(element.id===todo.id){
                element.isDone=!element.isDone
            }
                updateArray.push(element)
        });  
        setYapilacaklarDizisi(updateArray)
        localStorage.setItem('yapilacaklarDizisi',JSON.stringify(updateArray))
    }

    const handleEditBtn = ()=>{
        setIsEdit(!isEdit)
        if (editText) {
            setEditText(todo.text)
        }
    }

    const updatedSaveEdit = (item) => {
      yapilacaklarDizisi.filter(item=>{
        if (item.id===todo.id) {
          item.text=editText
        }
      }) 
      // setYapilacaklarDizisi(yapilacaklarDizisi)
      localStorage.setItem('yapilacaklarDizisi',JSON.stringify(yapilacaklarDizisi))
    }

    const handleDelete = () => {
        const removed=yapilacaklarDizisi.filter((item,index)=>item.id!==todo.id)
        setYapilacaklarDizisi(removed)
        localStorage.setItem('yapilacaklarDizisi',JSON.stringify(removed))
    }

  return (
    <div key={todo.id} className={`alert alert-${todo.isDone ? 'success':'secondary'} d-flex justify-content-between align-items-center`}>
              <div>
                {
                    isEdit === false ? 
                        <h1 className={`${todo.isDone ? 'text-decoration-line-through' : ''}`}>{todo.text}</h1>
                    :
                    <div className='input-group m-2'>
                        <input type='text' className='form-control' value={editText} onChange={e=>setEditText(e.target.value)}/>
                        <button className='btn btn-warning' onClick={updatedSaveEdit}>Save</button>
                    </div>
                }
                <p>{todo.createdAt}</p>
              </div>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success" onClick={handleBtn}>
                  {
                    todo.isDone ? 'UnDone' : 'Done'
                  }
                </button>
                <button type="button" className="btn btn-light" onClick={handleEditBtn}>
                  {
                    isEdit ? 'Cancel' : 'Edit'
                  }
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
  )
}

export default Todo