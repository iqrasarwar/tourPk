import styles from "./CheckOut.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { Footer } from "../../components/Footer/Footer";
import { PaymentMethod } from "../../components/PaymentMethod/PaymentMethod";
import { OrderReview } from "../../components/OrderReview/OrderReview";
import { BillingAddress } from "../../components/BillingAddress/BillingAddress";
import { DiscountCodes } from "../../components/DiscountCodes/DiscountCodes";
import { BillingSummary } from "../../components/BillingSummary/BillingSummary";

const CheckOut = () => {
   return (
      <div>
         <NavBar />
         <div className={styles.container}>
            <div className={styles.header}>
               <p className={styles.subHeading}>BOOK YOUR DREAM VACATIONS WITH CONFIDENCE</p>
               <h1 className={styles.Heading}>Checkout in a few Clicks</h1>
            </div>
            <BillingAddress />
            {/* <PaymentMethod />
            <OrderReview />
            <DiscountCodes />
            <BillingSummary /> */}
         </div>
         <Footer />
      </div>
   );
};

export default CheckOut;