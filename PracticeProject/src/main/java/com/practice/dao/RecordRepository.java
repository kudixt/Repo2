package com.practice.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.entity.AssignBookRecords;

public interface RecordRepository extends JpaRepository<AssignBookRecords, Long> {

}
