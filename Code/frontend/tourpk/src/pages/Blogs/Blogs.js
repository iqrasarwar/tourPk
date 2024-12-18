import styles from "./Blogs.module.css";
import 'react-tabs/style/react-tabs.css';
import {
    HorizontalScroll, useDispatch, useEffect,
    React, fetchBlogs, useSelector
}
    from "../../components/index";


const Blogs = () => {
    const dispatch = useDispatch();
    const blogCategories = useSelector((state) => state.blogs.blogCategories);
    useEffect(() => {
        const s = dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Tourist Attraction Blogs of Pakistan</h1>
                <p> Natural beauty is un matched. Pakistan have world most beautiful places for visit, specially at its best in northern areas of Pakistan and Kashmir region. This part of the country is famous all around the world because of sky high mountains, lush green valleys, mighty rivers, beautiful lakes, and amazing wildlife. The Pradise on Earth ‘Neelum Valley’ Mini Switzerland ‘Swat Valley’ and Mountain Kingdom ‘Hunza valley’ are the major tourist attractions in Pakistan. All these places are real natural beauty of the world. Here, below is a list of Best Natural Places to Visit in Pakistan. </p>
                <div className={styles.tabs}>
                    {blogCategories.map((category) => {
                        return (
                            <div key={category.id}>
                                <h1 className={styles.blogHeading}>{category.name}</h1>
                                <HorizontalScroll blogs={category.blogs} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Blogs;