import "react-quill/dist/quill.snow.css";
import styles from "./AddBlog.module.css";
import { axiosInstance } from '../../../src/utils/index';
import {
    CategoryContainer, addBlog, updateBlog,
    React, useState, useSelector, useDispatch,
    useLocation, useNavigate, ReactQuill
} from '../../components';

const AddBlog = () => {
    let { state } = useLocation();
    console.log(state, "---------------------");
    const [isEditMode, setisEditMode] = useState(false);
    useEffect(() => {
        state ? setisEditMode(true) : null;
    }, [])

    const [value, setValue] = useState(state?.postText || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || "");

    const blogCategories = useSelector((state) => state.blogs.blogCategories);
    const userId = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const upload = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axiosInstance.post("/upload", formData);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const addOrUpdate = async (blog) => {
        const resultAction = await dispatch(state ? updateBlog({ ...blog, id: state.id }) : addBlog(blog));
        const addedBlogId = !isEditMode ? resultAction.payload.id : state.id;
        navigate(`/Blog/${addedBlogId}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let imggg, imgUrl;
        if (isEditMode && !file)
            imggg = state.image;
        else
            imgUrl = await upload(event);
        const blog = {
            title: title,
            postText: value,
            category,
            image: imggg ? imggg : imgUrl,
            UserId: userId
        };
        addOrUpdate(blog);
    }
    return (
        <div className={styles.container}>
            <form className={styles.content} onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    className={styles.title}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className={styles.editorContainer}>
                    <ReactQuill
                        className={styles.editor}
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
                <div className={styles.publish}>
                    <input
                        type="file"
                        className={styles.blogImg}
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        placeholder="Select an image file"
                    />

                    <button className={styles.buttonPrimary} type="submit">
                        Publish
                    </button>
                </div>
            </form>
            <div className={styles.menu}>
                <div className={styles.item}>
                    <h1>Select Category</h1>
                    {blogCategories.map((cat, index) => {
                        return (
                            <CategoryContainer
                                onChange={(e) => setCategory(e.target.value)}
                                catName={cat.name}
                                category={category}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AddBlog;