import React, { useState } from "react";
import { addCard } from '@asseinfo/react-kanban';

import { ReactComponent as RemoveIcon } from "../../assets/img/remove-all-svgrepo-com.svg";
import { ReactComponent as PlusIcon } from "../../assets/img/add-svgrepo-com.svg";
import { ReactComponent as PencilIcon } from "../../assets/img/pencil-svgrepo-com.svg";

import { Popup } from "../Popup/Popup";

import styles from "./ColumnHeader.module.scss";

export const ColumnHeader = ({ column, setBoard }) => {
  const { id, title } = column;

  const [ isOpenRenameColumn, setIsOpenRenameColumn ] = useState(false);
  const [ isOpenAddCard, setIsOpenAddCard ] = useState(false);
  const [ isOpenRemoveColumn, setIsOpenRemoveColumn ] = useState(false);

  const [ columnName, setColumnName ] = useState('');
  const [ cardTitle, setCardTitle ] = useState('');
  const [ descriptionTitle, setDescriptionTitle ] = useState('');

  const handleOpen = (identifier) => {
    if (identifier === 'renameColumn') {
      setIsOpenRenameColumn(true);
      setColumnName(title);
    }

    if (identifier === 'addCard') {
      setIsOpenAddCard(true);
    }

    if (identifier === 'removeColumn') {
      setIsOpenRemoveColumn(true);
    }
  };

  const handleClose = () => {
    setIsOpenRenameColumn(false);
    setIsOpenAddCard(false);
    setIsOpenRemoveColumn(false);
    setCardTitle('');
    setColumnName('');
    setDescriptionTitle('');
  };

  const hadleSubmit = (event, identifier) => {
    event.preventDefault();

    if (identifier === 'renameColumn') {
      setBoard((prevBoard) => {
        const inColumn = prevBoard.columns.find(column => column.id === id);

        inColumn.title = columnName;

        const indexColumn = prevBoard.columns.findIndex(column => column.id === id);

        const newColumns = prevBoard.columns;

        newColumns.splice(indexColumn, 1, inColumn);
  
        const newBoard = {
          columns: newColumns,
        };
  
        return newBoard;
      });
    }

    if (identifier === 'addCard') {
      setBoard((prevBoard) => {
        const inColumn = { id };
  
        const newCard = {
          id: Date.now(),
          title: cardTitle,
          description: descriptionTitle,
        }
  
        const newBoard = addCard(prevBoard, inColumn, newCard);
  
        return newBoard;
      });
    }

    if (identifier === 'removeColumn') {
      setBoard((prevBoard) => {
        const indexColumn = prevBoard.columns.findIndex(column => column.id === id);

        const newColumns = prevBoard.columns;

        newColumns.splice(indexColumn, 1);
  
        const newBoard = {
          columns: newColumns,
        };
  
        return newBoard;
      });
    }

    handleClose();
  }

  return (
    <header className={styles.header}>
      <Popup
        isOpen={isOpenRenameColumn}
        title="Rename a column"
        handleClose={handleClose}
      >
        <form className="col s12" onSubmit={(event) => hadleSubmit(event, 'renameColumn')}>
          <div className="input-field">
            <input
              id="column_title"
              className="autocomplete"
              type="text"
              value={columnName}
              autoFocus
              onChange={(event) => setColumnName(event.target.value)}
            />
            <label htmlFor="column_title">Column Name</label>
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
      <Popup
        isOpen={isOpenAddCard}
        title="Add a new card"
        handleClose={handleClose}
      >
        <form className="col s12" onSubmit={(event) => hadleSubmit(event, 'addCard')}>
          <div className="input-field">
            <input
              id="card_title"
              className="autocomplete"
              type="text"
              value={cardTitle}
              onChange={(event) => setCardTitle(event.target.value)}
            />
            <label htmlFor="card_title">Card title</label>
          </div>
          <div className="input-field">
            <input
              id="card_description"
              type="text"
              value={descriptionTitle}
              onChange={(event) => setDescriptionTitle(event.target.value)}
            />
            <label htmlFor="card_description">Card description</label>
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
      <Popup
        isOpen={isOpenRemoveColumn}
        title="Remove a column"
        handleClose={handleClose}
      >
        <form className="col s12" onSubmit={(event) => hadleSubmit(event, 'removeColumn')}>
           <div className={styles.question}>
              Are you sure you want to delete the column?
            </div>
          <div className="row center">
            <button
              className="btn waves-effect waves-light mh6" type="submit"
              name="action"
            >
              Remove
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
      {title}
      <div>
        <a href='#' className="tooltipped mh6" data-position="top" data-tooltip="Rename a column"><PencilIcon onClick={() => handleOpen('renameColumn')} /></a>
        <a href='#' className="tooltipped mh6" data-position="top" data-tooltip="Add a card"><PlusIcon onClick={() => handleOpen('addCard')} /></a>
        <a href='#' className="tooltipped mh6" data-position="top" data-tooltip="Remove a column"><RemoveIcon onClick={() => handleOpen('removeColumn')} /></a>
      </div>
    </header>
  );
}
