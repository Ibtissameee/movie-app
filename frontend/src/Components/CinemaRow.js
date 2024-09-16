import { useState } from 'react';
import './cinemarow.css';
export default function CinemaRow({onSelectedSeatsChange}){
    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleSeatClick = (seatId)=>{
        if(selectedSeats.includes(seatId)){
            setSelectedSeats(selectedSeats.filter((seat) => seat!=seatId));
            onSelectedSeatsChange(selectedSeats.length-1);
        }else{
            setSelectedSeats([...selectedSeats,seatId]);
            onSelectedSeatsChange(selectedSeats.length+1);
        }
    
    }
    
    return(
        <div className="cinema-row">
            <div className={`seat ${selectedSeats.includes('seat1') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat1')} ></div>
            <div className={`seat ${selectedSeats.includes('seat2') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat2')}></div>
            <div className={`seat ${selectedSeats.includes('seat3') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat3')}></div>
            <div className={`seat ${selectedSeats.includes('seat4') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat4')}></div>
            <div className={`seat ${selectedSeats.includes('seat5') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat5')}></div>
            <div className={`seat ${selectedSeats.includes('seat6') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat6')}></div>
            <div className={`seat ${selectedSeats.includes('seat7') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat7')}></div>
            <div className={`seat ${selectedSeats.includes('seat8') ? 'selected':undefined}`} onClick={()=>handleSeatClick('seat8')}></div>
        </div>
    );
}