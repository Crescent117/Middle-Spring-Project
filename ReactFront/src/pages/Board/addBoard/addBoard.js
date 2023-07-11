import './addBoard.css'
import { Container } from 'react-bootstrap';
import SelectType from './component/selectType';
import { useRef, useState } from 'react';
import axios from 'axios';
import Ckeditor from '../components/ckeditor';
import ImageUpload from './component/imageUpload';

function AddBoard() {
    const typeSelect = useRef("0");
    const titleInputRef = useRef("");
    const ckeditorData = useRef("");
    const uploadedImages = useRef([]);
    const [content, setContent] = useState(undefined);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleValueChange = (slValue) => {
        typeSelect.current = slValue;
        console.log(slValue);
    };

    const handleTitleValueChange = (TitleValue) => {
        titleInputRef.current = TitleValue;
    };



    const fetchData = async () => {
        console.log(titleInputRef.current);
        console.log(ckeditorData.current);
        console.log(uploadedImages.current);

        if (typeSelect.current === "0")
            window.alert("게시판 태그를 선택해주세요!");
        else if (titleInputRef.current.length <= 3)
            window.alert("제목을 3글자 이상 입력해주세요!");
        else if (ckeditorData.current.length <= 5)
            window.alert("본문은 5글자 이상 입력해주세요!")
        else {

            try {
                // 텍스트 데이터 전송
                const response = await axios.post("http://localhost:8080/board/createBoard", {
                    b_title: titleInputRef.current,
                    b_type: typeSelect.current,
                    b_content: ckeditorData.current,
                });

                const data = response.data;
                console.log(response.data);
                const boardId = data;  // 서버에서 생성된 게시물 ID를 기반으로 함. 적절한 Key로 대체해야 함.

                if (selectedFiles.length > 0) {
                    // 이미지 데이터 전송
                    const formData = new FormData();

                    // 이미지 파일 추가
                    selectedFiles.forEach((file) => {
                        formData.append("file", file);
                    });

                    // boardId와 함께 이미지 업로드 API에 전송
                    const imageResponse = await axios.post(`http://localhost:8080/board/imageUpload/${boardId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    console.log(imageResponse);
                }

                window.location.href = "/board";
            } catch (error) {
                console.log("HTTP error");
                console.log(error);
            }
        }
    };


    function cancle() {
        if (window.confirm("글 작성을 취소하시겠습니까?")) {
            window.location.href = "/board";
        }
    }

    return (
        <div className='create-board'>
            <Container>
                <SelectType
                    typeSelect={typeSelect}
                    onValueChange={handleValueChange}
                    inputRef={titleInputRef}
                    setTitleValue={handleTitleValueChange}
                />
                <hr />
                <Ckeditor
                    ckeditorData={ckeditorData}
                    //onImageUpload={handleImageUpload}
                    content={content}
                    setContent={setContent}
                />

                <ImageUpload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />

                <br />
                <div id="insert-btn-wrap">
                    <input type="button" id="cancle-btn" className="btn btn-blue" onClick={cancle} value="취소" />
                    <input type="submit" className="btn btn-blue" id="submit" onClick={fetchData} value="확인" />
                </div>
            </Container>
        </div>
    );
}

export default AddBoard;