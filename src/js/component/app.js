import React from "react";
import { useState, useRef, useEffect } from "react";
import Botones from "./botones";

function App() {
	const [songs, setSongs] = useState([]);

	const requestApi = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setSongs(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		requestApi();
	}, []);

	/* music player */
	const [activSong, setActivSong] = useState(null);
	let nameRef = useRef(null);

	const setSingleSong = (linkName, i) => {
		nameRef.src = `https://assets.breatheco.de/apis/sound/${linkName}`;
		setActivSong(i);
	};
	const play = () => {
		if (nameRef !== null) nameRef.play();
	};
	const pause = () => {
		nameRef.pause();
	};
	const nextSong = () => {
		let position =
			activSong !== null
				? activSong === songs.length - 1
					? 0
					: activSong + 1
				: 0;
		setSingleSong(songs[position].url, position);
	};
	const rewindSong = () => {
		let position =
			activSong !== null
				? activSong === 0
					? songs.length - 1
					: activSong - 1
				: 0;
		setSingleSong(songs[position].url, position);
		play();
	};

	return (
		<div className="container mt-4 py-5">
			<div className="row">
				<div className="col-md-12 ff">
					<div className="list-group ">
						{songs.length > 0 &&
							songs.map((value, indexList) => {
								return (
									<button
										key={indexList}
										id="list-btn"
										className={
											"btn btn-lg bg-dark " +
											(activSong === indexList)
										}
										onClick={() =>
											setSingleSong(value.url, indexList)
										}>
										{value.name}{" "}
									</button>
								);
							})}
					</div>
					<div className="col-mt-4 bg-dark mx-auto text-center list-group-item list-group-item-action">
						<audio
							className="audioControl"
							ref={(r) => (nameRef = r)}
							autoPlay
							controls
						/>
						<Botones
							rewindSong={rewindSong}
							pause={pause}
							play={play}
							nextSong={nextSong}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
