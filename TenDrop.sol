// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TenDrop {
    uint256 public numRows;
    uint256 public remainingBlocks;
    uint256 public remainingDrops;
    uint256[][] public board;
    bool public gameEnded;

    event MoveMade(address indexed player, uint256 indexed row, uint256 indexed column);
    event GameOver(address indexed player, bool indexed isWin);
    event Collapse(address indexed player, uint256 row, uint256 column);
    event DropsRemain(address indexed player, uint256 drops, uint256 blocks);

    constructor(uint256 _numRows) {
        numRows = _numRows;
        remainingDrops = 10;
        board = generateRandomBoard(numRows);
        for (uint256 i = 0; i < _numRows; i++) {
            for (uint256 j = 0; j < _numRows; j++) {
                remainingBlocks += board[i][j];
            }
        }
        gameEnded = false;
    }

    function generateRandomBoard(uint256 size) internal view returns (uint256[][] memory) {
        uint256[][] memory newBoard = new uint256[][](size);
        uint256 randNum;

        for (uint256 i = 0; i < size; i++) {
            newBoard[i] = new uint256[](size);
            for (uint256 j = 0; j < size; j++) {
                randNum = uint256(keccak256(abi.encodePacked(block.timestamp, i, j))) % 5 + 1;
                newBoard[i][j] = randNum;
            }
        }
        return newBoard;
    }

    function move(uint256 i, uint256 j) external {
        require(!gameEnded, "Game has already ended.");
        board[i][j] = board[i][j] + 1;
        remainingBlocks += 1;
        remainingDrops -= 1;
        propagateIncrements(i, j);
        emit MoveMade(msg.sender, i, j);
        check();
    }

    function propagateIncrements(uint256 i, uint256 j) internal {
        if (board[i][j] == 5) {
            board[i][j] = 0;
            remainingBlocks -= 5;
            propagateIncrement(i - 1, j);  // Up
            propagateIncrement(i + 1, j);  // Down
            propagateIncrement(i, j - 1);  // Left
            propagateIncrement(i, j + 1);  // Right
        }
    }

    function propagateIncrement(uint256 targetI, uint256 targetJ) internal {
        if (targetI < numRows && targetJ < numRows && board[targetI][targetJ] != 0) {
            board[targetI][targetJ] = board[targetI][targetJ] + 1;
            remainingBlocks += 1;
            propagateIncrements(targetI, targetJ);
        }
    }

    function check() internal {
        if (remainingBlocks == 0) {
            gameEnded = true;
            emit GameOver(msg.sender, true); // Player wins
        } else if (remainingDrops == 0) {
            gameEnded = true;
            emit GameOver(msg.sender, false); // Player loses
        }
    }
}
