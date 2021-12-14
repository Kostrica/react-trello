import React from "react";

import { ReactComponent as PencilIcon } from "../../assets/img/pencil-svgrepo-com.svg";
import { ReactComponent as RemoveIcon } from "../../assets/img/remove-all-svgrepo-com.svg";

import { Popup } from "../Popup/Popup";

export const Card = ({ content, setBoard }) => {
  const { id, title, description } = content;

  const [ isOpenRenameColumn, setIsOpenRenameColumn ] = useState(false);
  const [ isOpenRemoveColumn, setIsOpenRemoveColumn ] = useState(false);

  const [ cardName, setCardName ] = useState('');
  const [ cardTitle, setCardTitle ] = useState('');

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
    <div className="react-kanban-card">
      <div className="react-kanban-card__title">
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
                value={cardName}
                autoFocus
                onChange={(event) => setCardName(event.target.value)}
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
        {title}
        <div>
          <a href='#' className="tooltipped mh6" data-position="top" data-tooltip="Rename a card"><PencilIcon onClick={() => handleOpen('renameCard')} /></a>
          <a href='#' className="tooltipped mh6" data-position="top" data-tooltip="Remove a card"><RemoveIcon onClick={() => handleOpen('removeCard')} /></a>
        </div>
      </div>
      <div className="react-kanban-card__description">
        {description}
      </div>
    </div>
  );
}
