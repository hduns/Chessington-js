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

        // Forwards diagonal
        while (DStart.row < 8 && DStart.col < 8) 
        {
            forwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row += 1;
            DStart.col += 1;
        }

        DStart = Square.at(location.row - 1, location.col - 1);
        while (DStart.row >= 0 && DStart.col >= 0) 
        {
            forwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row -= 1;
            DStart.col -= 1;
        }

        // Backwards diagonal
        DStart = Square.at(location.row + 1, location.col - 1);
        while (DStart.col >= 0) 
        {
            backwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row += 1;
            DStart.col -= 1;
        }

        DStart = Square.at(location.row - 1, location.col + 1);
        while (DStart.row >= 0) 
        {
            backwardsDiagonalMoves.push(Square.at(DStart.row, DStart.col));
            DStart.row -= 1;
            DStart.col += 1;
        }

        return [...backwardsDiagonalMoves, ...forwardsDiagonalMoves];
    }
}
