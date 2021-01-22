import React, { useState } from 'react';
import './ToDo-styles/main.css';
import deleteImg from '../img/delete-icon.png';

function Todo() {
    const [valueInput, inputReset, methodInput] = useInput('');
    let [list, setList] = useState({
        inputText: window.localStorage.getItem('inputText') ? JSON.parse(window.localStorage.getItem('inputText')) : []
    });

    function useInput(initialValue){
        const [value, setValue] = useState(initialValue);
        const reset = () => {
            setValue(initialValue);
        }
        const bind = {
            value,
            onChange:e => {
                setValue(e.target.value);
            }
        }

        return [value, reset, bind];
    }

    function handleForm(e) {
        e.preventDefault();
        if (valueInput[0] === ' ') {
            alert('The first character of the input field cannot be a space!');
            return;
        }
        if (!valueInput) {
            alert('You cannot add an empty field!');
            return;
        }
        let inputData = {
            id: list.inputText.length,
            inputText: valueInput,
            checked: false
        }

        setList((prev) => list = {
            inputText: [...prev.inputText, inputData]
        });
        inputReset();
    }

    function checkedItem(id) {
        list.inputText.map((el) => {
            if (el.id === id) {
                el.checked = !el.checked;
                return el;
            }
            return el;
        })
        setList(list={inputText:[...list.inputText]});
    }

    function deleteItem(id) {
        setList(() => list = {
            inputText: list.inputText.filter((el) => {
                return el.id !== id;
            })
        });
        window.localStorage.removeItem('inputText')
    }

    return (
        <div className='wrapper'>
            <form onSubmit={handleForm} >
                <input {...methodInput} id="input" />
                <button type='submit'>Add Item</button>
                <ul>
                    {
                        list.inputText.map((el) => {
                            //storage - sending items from "inputText" in local storage
                            const inputText = [...list.inputText];
                            window.localStorage.setItem('inputText', JSON.stringify(inputText));

                            if (el.checked) {
                                return (
                                    <>
                                        <div className="item-checked" key={el.id}>
                                            <li className="listItmText" onClick={() => checkedItem(el.id)}>
                                                {el.inputText}
                                            </li>
                                            <span className="delete-btn" onClick={() => deleteItem(el.id)}>
                                                {/*empty tags for vertical centering "delete btn"*/}
                                                <b></b> <img className="delete-img" src={deleteImg} alt="Delete item"/> <b></b>
                                            </span>
                                        </div>
                                        <hr />
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <div className="item-todo" key={el.id}>
                                            <li className="listItmText" onClick={() => checkedItem(el.id)}>
                                                {el.inputText}
                                            </li>
                                            <span className="delete-btn" onClick={() => deleteItem(el.id)}>
                                                <b></b> <img className="delete-img" src={deleteImg} alt="Delete item"/> <b></b>
                                            </span>
                                        </div>
                                        <hr />
                                    </>
                                )
                            }
                        })
                    }
                </ul>
            </form>
        </div>
    );
}

export default Todo;