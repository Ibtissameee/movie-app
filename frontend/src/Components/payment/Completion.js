import React, { useEffect } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import axios from 'axios';
import Button from '../Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SeatsBooking from '../SeatsBooking';
import { useSelectedSeats } from '../SeatsContext';

function Completion() {
  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
  const navigate = useNavigate();
  const storedSeats = localStorage.getItem('selectedSeats');
  const currentMovieId = localStorage.getItem('currentMovieId');
  const selectedSeats = storedSeats ? JSON.parse(storedSeats) : [];
  
  
  const accessToken = localStorage.getItem('accessToken');
  useEffect(()=>{
    console.log(accessToken);
    console.log("Current movie id from completion",currentMovieId);
    console.log("Selected Seats from completion", selectedSeats);
    console.log("selected seats from completion ",selectedSeats);
  }, [accessToken]);
  useEffect(()=>{
  const updateSeatsAndCreateTicket = async()=>{
    try{
    const seatUpdatePromises = selectedSeats.map((seat) => {
        const column = parseInt(seat.seat.slice(1));
        return axios.put("http://localhost:9002/movies/update-seat", null, {
          params: {rowNumber: seat.row, columnNumber: column},
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        });
      });
      await Promise.all(seatUpdatePromises); // Wait for all seat updates to complete
      console.log('All seats updated successfully!');

      const seatIdPromises = selectedSeats.map(async (seat) => {
        const column = parseInt(seat.seat.slice(1));
        const response = await axios.get("http://localhost:9002/movies/seat-id", {
          params: { rowNumber: seat.row, columnNumber: column },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        });
        return response.data; // This should be the seat ID
      });
      const fetchedSeatIds = await Promise.all(seatIdPromises);
      setSelectedSeatsIds(fetchedSeatIds);
      const ticketPayload = {
        movieId: currentMovieId,
        selectedSeats: selectedSeatsIds
      };
      
      const createTicketResponse = await axios.post("http://localhost:9002/movies/create-ticket", ticketPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });

      console.log("Ticket created successfully!", createTicketResponse.data);
      

  } catch (error) {
    console.error('Error creating ticket:', error);
  }
};

  updateSeatsAndCreateTicket();
},[selectedSeats]);
  return (
    
      <div style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Alert
              status='success'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'>
        <AlertIcon boxSize='40px' mr={0} />
          Payment made with success! Check your email for Ticket informations
        </Alert>
        <Button 
        color='#ffffff'
        bgColor='#950101'
        border='none'
        backdropfilter='none'
        name="Back To Home Page"
        onClick={()=> (navigate("/"))}/>
        </div>
          
    
  )
}

export default Completion
