import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PagingSearch from "./pagingSearch";




function InquiryList() {
  const [data, setData] = useState([]);
  const [selectSearchType, setSelectSearchType] = useState("b_title");
  const [searchValue, setSearchValue] = useState();
  const totalPages = useRef(0);
  const pageNumber = useRef(0)
  const location = useLocation();




  useEffect(() => {
    const fetchData = () => {
      const addressParams = new URLSearchParams(location.search);
      const pageNum = addressParams.get("pageNum");
      const searchParams = addressParams.get("search");
      let type = selectSearchType;
      if (addressParams.get("type") !== null) {
        type = addressParams.get("type");
      }
      pageNumber.current = pageNum;
      setSelectSearchType(type);
      setSearchValue(searchParams);
      getBoardList(pageNum, searchParams, type);
    }
    fetchData();

  }, [location]);


  const getBoardList = (pageNum, searchParams, type) => {

    let search = null;

    if (pageNum === null) {
      pageNum = 1
      pageNumber.current = pageNum;
    }


    if (searchParams !== null && searchParams !== undefined) {
      search = searchParams;
    }




    console.log(pageNum)
    const requestOptions = {
      method: 'GET',
      url: 'http://localhost:8080/customer/inquiryList',
      headers: {
        'Content-Type': 'application/json'
      },

      params: {
        pageNum: pageNum,
        type: type,
        search: search,
      }

    };

    const getInquiryList = async () => {
      try {
        const response = await axios(requestOptions);
        const data = response.data;
        console.log(data)
        totalPages.current = data.totalPages;
        setData(data.content);
      } catch (error) {
        console.log("http error");
        console.log(error);
      }

    };
    getInquiryList();
  }


  const renderPostDate = (item) => {
    const separator = [".", ".", " ", ":", ":"];

    const postDate = item.postDate

    // 두 자릿수로 맞춰주는 함수
    const padNumber = (number) => {
      return String(number).padStart(2, "0");
    };

    const date = new Date(postDate);
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    const hour = padNumber(date.getHours());
    const minute = padNumber(date.getMinutes());

    // 날짜 형식을 조합하여 반환
    const formattedDate = `${year}${separator[0]}${month}${separator[1]}${day} ${hour}${separator[3]}${minute}`;

    return (
      <React.Fragment>{formattedDate}</React.Fragment>
    );
  }

  return (
    <div>
      <table className="board-table">
        <thead>
          <tr>
            <th scope="col" className="th-num" style={{ width: '5%' }}>번호</th>
            <th scope="col" className="th-num" style={{ width: '10%' }}>분류</th>
            <th scope="col" className="th-title" style={{ width: '45%' }}>제목</th>
            <th scope="col" className="th-title" style={{ width: '10%' }}>작성자</th>
            <th scope="col" className="th-date" style={{ width: '30%' }}>등록일</th>
          </tr>
        </thead>

        <tbody id="boardList">
          {/* 합쳐진 데이터를 렌더링하는 부분 */}
          {/* 각 필드에 대한 데이터를 출력 */}
          {
            data.map((item, index) => (
              item.inquiry_num && (
                <tr key={index}>
                  <td>{item.inquiry_num}</td>
                  <td>{item.b_type}</td>
                  <td><Link to={`/inquiryDetail?inquiry_num=${item.inquiry_num}`}>{item.b_title}</Link></td>
                  <td>{item.member_id}</td>
                  <td>{renderPostDate(item)}</td>
                </tr>
              )
            ))
          }
        </tbody>
      </table>

      <PagingSearch
        data={data}
        setData={setData}
        selectSearchType={selectSearchType}
        setSelectSearchType={setSelectSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />

    </div>
  );
}


export default InquiryList;