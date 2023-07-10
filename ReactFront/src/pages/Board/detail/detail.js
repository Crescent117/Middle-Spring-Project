import { useEffect, useState } from 'react';
import './detail.css'
import axios from 'axios';
import Favorite from './component/favorite';
import WriteComment from './component/writeCommnet';
import CommentList from './component/commentList';
import { useLocation } from 'react-router-dom';
import Advertisment_leftSide from '../components/advertisement/advertisement_leftSide';
import KakaoAPI from '../components/kakaoAPI';
import ElasticBoard from '../main/ElasticBoard';

function Detail() {
    const [comments, setComments] = useState([]);
    const [deleteCheck, setdelteCheck] = useState(0);


    const [viewData, setViewData] = useState({
        board_id: "",
        b_title: "",
        member_id: "",
        postdate: [],
        boardReplyCnt: "",
        visitcount: "",
        b_content: "",
        boardimg: []
    });
    const location = useLocation()

    useEffect(() => {
        data();
    }, []);

    const data = async () => {
        const urlParams = new URLSearchParams(location.search);
        const board_id = urlParams.get("board_id");

        try {
            const response = await axios.get('http://localhost:8080/board/view', {
                params: {
                    board_id: board_id
                }
            });
            console.log(response)

            setViewData(response.data[0]);
        } catch (error) {
            console.log(error);

            if (deleteCheck === 0) {
                window.alert("해당 페이지는 존재 하지 않습니다.")
                window.location.href = "/board"
            }

        }
    };

    function addComment(newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
    }

    const commentMoveTop = () => {
        const commentListMove = document.getElementById('commentList');
        commentListMove.scrollIntoView({ behavior: 'smooth' });
    }
    // 게시물 삭제
    const deleteBoard = () => {

        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios
                .delete("http://localhost:8080/board/deleteBoard", {
                    params: {
                        board_id: viewData.board_id,
                    },
                })
                .then(() => {
                    axios.delete(`http://localhost:8080/board/deleteBoardImg`, {
                        params: {
                            board_id: viewData.board_id
                        }
                    })
                }).then(() => {
                    window.alert("삭제 완료되었습니다.");
                    window.location.href = "http://localhost:3000/board";
                    setdelteCheck(1);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    //게시물 업데이트
    const updateBoard = () => {
        window.location.href = `/updateBoard?board_id=${viewData.board_id}`
    }

    //리턴
    return (
        <div>
            <div className="wrap">
                <Advertisment_leftSide />
                <div id="view-wrap">

                    {/*위의 기본적인 글 정보들*/}
                    <div className="header">
                        <div className="header-inner">
                            <p style={{ marginBotto수m: '10px', fontSize: '20px' }}><b>{viewData.b_title}</b></p>
                            <span>{viewData.member_id} | </span>
                            <span>
                                {`${viewData.postdate[0]}년 ${viewData.postdate[1]}월 ${viewData.postdate[2]}일 ${viewData.postdate[3]}:${viewData.postdate[4]}`}
                            </span>
                            <span style={{ float: 'right' }}><button type="button" id="commentMove-top" onClick={commentMoveTop}>댓글 {viewData.cnt}</button></span>
                            <span style={{ float: 'right' }} id="visitcount-top">조회 {viewData.visitcount}  | </span>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>


                    { /* 이미지*/}
                    <div className="main-content">
                        {viewData.boardimg && viewData.boardimg.map((imgData) => (
                            <div key={imgData.boardimg_num} className="image-wrap">
                                <a href={imgData.boardimg}><img src={imgData.boardimg} alt="Board Image22" style={{ margin: '20px 0', maxwidth: '600px' }} /></a>
                            </div>
                        ))}
                        <br />

                        {/*글 내용*/}
                        <div className='boardView-content' dangerouslySetInnerHTML={{ __html: viewData.b_content }}></div>



                        {/*좋아요 싫어요*/}
                        <div className='favorite-wrap'>

                            {viewData.board_id !== "" &&
                                <Favorite
                                    viewData={viewData}
                                />
                            }
                            {/* 카카오api*/}
                            <div style={{ margin: '30px 15px 0 0' }}>
                                <KakaoAPI />
                            </div>
                        </div>

                        <div className="advertisement1">
                            <a href="http://jg.tjoeunit.co.kr/"><img id="advertisement-jouen" alt="advertisement-jouen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSr3FexjnmdRQNt-FcxByAuOozrhtelzrwG5eysWz1Ue5-3shjJ9-ok5Cvor9IryklNA&usqp=CAU" style={{ marginLeft: "35px" }} /></a>
                        </div>


                        <div className='view-btn'>
                            <input type="button" className='btn btn-blue' id="board_delete" value='삭제' onClick={deleteBoard} />
                            <input type="button" className='btn btn-blue' id="board_update" value='수정'
                                onClick={updateBoard} />

                        </div>
                    </div>
                    <hr style={{ border: 0 }}></hr>



                    {/*댓글리스트*/}
                    <div id="commentList">
                        {viewData.board_id !== "" &&
                            <CommentList
                                viewData={viewData}
                                comments={comments}
                            />
                        }
                    </div>

                    <hr style={{ border: 0 }}></hr>


                    {/*댓글 쓰기*/}
                    <div className="comment-wrap" style={{ right: 250 }}>
                        <WriteComment
                            board_id={viewData.board_id}
                            onAddComment={addComment}
                        />
                    </div>

                </div>
            </div>
            <div id="board-wrap" >
                <ElasticBoard></ElasticBoard>
            </div>
        </div >
    );
}

export default Detail;