"use client"

import Board from "@/components/board";
import BoardModel from "@/model/board";
import Rook from "@/model/pieces/rook";
import { useRef } from "react";

const Home = () => {
	const boardModelRef = useRef(new BoardModel({
		players: [],
		size: 8
	}))

	new Rook({ board: boardModelRef.current, coordinates: [3, 1], player: null });
	new Rook({ board: boardModelRef.current, coordinates: [3, 2], player: null });

	return (
		<main>
			<Board model={boardModelRef.current} />
		</main>
	)
}

export default Home