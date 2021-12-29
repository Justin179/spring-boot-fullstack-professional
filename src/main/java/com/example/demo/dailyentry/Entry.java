package com.example.demo.dailyentry;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Entry {
    @Id
    @SequenceGenerator(
            name = "entry_sequence",
            sequenceName = "entry_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "entry_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false,length=500)
    private String content;
    @Column(nullable = false)
    private String date;
    @Column
    private String remark;

    public Entry(String content, String date, String remark) {
        this.content = content;
        this.date = date;
        this.remark = remark;
    }
}
