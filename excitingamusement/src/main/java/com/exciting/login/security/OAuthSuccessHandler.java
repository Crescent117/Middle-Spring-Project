package com.exciting.login.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// SimpleUrlAuthenticationSuccessHandler : Oauth 인증과정이 모두 끝난 후 반환되는 클래스(token까지 발급이 됨)
// 발급된 토큰을 응답객체에 담아서 응답전송하는 매서드
@Slf4j
@Component
@AllArgsConstructor
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	
	private static final String LOCAL_REDIRECT_URL = "http://localhost:3000";
	
	private RedirectUrlCookieFilter cookieFilter;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException{
//		인증이 완료된 후 반환된 Authentication의 값을 통해서 token을 생성한다.
		log.info("auth succeeded");
		TokenProvider tokenProvider = new TokenProvider();
		String token = tokenProvider.create(authentication);
//		response 객체에 token을 저정한다.(응답 HTTP 객체에 전송된다.)
		
		Optional<Cookie> oCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals(cookieFilter.REDIRECT_URI_PARAM)).findFirst(); 
		Optional<String> redirectUri = oCookie.map(Cookie::getValue);
		
	
		log.info("token {}",token);
		response.sendRedirect(redirectUri.orElseGet(()-> LOCAL_REDIRECT_URL) + "/githublogin?token="+token);
		
	}
}
