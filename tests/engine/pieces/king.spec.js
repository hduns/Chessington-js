import King from '../../../src/engine/pieces/king';
import Player from '../../../src/engine/player';
import Board from '../../../src/engine/board';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';




describe('King', () => {
    let board;
    beforeEach(() => board = new Board());

    it('can move one spot any direction', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(3,3), Square.at(3,5), Square.at(2,3), Square.at(2,4), Square.at(2,5), Square.at(4,3), Square.at(4,4), Square.at(4,5)        
        ];
        
        moves.should.deep.include.members(expectedMoves);

    });

    it('cannot move through friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);
        board.setPiece(Square.at(2, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(2, 5));
    });

    
    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(3, 4), king);
        board.setPiece(Square.at(2, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(2, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);
        board.setPiece(Square.at(4, 4), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 4));
    });

    
});
