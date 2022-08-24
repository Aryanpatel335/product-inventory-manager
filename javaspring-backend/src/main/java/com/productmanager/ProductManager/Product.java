package com.productmanager.ProductManager;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
class Product {

    private @Id Long id ;

    private String pid;
    private String Productcode;
    private String Productname;
    private String Category;
    private Float Saleprice;
    private String status;



    public Product() {
    }

    Product(String pid, String Productcode, String Productname, String Category, Float Saleprice, String status){
        this.pid = pid;
        this.Productcode= Productcode;
        this.Productname= Productname;
        this.Category = Category;
        this.Saleprice = Saleprice;
        this.status= status;

    }
    public Long getId(){
        return this.id;
    }
    public String getpid(){
        return this.pid;
    }
    public String getProductcode(){
        return this.Productcode;
    }
    public String getProductname(){
        return this.Productname;
    }
    public String getCategory(){
        return this.Category;
    }
    public Float getSaleprice(){
        return this.Saleprice;
    }
    public String getStatus(){
        return this.status;
    }

    public void setId(Long id){
        this.id=id;
    }
    public void setpid(String pid){
        this.pid = pid;
    }
    public void setProductcode(String Productcode){ this.Productcode = Productcode;}
    public void setProductname(String Productname){ this.Productname = Productname;}
    public void setCategory(String Category){ this.Category = Category;}
    public void setSaleprice(Float Saleprice){ this.Saleprice = Saleprice;}
    public void setStatus(String  status) {
        this.status = status;
    }


}