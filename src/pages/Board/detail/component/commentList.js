import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddReComment from './addReComment';
import UpdateComment from './updateComment';

function CommentList(props) {

    const { viewData, comments } = props;
    const [commentList, setCommentList] = useState([]);
    const [reply, setReply] = useState(new Array(commentList.length).fill(false));
    const [openReplyIndex, setOpenReplyIndex] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(null);


    useEffect(() => {

        getCommentList();

    }, [comments]);


    // 댓글 불러오기
    const getCommentList = () => {
        axios
            .get('http://localhost:8080/board/replyList', {
                params: {
                    board_id: viewData.board_id
                },
            })
            .then((response) => {
                //response.data);
                setCommentList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        //'너는 뜨면안된다')
    };


    // 답글 열기 닫기
    const toggleReply = (index) => {
        const newReply = [...reply];


        if (openReplyIndex !== null && openReplyIndex !== index) {
            // 이전에 열렸던 답글창 닫기
            newReply[openReplyIndex] = false;
        }

        newReply[index] = !newReply[index];
        setReply(newReply);

        if (newReply[index]) {
            // 새로 열린 답글창에 대한 인덱스 저장
            setOpenReplyIndex(index);
        } else {
            // 답글창이 닫히면 인덱스를 null로 설정
            setOpenReplyIndex(null);
        }

    };


    //comment_update(comment.reply_num, "row.member_id", comment.ref, comment.seq)



    //댓글 리스트 출력
    const renderMemberId = (comment) => {

        //if문을 통해 댓글과 대댓글을 나눔
        if (comment && comment.seq === 0) {
            return (
                <td style={{ width: "20%", textAlign: "center" }} colSpan={2}>
                    {comment.member_id}
                </td>
            );
        } else {
            return (
                <>
                    <td style={{ width: "8%", textAlign: "center" }}></td>
                    <td style={{ width: "12%", textAlign: "center" }}>
                        <img
                            src="https://e7.pngegg.com/pngimages/230/115/png-clipart-computer-icons-arrow-symbol-arrow-angle-triangle.png"
                            alt='.'
                            style={{ width: "30px" }}
                        />
                        {comment.member_id}
                    </td>
                </>
            );
        }
    };

    const renderReplyContent = (comment, seq) => (
        <td style={{ width: "30%", minHeight: "200px" }}>{comment.b_reply}</td>
    );

    const renderPostDate = (comment) => (
        <td style={{ width: "25%", textAlign: "center" }}>{comment.postdate}</td>
    );

    //답글 버튼
    const renderReplyBtn = (index) => (
        <td style={{ width: "10%", textAlign: "center" }}>
            <button
                type="button"
                className="btn btn-white"
                onClick={() => toggleReply(index)}>
                답글달기
            </button>
        </td>
    );

    //삭제 수정 버튼
    const renderButtons = (comment) => {
        return (
            <>
                <td
                    style={{ width: "5%", textAlign: "center" }}
                    onClick={() =>
                        toggleUpdate(comment.reply_num)
                    }
                >
                    <button className="btn btn-white" id="comment_update">
                        수정
                    </button>
                </td>
                <td style={{ width: "5%", textAlign: "center" }} onClick={() => comment_delete(comment.reply_num)}>
                    <button className="btn btn-white" id="comment_delete">
                        삭제
                    </button>
                </td>
            </>
        );
    };


    const toggleUpdate = (index) => {
        //comment)

        if (openUpdate === index) {
            // 같은 index를 클릭하면 답글창을 닫습니다.
            setOpenUpdate(null);

        } else {
            // 다른 index를 클릭하면 새로 열린 답글창에 대한 인덱스를 저장합니다.

            setOpenUpdate(index);
        }
    };

    const comment_delete = async (reply_num) => {


        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            await axios.delete('http://localhost:8080/board/replyDelete', {
                params: {
                    reply_num: reply_num
                }
            }).then(
                await getCommentList
            ).catch(error => {
                console.log(error)
            })
        }

    }


    return (
        <div id="commentform">
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>
                <b>전체 댓글 </b> <span style={{ color: 'red' }}>{viewData.boardReplyCnt}</span><b>개</b>
                <span id="commentHide" className="comment-show" style={{ float: 'right' }}>댓글 접기</span>
            </div>
            <table id="table">
                <tbody>

                    {commentList.map((comment, index) => (
                        <React.Fragment key={comment.reply_num}>

                            <tr>
                                {openUpdate === comment.reply_num ? (
                                    <UpdateComment
                                        index={comment.reply_num}
                                        openUpdate={toggleUpdate}
                                        getCommentList={getCommentList}
                                        commentData={comment}
                                    />
                                ) : (
                                    <>
                                        {renderMemberId(comment)}
                                        {renderReplyContent(comment, comment.seq === 0 ? 0 : comment.seq)}
                                        {renderPostDate(comment)}
                                        {renderReplyBtn(index)}
                                        {renderButtons(comment, comment.reply_num)}
                                    </>
                                )}
                            </tr>


                            {/*대댓글추가*/}
                            <tr style={{ background: "#eee", width: "1100px" }} colSpan={5}>
                                {comment.board_id !== "" &&
                                    reply[index] && <AddReComment
                                        index={index}
                                        toggleReply={toggleReply}
                                        getCommentList={getCommentList}
                                        commentList={comment} />}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div >
    );
}


export default CommentList;