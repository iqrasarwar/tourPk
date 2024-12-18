import styles from './TourGuideListing.module.css';
import {
   IconEdit, IconDelete, getReviewsStats, axiosInstance, clearCart, addItem, BookingCalendar,
   useNavigate, useDispatch, useSelector, useParams, ReviewForm, Testimonial, Rating,
   Button, Carousel, React, useEffect, useState
}
   from "../../components/index";

export default function TourGuideListing() {
   const currentUser = useSelector(state => state.user.id);
   const role = useSelector((state) => state.user.role);
   const discount = useSelector(state => state.pricing.discount);
   const { id } = useParams();
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.user.id);
   const [selectedDate, setSelectedDate] = useState(null);
   const [reviews, setreviews] = useState(null);
   const [reviewCount, setreviewCount] = useState(null);
   const [ratingAverge, setratingAverge] = useState(null);
   const [data, setData] = useState(null);
   const [validRange, setValidRange] = useState(true)
   const [bookings, setBookings] = useState(null);
   const [disabledDatesArr, setDisabledDates] = useState(null);
   const navigate = useNavigate();

   const fetchTourGuideBookings = async () => {
      try {
         const response = await fetch(`/tourguide/getAllBookings/${id}`);
         const data = await response.json();
         setBookings(data);
      } catch (error) {
         console.log('Error:', error);
      }
   };

   useEffect(() => {
      const getTourGuide = async () => {
         const response = await axiosInstance.get(`/TourGuide/getTourGuideById/${id}`);
         const { Service: { Reviews, ...serviceData }, TourGuideImages, ...restData } = response.data;
         setreviews(Reviews);
         const TourGuide = restData;
         const Service = serviceData;
         const TourGuideData = {
            Service,
            TourGuide,
            TourGuideImages
         };
         setData(TourGuideData);
         const { reviewsCount, ratingAvg } = getReviewsStats(Reviews);
         setratingAverge(ratingAvg);
         setreviewCount(reviewsCount);
      };
      fetchTourGuideBookings();
      getTourGuide();
   }, [id]);

   const handleDateChange = (date) => {
      setSelectedDate(date.toISOString().split('T')[0]);
   };

   const handleClick = () => {
      if (selectedDate == null) {
         swal({
            title: 'Date Missing',
            text: 'First select an available date from the calender.',
            icon: 'error',
            buttons: {
               confirm: true,
            },
         })
         return;
      }
      dispatch(clearCart());
      const newItem = {
         imageSrc: data.TourGuideImages[0].imageUrl,
         title: data.Service.name,
         count: 1,
         price: data.TourGuide.perDayRate,
         discountedPrice: data.TourGuide.perDayRate - (data.TourGuide.perDayRate * (discount / 100)),
      };
      dispatch(addItem(newItem));
      const totalPrice = data.TourGuide["perDayRate"];
      const payLaod = { userId, id, selectedDate, totalPrice, type: "tourguide" };
      navigate("/checkout", { state: { payLaod } });
   }

   const handleDelete = () => {
      swal({
         title: 'Are you sure?',
         text: 'You will not be able to recover this Listing!',
         icon: 'warning',
         buttons: ['Cancel', 'Confirm'],
         dangerMode: true,
      }).then((clickedBtn) => {
         if (clickedBtn) {
            const ids = {
               ServiceId: data.Service.id,
               TourGuideId: data.TourGuide.id
            };
            axiosInstance.post(`/tourguide/deleteTourGuide/`, ids);
            navigate("/");
         }
      });
   }

   const handleUpdate = () => {
      const state = {
         data, serviceType: "Tour Guide"
      }
      navigate("/AddService?edit=1", { state: state });
   }

   useEffect(() => {
      if (bookings) {
         const disabledDates = bookings.map((booking) => new Date(booking.bookingDate));
         setDisabledDates(disabledDates);
      }
   }, [bookings]);

   if (!data) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <div className={styles.information}>
               <div className={styles.headingContainer}>
                  <h1 className={styles.heading}>Meet {data.Service.name}</h1>
                  <div className={styles.iconsDelEdit}>
                     {currentUser === data.TourGuide.UserId && (
                        <div className={styles.iconsBox}>
                           <button className={styles.delete} onClick={handleUpdate}>
                              <IconEdit />
                           </button>
                           <button className={styles.delete} onClick={handleDelete}>
                              <IconDelete />
                           </button>
                        </div>
                     )}
                  </div>
               </div>
               <div className={styles.attributesContainer}>
                  {Object.entries(data.TourGuide).map(([key, value]) => (
                     key !== 'id' && key !== 'ServiceId' && key !== 'UserId' ? (
                        <div className={styles.attributes} key={key}>
                           <p className={styles.key}>{key}</p>
                           <p>{value}</p>
                        </div>
                     ) : null
                  ))}
               </div>
            </div>

            <Carousel imageList={data.TourGuideImages} />
         </div>

         <div className={styles.details}>
            <div className={styles.about}>
               <div>
                  <h2 className={styles.subHeading}>About  {data.Service.name}</h2>
                  <p className={styles.description}>{data.Service.description}</p>
               </div>
               <div>
                  <h2 className={styles.subHeading}>People's Opinion</h2>
                  <Testimonial data={reviews} />
               </div>
               {role == "tourist" && <ReviewForm serviceId={data.Service.id} setReview={setreviews} />}
            </div>
            <div>
               {reviewCount != 0 ? (
                  <>
                     <Rating rating={ratingAverge} />
                     <p className={styles.ratingText}>Based on {reviewCount} Reviews</p>
                  </>
               ) : null
               }
               <div>
                  <h2 className={styles.subHeading}>Pricing</h2>
                  <div className={styles.pricing}>
                     <p className={styles.pricingKey}>Per Day</p>
                     <p className={styles.pricingValue}>{data.TourGuide.perDayRate}</p>
                  </div>
               </div>
               <div>
                  <h2 className={styles.subHeading}>Booking Calendar</h2>
                  <div className={styles.calendar}>

                     <BookingCalendar
                        selectRange={false}
                        setValidRange={setValidRange}
                        disabledDates={disabledDatesArr}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                     />
                  </div>
               </div>
               {role == "tourist" && <div className={styles.booking}>

               <p>Select a date from the given calender to book.</p>
               <Button btnType="submit" value="Book Now" handleClick={handleClick} />
               </div>}
            </div>
         </div>
         
      </div>
   );
}