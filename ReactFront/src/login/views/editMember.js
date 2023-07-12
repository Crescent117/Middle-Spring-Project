import React, { useEffect, useRef, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { call } from "../service/ApiService";

import { useDaumPostcodePopup } from "react-daum-postcode";
import { EditProfile } from "../components/EditProfile";

const EditMember = () => {
  const [m_name, setM_name] = useState(null);
  const [m_email, setM_email] = useState(null);
  const [gender, setGender] = useState("남");
  const [m_image, setM_image] = useState("");

  const member_id = sessionStorage.getItem("MEMBER_ID");
  const kakao_name = sessionStorage.getItem("KAKAO_NAME");

  const request = {
    member_id: member_id,
  };

  useEffect(() => {
    call("/mypage/getMember", "POST", request)
      .then((response) => {
        console.log(response.m_email);
        console.log("getMember 입력 받음");
        setM_name(response.m_name);
        setM_email(response.m_email);
        setM_image(response.m_image);
        console.log("editMember / m_image : " + m_image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function hadleclickEmail(e) {
    formRef.current.querySelector("#email2").value = e.target.value;
  }

  function changeHandleGender(e) {
    setGender(e.target.value);
  }

  //회원탈퇴
  function handleClickBye() {
    const confirmation = window.confirm("회원탈퇴 하시겠습니까?");

    const request = {
      member_id: member_id,
    };
    if (confirmation) {
      call("/mypage/byebye", "POST", request)
        .then((data) => {
          if (data === 1) {
            alert("회원탈퇴가 정상적으로 진행되었습니다.");
            window.location.href = "/main";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }

  //  주소찾기 용 함수
  const open = useDaumPostcodePopup();

  //   콜백함수 정의
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(formRef.current.querySelector("#m_address").value);
    formRef.current.querySelector("#m_address").value = fullAddress;
  };

  function clickhandlejuso() {
    open({ onComplete: handleComplete });
  }

  const formRef = useRef(null);

  function handleClickEdit() {
    const m_pass = formRef.current.querySelector("#m_pass").value;
    console.log(m_pass);
    const phone1 = formRef.current.querySelector("#phone1").value;
    const phone2 = formRef.current.querySelector("#phone2").value;
    const phone3 = formRef.current.querySelector("#phone3").value;
    const email1 = formRef.current.querySelector("#email1").value;
    const email2 = formRef.current.querySelector("#email2").value;
    const m_gender = gender;
    const m_address = formRef.current.querySelector("#m_address").value;
    const year = formRef.current.querySelector("#year").value;
    const month = formRef.current.querySelector("#month").value;
    const day = formRef.current.querySelector("#day").value;

    console.log(
      m_pass,
      phone1,
      phone2,
      phone3,
      email1,
      email2,
      m_gender,
      m_address,
      year,
      month,
      day
    );

    const m_phone = phone1 + phone2 + phone3;
    const m_email = email1 + "@" + email2;
    const m_birth = year + month + day;

    const request = {
      member_id: member_id,
      m_pass: m_pass,
      m_email: m_email,
      m_birth: m_birth,
      m_phone: m_phone,
      m_address: m_address,
      m_gender: m_gender,
    };

    call("/mypage/editMember", "POST", request).then((response) => {
      if (response === 1) {
        console.log("editmember 수정 성공");
        alert("정보수정이 성공적으로 완료되었습니다.");
        window.location.href = "/main";
      } else {
        console.log("editmember 수정 실패");
      }
    });
  }

  const buttonStyle = {
    width: "80px",
    height: "25px",
    background: "#5a83c5",
    color: "#fff",
    fontSize: "14px",
    border: "1px solid black",
    borderRadius: "1px",
    cursor: "pointer",
  };
  const buttonStyle2 = {
    width: "220px",
    height: "40px",
    background: "#5a83c5",
    color: "#fff",
    fontSize: "14px",
    border: "none",
    borderRadius: "1px",
    cursor: "pointer",
  };

  return (
    <Col xs={9}>
      <div className="d-flex justify-content-center">
        <div style={{ width: "540px" }}>
          <Container>
            <Row style={{ marginTop: "40px" }}>
              <Col style={{ borderLeft: "4px solid #5a83c5" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  회원정보{" "}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  수정
                </span>
              </Col>
            </Row>
          </Container>

          {/* 사진전송 + 상단 프로필 */}
          <EditProfile />

          <Container>
            <form ref={formRef}>
              <Row style={{ marginTop: "40px" }}>
                <div
                  className="ps-2 border-bottom border-2 border-success pb-1"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  필수 회원 정보
                </div>
              </Row>

              <Row style={{ marginTop: "25px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  비밀번호
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col>
                  <input
                    type="text"
                    id="m_pass"
                    name="m_pass"
                    style={{ height: "23px", fontSize: "14px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  비밀번호 확인
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col>
                  <input
                    type="text"
                    id="m_pass2"
                    name="m_pass2"
                    style={{ height: "23px", fontSize: "14px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  휴대전화
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col sm={2} style={{ width: "70px" }}>
                  <input
                    type="text"
                    id="phone1"
                    name="phone1"
                    style={{ height: "23px", width: "60px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={3} style={{ width: "110px" }}>
                  <input
                    type="text"
                    id="phone2"
                    name="phone2"
                    style={{ height: "23px", width: "100px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={3}>
                  <input
                    type="text"
                    id="phone3"
                    name="phone3"
                    style={{ height: "23px", width: "100px", fontSize: "14px" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  이메일
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col sm={3} style={{ width: "110px" }}>
                  <input
                    type="text"
                    id="email1"
                    name="email1"
                    style={{ height: "23px", width: "100px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={1} style={{ width: "27px" }}>
                  @
                </Col>
                <Col sm={3} style={{ width: "110px" }}>
                  <input
                    type="text"
                    id="email2"
                    name="email2"
                    style={{ height: "23px", width: "100px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={3} style={{ width: "110px" }}>
                  <select
                    id="emailSelect"
                    className="selectbox"
                    name="emailSelect"
                    style={{ width: "100%" }}
                    onClick={hadleclickEmail}
                  >
                    <option value="">---------</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                  </select>
                </Col>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  주소
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col style={{ width: "240px" }}>
                  <input
                    type="text"
                    id="m_address"
                    name="m_address"
                    style={{ height: "23px", width: "220px", fontSize: "14px" }}
                  />
                </Col>
                <Col style={{ width: "90px" }}>
                  <input
                    type="button"
                    id="juso"
                    name="juso"
                    style={buttonStyle}
                    value="주소찾기"
                    onClick={clickhandlejuso}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "40px" }}>
                <div
                  className="ps-2 border-bottom border-2 pb-1"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  추가 회원 정보
                </div>
              </Row>
              <Row style={{ marginTop: "25px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  성 별
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col style={{ fontSize: "14px" }}>
                  <input
                    type="radio"
                    id="m_gender1"
                    name="m_gender"
                    value="남"
                    className="m_gender"
                    checked
                    onClick={changeHandleGender}
                    readOnly
                  />{" "}
                  <label htmlFor="m_gender1">남</label>{" "}
                  <input
                    type="radio"
                    className="ms-3 m_gender"
                    id="m_gender2"
                    name="m_gender"
                    value="여"
                    onClick={changeHandleGender}
                  />{" "}
                  <label htmlFor="m_gender2">여</label>{" "}
                </Col>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  생년월일
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col sm={3} style={{ width: "80px" }}>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    style={{ height: "23px", width: "70px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={1} style={{ width: "27px", fontSize: "14px" }}>
                  년
                </Col>
                <Col sm={3} style={{ width: "80px" }}>
                  <select
                    id="month"
                    className="selectbox"
                    name="month"
                    style={{ width: "70px" }}
                  >
                    <option value="">------</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </Col>
                <Col sm={1} style={{ width: "27px", fontSize: "14px" }}>
                  월
                </Col>
                <Col sm={3} style={{ width: "80px" }}>
                  <input
                    type="text"
                    id="day"
                    name="day"
                    style={{ height: "23px", width: "70px", fontSize: "14px" }}
                  />
                </Col>
                <Col sm={1} style={{ width: "27px", fontSize: "14px" }}>
                  일
                </Col>
              </Row>
              <Row
                className="d-flex justify-content-center"
                style={{ marginTop: "60px" }}
              >
                <input
                  type="button"
                  value="수정하기"
                  onClick={handleClickEdit}
                  style={buttonStyle2}
                />
              </Row>
              <Row style={{ marginTop: "90px" }}>
                <div
                  className="ps-2 border-bottom border-2 pt-1"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                ></div>
              </Row>
              <Row style={{ marginTop: "11px" }}>
                <Col sm={3} style={{ fontSize: "14px" }}>
                  회원 탈퇴
                </Col>
                <Col sm={1} className="border-start border-1">
                  {" "}
                </Col>
                <Col style={{ fontSize: "13px" }}>
                  <input
                    type="button"
                    value="회원탈퇴"
                    style={{ width: "80px" }}
                    onClick={handleClickBye}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "60px" }}>
                <Col sm={1}></Col>
                <Col
                  className="text-muted"
                  style={{ fontSize: "11px", marginTop: "14px" }}
                >
                  *탈퇴 신청 즉시{" "}
                  <span style={{ color: "red" }}>
                    자유이용권,프로모션 등 유료 서비스
                  </span>
                  에 대한 정보와 작성 된 게시물이 삭제됩니다.
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    </Col>
  );
};

export default EditMember;
