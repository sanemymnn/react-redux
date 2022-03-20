import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category); //when clicked on a category, chosen category changes and it writes its name.
    this.props.actions.getProducts(category.id); //to list products according to their category
  };
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map(
            (
              category //write jsx for each category
            ) => (
              <ListGroupItem
                active={category.id === this.props.currentCategory.id} //chosen category's color is blue
                onClick={() => this.selectCategory(category)}
                key={category.id}
              >
                {category.categoryName}
              </ListGroupItem>
            )
          )}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //connect actions with reducer
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
