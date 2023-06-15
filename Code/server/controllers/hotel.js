const { User, Service, Hotel, HotelImage, Review, Room, BookingHotel } = require("../models/");
const {scheduleDeleteBooking} = require("../scheduler")

exports.addHotel = async (req, res) => {
    console.log("*********----START--", req.body, "----END----***********");

    const service = req.body.service;
    const hotel = req.body.hotel;
    const images = req.body.images;
    const room = req.body.room;

    const serviceObj = await Service.create(service); //1. add in service table
    hotel.ServiceId = serviceObj.id;
    const hotelObj = await Hotel.create(hotel); //2. add in hotel table
    let rootPath = "../static/images/upload/";
    for (const img in images) {
        let imgUrl = rootPath + images[img];
        const image = {
            imageUrl: imgUrl,
            HotelId: hotelObj.id
        };
        await HotelImage.create(image); //3. add in images table
    }
    room.HotelId = hotelObj.id;
    const roomObj = await Room.create(room); //4. add in room table
    res.status(200).json(roomObj.dataValues.id);
}

exports.getHotelById = async (req, res) => {
    const id = req.params.id;
    const data = await Hotel.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Service,
                include: [
                    {
                        model: Review,
                        attributes: ['rating', 'review', 'date'],
                        include: [
                            {
                                model: User,
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
            },
            {
                model: HotelImage,
            },
            {
                model: Room,
            },
        ]
    });

    res.json(data);
}

exports.getAllHotels = async (req, res) => {
    const hotels = await Hotel.findAll({
        attributes: ['id'],
        include: [
            {
                model: Service,
                attributes: ['name', 'address'],
                include: [
                    {
                        model: Review,
                    },
                ],
            },
            {
                model: HotelImage,
                attributes: ['imageUrl']
            }
        ],
    });

    res.json(hotels);
}

exports.deleteHotel = async (req, res) => {
    console.log(req.body)
    await Room.destroy({ where: { HotelId: req.body.HotelId } });
    await HotelImage.destroy({ where: { HotelId: req.body.HotelId } });
    await Hotel.destroy({ where: { ServiceId: req.body.ServiceId } });
    await Review.destroy({ where: { ServiceId: req.body.ServiceId } });
    await Service.destroy({ where: { id: req.body.ServiceId } });
    res.status(200).json("deleted sucessfully");
}

exports.updatehotel = async (req, res) => {
    console.log(req.body);
    const { service, hotel, room } = req.body; // Destructure the objects from the request body
    const images = service.images;
    const servicDta = {
        name: service.name,
        description: service.description,
        email: service.email,
        website: service.website,
        phone: service.phone,
        city: service.city,
        province: service.province,
        address: service.address,
    }

    try {
        await Service.update(servicDta, {
            where: { id: service.id }
        });

        await Hotel.update(hotel, {
            where: { id: hotel.id }
        });

        await Room.update(room, {
            where: { id: room.id }
        });

        let rootPath = "../static/images/upload/";
        const hotelImages = images.map((image) => ({
            imageUrl: rootPath + image,
            HotelId: hotel.id
        }));

        await HotelImage.bulkCreate(hotelImages, {
            updateOnDuplicate: ['imageUrl'] // Update the image URL if already exists
        });


        res.status(200).json(hotel.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update tour guide' });
    }
}

exports.addBooking = async (req, res) => {
  try {
    const { startDate, numberOfDays, totalPrice, userId, endDate, hotelId, roomId } = req.body; 
    const newBooking = await BookingHotel.create({
      startDate,
      numberOfDays,
      totalPrice,
      UserId: userId, 
      HotelId: hotelId, 
      RoomId: roomId 
    });

    const hotel = await Hotel.findByPk(hotelId);
    const room = await Room.findByPk(roomId);
    if(endDate == false)
    scheduleDeleteBooking(newBooking.id, startDate);
    else
    scheduleDeleteBooking(newBooking.id, endDate);

    // Respond with the created booking and associated data
    res.status(201).json({
      newBooking,
    //   user,
      hotel,
      room
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Failed to add booking' });
  }
};
