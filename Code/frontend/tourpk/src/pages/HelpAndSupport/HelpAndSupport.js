import React from "react";
import { useDispatch } from "react-redux";
import styles from "./HelpAndSupport.module.css";
import { Form as FormFinal } from "react-final-form";
import { questions } from "../../utils/Constants/Help";
import { helpRequest } from "../../app/features/help/help";
import { useState } from "react";
import { FormField, FAQDropdown, UserTypeDropdown, Button, Dropdown } from "../../components/index";

const HelpAndSupport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [role,setRole] = useState("Tourist");

  const dispatch = useDispatch();
  const required = (value) => (value ? undefined : "Required");
  const onSubmit = (values, form) => {
    if (selectedFile) {
      values["file"] = selectedFile;
    }
    console.log("Form submitted with values:", values);
    values["role"]  = role;
    dispatch(helpRequest(values));
    form.reset();
  };
  const handleInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (selectedOption) => {
    setRole(selectedOption)
  }

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
              <h2>Still have questions? Fill the form below to contact us</h2>
              <div className={styles.quesForm}>
                <FormFinal
                  onSubmit={onSubmit}
                >
                  {({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                      <p>Are you a tourist or service provider?</p>
                      <Dropdown
                          name="roleTye"
                          label="Role Type"
                          optionsValues={[
                              {
                                  "id": 1,
                                  "name": "Tourist",
                              },
                              {
                                  "id": 2,
                                  "name": "Service Provider",
                              },
                          ]}
                          validate={required}
                          theme="light"
                          value={role}
                          placeholder="Choose Your Role"
                          renderIcon={() => null}
                          onChange={(selectedOption) => handleChange(selectedOption)}
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
