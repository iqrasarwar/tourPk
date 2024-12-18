import styles from "../AddHotel/AddHotel.module.css";
import {
    useState, Dropdown, required, validateURL,
    React, Button, useNavigate, FinalForm, useLocation, axiosInstance, FormField, validateEmail, validatePhone, validateAlpha, useSelector
}
    from "../../components/index";

const AddService = () => {
    const role = useSelector((state) => state.user.role);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isEditMode = searchParams.get('edit') === '1';

    let data, serviceType;
    let updateInitialValue;
    if (location.state) {
        ({ data, serviceType } = location.state);
        updateInitialValue = data.Service;
    }
    const addInitialValue = {
        "id": "",
        "name": "",
        "description": "",
        "address": "",
        "city": "",
        "province": "",
        "phone": "",
        "email": "",
        "website": ""
    }

    const initialValue = isEditMode ? updateInitialValue : addInitialValue;

    const [files, setFiles] = useState([]);
    const [service, setService] = useState(serviceType ? serviceType : "");
    const navigate = useNavigate();

    const handleChange = (selectedOption) => {
        setService(selectedOption);
    };
    const upload = async () => {
        try {
            const uploadPromises = files.map((file) => {
                const formData = new FormData();
                formData.append("file", file);
                return axiosInstance.post("/upload", formData);
            });
            const responses = await Promise.all(uploadPromises);
            const imageUrls = responses.map((res) => res.data);
            return imageUrls;
        } catch (err) {
            console.log(err);
        }
    };

    const image =
        service == "Hotel" ? "../static/images/addHotel.png" :
            service == "Tour Guide" ? "../static/images/addTourGuide.png" :
                service == "Travel Agent" ? "../static/images/addTravelAgent.png" : "../static/images/addResturant.png"

    const onSubmit = async (values, event) => {
        const imageUrls = await upload();
        values.images = imageUrls;
        if (isEditMode)
            values.id = data.Service.id;
        var URL = service == "Hotel" ? "addHotel" :
            service == "Tour Guide" ? "addTourGuide" :
                service == "Travel Agent" ? "addTravelAgent" : "addrestaurant"
        if (isEditMode)
            URL += "?edit=1"
        let nothing = {
            somedata: ""
        }

        let obj;
        if (service == "Hotel")
            obj = isEditMode ? data.Hotel : nothing;
        else if (service == "Tour Guide")
            obj = isEditMode ? data.TourGuide : nothing;
        else if (service == "Travel Agent")
            obj = isEditMode ? data.TravelAgent : nothing;
        else if (service == "Restaurant")
            obj = isEditMode ? data.Restaurant : nothing;

        //navigate to corresponding add Service
        navigate(`/${URL}`, {
            state: { values, obj }
        });
    };

    return (
        <>
            {role === "seller" ? (
                <div className={styles.container}>
                    <div className={styles.flex}>
                        <div className={styles.header}>
                            <h1 className={styles.heading}>Are You A Service Provider?</h1>
                            <p className={styles.subHeading}>Offer your services through TourPK</p>
                            <p className={styles.description}>
                                If you can't find the answers to the questions you are looking for, please contact us through the form
                                provided below! If you can't find the answers to the questions you are looking for, please contact us through the form
                                provided below!
                            </p>
                            <FinalForm
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
                                    </form>
                                )}
                            </FinalForm>
                        </div>
                        <img className={styles.image} alt="Cities" src="../../static/images/serviceProvider.png" />
                    </div>
                    {service != "" &&
                        <div className={styles.content}>
                            <div className={styles.formFields}>
                                <FinalForm
                                    onSubmit={onSubmit}
                                    subscription={{
                                        submitted: true
                                    }} >
                                    {({ handleSubmit, values }) => (
                                        <form onSubmit={handleSubmit}>
                                            <p className={styles.subHeading}>About {service}</p>
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
                                            <p className={styles.subHeading}>Location</p>
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
                                            <div className={styles.btn}>
                                                <Button value="Continue" type="submit" btnType="submit" />
                                            </div>
                                        </form>
                                    )}
                                </FinalForm>
                            </div>
                            <div className={styles.imageContainer}>
                                <img src={image} alt="FAQs" />
                            </div>
                        </div>}
                </div>) :
                (<img src="../static/images/404.png" alt="" />)
            }
        </>
    );
};
export default AddService;
