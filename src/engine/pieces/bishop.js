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

        // Forwards Diagonal 
        let FDStart = [Square.at(location.row -2, location.col -2)];
        let forwardsDiagonalMoves = [];

        let i = 0;
        do {
            if (FDStart[0].row != location.row) {
                forwardsDiagonalMoves.push(Square.at(FDStart[0].row, FDStart[0].col));
            }
            FDStart[0].row += 1;
            FDStart[0].col += 1;
            i++
        } while (i < 7)

        // Backwards Diagonal
        let BDStart = [Square.at(location.row - location.row, location.col + location.row)];
        let backwardsDiagonalMoves = [];

        do {
            if (BDStart[0].row != location.row) {
                backwardsDiagonalMoves.push(Square.at(BDStart[0].row, BDStart[0].col));
            }
            BDStart[0].row += 1;
            BDStart[0].col -= 1;
        } while (BDStart[0].col >= 0)

        return [...backwardsDiagonalMoves, ...forwardsDiagonalMoves];
    }
}
