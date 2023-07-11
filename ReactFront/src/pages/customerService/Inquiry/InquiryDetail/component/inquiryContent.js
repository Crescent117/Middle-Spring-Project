import React from "react";

function InquiryContent({ viewData }) {
    return (
        <>
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
        </>
    );
}

export default InquiryContent;