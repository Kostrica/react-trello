import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../assets/img/add-svgrepo-com.svg";
import { addColumn } from '@asseinfo/react-kanban';

import { Popup } from "../Popup/Popup";

import style from "./RenderColumnAdder.module.scss";

export const RenderColumnAdder = ({ setBoard }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ columnName, setColumnName ] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setColumnName('');
  };

  const hadleSubmit = (event) => {
    event.preventDefault();

    setBoard((prevBoard) => {
      const newColumn = {
        id: Date.now(),
        title: columnName,
        cards: []
      };

      const newBoard = addColumn(prevBoard, newColumn);

      return newBoard;
    });

    handleClose();
  }

  return (
    <>
      <button
        className={style.button}
        onClick={handleOpen}
      >
        <PlusIcon className={style.plusIcon}/>
        Add a new column
      </button>
      <Popup
        isOpen={isOpen}
        title="Add a new column"
        handleClose={handleClose}
      >
        <form className="col s12" onSubmit={hadleSubmit}>
          <div className="input-field">
            <input
              id="column_name"
              type="text"
              value={columnName}
              onChange={(event) => setColumnName(event.target.value)}
            />
            <label htmlFor="column_name">Column Name</label>
          </div>
          <div className="row center">
            <button
              className="btn waves-effect waves-light mh6" type="submit"
              name="action"
            >
              Submit
            </button>
            <button
              className="btn waves-effect grey darken-1 mh6" type="button"
              name="action"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Popup>
    </>
  );
}
