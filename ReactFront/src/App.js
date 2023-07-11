import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddBoard from './pages/Board/addBoard/addBoard';
import Detail from './pages/Board/detail/detail';
import UpdateBoard from './pages/Board/updateBoard/updateBoard';
import ElasticBoard from './pages/Board/main/ElasticBoard';
import Announcement from './pages/customerService/announcement/main/announcement';
import AddAnnouncement from './pages/customerService/announcement/addAnnouncement/addAnnouncement';
import AnnouncementDetail from './pages/customerService/announcement/detail/announcementDetail';
import UploadAnnouncement from './pages/customerService/announcement/updateAnnouncement/uploadAnnouncement';
import InsertInquiry from './pages/customerService/Inquiry/insertInquiry/inserInquiry';
import Inquiry from './pages/customerService/Inquiry/InquriyList/inquiry';
import InquiryDetail from './pages/customerService/Inquiry/InquiryDetail/inquiryDetail';
import CustomerMove from './pages/customerService/customerMove';
import Layout from './pages/customerService/components/layout';
import FAQ from './pages/customerService/faq/FAQ';



function App() {

  return (


    <Routes>
      <Route exact path="board" element={<ElasticBoard />}></Route>
      <Route exact path="addboard" element={<AddBoard></AddBoard>}></Route>
      <Route exact path="detail" element={<Detail />}></Route>
      <Route exact path="updateBoard" element={<UpdateBoard />}></Route >
      <Route element={<Layout />}>
        <Route exact path="announcement" element={<Announcement />}></Route >
        <Route exact path="addAnnouncement" element={<AddAnnouncement />}></Route >
        <Route exact path="announcementDetail" element={<AnnouncementDetail />}></Route >
        <Route exact path="uploadAnnouncement" element={<UploadAnnouncement />}></Route >
        <Route exact path="insertInquiry" element={<InsertInquiry />}></Route >
        <Route exact path="inquiry" element={<Inquiry />}></Route >
        <Route exact path="inquiryDetail" element={<InquiryDetail />}></Route >
        <Route exact path="faq" element={<FAQ></FAQ>}></Route>
      </Route>


    </Routes >




  );
}

export default App;
