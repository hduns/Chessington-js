import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this)

        // if (location.row === 1 && Player.WHITE) {
        //     return [Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col)]
        // }
        // if (location.row === 6 && Player.BLACK) {
        //     return [Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col)]
        // }


        // if (this.player === Player.WHITE) {
        //     // return [Square.at(location.row + 1, location.col)]

        //     let move = Square.at(location.row + 1, location.col);
        //     let availableMoves = [];

        //     if (typeof board.getPiece(move) != 'object') {
        //             availableMoves.push(move);
        //     }
        //     console.log('availableMoves', availableMoves);
        //     return availableMoves;

        // } else {

        //     console.log('logging location: ', location);
        //     let move = Square.at(location.row - 1, location.col);
        //     console.log(move);
        //     let availableMoves = [];
        //     console.log('typeof check', typeof board.getPiece)
        //     console.log('typeof check', typeof board.getPiece(move) != 'object')

        //     if (typeof board.getPiece(move) != 'object') {
        //             availableMoves.push(move);
        //     }
        //     console.log('availableMoves', availableMoves);
        //     return availableMoves;
        // }

        if (this.player === Player.WHITE) {
            if (location.row === 1) {
                return [Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col)];
            } else {
                let possibleMove = Square.at(location.row + 1, location.col);
                let availableMoves = [];

                
                if (typeof board.getPiece(possibleMove) != 'object') {
                    availableMoves.push(possibleMove);
                }

                console.log(availableMoves.length);

                return availableMoves.length > 0 ? availableMoves : possibleMove;
            }
        } else if (this.player === Player.BLACK) {
            if (location.row === 6) {
                return [Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col)];

            } else {
                console.log(location);
                let possibleMove = Square.at(location.row - 1, location.col);
                let availableMoves = [];

                if (typeof board.getPiece(possibleMove) != 'object') {
                    availableMoves.push(possibleMove);
                }

                return availableMoves.length > 0 ? availableMoves : possibleMove;
            }
        }


    }


}
