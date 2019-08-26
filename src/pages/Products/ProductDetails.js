import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProductsReviews, setProductReview } from '../../actions/products';
import ReviewItem from '../../components/Review';
import ReviewForm from '../../components/ReviewForm'

import styles from './styles.module.scss';

const ProductDetails = ({ data, reviews, getProductsReviews, isAuthenticated, reviewsLoading, setProductReview, user }) => {

    const { img, title, text, id } = data;

    useEffect(() => {
        getProductsReviews(id);
    }, []);

    return (
        <div>
            <div className={styles.ProductInfo}>
                <div className={styles.ProductItemImageWrapper}>
                    <img className={styles.ProductItemImage} src={`images/${img}`} alt={title} />
                </div>
                <div className={styles.ProductItemTitle}>{title}</div>
                <div className={styles.ProductItemDesc}>{text}</div>
            </div>
            {isAuthenticated && <div>
                <ReviewForm productId={id} username={user.email} onSubmitHandler={setProductReview}></ReviewForm>
            </div>}
            <div className={styles.Reviews}>
                <h2>Reviews</h2>
                {reviewsLoading ?
                    (<div>Loading...</div>) :
                    (<div className={styles.ReviewList}>
                        {
                            reviews.map(review => (
                                <ReviewItem key={review.id} data={review} />
                            ))
                        }
                    </div>)}

            </div>
        </div>
    )
}

ProductDetails.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    reviews: PropTypes.array.isRequired,
    getProductsReviews: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        img: PropTypes.string
    }),
    reviewsLoading: PropTypes.bool.isRequired,
    setProductReview: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
    user: state.auth.user,
    reviews: state.products.productReviews.data,
    reviewsLoading: state.products.productReviews.isLoading
})

export default connect(mapStateToProps, { getProductsReviews, setProductReview })(ProductDetails)
