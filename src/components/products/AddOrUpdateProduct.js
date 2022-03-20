import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history, //gets history info
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]); // watch props.product when the product is ok, finish this.

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value, // check previous product name. If it has category id, change id to integer. If it nos vategory id, the value is written without any change.
    }));
  }

  function handleSave(event) {
    event.preventDefault(); //prevent the page refresh
    saveProduct(product).then(() => {
      history.push("/"); //routing to previous pages
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  //ownProps is components' own props.
  const productId = ownProps.match.params.productId; // look at parameters and pull the product id
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
