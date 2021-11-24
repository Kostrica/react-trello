import React, { useState, useCallback } from "react";

import Board, { moveCard, moveColumn } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { RenderColumnAdder } from "../RenderColumnAdder/RenderColumnAdder";
import { ColumnHeader } from "../ColumnHeader/ColumnHeader";

const initialBoard = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column'
        },
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns'
        },
      ]
    }
  ]
};

export const TrelloBoard = () => {
  const [ board, setBoard ] = useState(initialBoard);

  const handleCardMove = useCallback((_, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  }, [board]);

  const handleColumnMove = useCallback((_, source, destination) => {
    const updatedBoard = moveColumn(board, source, destination);
    setBoard(updatedBoard);
  }, [board])

  return (
    <Board
      renderColumnAdder={() => <RenderColumnAdder setBoard={setBoard} />}
      renderColumnHeader={(column) => <ColumnHeader column={column} setBoard={setBoard} />}
      allowAddColumn
      onCardDragEnd={handleCardMove}
      onColumnDragEnd={handleColumnMove}
      allowRenameColumn
      allowRemoveColumn
    >
      {board}
    </Board>
  );
}
