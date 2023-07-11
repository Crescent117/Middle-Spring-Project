import React, { useState } from "react";

const Tabs = ({ changeF_type, f_type, faqs }) => {

  const [currentTab, setCurrentTab] = useState(0);

  const liStyle = {
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    background: '#ededed',
    borderColor: '#999999',
    fontWeight: 'bold',
    borderRadius: '5px 5px 0 0'
  };

  const tabsData = [
    { id: 'li-0', className: 'tab-link current', type: '전체' },
    { id: 'li-1', className: `tab-link`, type: '이용정보' },
    { id: 'li-2', className: `tab-link`, type: '우대정보/이벤트' },
    { id: 'li-3', className: `tab-link`, type: '예매' },
    { id: 'li-4', className: `tab-link`, type: '기타' },
  ]

  const TabClick = (index) => {
    setCurrentTab(index);
  };

  return (
    <div style={{ clear: "both" }}>
      <div style={{ margin: "30px 0" }}>
        <h1>자주 묻는 질문</h1>
      </div>
      <div className="tab_wrap">
        <div className="tab">
          <ul className="tabs">

            {faqs && tabsData.map((e, index) => (
              <li
                className={`tab-link${index === currentTab ? ' current' : ''}`}
                id={e.id}
                style={index === currentTab ? liStyle : {}}
                onClick={() => { changeF_type(e.type); TabClick(index); }}
                key={index}
              >
                <div style={{ width: "100%", height: "100%" }}>{e.type}</div>
              </li>
            ))}
            {/* {faqs && faqs.map((e, index) => (
              <li
                className={`tab-link${e.f_type === null ? " current" : ""}`}
                id={`li-${index}`}
                style={e.f_type === 'current' ? liStyle : {}}
                onClick={() => changeF_type(e.f_type)}
                key={index}
              >
              </li>
            ))} */}

            {/* <li
              className={`tab-link${f_type === null ? " current" : ""}`}
              id="li-0"
              style={f_type === null ? liStyle : {}}
              onClick={() => changeF_type(null)}
            >
              <div style={{ width: "100%", height: "100%" }}>전체</div>
            </li>
            <li
              className={`tab-link${f_type === 1 ? " current" : ""}`}
              id="li-1"
              style={f_type === 1 ? liStyle : {}}
              onClick={() => changeF_type(1)}
            >
              <div style={{ width: "100%", height: "100%" }}>이용정보</div>
            </li>
            <li
              className={`tab-link${f_type === 2 ? " current" : ""}`}
              id="li-2"
              style={f_type === 2 ? liStyle : {}}
              onClick={() => changeF_type(2)}
            >
              <div style={{ width: "100%", height: "100%" }}>우대정보/이벤트</div>
            </li>
            <li
              className={`tab-link${f_type === 3 ? " current" : ""}`}
              id="li-3"
              style={f_type === 3 ? liStyle : {}}
              onClick={() => changeF_type(3)}
            >
              <div style={{ width: "100%", height: "100%" }}>예매</div>
            </li>
            <li
              className={`tab-link${f_type === 4 ? " current" : ""}`}
              id="li-4"
              style={f_type === 4 ? liStyle : {}}
              onClick={() => changeF_type(4)}
            >
              <div style={{ width: "100%", height: "100%" }}>기타</div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
