import PagingNumberLogic from "./PagingNumberLogic";

function PagingSearch({ searchValue, selectSearchType, setSearchValue, totalPages, pageNumber, setSelectSearchType }) {



    //글쓰기 이동
    const moveWriteForm = () => {
        window.location.href = "/insertInquiry";
    }

    const changeSelectType = (e) => {
        setSelectSearchType(e.target.value);
    }

    const changeSearchValue = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value)
    }

    const searchMove = () => {
        window.location.href = `/inquiry?pageNum=1&type=${selectSearchType}&search=${searchValue}`
    }


    return (
        <>
            <div className="page_wrap">
                {/* 페이지 네이션 출력 부분 */}
                <span className="page_nation">
                    <PagingNumberLogic
                        totalPages={totalPages}
                        pageNumber={pageNumber}
                        searchValue={searchValue}
                    />
                </span>

                {/* 글쓰기 버튼 */}
                <span className="write-bottom-wrap" style={{ float: 'right' }}>
                    <button type="submit" id="write-bottom" className="btn btn-blue top" onClick={moveWriteForm}>글쓰기</button>
                </span>

            </div>

            <div style={{ clear: "both" }}></div>

            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <div className="search-wrap">
                            <select name="select" id="search_select" value={selectSearchType} onChange={changeSelectType}>
                                <option value="b_title">제목</option>
                                <option value="b_content">내용</option>
                                <option value="member_id">작성자</option>
                            </select>

                            <label htmlFor="search" className="blind">공지사항 내용 검색</label>
                            <input
                                id="text"
                                type="search"
                                name="search"
                                value={searchValue}
                                onChange={changeSearchValue}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        searchMove();
                                    }
                                }}></input>
                            <button type="button" className="btn btn-search" onClick={searchMove}>검색</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagingSearch;
