package com.practice.service;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.practice.dao.BookRepository;
import com.practice.dao.RecordRepository;
import com.practice.dao.UserRepository;
import com.practice.entity.Book;
import com.practice.entity.AssignBookRecords;
import com.practice.entity.User;
import com.practice.form.UserBook;

import jakarta.transaction.Transactional;


@Service
public class BookRecordService {

	@Autowired
	RecordRepository recordRepository;
	
	@Autowired
	BookRepository bookRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public boolean assignBook(UserBook userBook) {
		boolean flag = false;
		AssignBookRecords bookRecords = new AssignBookRecords();
		Optional<User> userOptional = null;
		Optional<Book> bookOptional = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		User user = null;
		Book book = null;
		
		try {
			
			bookOptional = bookRepository.findById(Long.parseLong(userBook.getBookId()));
			book = bookOptional.get();
			userOptional = userRepository.findById(Long.parseLong(userBook.getUserId()));
			user = userOptional.get();
			
			
			if(book.getQuantity().compareTo(BigInteger.ZERO) > 0) {
				
				bookRecords.setFkUser(user);
				bookRecords.setFkBook(book);
				bookRecords.setAssignDate(new Date());
				
				if(recordRepository.save(bookRecords) != null) {
					flag = true;
					book.setQuantity(book.getQuantity().subtract(BigInteger.ONE));
					bookRepository.save(book);
				}
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return flag;
	}
	
	public List<AssignBookRecords> getAssignedBookRecords(){
		List<AssignBookRecords> assignedBooks = null;
		
		assignedBooks = recordRepository.findAll();
		
		return assignedBooks;
	}
	
	@Transactional
	public boolean returnBook(Long id) {
		AssignBookRecords bookRecord = null;
		Book book = null;
		Optional<AssignBookRecords> recordsOptional = null;
		Optional<Book> bookOptional = null;
		boolean flag = false;
		
		try {
			recordsOptional = recordRepository.findById(id);
			bookRecord = recordsOptional.get();
			recordRepository.delete(bookRecord);
			
				bookOptional = bookRepository.findById(bookRecord.getFkBook().getBookId());
				book = bookOptional.get();
				book.setQuantity(book.getQuantity().add(BigInteger.ONE));
				flag = true;
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
			return flag;
	}
	
	
	public AssignBookRecords getAssignRecordById(Long id) {
		AssignBookRecords assignRecord = null;
		Optional<AssignBookRecords> assignRecordOptional = null;
		
		assignRecordOptional = recordRepository.findById(id);
		assignRecord = assignRecordOptional.get();
		
		return assignRecord;
	}
}
