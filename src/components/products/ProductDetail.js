import React from "react";
import SelectInput from "../toolbox/SelectInput";
import TextInput from "../toolbox/TextInput";

const ProductDetail = ({ categories, product, onSave, onChange }) => {
  return (
    <form onSubmit={onSave}>
      <h3>{product.id ? "Update" : "Add"}</h3>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="Error"
      />

      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId || ""}
        defaultOption="Choose"
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
        error="error"
      />

      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  );
};

export default ProductDetail;
