import styles from './GenericInfoAboutService.module.css'
import { Dropdown, Button, YesNoDropdown, RolesDropdown, FinalForm, useState } from "../../components/index";

const GenericInfoAboutService = () => {
  const [formData, setFormData] = useState(null);
  const onSubmit = (values, form) => {
    setFormData(values); // Store the form data in state
    form.reset();
    Object.keys(values).forEach(key => {
      form.change(key, undefined);
      form.resetFieldState(key);
    });
  };

  return (<>
    <div className={styles.container}>
      <img className={styles.image} alt="Cities" src="../../static/images/sectionHero.png" />
      <div className={styles.content}>
        <div className={styles.heading}>
          <p>Add a service to <span className={styles.logo}>tourPk</span></p>
        </div>
        <p className={styles.description}>
          Are you planning a vacation to enjoy your free time? Looking for a
          place to explore, eat and enjoy your vacation with your loved ones
          or Are you a solo traveler who travels often for a wonderful experiences.
          Are you planning a vacation to enjoy your free time? Looking for a place
          to explore, eat and enjoy your vacation with your loved ones or Are you
          a solo traveler who travels often for a wonderful experiences.Are you
          planning a vacation to enjoy your free time? Looking for a place to
          explore, eat and enjoy your vacation with your loved ones or Are you
          a solo traveler who travels often for a wonderful experiences.
        </p>
      </div>
    </div>

    <div className={styles.formContainer}></div>
    <div className={styles.tableContainer}>
      <div className={styles.quesForm}>
        <FinalForm
          onSubmit={onSubmit}
          subscription={{
            submitted: true,
          }}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <h1>Choose the kind of service below</h1>
              <Dropdown />

              <h2 className={styles.G_heading2}>Are you the owner, employee, or official representative of this place?</h2>
              <YesNoDropdown />

              <h2 className={styles.G_heading2}>Does this place already have a listing on tourPk?</h2>
              <YesNoDropdown />

              <h2 className={styles.G_heading2}>What is your role?</h2>
              <RolesDropdown />

              <h2 className={styles.G_heading2}>Is this place currently open?</h2>
              <YesNoDropdown />

              <br />
              <br />
              <Button id={styles.signupBtn} value={"Continue"} type="primary" width={150} btnType="submit" font={" 500 20px Arial, '' "} />
            </form>
          )}
        </FinalForm>
      </div>
    </div>
  </>
  );
};
export default GenericInfoAboutService;
