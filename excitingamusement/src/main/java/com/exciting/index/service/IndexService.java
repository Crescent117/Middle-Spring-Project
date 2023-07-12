package com.exciting.index.service;

import java.util.List;

import com.exciting.dto.AmusementAimageDTO;
import com.exciting.entity.PromotionEntity;

public interface IndexService {
	List<AmusementAimageDTO> selectListAmuseInfoKoreaDSL();
	List<AmusementAimageDTO> selectListAmuseInfoForeignDSL();
}
