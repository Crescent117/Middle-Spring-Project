import React from "react";
import PagingNumberLogic from "./PagingNumberLogic";

function PagingSearch({ searchData, pageNumber, totalPages }) {
    // 글쓰기 이동
    const moveWriteForm = () => {
        window.location.href = "/addAnnouncement";
    };

    // 페이징 로직
    //   const createPageLinks = () => {
    //     return(

    //     );
    //   };

    return (
        <>
            <div className="page_wrap">
                {/* 페이지 네이션 출력 부분 */}
                <span className="page_nation"> <PagingNumberLogic pageNumber={pageNumber} totalPages={totalPages} /></span>

                {/* 글쓰기 버튼 */}
                <span className="write-bottom-wrap" style={{ float: "right" }}>
                    <button
                        type="submit"
                        id="write-bottom"
                        className="btn btn-blue top"
                        onClick={moveWriteForm}
                    >
                        글쓰기
                    </button>
                </span>
            </div>

            <div style={{ clear: "both" }}></div>

            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <div className="search-wrap">
                            <select name="select" id="search_select">
                                <option value="c_title">제목</option>
                                <option value="c_content">내용</option>
                            </select>

                            <label htmlFor="search" className="blind">
                                공지사항 내용 검색
                            </label>
                            <input id="text" type="search" name="search"></input>
                            <button type="button" className="btn btn-search">
                                검색
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagingSearch;