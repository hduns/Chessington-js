import Piece from './piece';
import Player from '../player';
import Square from '../square';


export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let opposingTeam = this.player === Player.WHITE ? "black" : "white";
        let sameTeam = this.player === Player.WHITE ? "white" : "black";
        let totalPossibleMovesArray = [
            Square.at(location.row, location.col - 1), Square.at(location.row, location.col + 1),
            Square.at(location.row -1, location.col - 1), Square.at(location.row -1, location.col), Square.at(location.row-1, location.col + 1), 
            Square.at(location.row + 1, location.col -1), Square.at(location.row + 1, location.col), Square.at(location.row + 1, location.col + 1)
        ];

        let blockingPieces = [];
        let takingMoves = [];

        // Get positions of pieces (blocking pieces) that are located on the possible moves
        for (let i = 0; i < totalPossibleMovesArray.length; i++) {
            if (board.getPiece(totalPossibleMovesArray[i])) {
                let blockingPiece = board.getPiece(totalPossibleMovesArray[i]);
                let blockingPieceLocation = board.findPiece(blockingPiece);
                if (blockingPiece.player.description === sameTeam){ 
                    blockingPieces.push(blockingPieceLocation);
                } else if (blockingPiece.player.description === opposingTeam) { 
                    blockingPieces.push(blockingPieceLocation);
                    takingMoves.push(blockingPieceLocation);
                }
            }
        }

        for (let i = 0; i < totalPossibleMovesArray.length; i++) {
            for (let j = 0; j < blockingPieces.length; j++) {
                if (totalPossibleMovesArray[i].row === blockingPieces[j].row && totalPossibleMovesArray[i].col === blockingPieces[j].col) {
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

        return totalPossibleMovesArray;

    }
}
