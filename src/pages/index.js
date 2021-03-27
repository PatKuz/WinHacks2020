import * as React from "react"
import styled from 'styled-components'

import {withFirebase} from "../api/"
import { Centered } from "../styles/global";
import Card from "../components/Card";
import Logo from "../components/Logo";
import SEO from "../components/SEO";
import Room from "../components/Room";

import Background from "../images/home-background.png";

const StyledCentered = styled(Centered)`
	background: url(${Background});
`;

class IndexPage extends React.Component {
	_initFirebase = false;
	state = {
		roomCode: "",
		rooms: null,
	}
	unsubRooms = null;
	
    componentDidMount() {
		if (this.props.firebase && !this._initFirebase) this.loadData();
	}
	
    componentDidUpdate(prevProps) {
		if (this.props.firebase && !this._initFirebase) this.loadData();
	}
	
    componentWillUnmount() {
		if (typeof this.unsubRooms === "function") this.unsubRooms();
	}
	
	loadData = async () => {
		this._initFirebase = true;
		
		const rooms = await new Promise((resolve, reject) => {
			let resolveOnce = (doc) => {
				resolveOnce = () => null;
				resolve(doc);
			};
			
			this.unsubRooms = this.props.firebase
				.rooms()
				.onSnapshot((querySnapshot) => {
					const rooms = querySnapshot.docs.map((doc) => {
						return {
							id: doc.id,
							...doc.data(),
						};
					});
					this.setState({ rooms });
					resolveOnce(rooms);
				}, reject);
		});
	}
	
	setRoomCode = (roomCode) => {
		this.setState({roomCode})
	};
	
	render() {
		const { rooms, roomCode } = this.state;
		
		
		const room = rooms ? rooms.find((r) => r.id === roomCode) : null;
		
		if (roomCode === "")
			return (
			    <>
					<SEO title="Home" route="/" />
					<StyledCentered>
						<Logo size="large"/>
						<Card setRoomCode={this.setRoomCode} />
					</StyledCentered>
				</>
			);
		else if (room === undefined || room === null)
				return (
			    <>
					<SEO title="Home" route="/" />
					<StyledCentered>
						<Logo size="large"/>
						<h1> Room not found! </h1>
						<Card setRoomCode={this.setRoomCode} />
					</StyledCentered>
				</>
				);
		else
			return (
				<Room room={room} />
			);
	}
}

export default withFirebase(IndexPage);
