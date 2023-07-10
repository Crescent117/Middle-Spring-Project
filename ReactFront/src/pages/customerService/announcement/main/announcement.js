import { useEffect, useState } from "react";
import React from 'react';

import './announcement.css'
import AnnouncementList from "./component/announcementList";

function Announcement() {

    return (

        <div>
            <section className="notice">
                <div className="board-list">
                    <div className="page-title">
                        <h1>공지사항</h1>
                    </div>
                    <br></br>
                    <div className="container" style={{ marginLeft: 75, margin: "auto" }}>

                        <AnnouncementList></AnnouncementList>

                    </div>
                </div>

            </section>
        </div>
    );
}


export default Announcement;