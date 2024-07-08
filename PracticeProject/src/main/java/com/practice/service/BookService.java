package com.practice.service;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practice.dao.BookRepository;
import com.practice.dao.RecordRepository;
import com.practice.dao.UserRepository;
import com.practice.entity.Book;
import com.practice.entity.AssignBookRecords;
import com.practice.entity.User;
import com.practice.form.UserBook;

@Service
public class BookService {

	@Autowired
	BookRepository bookRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RecordRepository recordRepository;
	
	
	public List<Book> getBookList(){
		List<Book> bookList = null;
		
		bookList = bookRepository.findAll();
		
		return bookList;
	}
	
	public boolean addBook(Book bookDetails) {
		boolean flag = false;
		Book book = new Book();
		
		book.setBookName(bookDetails.getBookName());
		book.setAuthor(bookDetails.getAuthor());
		book.setBookCode(bookDetails.getBookCode());
		book.setQuantity(bookDetails.getQuantity());
		
		if(bookRepository.save(book) != null) {
			flag = true;
		}else {
			flag = false;
		}
		return flag;
	}
	

}
