import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import TransitionGroup from "react-transition-group/TransitionGroup";

const SingleBooking = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([].map((text, id) => ({ id, text })));
  const [id, setId] = useState(todos.length);

  const groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };

  const add = (event) => {
    event.preventDefault();
    const newTodo = { id, text: todo || "-" };
    setId(id + 1);
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const remove = (event) => {
    const itemId = +event.currentTarget.getAttribute("data-id");
    setTodos(todos.filter((item) => item.id !== itemId));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setTodo(value);
  };

  return (
    <form onSubmit={add} autoComplete="off">
      <div className="">
        <div className="">
          <input
            type="text"
            className="form-control"
            id="todoField"
            placeholder="Todo item"
            name="todo"
            value={todo}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button
              onClick={add}
              className="btn btn-outline-success"
              type="button"
            >
              Add Item
            </button>
          </div>
        </div>
        <small id="emailHelp" className="form-text text-muted">
          Item Count: {todos.length}
        </small>
      </div>
      <div className="col-12 mb-2">
        <TransitionGroup {...groupProps}>
          {todos.map((item) => (
            <Fade key={item.id} collapse bottom>
              <div className="card">
                <div className="card-body justify-content-between">
                  {item.text}
                  <button
                    data-id={item.id}
                    onClick={remove}
                    type="button"
                    className="close"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </TransitionGroup>
      </div>
    </form>
  );
};

export default SingleBooking;
