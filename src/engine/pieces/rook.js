import Piece from './piece';
import Square from '../square';
import Player from '../player';




export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let totalPossibleMovesArray = [];
        let blockingPieces = [];
        let finalMoves = [];
        let opposingTeam = this.player === Player.WHITE ? "black" : "white";
        let sameTeam = this.player === Player.WHITE ? "white" : "black";
        let takingMoves = [];
        
// Get total possible moves
        for (let i = 0; i < 8; i++) {
            if (i != location.col ) {
                totalPossibleMovesArray.push(Square.at(location.row, i))
            }
            if (i != location.row) {
                totalPossibleMovesArray.push(Square.at(i, location.col))
            }
        }

// Get positions of pieces (blocking pieces) that are located on the possible moves
        for (let i = 0; i < totalPossibleMovesArray.length; i++) {
            if (board.getPiece(totalPossibleMovesArray[i])) {
                let blockingPiece = board.getPiece(totalPossibleMovesArray[i]);
                let blockingPieceLocation = board.findPiece(blockingPiece);
                console.log('blockingPiece', blockingPiece);
                console.log('blockingPiece', blockingPiece.constructor.name === "King");

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

        let blockPiecePositions = [];

// Get an array of the moves (in possible moves) that are no longer accessible due to blocking pieces
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


        console.log(totalPossibleMovesArray);
        console.log(totalPossibleMovesArray.length);
        console.log(blockPiecePositions);

        // Remove positions that are inaccessible due to blocking pieces from totalPossibleMovesArray
        for (let i = 0; i < totalPossibleMovesArray.length; i++) {
            for (let j = 0; j < blockPiecePositions.length; j++) {
                if (totalPossibleMovesArray[i].row === blockPiecePositions[j].row && totalPossibleMovesArray[i].col === blockPiecePositions[j].col) {
                    let index = totalPossibleMovesArray.indexOf(totalPossibleMovesArray[i]);
                    totalPossibleMovesArray.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        }

        if (takingMoves.length > 0) {
            for (let i of takingMoves) {
                totalPossibleMovesArray.push(i)
            }
        }

        console.log(totalPossibleMovesArray);
        console.log(totalPossibleMovesArray.length);
        return totalPossibleMovesArray;

    }
}