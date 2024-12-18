import styles from './AccountVerification.module.css';
import {
  FinalForm, FormField, Button, validatePhoneWithCode, axiosInstance,
  updatePhoneNumberVerification, React, useState, useSelector,
  useNavigate, useDispatch
} from '../../components';

function AccountVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.id)

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpCodeChange = (e) => {
    setOtpCode(e.target.value);
  };

  const handleVerificationSubmit = async (values) => {
    try {
      setIsLoading(true); 
      const response = await axiosInstance.post('/verify/start-verification', {
        phoneNumber: values.phoneNumber,
      });
      swal({
        title: 'Verification Started!',
        text: response.data.message,
        icon: 'info',
        buttons: {
          confirm: true,
        },
      })
      setVerificationStarted(true);
      setPhoneNumber(values.phoneNumber)
      setVerificationStatus(response.status); 
      setIsLoading(false); 
    } catch (error) {
      swal({
        title: 'Verification Failed!',
        text: 'Failed to initiate verification',
        icon: 'warning',
        buttons: {
          confirm: true,
        },
      })
      setVerificationStatus(error.response.status); 
      setIsLoading(false); 
    }
  };

  const handleOtpSubmit = async (values) => {
    try {
      setIsLoading(true); 
      const response = await axiosInstance.post('/verify/check-verification', {
        phoneNumber: values.phoneNumber,
        verificationCode: values.otpCode,
      });
      if (response.data.success) {
        swal({
          title: 'Code Verified!',
          text: 'Your phone number is successfully verified.',
          icon: 'success',
          buttons: {
            confirm: true,
          },
        })
        setVerificationStatus(response.status); 
        dispatch(updatePhoneNumberVerification({ userId, phoneNumber }));
        navigate("/serviceProvider")
      } else {
        swal({
          title: 'Not Verified!',
          text: 'Verification code is invalid or expired.',
          icon: 'error',
          buttons: {
            confirm: true,
          },
        })
        setVerificationStatus(response.status); 
      }
      setIsLoading(false); 
    } catch (error) {
      swal({
        title: 'Not Verified!',
        text: 'Failed to check verification code.',
        icon: 'error',
        buttons: {
          confirm: true,
        },
      })
      setVerificationStatus(error.response.status); 
      setIsLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
        <FinalForm
          onSubmit={verificationStarted ? handleOtpSubmit : handleVerificationSubmit}
          render={({ handleSubmit, values }) => (
            <div className={styles.wrapper}>
              <form onSubmit={handleSubmit}>
                {!verificationStarted ? (
                  <div>
                    <h1 className={styles.heading}>Verify Phone Number</h1>
                    <FormField
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      renderIcon={() => null}
                      labelClass="showLabel"
                      theme="light"
                      validate={validatePhoneWithCode}
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className={styles.heading}>OTP Code Verification</h1>
                    <FormField
                      name="otpCode"
                      label="OTP Code"
                      type="text"
                      labelClass="showLabel"
                      theme="light"
                      placeholder="Enter OTP code"
                      value={otpCode}
                      onChange={handleOtpCodeChange}
                      renderIcon={() => null}
                    />
                  </div>
                )}
                <Button type="submit" btnType="primary" value="Verify" width={250} disabled={isLoading} /> {/* Disable the button when loading */}
              </form>
            </div>
          )}
        />
        {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default AccountVerification;
