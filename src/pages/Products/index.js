import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from '../../actions/products';

import ProductDetails from './ProductDetails';
import Modal from '../../components/Modal'

import styles from './styles.module.scss';


const ProductItem = ({ onClick, ...props }) => {
    const { img, title, text } = props;

    const onClickHandler = (e) => {
        onClick(props);
    }
    return (
        <li className={styles.ProductItem} onClick={onClickHandler} >
            <div className={styles.ProductItemImageWrapper}>
                <img className={styles.ProductItemImage} src={`images/${img}`} alt={title} />
            </div>
            <div className={styles.ProductItemTitle}>{title}</div>
            <div className={styles.ProductItemDesc}>{text}</div>
        </li>
    )
}

ProductItem.propTypes = {
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

class Products extends Component {
    state = {
        showModal: false,
        selectedProduct: null
    }
    componentDidMount() {
        this.props.getProducts()
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    showProductDetails = (data) => {
        this.setState({ selectedProduct: data, showModal: true });
    }

    render() {
        const { selectedProduct, showModal } = this.state;
        const { products } = this.props;
        return (
            <div className={styles.productsPage}>
                <h1 className="pageTitle">
                    Products
                </h1>
                <div className={styles.productsPageContent}>
                    <div>
                        <ul className={styles.ProductsList}>
                            {products.map(item => (
                                <ProductItem key={item.id} {...item} onClick={this.showProductDetails} />
                            ))}
                        </ul>
                    </div>
                    <Modal open={showModal} onClose={this.closeModal} title={selectedProduct && selectedProduct.title}>
                        <div className={styles.ProductDetails}>
                            <ProductDetails data={selectedProduct}></ProductDetails>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getProducts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    products: state.products.productsList.data,
    isLoading: state.products.productsList.isLoading
});

export default connect(mapStateToProps, { getProducts })(Products)
