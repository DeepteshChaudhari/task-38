const rooms = [
  {
    roomID: 0,
    roomName: "300",
    noOfSeatsAvailable: "2",
    amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
    pricePerHr: 100,
    bookedStatus: false,
    customerDetails: {
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    roomID: 1,
    roomName: "456",
    noOfSeatsAvailable: "8",
    amenities: ["TV", "Projector"],
    pricePerHr: 97,
    bookedStatus: true,
    customerDetails: {
      customerName: "Raju",
      date: "2/12/2021",
      startTime: "1pm-2pm ",
      endTime: "2pm -3pm",
    },
  },
  {
    roomID: 2,
    roomName: "789",
    noOfSeatsAvailable: "10",
    amenities: ["TV", "AC", "Swimming Pool"],
    pricePerHr: 102,
    bookedStatus: false,
    customerDetails: {
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    roomID: 3,
    roomName: "778",
    noOfSeatsAvailable: "20",
    amenities: ["Air Conditioner", "Wifi"],
    pricePerHr: 105,
    bookedStatus: false,
    customerDetails: {
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  },
  {
    roomID: 4,
    roomName: "666",
    noOfSeatsAvailable: "18",
    amenities: ["Hot Water", "Air Conditioner"],
    pricePerHr: "100",
    bookedStatus: true,
    customerDetails: {
      customerName: "Ajay",
      date: "5/12/2021",
      startTime: "1pm-2pm",
      endTime: "2pm -3pm",
    },
  },
];

const customers = [
  {
    customerId: "1",
    name: "Raju",
    email: " raju@gmail.com",
    RoomName: "456",
    date: "2/12/2021",
    startTime: "1pm-2pm ",
    endTime: "2pm -3pm",
    BookingId: "12345",
    BookingStatus: "Booked",
  },
  {
    customerId: "2",
    name: "Akash",
    email: " akash@gmail.com",
    RoomName: "300",
    date: "2/12/2021",
    startTime: "1pm-2pm ",
    endTime: "2pm -3pm",
    BookingId: "12346",
    BookingStatus: "Booked",
  },
  {
    customerId: "3",
    name: "Ajay",
    email: " ajay@gmail.com",
    RoomName: "666",
    date: "5/12/2021",
    startTime: "1pm-2pm",
    endTime: "2pm -3pm",
    BookingId: "12347",
    BookingStatus: "Booked",
  },
  {
    customerId: "4",
    name: "Sanjay",
    email: "sanjay@gmail.com",
    date: "5/11/2021",
    RoomName: "778",
    startTime: "1pm-2pm",
    endTime: "2pm -3pm",
    BookingId: "12348",
    BookingStatus: "Booked",
  },
  {
    customerId: "2",
    name: "Akash",
    email: " Akash@gmail.com",
    RoomName: "778",
    date: "24/12/2021",
    startTime: "1pm-2pm",
    endTime: "2pm -3pm",
    BookingId: "12349",
    BookingStatus: "Booked",
  },
  {
    customerId: "1",
    name: "Raju",
    email: " Raju@gmail.com",
    RoomName: "789",
    date: "20/11/2021",
    startTime: "1pm-2pm",
    endTime: "2pm -3pm",
    BookingId: "12344",
    BookingStatus: "Booked",
  },
];

exports.getAllRooms = (req, res) => {
  res.status(200).send(rooms);
};

exports.createRoom = (req, res) => {
  const newRoom = req.body;
  const room = rooms.find((room) => room.roomID == newRoom.roomID);
  if (room) {
    res.send({ message: "This ID is already taken" });
  } else {
    rooms.push(newRoom);
    res.send(newRoom);
  }
};

exports.bookingRoom = (req, res) => {
  const booking = req.body;

  const room = rooms.find((room) => room.roomID === booking.roomID);

  if (!room) {
    res.status(404).send({ error: "Room not found" });
  }
  rooms.map((room) => {
    if (room.roomID === booking.roomID) {
      if (room.customerDetails.date !== booking.date) {
        (room.customerDetails.customerName = booking.customerName),
          (room.customerDetails.date = booking.date),
          (room.customerDetails.startTime = booking.startTime),
          (room.customerDetails.endTime = booking.endTime),
          (room.bookedStatus = true);

        res.send({
          message: "Room Booked Successfully",
          roomDetails: room,
        });
      } else {
        res.send(
          "Room is not available for the selected date. Please chose another room"
        );
      }
    }
    return room;
  });
};

exports.getBookedRooms = (req, res) => {
  res.send(
    rooms.filter((room) => {
      if (room.bookedStatus == true) {
        return {
          "Room Name": room.roomName,
          "Booked Status": "Booked",
          "Customer Name": room.customerDetails.customerName,
          "Date of Reservation ": room.customerDetails.date,
          "Start Time": room.customerDetails.startTime,
          "End Time": room.customerDetails.endTime,
        };
      }
    })
  );
};

exports.getBookedCustomers = (req, res) => {
  res.send(
    rooms
      .filter((room) => {
        return room.bookedStatus === true;
      })
      .map((room) => {
        return {
          "Customer name": room.customerDetails["customerName"],
          "Room Name": room.roomName,
          "Date of Reservation": room.customerDetails.date,
          "Start Time": room.customerDetails.startTime,
          "End Time": room.customerDetails.endTime,
        };
      })
  );
};

exports.getCustomer = (req, res) => {
  let id = req.params.customerID;

  const customerData = customers.filter(
    (customer) => customer.customerId == id
  );

  if (customerData == "") {
    return res.status(404).send({ error: "No Customer Found" });
  } else {
    res.send({ data: customerData });
  }
};
