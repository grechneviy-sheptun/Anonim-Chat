'use client'
import styles from './page.module.css'
import { useState } from 'react';
import axios from 'axios';




export default function decryptMessage({params}) {
    const {url} = params;
    const [postData, setPostData] = useState({
        key: ""
    });
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({
        message: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post(`http://127.0.0.1:8000/message-get/${url}/`, postData);
            if(res.status === 200){
                const data = res.data;
                setData(data.message);
                setIsVisible(true);
            }
        }catch (error) {
            console.log(error)
        }
    }


return (
    <div className={styles.input_fields}>
        <form className={styles.formdata} method='POST' onSubmit={handleSubmit}>
            <div className={styles.incontainer}>
                <input type="text" placeholder='Enter key for decrypt message' 
                className={styles.key} value={postData.key} onChange={(e) => setPostData({key: e.target.value})}/>
                <button className={styles.decrypt} type='submit'>Decrypt</button>
            </div>
        </form>
        <div>
            {isVisible && (
                <div>{data}</div>
            )}
        </div>
    </div>
    );    
}