import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }


    getAvailableMoves(board) {
        let location = board.findPiece(this)
        let possibleMoves = [];
        let availableMoves = [];
        let startingPosition;
        let endingPosition;

        if (this.player === Player.WHITE) {
            possibleMoves = [Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col)];
            startingPosition = 1;
            endingPosition = 7;
        } else {
            possibleMoves = [Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col)];
            startingPosition = 6;
            endingPosition = 0;
        }

        if (location.row === endingPosition) {
            return [];
        }

        for (let i = 0; i < 2; i++) {
            if (board.getPiece(possibleMoves[0]) || location.row === endingPosition) {
                return [];
            } else if (board.getPiece(possibleMoves[1])) {
                availableMoves.push(possibleMoves[0]);
                break;
            } else {
                availableMoves.push(possibleMoves[i]);
            }
        }

        if (location.row != startingPosition && availableMoves.length > 0) {
            return availableMoves.slice(0, 1)
        } else {
            return availableMoves;
        }

    }
}
