package com.productmanager.ProductManager;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.mediatype.problem.Problem;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController{
    private final ProductRepository productRepository;
    private final ProductModelAssembler assembler;


    ProductController(ProductRepository productRepository, ProductModelAssembler assembler){
        this.productRepository = productRepository;
        this.assembler = assembler;

    }
    @GetMapping("/products")
    CollectionModel<EntityModel<Product>> all() {

        List<EntityModel<Product>> products = productRepository.findAll().stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(products, //
                linkTo(methodOn(ProductController.class).all()).withSelfRel());
    }

    @GetMapping("/products/{id}")
    EntityModel<Product> one(@PathVariable Long id) {

        Product product = productRepository.findById(id) //
                .orElseThrow(() -> new ProductNotFoundException(id));

        return assembler.toModel(product);
    }




    @PutMapping("/products/{id}")
    ResponseEntity<?> updateProductName(@RequestBody Product newProduct,@PathVariable Long id){
        Product updateProduct = productRepository.findById(id) //
                .map(product->{


                    product.setProductname(newProduct.getProductname());
                    product.setCategory(newProduct.getCategory());
                    product.setSaleprice(newProduct.getSaleprice());

                    //product.setStatus(newProduct.getStatus());
                    return productRepository.save(product);
                })
                .orElseGet(()->{
                    newProduct.setId(id);
                    return productRepository.save(newProduct);
                });


        return ResponseEntity.ok(assembler.toModel(updateProduct));

    }

    @PostMapping("/products")
    ResponseEntity<EntityModel<Product>> newProduct(@RequestBody Product product) {
        Long rowCount = productRepository.rowCount();
        Long idToAdd = rowCount +1;
        product.setId(idToAdd);
        product.setStatus("AVAILABLE");
        Product newProduct = productRepository.save(product);

        return ResponseEntity //
                .created(linkTo(methodOn(ProductController.class).one(newProduct.getId())).toUri()) //
                .body(assembler.toModel(newProduct));
    }


    @DeleteMapping("/products/{id}/cancel")
    ResponseEntity<?> cancel(@PathVariable Long id) {

        Product product = productRepository.findById(id) //
                .orElseThrow(() -> new ProductNotFoundException(id));

        if (Objects.equals(product.getStatus(), "ORDER_IN_PROGRESS")) {
            product.setStatus("CANCELLED");
            return ResponseEntity.ok(assembler.toModel(productRepository.save(product)));
        }

        return ResponseEntity //
                .status(HttpStatus.METHOD_NOT_ALLOWED) //
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE) //
                .body(Problem.create() //
                        .withTitle("Method not allowed") //
                        .withDetail("You can't cancel an product that is in the " + product.getStatus() + " status"));
    }
    @PutMapping("/products/{id}/complete")
    ResponseEntity<?> complete(@PathVariable Long id) {

        Product product = productRepository.findById(id) //
                .orElseThrow(() -> new ProductNotFoundException(id));

        if (Objects.equals(product.getStatus(), "ORDER_IN_PROGRESS")) {
            product.setStatus("AVAILABLE");
            return ResponseEntity.ok(assembler.toModel(productRepository.save(product)));
        }

        return ResponseEntity //
                .status(HttpStatus.METHOD_NOT_ALLOWED) //
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE) //
                .body(Problem.create() //
                        .withTitle("Method not allowed") //
                        .withDetail("You can't complete an product that is in the " + product.getStatus() + " status"));
    }

    @PutMapping("/products/{id}/order")
    ResponseEntity<?> orderProduct(@PathVariable Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ProductNotFoundException(id));

        if (Objects.equals(product.getStatus(), "AVAILABLE")){
            product.setStatus("ORDER_IN_PROGRESS");
            return ResponseEntity.ok(assembler.toModel(productRepository.save(product)));
        }
        return ResponseEntity //
                .status(HttpStatus.METHOD_NOT_ALLOWED) //
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE) //
                .body(Problem.create() //
                        .withTitle("Method not allowed") //
                        .withDetail("Product " + product.getStatus() + " is in AVAILABLE status"));
    }



}
