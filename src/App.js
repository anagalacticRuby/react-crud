import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const ENDPOINT = "https://638959874eccb986e8905258.mockapi.io/CrudAPI/Hotel"; //Endpoint for Hotel Resource
  const [reservations, setReservations] = useState([{}]); //A default value can be declared in case the reservations variable is never updated.

  //Variables used for the post method
  const [newReservationName, setNewReservationName] = useState("");
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [newStayLength, setNewStayLength] = useState("");

  //Variables for the update method
  const [updatedReservationName, setUpdatedReservationName] = useState("");
  const [updatedRoomNumber, setUpdatedRoomNumber] = useState("");
  const [updatedStayLength, setUpdatedStayLength] = useState("");

  function getReservation() {
    fetch(ENDPOINT)
      .then((data) => data.json())
      .then((data) => setReservations(data));
  }

  useEffect(() => {
    getReservation();
    console.log(reservations);
  }, []);

  function deleteReservation(id) {
    fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    })
      .then(() => getReservation())
      .then(() => alert("Deletion successful")); //When the deletion is successful, inform user with alert
  }

  function postReservation(e) {
    e.preventDefault(); //prevent default so the page doesn't cause a refresh every time the post form is submitted
    console.log(newReservationName, newRoomNumber, newStayLength);

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reservationName: newReservationName,
        roomNumber: newRoomNumber,
        stayLength: newStayLength,
      }),
    })
      .then(() => getReservation())
      .then(() => alert("Reservation creation successful")); //When posting is successful, inform user with alert
  }

  function updateReservation(e, reservationObj) {
    e.preventDefault();

    let updatedReservationObj = {
      ...reservationObj,
      reservationName: updatedReservationName,
      roomNumber: updatedRoomNumber,
      stayLength: updatedStayLength,
    };

    fetch(`${ENDPOINT}/${reservationObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReservationObj),
    })
      .then(() => getReservation())
      .then(() => alert("Reservation update successful")); //When the update is successful, inform the user with an alert
  }

  return (
    <div className="App">
      <h3>Create a New Reservation</h3>
      <form>
        <label>Reservation Name </label>
        <input
          type="text"
          placeholder="Reservation Name"
          onChange={(e) => setNewReservationName(e.target.value)}
        />{" "}
        <br />
        <label>Room Number </label>
        <input
          type="number"
          placeholder="Room Number"
          onChange={(e) => setNewRoomNumber(e.target.value)}
        />{" "}
        <br />
        <label>Stay Length</label>
        <input
          type="number"
          placeholder="Length of Stay"
          onChange={(e) => setNewStayLength(e.target.value)}
        />{" "}
        <br />
        <button onClick={(e) => postReservation(e)}>Add Reservation</button>
      </form>

      {reservations.map((reservation, index) => (
        <div className="reservationContainer" key={index}>
          <div>
            Reservation Name: {reservation.reservationName} <br />
            Room Number: {reservation.roomNumber} <br />
            Stay Length: {reservation.stayLength} <br />
            <button onClick={() => deleteReservation(reservation.id)}>
              Delete
            </button>
          </div>
          <form className="updateForm">
            <h3>Update This Reservation</h3>
            <label>Update Reservation Name</label>
            <input
              placeholder="New Reservation Name"
              onChange={(e) => setUpdatedReservationName(e.target.value)}
            />{" "}
            <br />
            <label>Update Room Number</label>
            <input
              placeholder="New Room Number"
              onChange={(e) => setUpdatedRoomNumber(e.target.value)}
            />{" "}
            <br />
            <label>Update Stay Length</label>
            <input
              placeholder="New Stay Length"
              onChange={(e) => setUpdatedStayLength(e.target.value)}
            />
            <br />
            <button onClick={(e) => updateReservation(e, reservation)}>
              Update
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
