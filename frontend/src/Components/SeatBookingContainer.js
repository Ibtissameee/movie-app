import CinemaRow from "./CinemaRow";
import './seatbookingcontainer.css';
export default function SeatBookingContainer({onSelectedSeatsChange}){
    return(
        <div className="seat-booking-container">
            
            <div className="screen"></div>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>
            <CinemaRow onSelectedSeatsChange={onSelectedSeatsChange}/>

        </div>
    );
}