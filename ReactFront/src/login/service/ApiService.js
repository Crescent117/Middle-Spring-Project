import { API_BASE_URL } from "../../api.config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // login했을때 token이 발급된다. 그 이후에 다른 페이지로 이동할때부터는 controller에서 token을 확인하게 되고 이때문에
  // token을 헤더가 추가해서 보낸다.
  // token이 없다면 bearer을 추가하지 않고 token이 있따고 bearer을 추가한다.
  // bearer 존재여부에 따른 작업은 springboot의 security가 할 것이다.
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

export function login(memberDTO, longLogin, formData, setErrorMessage) {
  return call("/login/signin", "POST", memberDTO)
    .then((response) => {
      if (response.token) {
        localStorage.setItem("ACCESS_TOKEN", response.token);
        sessionStorage.setItem("MEMBER_ID", formData.member_id);

        // 로그인 버튼 눌렀을 떄 '아이디 자동입력 체크 상태" 확인 후 local 생성
        if (longLogin) {
          localStorage.setItem("LONG_LOGIN", "true");
          localStorage.setItem("MEMBER_ID", formData.member_id);
        } else {
          localStorage.setItem("LONG_LOGIN", "false");
          localStorage.removeItem("MEMBER_ID");
        }

        console.log(response.token);

        //이전 페이지로 돌아가기
        const pathName = new URL(document.referrer).pathname;
        if (
          pathName === "/login" ||
          pathName === null ||
          pathName === "/signup"
        ) {
          window.location.href = "/main";
        } else {
          window.location.href = pathName;
        }
      }
    })
    .catch((error) => {
      // 로그인 눌렀을 시 사용자 정보가 일치하지 않을경우 이곳으로 옮
      console.error("사용자 정보가 일치하지 않습니다.", error);
      setErrorMessage("정보가 일치하지 않습니다.");
    });
}

export function socialLogin(provider) {
  window.location.href =
    API_BASE_URL +
    "/auth/authorize/" +
    provider +
    "?redirect_uri=" +
    window.location.origin;
}
