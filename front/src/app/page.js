'use client'
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";
export default function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState({
    password: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const res = await axios.post("http://127.0.0.1:8000/message-post/", postData, {
        headers : {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200){
      const data = res.data;
      setData(data);
      setIsVisible(true);
      }
    } catch(error){
      console.log(error);
    }
  }
  

  return (
    <div>     
        <form className={styles.formdata} method="POST" onSubmit={handleSubmit}>
        { isVisible && (
        <div className={styles.datacontainer}>
            <a className={styles.data}>{data.message}</a>
        </div>
        )}
          <div className={styles.input_fields}>
            <a className={styles.textupper}>Chatting anonymously</a>
            <input className={styles.password} type="text" placeholder="Enter password"
                value={postData.password} onChange={(e) => setPostData({...postData, password: e.target.value})}></input>

            <textarea className={styles.message} type="text" placeholder="Massage..." 
                value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}></textarea>
            <button className={styles.encrypt} type="submit">Encrypt message</button>
          </div>
        </form>
    </div>
  );
}
