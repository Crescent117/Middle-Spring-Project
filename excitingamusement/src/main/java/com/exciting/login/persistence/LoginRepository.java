package com.exciting.login.persistence;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.exciting.login.entity.Member;


public interface LoginRepository extends JpaRepository<Member, String>{
	
	@Query("SELECT m FROM Member m WHERE m.member_id = :member_id")
	Member findByMember_id(@Param("member_id") String member_id);
	
	@Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Member m WHERE m.member_id = :member_id")
	Boolean existsByMember_id(@Param("member_id") String member_id);
	
	@Query("SELECT CASE WHEN COUNT(m) > 0 AND m.m_kakao_id <> 'false' THEN true ELSE false END FROM Member m WHERE m.m_kakao_id = :m_kakao_id")
	Boolean existsByM_kakao_id(@Param("m_kakao_id") String m_kakao_id);
	
	@Query("SELECT CASE WHEN COUNT(m) > 0 AND m.m_github_id <> 'false' THEN true ELSE false END FROM Member m WHERE m.m_kakao_id = :m_github_id")
	Boolean existsByM_github_id(@Param("m_github_id") String m_github_id);
	
	Optional<Member> findById(@Param("id") String id);
	
	@Query("SELECT m FROM Member m WHERE m.m_kakao_id = :m_kakao_id")
	Member findByKakao_id(@Param("m_kakao_id") String m_kakao_id);
	
	@Transactional
	@Modifying
    @Query("UPDATE Member m SET m.m_pass = :m_pass WHERE m.member_id = :member_id")
    int updateM_pass(@Param("member_id") String member_id, @Param("m_pass") String m_pass);
	
	@Transactional
	@Modifying
    @Query("UPDATE Member m SET m.m_image = :m_image WHERE m.member_id = :member_id")
    int updateM_image(@Param("member_id") String member_id, @Param("m_image") String m_image);
	
	@Transactional
    @Modifying
    @Query("UPDATE Member m SET m.m_name = 'deleted', m.m_birth = 'deleted', m.m_pass = 'deleted', m.m_email = 'deleted', m.m_address = 'deleted', m.m_phone = 'deleted', m.m_gender = 'deleted', m.m_image = 'deleted', m.m_kakao_id = 'deleted', m.roles = 'deleted' WHERE m.member_id = :member_id")
    int deleteMember(@Param("member_id") String member_id);
	
	
	
	
}
