import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './inquiryDetail.css'
import InquiryDetailTop from "./component/inquiryDetailTop";
import InquiryContent from "./component/inquiryContent";
import ImgWrap from "./component/imageWrap";
import InquiryAnswer from "./component/InquiryAnswer";

function InquiryDetail() {
  const [viewData, setViewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiry_num, setInquiry_num] = useState(0)

  const location = useLocation();
  const addressParams = new URLSearchParams(location.search);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const inquiry_num = addressParams.get("inquiry_num");
    setInquiry_num(inquiry_num);
    await axios.get("http://localhost:8080/customer/inquiryView", {
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
      })
    }
  }


  return (
    <>
      <section className="notice">
        <div className="wrap" >
          <div className="view-wrap" style={{ textAlign: "left", marginRight: 200 }}>
            {isLoading ? (
              <div>데이터를 불러오는 중...</div>
            ) : (
              <>
                {/* 상단 */}
                <div className="header">
                  <InquiryDetailTop
                    viewData={viewData}
                    inquiry_num={inquiry_num} />
                </div>

                <hr /> <br />

                <div className="main-content">

                  <div className="image-wrap">
                    <ImgWrap
                      inquiry_num={inquiry_num} />
                  </div>

                  <div className="content">
                    <InquiryContent
                      viewData={viewData} />
                  </div>

                  {/* 답변이 없을시 */}
                  {viewData && viewData.length === 1 && (
                    <InquiryAnswer
                      inquiry_num={inquiry_num}
                      viewData={viewData} />

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