import React, { useEffect, useRef, useState } from 'react';
//import './ElasticBoard.css'
import './board.css'
import $ from 'jquery'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ElasticBoard() {

    const [currentPage, setCurrentPage] = useState();
    const [usepageSize, setUsepageSize] = useState(10);
    const [tabsCss, setTabsCss] = useState("11")
    const [pagevalue, setPagevalue] = useState(100);
    const [elasticResults, setElasticResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectTabs, setSelectTabs] = useState();
    const [pageCount, setPageCount] = useState(10);
    const [pagingSize, setPagingSize] = useState(10);


    const history = useNavigate();
    const location = useLocation();
    const addressParams = new URLSearchParams(location.search);


    // 페이지 사이즈 업데이트 함수


    useEffect(() => {

        elastick();

    }, []);




    // $(document).on('click', '.pagination-button', function() {
    //     setCurrentPage(parseInt($(this).val()));
    //     elastick(currentPage);
    //   });


    const elastick = async () => {
        let search = document.getElementById("text").value;
        let selectField = document.querySelector("select[name=selectField]").value;
        let pageSize = addressParams.get("viewCnt");
        let b_type = addressParams.get("b_type");
        let pageNum = addressParams.get("pageNum")

        //setCurrentPage(currentPage)



        //pageSize가 null일땐 10
        if (pageSize === null) { pageSize = 10; }
        if (b_type === null) { b_type = ""; setSelectTabs(""); }
        if (pageNum === null) { pageNum = 1 }
        if (search === null) { search = "" }
        setSearchValue(search);
        setCurrentPage(pageNum);
        setSelectTabs(b_type);
        setUsepageSize(pageSize);
        console.log(sessionStorage.getItem('member_id'));
        console.log("=-======================================================================")
        //기본적으로 틀만 만들어놓고 값이 있는것만 push
        const query = {
            from: (pageNum - 1) * pageSize,
            size: pageSize,
            sort: [
                {
                    board_id: {
                        order: "desc",
                    },
                },
            ],
            query: {
                bool: {
                    must: [],
                },
            },
        };

        if (search) {
            query.query.bool.must.push({
                wildcard: {
                    [selectField]: {
                        value: `*${search}*`,
                    },
                },
            });
        }

        if (b_type) {
            query.query.bool.must.push({
                term: {
                    b_type: b_type,
                },
            });
        }

        if (query.query.bool.must.length === 0) {
            query.query.match_all = {};
            delete query.query.bool;
        }

        getElasticBoardList(query, pageSize, pageNum);
    };


    const getElasticBoardList = async (query, pageSize, pageNum) => {
        const sel = [query];

        const url = 'http://localhost:9200/board_index/_search';


        const headers = { 'Content-Type': 'application/json' };
        const data = JSON.stringify(sel[0]);
        const requestOption = {
            method: 'POST',
            url: url,
            headers: headers,
            data: data
        };


        await axios(requestOption).then(response => {
            let pagevalue = response.data.hits.total.value;

            setPagevalue(pagevalue);

            const data = response.data.hits.hits;
            setElasticResults(data);
            paging(pagevalue, pageNum)
        }).catch(error => {
        });
    }

    function paging(pagevalue, pageNum) {
        const buttons = [];
        $('.page_test').html("");
        let lowpage = 1;
        let maxpage = 10;

        lowpage = Math.ceil(pagevalue / usepageSize);

        const pagegroup = Math.ceil(pageNum / maxpage);

        let last = pagegroup * usepageSize;
        if (last > lowpage) {
            last = lowpage;
        }
        let first = last - (usepageSize - 1); // 화면에 보여질 첫번째 페이지 번호
        const next = last + 1;
        const prev = first - 1;

        if (lowpage < 1) {
            first = last;
        }

        if (first > 10) {

            buttons.push(
                <button className='pagination-button' value='1' key='1' >Top</button>
            );
            buttons.push(
                // <Link to={`/board?b_type=${selectTabs}&viewCnt=${pageSize}&search=${currentPage}`}>
                <button className='pagination-button' value={prev} key={prev}>Prev</button>
                //</Link>
            );
        }
        for (let j = first; j <= last; j++) {
            if (currentPage === (j)) {
                buttons.push(
                    <button className='pagination-button' value={j} key={j}>{j}</button>
                );
            } else if (j > 0) {
                buttons.push(
                    <button className='pagination-button' value={j} key={j}>{j}</button>
                );
            }
        }
        if (next > 10 && next < lowpage) {
            buttons.push(
                <button className='pagination-button' value={next} key={next}>Next</button>
            );

            buttons.push(
                <button className='pagination-button' value={lowpage} key={lowpage}>End</button>
            );

        }

        return buttons;
    }


    const tabEvent = [
        { name: "전체", id: "li-0", link: "" },
        { name: "국내", id: "li-1", link: "국내" },
        { name: "해외", id: "li-2", link: "해외" },
        { name: "질문", id: "li-3", link: "질문" },
        { name: "자유", id: "li-4", link: "자유" }
    ]


    const pagecount = [

        { name: "10", id: "select-1", value: "10" },
        { name: "30", id: "select-2", value: "30" },
        { name: "50", id: "select-3", value: "50" },
    ]

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);

    }

    const moveWriteForm = () => {
        if (!sessionStorage.getItem("member_id")) {
            window.alert("로그인 해주세요!")
            window.location.href = "/addboard"
        }
        window.location.href = "/addboard"
    }

    const selectMenuHandler = (index, tabsValue) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        setSelectTabs(tabsValue);
        setTabsCss(index);
        const newPath = `/board?b_type=${tabsValue}&viewCnt=${usepageSize}&search=${searchValue}&pageNum=${currentPage}`;
        window.location.href = newPath;
    };

    const handlePagecountChange = (event) => {

        setUsepageSize(event.target.value);
        const newPath = `/board?b_type=${selectTabs}&viewCnt=${event.target.value}&search=${searchValue}&pageNum=${currentPage}`;
        window.location.href = newPath;
    };

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
        const newPath = `/board?b_type=${selectTabs}&viewCnt=${usepageSize}&search=${searchValue}&pageNum=${newPage}`;
        window.location.href = newPath;
        //elastick(newPage);
    }

    const searchHref = () => {
        const newPath = `/board?b_type=${selectTabs}&viewCnt=${usepageSize}&search=${searchValue}&pageNum=${currentPage}`;
        window.location.href = newPath
    }

    return (
        <>
            <section className="notice">
                {/* board list area */}
                <div className='board_main_wrap' style={{ left: 150 }}>
                    <div className="board-list" >
                        <div className="page-title" style={{ textAlign: 'center' }}>
                            <h1>게시판</h1>
                        </div>


                        <div className='container'>
                            <div className="write_from_wrap">

                                {/* tabs menu */}
                                <div>
                                    <ul className="tabs">
                                        {tabEvent.map((el, index) => (
                                            <Link key={el.id} to={`/board?b_type=${el.link}&viewCnt=${pageCount}&search=${searchValue}`}>
                                                <li className={index === tabsCss ? "tab-link current" : "tab-link"}
                                                    id={el.id}
                                                    onClick={() => selectMenuHandler(index, el.link)}
                                                    style={{ color: "black" }}>
                                                    {el.name}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>

                                {/* 글작성 버튼 */}
                                <div className="write_form">
                                    <button type="submit" id="write-top" className="btn-board-top" onClick={moveWriteForm}>
                                        <img src={"https://cdn-icons-png.flaticon.com/512/5218/5218705.png"} id="img_write" />글쓰기
                                    </button>
                                </div>
                            </div>

                            {/* 글 출력수량 설정 */}
                            <div className="menu_select">
                                <div className='text'>
                                    <select className="form-select form-select-sm" id="view-select" aria-label="form-select-sm example"
                                        value={usepageSize}
                                        onChange={handlePagecountChange}  >
                                        {pagecount.map((sl) => {
                                            return (<option key={sl.id} id={sl.id} value={sl.value}>
                                                {sl.name}
                                            </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <table className="board-table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="th-num" style={{ width: '5%' }} > 번호</th>
                                        <th scope="col" className="th-num" style={{ width: '10%' }}>분류</th>
                                        <th scope="col" className="th-title" style={{ width: '30%' }}>제목</th>
                                        <th scope="col" className="th-member" style={{ width: '10%' }}>작성자</th>
                                        <th scope="col" className="th-date" style={{ width: '30%' }}>등록일</th>
                                        <th scope="col" className="th-date" style={{ width: '5%' }}>추천수</th>
                                        <th scope="col" className="th-date" style={{ width: '5%' }}>조회수</th>
                                    </tr>
                                </thead>
                                <tbody id="elasti">
                                    {elasticResults.map((hit) => {

                                        let source = hit._source;
                                        let member_id = source.member_id;
                                        let postdate = source.postdate;

                                        let ymd = postdate ? postdate.substring(0, 10) + ' ' + postdate.substring(14, 19) : "";
                                        let ymd2 = ymd.replaceAll("-", ".");

                                        return (
                                            <tr key={hit._id}>
                                                <td>{hit._id}</td>
                                                <td>{hit._source.b_type}</td>
                                                <td style={{ textAlign: "center", padding: "0 0 0 10px" }}>
                                                    <a href={"/detail?board_id=" + hit._id}>{hit._source.b_title}</a>
                                                </td>
                                                <td>{member_id}</td>
                                                <td>{ymd2}</td>
                                                <td>{hit._source.favorite}</td>
                                                <td>{hit._source.visitcount}</td>
                                            </tr>
                                        );

                                    })}
                                </tbody>
                            </table>
                            <div className="page_wrap">

                                <span className="page_nation" style={{ padding: '0 0 0 20%', }}>
                                    { /* board paging start */}
                                    {paging(pagevalue, currentPage, pagingSize).map((button) => (
                                        React.cloneElement(button, {
                                            onClick: () => handlePageChange(parseInt(button.props.value))
                                        })
                                    ))}
                                </span>

                                <span
                                    className="write-bottom-wrap" style={{ float: 'right' }}>
                                    <button type="submit" id="write-bottom" className="btn btn-blue top"
                                        onClick={moveWriteForm} style={{ height: '40px' }}>글쓰기</button>
                                </span>
                            </div>
                            { /* board paging end */}

                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>

                    { /* board search area */}
                    <div className="board-main-search">
                        <div className='container' >
                            <div className='search-window' >
                                <div className='search-wrap' style={{ left: 100 }} >
                                    <select
                                        name="selectField"
                                        className="selectField"
                                        style={{
                                            width: "20%",
                                            height: "40px",
                                            float: "left",
                                            textAlign: "center",
                                            fontSize: "14px"
                                        }}>

                                        <option value="b_title">제목</option>
                                        <option value="b_content">내용</option>
                                        <option value="member_id">작성자</option>
                                    </select>
                                    <label htmlFor="search" className="blind">검색</label>
                                    <input
                                        id="text"
                                        type="search"
                                        name="search"
                                        value={searchValue}
                                        onChange={handleSearchChange} />
                                    <button
                                        type="button"
                                        id="searchButton"
                                        className="btn btn-search"
                                        onClick={() => searchHref()}>
                                        검색
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}


export default ElasticBoard;