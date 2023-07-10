package com.exciting.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="inquiry")
@Builder
@Data
public class InquiryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_num")
    private int inquiry_num;

    @Column(name = "b_type")
    private String b_type;

    @Column(name = "b_title")
    private String b_title;

    @Column(name = "b_content")
    private String b_content;

    @Column(name = "member_id")
    private String member_id;

    @Column(name = "postdate")
    private LocalDateTime postDate;

    @Column(name = "ref")
    private int ref;

    @Column(name = "lev")
    private int lev;

    @Column(name = "seq")
    private int seq;
}
