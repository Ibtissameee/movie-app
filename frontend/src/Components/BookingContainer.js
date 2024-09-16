import { useState } from "react";
import Button from "./Button";
import SeatBookingContainer from "./SeatBookingContainer";
import ShowCase from "./ShowCase";
import TotalSeats from "./TotalSeats";
import './bookingcontainer.css';
export default function BookingContainer(){
    const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
    const handleSelectedSeatsChange = (count)=>{
        setSelectedSeatsCount(count);
    }
    return(
        <div className="booking-container">
            <div className="movie-title">Movie Title</div>
            <ShowCase/>
            <SeatBookingContainer onSelectedSeatsChange={handleSelectedSeatsChange}/>
            <TotalSeats selectedSeatsCount={selectedSeatsCount}/>
            <Button name="Next"
                color='#ffffff'
                bgColor='#950101'
                border='none'
                backdropfilter='none'
            />
        </div>
    );
}