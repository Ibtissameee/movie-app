import React, { useEffect, useState } from "react";
import ShowCase from './ShowCase';
import './seatsbooking.css';
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useCurrentMovie } from "./MovieContext";
import { useLoggedIn } from "./UserContext";
import { useSelectedSeats } from "./SeatsContext";
import axios from "axios";

export default function SeatsBooking({onCloseClick}) {
    const [selected, setSelected] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const {isLoggedIn} = useLoggedIn();
    const {currentMovie} = useCurrentMovie();
    const {selectedSeats, setSelectedSeats} = useSelectedSeats();
    localStorage.setItem('currentMovieId', currentMovie.movie.id);
    
    console.log(currentMovie);
    const rows = [
        { id: 'A', seats: Array.from({ length: 10 }, (_, index) => `A${index + 1}`) },
        { id: 'B', seats: Array.from({ length: 10 }, (_, index) => `B${index + 1}`) },
        { id: 'C', seats: Array.from({ length: 10 }, (_, index) => `C${index + 1}`) },
        { id: 'D', seats: Array.from({ length: 10 }, (_, index) => `D${index + 1}`) },
        { id: 'E', seats: Array.from({ length: 10 }, (_, index) => `E${index + 1}`) },
        { id: 'F', seats: Array.from({ length: 10 }, (_, index) => `F${index + 1}`) }
    ];

    const price = 5;
    const totalPrice = price * selected.length;

    useEffect(() => {
        const fetchOccupiedSeats = async () => {
            try {
                const response = await axios.get("http://localhost:9002/movies/occupied-seats"); 
                setOccupiedSeats(response.data); 
            } catch (error) {
                console.error("Error fetching occupied seats:", error);
            }
        };

        fetchOccupiedSeats();
    }, []); 

    const toggleSeat = (rowId, seat) => {
        const seatIndex = selected.findIndex(
            selectedSeat => selectedSeat.row === rowId && selectedSeat.seat === seat
        );
        if (seatIndex !== -1) {
            setSelected(prevSeats => prevSeats.filter(selectedSeat =>
                selectedSeat.row !== rowId || selectedSeat.seat !== seat
            ));
        } else {
            setSelected(prevSeats => [...prevSeats, { row: rowId, seat }]);
        }
        
    };
   useEffect(()=>{
    setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, ...selected]);
   }, [selected])
console.log("Selected Seats ",selectedSeats);
    return (
        <div className="seats">
            {console.log("Selected seats:", selected)}
           <FontAwesomeIcon className="close-icon" icon={faXmark} onClick={onCloseClick}/>
            <div className="movie-title">{currentMovie.movie.title}</div>
            <ShowCase />
            <div className="seats-picker">
                <div className="screen"></div>
                {rows.map(row => (
                    <div key={row.id} className="row">
                        {row.seats.map(seat => {
                            const isOccupied = occupiedSeats.some(occupiedSeat => occupiedSeat.rowNumber === row.id && occupiedSeat.columnNumber === parseInt(seat.slice(1)));
                            return(
                                <div key={seat}
                                    className={`seat ${selected.some(
                                        selectedSeat => selectedSeat.row === row.id && selectedSeat.seat === seat
                                    )
                                        ? 'selected'
                                        : ''} ${isOccupied ? 'occupied': ''}`}
                                    onClick={() => !isOccupied && toggleSeat(row.id, seat)}
                                >{seat}</div>
                        );
                        })}
                    </div>
                ))}
                 <p className="total">You have selected <span id="count">{selected.length}</span>seats for a price of $ <span id="total">{totalPrice} </span></p>
            </div>
            <Link to={isLoggedIn ? "/payment" : "/signinup"}>
                <Button name="Next" 
                    color='#ffffff'
                    bgColor='#950101'
                    border='none'
                    backdropfilter='none'
                    />
            </Link>
        </div>
    );
}