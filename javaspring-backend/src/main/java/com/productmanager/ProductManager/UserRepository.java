package com.productmanager.ProductManager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface UserRepository extends JpaRepository<User, Long>{
    @Query("SELECT u FROM User u WHERE u.Googlesubid = :Googlesubid AND u.Email= :Email ")
    public User checkUserInDatabase(@Param("Googlesubid") String Googlesubid, @Param("Email") String Email);
}