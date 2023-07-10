
function AnnouncementSearch({ searchData, setSearchData, setSearchCheck }) {

    const changeSearchData = (e) => {
        let searchValue = e.target.value;
        console.log(searchValue)
        setSearchData(searchValue);
    }

    const searchCheckBtn = (e, check) => {
        console.log(e.target.value)
        if (check === 1) {
            let searchValue = e.target.value
            window.location.href = `/announcement?pageNum=1&search=${searchValue}`
            setSearchCheck(1);
        } else {
            setSearchCheck(1);
            let searchValue = e.target.previousElementSibling.value
            window.location.href = `/announcement?pageNum=1&search=${searchValue}`
        }

    }

    return (
        <>
            <select name="select" id="search_select" style={{ display: "none" }}>
                <option value="c_title">제목</option>
            </select>

            <label htmlFor="search" className="blind">
                공지사항 내용 검색
            </label>
            <input
                id="text"
                type="search"
                name="search"
                value={(searchData != null) ? searchData : ""}
                onChange={changeSearchData}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        searchCheckBtn(event, 1);
                    }
                }}
            ></input>
            <button
                type="button"
                className="btn btn-search"
                onClick={(event) => {
                    searchCheckBtn(event, 2)
                }}
            >

                검색
            </button>
        </>
    );
}

export default AnnouncementSearch;