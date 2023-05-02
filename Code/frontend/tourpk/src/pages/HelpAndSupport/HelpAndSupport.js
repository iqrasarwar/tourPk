import React from "react";
import { useDispatch } from "react-redux";
import styles from "./HelpAndSupport.module.css";
import { Form as FormFinal } from "react-final-form";
import { questions } from "../../utils/Constants/Help";
import { helpRequest } from "../../app/features/help/help";
import { useState } from "react";
import { FormField, FAQDropdown, UserTypeDropdown, Button } from "../../components/index";

const HelpAndSupport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const required = (value) => (value ? undefined : "Required");
  const onSubmit = (values, form) => {
    console.log("Form submitted with values:", values);
    form.reset();
    //add selectedfile in values
    console.log(selectedFile)
    values = { ...values, file: selectedFile };
    console.log("Form submitted with values:", values);
    dispatch(helpRequest(values));
  };

  const handleInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Do You Have Questions?</h1>
          <p className={styles.subHeading}>We have answers (well, most of the times!)</p>
          <p className={styles.description}>
            Below you'll find answers to the most common questions you may have about tourpk.
            Also, please feel free to check out our social media pages. If you can't find the
            answers to the questions you are looking for, please contact us through the form
            provided below!
          </p>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.faqContainer}>
              <div className={styles.faqDropdowns}>
                <h2>Frequently Asked Questions</h2>
                {questions.map((question, index) => (
                  <FAQDropdown
                    key={index}
                    question={question.question}
                    answer={question.answer}
                  />))}
              </div>
            </div>
            <div className={styles.tableContainer}>
              <h2>If you still have any questions, contact us by filling the form below</h2>
              <div className={styles.quesForm}>
                <FormFinal
                  onSubmit={onSubmit}
                >
                  {({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                      <p>Are you a tourist or service provider?</p>

                      <UserTypeDropdown
                        name="TouristOrServiceProvider"
                        label="Tourist or Service Provider"
                        options={[
                          { value: "Tourist", label: "Tourist" },
                          { value: "Service Provider", label: "Service Provider" },
                        ]}
                        validate={required}
                        theme="light"
                        value={values}
                        renderIcon={() => null}
                      />

                      <br /> <br />
                      <div className={styles.formFields}>
                        <FormField
                          name="username"
                          label="Username"
                          type="text"
                          placeholder="Enter your username"
                          validate={required}
                          theme="light"
                          value={values}
                          renderIcon={() => null}
                        />
                        <br />
                        <FormField
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="abc@email.com"
                          validate={required}
                          theme="light"
                          value={values}
                          renderIcon={() => null}
                        />
                        <br />
                        <FormField
                          name="questionTitle"
                          label="Question Title"
                          type="text"
                          placeholder="Enter your question title"
                          validate={required}
                          theme="light"
                          value={values}
                          renderIcon={() => null}
                        />
                        <br />
                        <FormField
                          name="questionDescription"
                          label="Question Description"
                          type="paragraph"
                          placeholder="Describe your question"
                          validate={required}
                          theme="light"
                          value={values}
                          renderIcon={() => null}
                        />
                      </div>

                      <div className={styles.uploadMedia}>
                        <label htmlFor="media-upload">Upload Media:&emsp;&emsp;</label>
                        <input
                          id="media-upload"
                          type="file"
                          accept="image/*"
                          className={styles.blogImg}
                          name="file"
                          onChange={handleInputChange}
                        />
                      </div>

                      <Button id={styles.signupBtn} value={"Submit"} type="primary" width={250} btnType="submit" font={" 600 20px Arial, '' "} />
                    </form>
                  )}
                </FormFinal>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src="https://www.transparentpng.com/thumb/question-mark/red-question-mark-with-white-person-illustration-transparent-free-Mchpt4.png" alt="FAQs" />
          </div>
        </div>
      </div>
    </>
  );
};
export default HelpAndSupport;
