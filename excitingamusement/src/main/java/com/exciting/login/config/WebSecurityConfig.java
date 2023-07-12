package com.exciting.login.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.filter.CorsFilter;

import com.exciting.login.security.JwtAuthenticationFilter;
import com.exciting.login.security.OAuthSuccessHandler;
import com.exciting.login.security.OAuthUserServiceImpl;
import com.exciting.login.security.RedirectUrlCookieFilter;

import lombok.extern.slf4j.Slf4j;

// 작성한 필터(JwtAuthenticationFilter)를 스프링 시큐리티가 사용하라고 알려주는 작업
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig {
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	private OAuthUserServiceImpl oAuthUserService;
	
	@Autowired
	private OAuthSuccessHandler oAuthSuccessHandler;
	
	@Autowired
	private RedirectUrlCookieFilter redirectUrlFilter;
	
//	HttpSecurity : 시큐리티 섲렁을 위한 오브젝트(web.xml 대신 HttpSecurity를 이용해 시큐리티 관련 설정을 하는것)
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http 시큐리티 빌더
		  http.cors() //WebMvConfig에서 이미 설정했으므로 기본 cors 설정.
			.and()
			.csrf() //csrf는 현재 사용하지 않으므로 disable
			.disable()
			.httpBasic() //token을 사용하므로 basic 인증 disable
			.disable()
			.sessionManagement() // session 기반이 아님을 선언
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests() // /와 /login/** 경로는 인증 안 해도 됨.
			.mvcMatchers("/").permitAll()
			.mvcMatchers("/login/**","/email","/mypage/getMemberByKakaoId").permitAll()
			.mvcMatchers("/auth/**","/login/authGit/**").permitAll()
			.mvcMatchers("/mypage/getMember","/mypage/upload").hasAnyRole("user","admin")
			.mvcMatchers("/board/**","/customer/**").permitAll()
			.mvcMatchers("/uploads/**").permitAll()

			.anyRequest() // antMatchers를 제외한 모든 API
			.authenticated()// token 인증이 있어야 함, 역할 까지는 필요 없음
		    .and()
//		    [[Oauth2 인증시작]]
		    .oauth2Login()
		    .redirectionEndpoint() // Endpoint() : 시작점
//		    http://localhost:8080/oauth2/callback/*으로 들어오는 요청을 redirectionEndpoint에 설정된 곳으로 리디렉트하라는 뜻이다.
//		    endpoint에 아무것도 넣지 않으면 베이스 URL인 http://localhost:8080으로 리디렉트 된다.
		    .baseUri("/login/authGit/*")
		    .and()
		    .authorizationEndpoint() // authorization(인가) 시작점 설정(기존의 http://localhost:8080/oauth2/authorization/github(인가과정의 시작 URL)을 baseUri로 대체한다.
		    .baseUri("/auth/authorize") // /auth/authorize 가 반환되면 authorizationEndpoint()에 설정된 곳으로 리디렉트 된다.
		    .and()
		    .userInfoEndpoint()
		    .userService(oAuthUserService) // 유저정보 가지고 오는 class 등록
		    .and()
		    .successHandler(oAuthSuccessHandler) //token 까지 git서버에서 전송되고(Oauth인증과정이 마무리된후) 토큰을 reponse 객체에 담는 클래스
		    .and()
		    .exceptionHandling() // 인증 및 권한 부여와 관련된 예외 처리를 할 수 있다.(예외처리는 인증되지 않은 요청이나 인증된 사용자가 권한이 없는 리소스에 액세스하려고 할 떄 발생하는 상황에서 사용된다)
//		    인증에 실패한 요정의 응답을 원하는 대로 정할 수 있다. class로 만들어서 할수 있지만, 시큐리티가 기본적으로 제공하는 Http403ForbiddenEntryPoint 을 사용한다.
//		    Http403ForbiddenEntryPoint객체는 매서스가 명시적으로 반환하는 것은 없지만 response객체에 err매세지를 담는다. 그자체가 HTTP 통신을 할때 값을 전달할 수 있는듯 하다.
		    .authenticationEntryPoint(new Http403ForbiddenEntryPoint());
		    
		
		// filter 등록
		// 매 요청하다  CorsFilter 실행한 후에  jwtAuthenticationFilter 실행한다.
//		리다이랙트 되기전에 redirectUrlFilter를 실행한다.(쿠키생성해서 response에 저장하는것)
		return http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class)
				   .addFilterBefore(redirectUrlFilter, OAuth2AuthorizationRequestRedirectFilter.class).build();
	}

}
