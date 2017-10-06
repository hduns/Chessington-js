import Piece from './piece';
import Player from '../player';
import Square from '../square';


export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let opposingTeam = this.player === Player.WHITE ? "black" : "white";
        let sameTeam = this.player === Player.WHITE ? "white" : "black";
        let location = board.findPiece(this);
        let forwardsDiagonalMoves = [];
        let backwardsDiagonalMoves = [];
        let DStart = Square.at(location.row + 1, location.col + 1);
        let finalMoves = [];

        // North East
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

        // return [...backwardsDiagonalMoves, ...forwardsDiagonalMoves];
        backwardsDiagonalMoves = backwardsDiagonalMoves.sort((a,b) => a.row - b.row);
        forwardsDiagonalMoves = forwardsDiagonalMoves.sort((a,b) => a.row - b.row);

        let totalPossibleMovesArray = [...backwardsDiagonalMoves, ...forwardsDiagonalMoves];

        let takingMoves = [];
        let blockingPieces = [];

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

        function findIndex(blockingPieces, direction) {
            if (direction === "forwards") {
                return forwardsDiagonalMoves.findIndex(move => move.row === blockingPieces.row && move.col === blockingPieces.col);
            } else {
                return backwardsDiagonalMoves.findIndex(move => move.row === blockingPieces.row && move.col === blockingPieces.col);
            }
        }

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

        finalMoves = [...backwardsDiagonalMoves, ...forwardsDiagonalMoves];

        if (takingMoves.length > 0) {
            for (let i of takingMoves) {
                finalMoves.push(i)
            }
        }
        return finalMoves;
    }
}
