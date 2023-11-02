"use client"

import Board from "@/components/board";
import BoardModel from "@/model/board";
import Bishop from "@/model/pieces/bishop";
import King from "@/model/pieces/king";
import Pawn from "@/model/pieces/pawn";
import Rook from "@/model/pieces/rook";
import Player from "@/model/player";
import { useMemo } from "react";

const Home = () => {
	const { boardModel } = useMemo(() => {

		const player1 = new Player({ color: "light", user: null })
		const player2 = new Player({ color: "dark", user: null })

		const board = new BoardModel({
			players: [player2, player1],
			size: 8
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

		for (let i = 0; i < board.size; i++) {
			new Pawn({ board, coordinates: [i, 1], player: player1 })
			new Pawn({ board, coordinates: [i, 6], player: player2 })
		}

		return { boardModel: board }
	}, [])

	return (
		<main>
			<Board model={boardModel} />
		</main>
	)
}

export default Home