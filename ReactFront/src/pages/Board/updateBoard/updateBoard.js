import './updateBoard.css'
import { Container } from 'react-bootstrap';
import SelectType from './component/selectType';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Ckeditor from '../components/ckeditor';
import { useLocation } from 'react-router-dom';
import ImageUpload from './component/imageUpload';

function UpdateBoard() {
    const ckeditorData = useRef("");
    const uploadedImages = useRef([]);
    const [title, setTitle] = useState("");
    const [typeSelect, setTypeSelect] = useState("0")
    const [content, setContent] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [originBoardImg, setOriginBoardImg] = useState([]);
    const [ImageCheck, setImageCheck] = useState("");
    //주소에서 값가져오기
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search)
    const board_id = urlSearch.get("board_id")

    useEffect(() => {
        async function ready() {
            const detailData = await getDetailInfo();
            setTypeSelect(detailData.b_type);
            setTitle(detailData.b_title);
            setContent(detailData.b_content);
            setOriginBoardImg(detailData.boardImg)
        }

        ready();
    }, []);
    useEffect(() => {
        async function ready() {
            const detailData = await getDetailInfo();
            setOriginBoardImg(detailData.boardImg)
        }

        ready();
    }, [ImageCheck]);

    const handleValueChange = (slValue) => {
        typeSelect.current = slValue;
    };

    const getDetailInfo = async () => {
        const board_id = urlSearch.get("board_id")

        const response = await axios.get('http://localhost:8080/board/updateBoard', {
            params: {
                board_id: board_id
            }
        });
        console.log(response)
        return response.data;
    }

    const fetchData = async () => {
        console.log(title.current);
        console.log(ckeditorData.current);
        console.log(uploadedImages.current);


        console.log(title)
        console.log(ckeditorData.current)
        if (typeSelect.current === "0")
            window.alert("게시판 태그를 선택해주세요!");
        // else if (title.length <= 3)
        //     window.alert("제목을 3글자 이상 입력해주세요!");
        else if (ckeditorData.current.length <= 5)
            window.alert("본문은 5글자 이상 입력해주세요!")
        else {

            try {
                // 텍스트 데이터 전송
                const response = await axios.post("http://localhost:8080/board/updateBoard", {
                    b_title: title,
                    b_type: typeSelect,
                    b_content: ckeditorData.current,
                    board_id: board_id
                });

                const data = response.data;
                const boardId = data;  // 서버에서 생성된 게시물 ID를 기반으로 함. 적절한 Key로 대체해야 함.

                if (selectedFiles.length > 0) {
                    // 이미지 데이터 전송
                    const formData = new FormData();

                    // 이미지 파일 추가
                    selectedFiles.forEach((file) => {
                        formData.append("file", file);
                    });

                    // boardId와 함께 이미지 업로드 API에 전송
                    const imageResponse = await axios.post(`http://localhost:8080/board/imageUpload/${board_id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    console.log(imageResponse);
                }

                window.location.href = `/detail?board_id=${board_id}`;
            } catch (error) {
                console.log("HTTP error");
                console.log(error);
            }
        }
    };

    //글 수정
    // const fetchData = async () => {


    //     const board_id = urlSearch.get("board_id")
    //     if (typeSelect === "0")
    //         window.alert("게시판 태그를 선택해주세요!");
    //     else if (title.length < 3)
    //         window.alert("제목을 3글자 이상 입력해주세요!");
    //     else if (ckeditorData.current.length < 5)
    //         window.alert("본문은 5글자 이상 입력해주세요!")
    //     else {
    //         console.log(title)
    //         console.log(ckeditorData)
    //         console.log(typeSelect)
    //         try {
    //             const response = await axios.post('http://localhost:8080/board/updateBoard', {
    //                 b_title: title,
    //                 b_type: typeSelect,
    //                 b_content: ckeditorData.current,
    //                 board_id: board_id

    //             });

    //             const data = response.data
    //             console.log(data);
    //             if (data === 1) {
    //                 window.location.href = `/detail?board_id=${urlSearch.get("board_id")}`;
    //             } else if (data === 0) {
    //                 window.alert("수정 실패");
    //             }


    //         } catch (error) {
    //             console.log("HTTP error");
    //             console.log(error);
    //         }
    //     }
    // };

    //이전 게시물상세페이지로 돌아가기
    function cancle() {
        if (window.confirm("글 작성을 취소하시겠습니까?")) {
            window.location.href = `/detail?board_id=${urlSearch.get("board_id")}`;
        }
    }

    return (
        <div className='create-board'>
            <Container>
                <SelectType
                    typeSelect={typeSelect}
                    onValueChange={handleValueChange}

                    //setTitleValue={handleTitleValueChange}
                    b_type={typeSelect}
                    setTypeSelect={setTypeSelect}
                    b_title={title}
                    setTitleValue={setTitle}
                />
                <hr />
                <Ckeditor
                    ckeditorData={ckeditorData}
                    //onImageUpload={handleImageUpload}
                    setContent={setContent}
                    content={content}
                />

                <ImageUpload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    originBoardImg={originBoardImg}
                    setOriginBoardImg={setOriginBoardImg}
                    board_id={board_id}
                    setImageCheck={setImageCheck}
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

export default UpdateBoard;