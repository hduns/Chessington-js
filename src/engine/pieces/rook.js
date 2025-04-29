import Piece from './piece';
import Square from '../square';


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        // let currentRow = location.row;
        // let currentColumn = location.col;
        let totalMovesArray = [];

// Vertical moves
        for (let i = 0; i < 8; i++) {
            if (i != location.col) {
                totalMovesArray.push(Square.at(location.row, i));
            }
            if (i != location.row) {
                totalMovesArray.push(Square.at(i, location.col));
            }
        }
       
        return totalMovesArray;
    }
}