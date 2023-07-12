package com.exciting.promotion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exciting.promotion.repository.PromotionRepository;

@Service
public class PromotionServiceImpl implements PromotionService{

	@Autowired
	PromotionRepository promotionRepository;
	
	@Override
	public List<com.exciting.entity.PromotionEntity> selectPromotionList() {
		return promotionRepository.findAll();
	}
	
}
