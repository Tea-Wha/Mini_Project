package com.kh.miniproject.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "EXAMPLE_TABLE_TEST")
public class ExampleTableTest {
    @Id
    @Column (name = "ID", nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;
}
