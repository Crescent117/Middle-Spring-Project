package com.exciting.promotion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exciting.entity.PromotionEntity;

@Repository
public interface PromotionRepository extends JpaRepository<PromotionEntity, Integer>{

}
