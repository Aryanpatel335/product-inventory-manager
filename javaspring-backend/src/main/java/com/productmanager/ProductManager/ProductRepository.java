package com.productmanager.ProductManager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface ProductRepository extends JpaRepository<Product, Long>{
    @Query("SELECT COUNT(u) FROM Product u")
    public Long rowCount();
}