import { createStore } from "redux";

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul')
const ADD = "ADD";
const DELETE = "DELETE"

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD :
            return [{text: action.text, id: Date.now()}, ...state];
        case DELETE : 
            return state.filter(todo => todo.id !== Number(action.id))
        default :
            return state;
    }
}

const addTodo = (text) => {
    store.dispatch({type: ADD, text: text})
}

const deleteTodo = (e) => {
    const id = e.target.parentNode.id;
    store.dispatch({type:DELETE, id})
}

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerText =""
    toDos.forEach(todo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", deleteTodo)
        li.id = todo.id;
        li.innerText = todo.text;
        li.appendChild(btn)
        ul.appendChild(li)
    })
}

const store = createStore(reducer)

const onSubmit = (e) =>{
    e.preventDefault();
    const toDo = input.value
    addTodo(toDo)
    input.value=""
}

store.subscribe(paintToDos)
form.addEventListener('submit', onSubmit)