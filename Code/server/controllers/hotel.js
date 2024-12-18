const { User, Service, Hotel, HotelImage, Review, Room, BookingHotel } = require("../models/");
const { scheduleDeleteBooking } = require("../scheduler");
const { Op } = require("sequelize");

exports.addHotel = async (req, res) => {
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
    res.status(200).json(room.HotelId);
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
    await Room.destroy({ where: { HotelId: req.body.HotelId } });
    await HotelImage.destroy({ where: { HotelId: req.body.HotelId } });
    await Hotel.destroy({ where: { ServiceId: req.body.ServiceId } });
    await Review.destroy({ where: { ServiceId: req.body.ServiceId } });
    await Service.destroy({ where: { id: req.body.ServiceId } });
    res.status(200).json("deleted sucessfully");
}
exports.updatehotel = async (req, res) => {
    const { service, hotel, room } = req.body;
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
        if (endDate == false)
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
        res.status(500).json({ error: 'Failed to add booking' });
    }
};
exports.addRoom = async (req, res) => {
    const room = req.body;
    const roomObj = await Room.create(room);
    res.status(200).json("done");

}
exports.getBookingsByIds = async (req, res) => {
    try {
        const { hotelId, roomId } = req.query;
        const bookings = await BookingHotel.findAll({
            where: {
                HotelId: hotelId,
                RoomId: roomId
            }
        });

        res.status(200).json({
            bookings
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
};

exports.deleteBookingById = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const deletedBookings = await BookingHotel.destroy({
            where: {
                id: bookingId
            }
        });

        res.status(200).json({
            deletedBookings
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bookings' });
    }
};


exports.searchHotel = async (req, res) => {
    const result = await Hotel.findAll({
        attributes: ['id'],
        include: [
            {
                model: Service,
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + req.params.searchkey + '%' } },
                        { address: { [Op.like]: '%' + req.params.searchkey + '%' } },
                        { city: { [Op.like]: '%' + req.params.searchkey + '%' } },
                        { description: { [Op.like]: '%' + req.params.searchkey + '%' } }
                    ]
                },
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
            },
        ],
    });
    res.json(result);
}