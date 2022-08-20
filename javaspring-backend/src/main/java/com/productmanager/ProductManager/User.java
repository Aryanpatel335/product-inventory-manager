package com.productmanager.ProductManager;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    private @Id
    @GeneratedValue
    Long id;

    private String Googlesubid;
    private String Username;
    public User(){}

    User(Long id, String Googlesubid, String Username){
        this.id = id;
        this.Googlesubid= Googlesubid;
        this.Username = Username;

    }




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getGooglesubid(){
        return Googlesubid;
    }

    public void setGooglesubid(String googlesubid){
        this.Googlesubid = googlesubid;
    }

    public String getUsername(){
        return Username;
    }

    public void setUsername(String username){
        this.Username = username;
    }




}