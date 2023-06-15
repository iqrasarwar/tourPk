import React, { useState } from "react";
import { Form as FormFinal } from 'react-final-form'
import styles from './AddService.module.css'
import { FormField, Button } from "../../components/index";
import { required, validatePhone, validateEmail, validateAlpha, validateURL } from '../../utils/validations';
import Dropdown from "../../components/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router";
import axiosInstance from "../../utils/Api";

const AddService = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isEditMode = searchParams.get('edit') === '1';
    console.log(isEditMode);

    let data, serviceType;
    let updateInitialValue;
    if (location.state) {
        ({ data, serviceType } = location.state);
        updateInitialValue = data.Service;
        console.log(data);
    }

    console.log(serviceType);
    console.log(data);


    const handleChange = (selectedOption) => {
        setService(selectedOption);
    };
    


    const onSubmit = async (values, event) => {
        
        console.log(values);


    };

    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <div className={styles.header}>
                    <p className={styles.subHeading}>Search any of the services on tourPk</p>
                    <FormFinal
                        onSubmit={onSubmit}>
                        {({ handleSubmit, values }) => (
                            <form onSubmit={handleSubmit} className={styles.serviceType}>
                                <Dropdown
                                    name="serviceType"
                                    label="Service Type"
                                    optionsValues={[
                                        {
                                            "id": 1,
                                            "name": "Hotel",
                                        },
                                        {
                                            "id": 2,
                                            "name": "Restaurant",
                                        },
                                        {
                                            "id": 3,
                                            "name": "Tour Guide",
                                        },
                                        {
                                            "id": 4,
                                            "name": "Travel Agent",
                                        }
                                    ]}
                                    validate={required}
                                    theme="light"
                                    value={service}
                                    placeholder="Choose Service Type"
                                    renderIcon={() => null}
                                    onChange={(selectedOption) => handleChange(selectedOption)}
                                />

                                <FormField
                                        name="name"
                                        label="Name"
                                        type="text"
                                        placeholder={service == "Hotel" ? "PC Hotel" : service == "Tour Guide" ? "Iqra" : service == "Travel Agent" ? "PK Tours" : "Khaba"}
                                        validate={required}
                                        theme="light"
                                        value={values}
                                        // defaultValue={isEditMode ? data.Service.name : null}
                                        defaultValue={initialValue.name}
                                        renderIcon={() => null}
                                />      
                            </form>
                        )}
                    </FormFinal>
                </div>
            </div>
            {service != "" &&
                <div className={styles.content}>
                    <div className={styles.formFields}>
                        <FormFinal
                            onSubmit={onSubmit}
                            subscription={{
                                submitted: true
                            }} >
                            {({ handleSubmit, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <h2 className={styles.subTitle}>About {service}</h2>
                                    <FormField
                                        name="name"
                                        label="Name"
                                        type="text"
                                        placeholder={service == "Hotel" ? "PC Hotel" : service == "Tour Guide" ? "Iqra" : service == "Travel Agent" ? "PK Tours" : "Khaba"}
                                        validate={required}
                                        theme="light"
                                        value={values}
                                        // defaultValue={isEditMode ? data.Service.name : null}
                                        defaultValue={initialValue.name}
                                        renderIcon={() => null}
                                    />
                                    <FormField
                                        name="description"
                                        label="Description"
                                        type="text"
                                        placeholder="About your service"
                                        validate={required}
                                        theme="light"
                                        value={values}
                                        defaultValue={initialValue.description}
                                        renderIcon={() => null}
                                    />
                                    <FormField
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="abc@email.com"
                                        validate={validateEmail}
                                        theme="light"
                                        value={values}
                                        defaultValue={initialValue.email}
                                        renderIcon={() => null}
                                    />
                                    <FormField
                                        name="website"
                                        label="Website URL"
                                        type="text"
                                        placeholder="pc.com"
                                        validate={validateURL}
                                        theme="light"
                                        value={values}
                                        defaultValue={initialValue.website}
                                        renderIcon={() => null}
                                    />
                                    <FormField name="phone" label="Phone no." type="text" placeholder="Your Phone Number" validate={validatePhone} theme="light" defaultValue={initialValue.phone} renderIcon={() => null} />
                                    <h2 className={styles.subTitle}>Location</h2>
                                    <FormField name="city" label="City" type="text" placeholder="Lahore" validate={validateAlpha} theme="light" value={values} defaultValue={initialValue.city} renderIcon={() => null} />
                                    <FormField name="province" label="State/Province" type="text" placeholder="Punjab" validate={validateAlpha} theme="light" value={values} defaultValue={initialValue.province} renderIcon={() => null} />
                                    <FormField name="address" label="Street Address" type="text" placeholder="Street # 1" validate={required} theme="light" value={values} defaultValue={initialValue.address} renderIcon={() => null} />
                                    <div className={styles.uploadMedia}>
                                        <label htmlFor="media-upload"> Photos related to your service</label>
                                        <input
                                            id="media-upload"
                                            type="file"
                                            className={styles.imgBtn}
                                            name="files"
                                            onChange={(e) => setFiles(Array.from(e.target.files))}
                                            multiple
                                        />

                                    </div>
                                    <Button value="Continue" type="submit" btnType="submit" />
                                </form>
                            )}
                        </FormFinal>
                    </div>
                    <div className={styles.imageContainer}>
                        <img src={image} alt="FAQs" />
                    </div>
                </div>}

        </div>
    );
};
export default AddService;
