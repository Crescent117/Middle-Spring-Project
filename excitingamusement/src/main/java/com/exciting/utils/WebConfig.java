package com.exciting.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.directory}")
    private String fileUploadDirectory;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String imagePathPattern = "/uploads/**";
        String imagePathLocation =  fileUploadDirectory;
        registry.addResourceHandler(imagePathPattern)
                .addResourceLocations(imagePathLocation)
                .setCachePeriod(0);;
    }
}