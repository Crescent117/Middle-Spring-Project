import axios from "axios";
import { useEffect, useState } from "react";

function ImgWrap({ inquiry_num }) {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        getImg();
    }, []);

    const getImg = async () => {

        await axios.get("http://localhost:8080/customer/inquiryImage", {
            params: {
                inquiry_num: inquiry_num
            }
        }).then((response) => {
            setImageData(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="image-inner-wrap">
                {imageData && imageData.map((img, index) => (
                    <a href={img.boardimg} key={index}><img src={img.boardimg} alt="1" style={{ width: '200px' }}></img></a>
                ))}
            </div>
        </>
    );
}
export default ImgWrap;