import { useEffect, useState } from "react";
import React from 'react';

import './inquiry.css'
import InquiryList from "./component/inquiryList";


function Inquiry() {



    return (

        <div>
            <section className="notice">
                <div id="board-list" style={{ marginLeft: 250 }}>
                    <div className="page-title">
                        <h1>문의내역</h1>
                    </div>
                    <br></br>
                    <div className="container">


                        <InquiryList></InquiryList>


                    </div>
                </div>

            </section>
        </div>
    );
}


export default Inquiry;