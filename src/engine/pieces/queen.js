import Piece from './piece';
import Player from '../player';
import Square from '../square';


export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let opposingTeam = this.player === Player.WHITE ? "black" : "white";
        let sameTeam = this.player === Player.WHITE ? "white" : "black";
        let forwardsDiagonalMoves = [];
        let backwardsDiagonalMoves = [];
        let DStart = Square.at(location.row + 1, location.col + 1);
        let lateralMoves = [];
        let blockingPieces = [];
        let takingMoves = [];


        while (DStart.row < 8 && DStart.col < 8) {
                forwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
                DStart.row += 1;
                DStart.col += 1;
        }
                //South West 
        DStart = Square.at(location.row - 1, location.col - 1);
        while (DStart.row >= 0 && DStart.col >= 0) {
            forwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row -= 1;
            DStart.col -= 1;
            }
        
                // Backwards diagonal - North West
        DStart = Square.at(location.row + 1, location.col - 1);
        while (DStart.col >= 0 && DStart.row < 8) {
            backwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row += 1;
            DStart.col -= 1;
            }
        // Backwards diagonal - South East
        DStart = Square.at(location.row - 1, location.col + 1);
            while (DStart.row >= 0 && DStart.col < 8) {
            backwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row -= 1;
            DStart.col += 1;
        }

        // Get total possible lateral moves
                for (let i = 0; i < 8; i++) {
                    if (i != location.col ) {
                        lateralMoves.push(Square.at(location.row, i))
                    }
                    if (i != location.row) {
                        lateralMoves.push(Square.at(i, location.col))
                    }
                }

        let totalPossibleMovesArray = [...backwardsDiagonalMoves, ...forwardsDiagonalMoves, ...lateralMoves];

        // Get positions of pieces (blocking pieces) that are located on the possible moves
        for (let i = 0; i < totalPossibleMovesArray.length; i++) {
            if (board.getPiece(totalPossibleMovesArray[i])) {
                let blockingPiece = board.getPiece(totalPossibleMovesArray[i]);
                let blockingPieceLocation = board.findPiece(blockingPiece);
                if (blockingPiece.constructor.name === "King") {
                    blockingPieces.push(blockingPieceLocation);
                } else if (blockingPiece.player.description === sameTeam){ 
                    blockingPieces.push(blockingPieceLocation);
                } else if (blockingPiece.player.description === opposingTeam) { 
                    blockingPieces.push(blockingPieceLocation);
                    takingMoves.push(blockingPieceLocation);
                }
            }
        }

        console.log('blockingPieces', blockingPieces)

        let blockPiecePositions = [];

// Get an array of the lateral moves (in possible moves) that are no longer accessible due to blocking pieces
        for (let i = 0; i < blockingPieces.length; i++) {
            let blockPieceRow = blockingPieces[i].row;
            let blockPieceCol = blockingPieces[i].col;
            if (blockPieceRow === location.row) { 
                if (blockPieceCol > location.col) {
                    for (let i = blockPieceCol; i < 8; i++) {
                        blockPiecePositions.push(Square.at(blockPieceRow, i))
                    }
                } else {
                    for (let i = blockPieceCol; i >= 0; i--) {
                        blockPiecePositions.push(Square.at(blockPieceRow, i))
                    }
                }
            } else if(blockPieceCol === location.col) {
                if (blockPieceRow > location.row) {
                    for (let i = blockPieceRow; i < 8; i++) {
                        blockPiecePositions.push(Square.at(i, blockPieceCol))
                    }
                } else {
                    for(let i = blockPieceRow; i >= 0; i--) {
                        blockPiecePositions.push(Square.at(i, blockPieceCol))
                    }
                }
            }
        }

        // Remove positions that are inaccessible due to blocking pieces from lateralmoves
        for (let i = 0; i < lateralMoves.length; i++) {
            for (let j = 0; j < blockPiecePositions.length; j++) {
                if (lateralMoves[i].row === blockPiecePositions[j].row && lateralMoves[i].col === blockPiecePositions[j].col) {
                    let index = lateralMoves.indexOf(lateralMoves[i]);
                    lateralMoves.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        }

        // Remove moves inacessable due to pieces on diagonal lines. 
        function findIndex(blockingPieces, direction) {
            if (direction === "forwards") {
                return forwardsDiagonalMoves.findIndex(move => move.row === blockingPieces.row && move.col === blockingPieces.col);
            } else {
                return backwardsDiagonalMoves.findIndex(move => move.row === blockingPieces.row && move.col === blockingPieces.col);
            }
        }

        backwardsDiagonalMoves = backwardsDiagonalMoves.sort((a,b) => a.row - b.row);
        forwardsDiagonalMoves = forwardsDiagonalMoves.sort((a,b) => a.row - b.row);

        for (let i = 0; i < blockingPieces.length; i++) {
            if (blockingPieces[i].row > location.row && blockingPieces[i].col > location.col) {
                forwardsDiagonalMoves.splice(findIndex(blockingPieces[i], "forwards")); 
            } else if (blockingPieces[i].row < location.row && blockingPieces[i].col > location.col) {
                backwardsDiagonalMoves.splice(0, findIndex(blockingPieces[i], "backwards") + 1); 
            } else if (blockingPieces[i].row < location.row && blockingPieces[i].col < location.col) {
                forwardsDiagonalMoves.splice(0, findIndex(blockingPieces[i], "forwards") + 1); 
            } else if (blockingPieces[i].row > location.row && blockingPieces[i].col < location.col) {
                backwardsDiagonalMoves.splice(findIndex(blockingPieces[i], "backwards")); 
            }
        }

        let finalMoves = [...backwardsDiagonalMoves, ...forwardsDiagonalMoves, ...lateralMoves];

        if (takingMoves.length > 0) {
            for (let i of takingMoves) {
                finalMoves.push(i)
            }
        }

        return finalMoves;

    }
}
