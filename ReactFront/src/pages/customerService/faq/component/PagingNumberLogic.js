function PagingNumberLogic({ pageNumber, totalPages }) {
    // 페이지 번호를 10 단위로 설정합니다.
    console.log(pageNumber);
    console.log(totalPages)
    console.log(totalPages.current)
    let startPage = Math.floor((pageNumber.current - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;

    // 전체 페이지와 비교하여 endPage 값 설정
    if (endPage > totalPages.current) {
        endPage = totalPages.current;
    }

    // pageNumber 담을 공간
    let pageNumbers = [];
    let arrNum = 0;
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers[arrNum] = i;
        arrNum++;
    }
    console.log(startPage);
    // 페이지 이동시 처리할 로직
    const handlePageClick = (clickedPageNum) => {
        let pageNum = clickedPageNum;
        //if(pageNum === integer)
        window.location.href = `/faq?pageNum=${pageNum}`;



    };

    const prevPaging = () => {
        return (
            <>
                <a href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(1);
                    }}
                >
                    Top
                </a>
                <a href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        pageNumber > 10 && handlePageClick(startPage - 1);
                    }}
                >
                    Prev
                </a>
            </>
        );
    }

    return (
        <>
            {pageNumber > 10 && prevPaging()}
            {pageNumbers.map((num, index) => (
                <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(num);
                    }}
                    style={{ margin: "0 5px" }}
                >
                    {num}
                </a>
            ))}
            {endPage % 10 === 0 && (
                <>
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            endPage % 10 === 0 && handlePageClick(endPage + 1);
                        }}
                    >
                        Next
                    </a>
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(totalPages.current);
                        }}
                    >
                        End
                    </a>
                </>
            )
            }
        </>
    );
}

export default PagingNumberLogic;