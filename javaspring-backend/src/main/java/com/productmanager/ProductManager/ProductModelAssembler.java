package com.productmanager.ProductManager;

import org.springframework.stereotype.Component;


import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import java.util.Objects;


@Component
class ProductModelAssembler implements RepresentationModelAssembler<Product, EntityModel<Product>> {

    @Override
    public EntityModel<Product> toModel(Product product) {

        // Unconditional links to single-item resource and aggregate root

        EntityModel<Product> productModel = EntityModel.of(product,
                linkTo(methodOn(ProductController.class).one(product.getId())).withSelfRel(),
                linkTo(methodOn(ProductController.class).all()).withRel("products"));

        // Conditional links based on state of the order

        if (Objects.equals(product.getStatus(), "ORDER_IN_PROGRESS")) {
            productModel.add(linkTo(methodOn(ProductController.class).cancel(product.getId())).withRel("cancel"));
            productModel.add(linkTo(methodOn(ProductController.class).complete(product.getId())).withRel("complete"));
        }

        return productModel;
    }

}