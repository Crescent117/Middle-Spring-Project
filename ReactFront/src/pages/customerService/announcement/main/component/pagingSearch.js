import React from "react";
import AnnouncementSearch from "./AnnouncementSearch";
import PagingNumberLogic from "./PagingNumberLogic";

function PagingSearch({ setSearchCheck, searchData, setSearchData, pageNumber, totalPages }) {
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
            <div className="page_wrap" >
                {/* 페이지 네이션 출력 부분 */}
                <span className="page_nation">
                    <PagingNumberLogic
                        pageNumber={pageNumber}
                        totalPages={totalPages}
                        searchValue={searchData} />
                </span>

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


            {/* 검색 */}
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <div className="search-wrap">
                            <AnnouncementSearch
                                searchData={searchData}
                                setSearchData={setSearchData}
                                setSearchCheck={setSearchCheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagingSearch;