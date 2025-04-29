import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }


    getAvailableMoves(board) {
        let location = board.findPiece(this)

        let availableMoves = [];

        if (this.player === Player.WHITE) {
            if (location.row === 1) {
                let possibleMoves = [Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col)];

                for (let i = 0; i < possibleMoves.length; i++) {
                    if (typeof board.getPiece(possibleMoves[0]) === 'object') {
                        return [];
                    } else if (typeof board.getPiece(possibleMoves[1]) === 'object') {
                        return [];
                    } else {
                        availableMoves.push(possibleMoves[i]);
                    }
                }

            } else {
                let possibleMove = Square.at(location.row + 1, location.col);
                if (typeof board.getPiece(possibleMove) != 'object') {
                    availableMoves.push(possibleMove);
                }
            }
            return availableMoves;

        } else if (this.player === Player.BLACK) {

            if (location.row === 6) {
                let possibleMoves = [Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col)];
                for (let i = 0; i < possibleMoves.length; i++) {
                    if (typeof board.getPiece(possibleMoves[0]) === 'object') {
                        return [];
                    } else if (typeof board.getPiece(possibleMoves[1]) === 'object') {
                        return [];
                    } else {
                        availableMoves.push(possibleMoves[i]);
                    }
                }
            } else {
                let possibleMove = Square.at(location.row - 1, location.col);

                if (typeof board.getPiece(possibleMove) != 'object') {
                    availableMoves.push(possibleMove);
                }
            }
            return availableMoves;
        }
    }
}
