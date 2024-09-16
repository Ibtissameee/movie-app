import './totalseats.css';
export default function TotalSeats({selectedSeatsCount}){
    return(
        <p>You have selected <span id="count">{selectedSeatsCount}</span>seats for a price of $ <span id="total">{selectedSeatsCount*5} </span></p>
    );
}