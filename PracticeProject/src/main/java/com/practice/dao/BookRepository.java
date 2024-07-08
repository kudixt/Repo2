package com.practice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practice.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
