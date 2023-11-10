"use client"

import Board from "@/components/board";
import BoardModel from "@/model/board";
import Minimax from "@/model/minimax";
import Bishop from "@/model/pieces/bishop";
import King from "@/model/pieces/king";
import Knight from "@/model/pieces/knight";
import Pawn from "@/model/pieces/pawn";
import Queen from "@/model/pieces/queen";
import Rook from "@/model/pieces/rook";
import Player from "@/model/player";
import { useMemo } from "react";

const Home = () => {
	const { aiModel, boardModel } = useMemo(() => {

		const player1 = new Player({ color: "light", user: null })
		const player2 = new Player({ color: "dark", user: null })

		const board = new BoardModel({
			players: [player2, player1],
			size: 8
		})

		const ai = new Minimax({
			board,
			depth: 2
		})

		new Rook({ board, coordinates: [0, 0], player: player1 });
		new Rook({ board, coordinates: [0, 7], player: player2 });
		new Rook({ board, coordinates: [7, 0], player: player1 });
		new Rook({ board, coordinates: [7, 7], player: player2 });
		new Bishop({ board, coordinates: [2, 0], player: player1 });
		new Bishop({ board, coordinates: [2, 7], player: player2 });
		new Bishop({ board, coordinates: [5, 0], player: player1 });
		new Bishop({ board, coordinates: [5, 7], player: player2 });
		new King({ board, coordinates: [3, 0], player: player1 });
		new King({ board, coordinates: [3, 7], player: player2 });
		new Queen({ board, coordinates: [4, 0], player: player1 });
		new Queen({ board, coordinates: [4, 7], player: player2 });
		new Knight({ board, coordinates: [1, 0], player: player1 });
		new Knight({ board, coordinates: [1, 7], player: player2 });
		new Knight({ board, coordinates: [6, 0], player: player1 });
		new Knight({ board, coordinates: [6, 7], player: player2 });

		for (let i = 0; i < board.size; i++) {
			new Pawn({ board, coordinates: [i, 1], player: player1 })
			new Pawn({ board, coordinates: [i, 6], player: player2 })
		}

		ai.getBestMove();

		return { aiModel: ai, boardModel: board }
	}, [])

	return (
		<main>
			<Board ai={aiModel} model={boardModel} />
		</main>
	)
}

export default Home