import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './inquiryDetail.css'

function InquiryDetail() {
  const [viewData, setViewData] = useState([]);
  const [imageData, setImageData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [adminAnswer, setadminAnswer] = useState("");
  const location = useLocation();
  const addressParams = new URLSearchParams(location.search);

  useEffect(() => {
    getData();
    getImg();
  }, []);

  const getData = () => {
    const inquiry_num = addressParams.get("inquiry_num");

    axios
      .get("http://localhost:8080/customer/inquiryView", {
        params: {
          inquiry_num: inquiry_num,
        },
      })
      .then((response) => {
        console.log(response.data);
        setViewData(response.data.data)
        setIsLoading(false); // 데이터 로드 완료
      });
  };

  //이미지 불러오기
  const getImg = () => {
    const inquiry_num = addressParams.get("inquiry_num");
    axios.get("http://localhost:8080/customer/inquiryImage", {
      params: {
        inquiry_num: inquiry_num
      }
    }).then((response) => {
      console.log(response.data.data[0].boardimg + "111111111111111111111111")
      //console.log('Img' + response.data[0]["boardimg"])
      setImageData(response.data.data)
    }).catch(error => {
      console.log(error)
    })
  }

  //관리자 답변
  const submitAnswer = () => {
    const inquiry_num = addressParams.get("inquiry_num");
    const b_content = adminAnswer;
    const b_title = viewData[0].b_title;
    const ref = viewData[0].ref
    if (window.confirm("답변하시겠습니까?")) {
      if (window.confirm("답변은 취소가 안됩니다 확정하시겠습니까?")) {
        axios.post('http://localhost:8080/customer/inquiryAnswer', {
          inquiry_num: inquiry_num,
          b_content: b_content,
          b_title: b_title,
          member_id: "hong1",
          ref: ref
        }).then((response) => {
          window.alert("답변 완료")
          window.location.reload();
          // if (response === 1) {

          // } else {
          //   window.alert("답변 등록 오류")
          // }
        })
      }
    }
  }

  //목록으로 돌아가기
  const backToThe = () => {
    window.location.href = "/inquiry";
  };

  const deleteInquiry = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const inquiry_num = addressParams.get("inquiry_num");
      axios.delete("http://localhost:8080/customer/deleteBoardImg", {
        params: { inquiry_num: inquiry_num }
      }).then(() => {
        window.alert("삭제완료")
        window.location.href = "/inquiry";
      }).then(() => {
        axios.delete('http://localhost:8080/customer/deleteInquiry', {
          params: {
            inquiry_num: inquiry_num
          }
        })
      }).then((response) => {
        window.alert("삭제완료")
        window.location.href = "/inquiry";
        // if (response.data === 1) {

        // }
      })
    }
  }

  //답변 상태관리
  const changeAnswer = (event) => {
    setadminAnswer(event.target.value);
    //console.log(event.target.value)
  }

  return (
    // <>
    // <div>1111111111</div></>
    <>
      <section className="notice">
        <div className="wrap" >
          <div className="view-wrap" style={{ textAlign: "left", marginRight: 200 }}>
            {isLoading ? (
              <div>데이터를 불러오는 중...</div>
            ) : (
              <>

                <div className="customerMove">
                </div>
                {/* 상단 */}
                <div className="header">
                  <div className="header-inner">
                    <p style={{ fontSize: "20px", float: "left" }}>
                      <b>{viewData[0] && viewData[0].b_title}</b>
                    </p>
                    <div className="heder-inner-inner" style={{ clear: "both" }}>
                      <br />
                      <span
                        style={{
                          marginBottom: "10px",
                          fontSize: "15px",
                        }}
                      >
                        <a href={viewData[0] ? `/inquiry?member_id=${viewData[0].member_id}` : "#"}>
                          {viewData[0] && viewData[0].member_id}
                        </a>
                      </span>
                      <span style={{ float: "right" }}>{viewData[0] && viewData[0].postdate}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <br />
                <div className="main-content">

                  <div className="image-wrap">
                    <div className="image-inner-wrap">
                      {imageData && imageData.map((img, index) => (
                        <a href={img.boardimg} key={index}><img src={img.boardimg} alt="1" style={{ width: '200px' }}></img></a>
                      ))}
                    </div>
                  </div>

                  <div className="content">
                    <div className="content-inner">
                      {viewData && viewData.map((data, index) => (
                        <React.Fragment key={index}>
                          <div

                            style={{
                              height: "100%",
                              minHeight: "400px",
                              background: "#eeeeee",
                              padding: "10px",
                            }}
                          >
                            {data && data.b_content}
                          </div>
                          <hr></hr>
                        </React.Fragment>
                      ))}

                    </div>
                  </div>

                  {/* 답변일 없을시 */}
                  {viewData && viewData.length === 1 && (
                    <div>


                      <p>관리자 답변</p>
                      <textarea
                        rows="10"
                        name="b_content"
                        id="adminAnswerContent"
                        style={{ width: "100%" }}
                        onChange={changeAnswer}
                      ></textarea>
                      <input type="button" value="관리자 답변" onClick={submitAnswer} />


                    </div>
                  )}

                  {/* 글 삭제 (관리자) */}
                  <div className="view-btn">
                    <input
                      type="button"
                      className="btn btn-blue"
                      id="board_delete"
                      value="삭제"
                      onClick={deleteInquiry}
                    />
                  </div>

                  <div className="list-wrap">
                    <input
                      type="button"
                      className=""
                      id="listback"
                      onClick={backToThe}
                      value="목록"
                    />
                  </div>

                  <hr style={{ border: "0" }} />
                  <br />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default InquiryDetail;