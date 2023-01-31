import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { SearchBar } from "./components/searchBar";
import { DetailsFromIpAddress } from "./components/DetailsFromAdress";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const LoadingHtml = (props) => {
	const { message } = props;
	return (
		<section className="flex items-center h-[400px] md:-mt-16 z-50 justify-center">
			<div className="flex items-center justify-center gap-[20px]  h-[100px]  ">
				<h1 className="text-4xl font-extrabold md:text-6xl lg:text-8xl ">{message} </h1>
				<div className="flex items-center self-center justify-center space-x-2 animate-bounce">
					<div className="w-6 h-6 bg-black rounded-full lg:w-12 lg:h-12"></div>
					<div className="w-6 h-6 bg-black rounded-full lg:w-12 lg:h-12"></div>
					<div className="w-6 h-6 bg-black rounded-full lg:w-12 lg:h-12"></div>
				</div>
			</div>
		</section>
	);
};

export default function App() {
	const [Coordinate, setCoordinate] = useState({ connection: "", timezone: "", ip: "", region: "" });
	const [Loading, setIsLoading] = useState("Loading");
	const [IsItCurrentVisitorLocation, setIsItCurrentVisitorLocation] = useState(false);

	const getLocation = async (geoLocationUrl) => {
		try {
			setIsLoading("Loading");
			const response = await fetch(geoLocationUrl);

			const data = await response.json();

			setCoordinate({ ...Coordinate, ...data });

			setIsLoading(false);
		} catch (error) {
			setIsLoading("Error");
		}
	};

	// FETCHING THE LOCATION DATA OF THE CURRENT USER ON LOAD
	useEffect(() => {
		// let ipValue = "";
		let geoLocationUrl = `https://ipwho.is`;

		getLocation(geoLocationUrl);
		setIsItCurrentVisitorLocation(true);
	}, []);

	// SETTING THE MARKER IMG OF THE MAP
	let DefaultIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
	});
	L.Marker.prototype.options.icon = DefaultIcon;

	// GETTING THE ERROR MODAL ELEMENT FROM THE SEARCHBAR.JS FILE
	let errorModal;
	const errorModalFn = (modalElement) => {
		errorModal = modalElement;
	};

	const handleDisplayMapClick = (e) => {
		let ipValue = e.currentTarget.previousElementSibling.value;
		let geoLocationUrl = `https://ipwho.is/${ipValue}`;

		// CHECK IF THE INPUT VALUE CONFORMS WITH THE FORMAT OF AN IPADRESS
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipValue)) {
			getLocation(geoLocationUrl);
		}
		// CHECK IF THE INPUT BOX IS EMPTY
		else if (!ipValue) {
			errorModal.textContent = "Please type in a value";
			errorModal.style.display = "block";
			setTimeout(() => {
				errorModal.style.display = "none";
			}, 2000);
		} else {
			errorModal.textContent = "invalid IP-ADRESS value";
			errorModal.style.display = "block";
			setTimeout(() => {
				errorModal.style.display = "none";
			}, 2000);
		}
	};

	return (
		<>
			<section className="w-[100%] h-[300px] bg-[url('./pattern-bg.png')] bg-no-repeat bg-cover    bg-center">
				<h2 className="pt-8 text-center font-Rubik text-[22px] font-bold tracking-widest text-white">IP Address Tracker</h2>
				<SearchBar handleDisplayMapClick={handleDisplayMapClick} errorModalFn={errorModalFn} />
				<DetailsFromIpAddress {...{ Coordinate, Loading }} />
			</section>
			{Loading ? (
				<LoadingHtml message={Loading} />
			) : (
				<MapContainer className="h-[400px] md:-mt-16" center={[Coordinate.latitude, Coordinate.longitude]} zoom={13} scrollWheelZoom={false}>
					<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={[Coordinate.latitude, Coordinate.longitude]}>
						<Popup>{IsItCurrentVisitorLocation ? <h1>Your current location </h1> : <h1>the ip address location</h1>}</Popup>
					</Marker>
				</MapContainer>
			)}
		</>
	);
}
