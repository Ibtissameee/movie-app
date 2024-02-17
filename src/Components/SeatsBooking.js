import React, { useState } from "react";
import ShowCase from './ShowCase';
import './seatsbooking.css';
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SeatsBooking({onCloseClick}) {
    const [selected, setSelected] = useState([]);
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
   

    return (
        <div className="seats">
           <FontAwesomeIcon className="close-icon" icon={faXmark} onClick={onCloseClick}/>
            <div className="movie-title">Movie Title</div>
            <ShowCase />
            <div className="seats-picker">
                <div className="screen"></div>
                {rows.map(row => (
                    <div key={row.id} className="row">
                        {row.seats.map(seat => (
                            <div key={seat}
                                className={`seat ${selected.some(
                                    selectedSeat => selectedSeat.row === row.id && selectedSeat.seat === seat
                                )
                                    ? 'selected'
                                    : ''}`}
                                onClick={() => toggleSeat(row.id, seat)}
                            >{seat}</div>
                        ))}
                    </div>
                ))}
                 <p className="total">You have selected <span id="count">{selected.length}</span>seats for a price of $ <span id="total">{totalPrice} </span></p>
            </div>
            <Button name="Next" 
                color='#ffffff'
                bgColor='#950101'
                border='none'
                backdropfilter='none'
                />
        </div>
    );
}