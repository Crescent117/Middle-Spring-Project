import React, { useEffect, useRef, useState } from "react";
import "./FAQ.css";
import axios from "axios";
import Advertisement from "./component/Advertisement";
import Tabs from "./component/Tabs";
import FaqItem from "./component/FaqItem";
import Pagination from "./component/Pagination";
import { useLocation } from "react-router-dom";
import PagingNumberLogic from "./component/PagingNumberLogic";


const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [f_type, setF_type] = useState("전체");
  const [start, setStart] = useState(null);
  // 페이지 상태 변수 추가
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useRef(0);
  const pageNumber = useRef(1);
  const location = useLocation();

  // 페이지가 로드될 때 faq 목록을 불러와 상태에 저장합니다.
  // 탭(type)이동 시 현재 페이지 초기화 (2페이지인 상태에서 옆에 탭 누를 시 1페이지로 초기화)



  useEffect(() => {
    currentPageInit();
    fetchFaqs();
  }, [f_type]);

  useEffect(() => {
    fetchFaqs();
  }, [currentPage]);

  const changeF_type = (typeNum) => {
    console.log(typeNum);
    setF_type(typeNum);
  };

  const currentPageInit = () => {
    setCurrentPage(1);
  };

  const fetchFaqs = async () => {
    const addressParams = new URLSearchParams(location.search);
    const addressPageNum = addressParams.get("pageNum");
    let pageNum = 1;
    if (addressPageNum != null) {
      pageNum = addressPageNum;
      pageNumber.current = addressPageNum;
    }
    const response = await axios.get('http://localhost:8080/customer/getfaqList', {
      params: {
        f_type: f_type,
        pageNum: pageNum
      }
    });
    console.log(response.data)
    setFaqs(response.data.content);
    totalPages.current = response.totalPages;
    // setTotalPages(responseTotalCount.data.totalPages);
    // console.log(responseTotalCount.data.totalPages);
  };

  const toggleFaq = (index) => {
    console.log(index)
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, active: !faq.active } : { ...faq, active: false }
      )
    );
  };

  return (
    <>
      <Advertisement />
      <section className="notice">
        <div className="faqWrap" style={{ textAlign: "left", marginLeft: 350 }}>

          <Tabs changeF_type={changeF_type} faqs={faqs} />
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.faq_num} faq={faq} index={index} toggleFaq={toggleFaq} />
            ))}
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {totalPages && <PagingNumberLogic pageNumber={pageNumber} totalPages={totalPages}></PagingNumberLogic>}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
