package com.practice.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "practice_table_book_return_records")
public class ReturnBookRecords {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "fk_user")
	private User assignedTo;
	
	@ManyToOne
	@JoinColumn(name = "fk_book")
	private Book assignedBook;
	
	@Column(name = "assign_date")
	private Date assignDate;
	
	@Column(name = "return_date")
	private Date returnDate;
	
	@Column(name = "return_remarks")
	private String remarks;
	
	@Column(name = "rent_cost")
	private Long cost;
	

	public Long getCost() {
		return cost;
	}

	public void setCost(Long cost) {
		this.cost = cost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Book getAssignedBook() {
		return assignedBook;
	}

	public void setAssignedBook(Book assignedBook) {
		this.assignedBook = assignedBook;
	}

	public Date getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(Date assignDate) {
		this.assignDate = assignDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
