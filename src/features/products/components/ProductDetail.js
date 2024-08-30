import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProduct,
  selectProductListStatus,
} from "../productSlice";
import {
  addToCartAsync,
  selectCart,
  selectCartStatus,
} from "../../cart/cartSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { selectLoggedInUserInfo } from "../../users/usersSlice";
import { selectLoggedInUserToken } from "../../auth/authSlice";

const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function ProductDetail() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const product = useSelector(selectProduct);
  const params = useParams();
  const cartItems = useSelector(selectCart);
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);
  const cartStatus = useSelector(selectCartStatus);
  const userLoggedIn = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const handleCart = (e) => {
    e.preventDefault();
    if (!userLoggedIn) {
      <Navigate to="/login" replace={true}></Navigate>;
    }
    if (cartItems.findIndex((item) => item.product.id === product.id) < 0) {
      const newCartItem = {
        quantity: 1,
        product: product.id,
      };

      if (selectedColor) {
        newCartItem.color = selectedColor;
      }
      if (selectedSize) {
        newCartItem.size = selectedSize;
      }
      const variantIndex = product.variants.findIndex(
        (variant) =>
          variant.size === newCartItem.size &&
          variant.color === newCartItem.color
      );
      if (
        product.variants.length > 0 &&
        product.variants[variantIndex].stock > 0
      ) {
        dispatch(addToCartAsync({ item: newCartItem, alert }));
        // it will be based on server response of backend
      } else {
        alert.error("selected variant out of stock");
      }
    } else {
      alert.error("item already added to cart");
    }
  };
  // Create a set of unique colors from variants
  let uniqueColors = [];
  if (product && product.variants) {
    product.variants.forEach((variant) => {
      if (
        variant.color &&
        !uniqueColors.some((colorObj) => colorObj.color === variant.color)
      ) {
        uniqueColors.push(variant);
      }
    });
  }
  let uniqueSizes = [];
  if (product && product.variants) {
    product.variants.forEach((variant) => {
      if (
        variant.size &&
        !uniqueSizes.some((sizeObj) => sizeObj.size === variant.size)
      ) {
        uniqueSizes.push(variant);
      }
    });
  }

  return (
    <div className="bg-white">
      {(status === "loading" || cartStatus === "loading") && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {product && (
        <div
          className={`pt-6 ${
            status === "loading" || cartStatus === "loading" ? "blur" : ""
          }`}
        >
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              {/* <li className="text-sm mt-10">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li> */}
            </ol>
          </nav>

          {/* Image carousel */}
          <div className="mt-16">
            {" "}
            {/* Changed margin-top from mt-10 to mt-16 */}
            <Carousel>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-1/2"
                >
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.discountedPrice}
              </p>
              <p className="text-xl tracking-tight text-gray-600 line-through">
                ${product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    {product &&
                      product.variants &&
                      uniqueColors &&
                      uniqueColors.map((variant, index) => (
                        <div key={index}>
                          {variant.color && (
                            <div className="mr-4">
                              <RadioGroup
                                value={variant.selectedColor}
                                onChange={setSelectedColor}
                                className="mt-4"
                              >
                                <RadioGroup.Label className="sr-only">
                                  Choose a color
                                </RadioGroup.Label>
                                <div className="flex items-center space-x-3">
                                  <RadioGroup.Option
                                    key={variant.color}
                                    value={variant.id}
                                    className={({ active, checked }) =>
                                      classNames(
                                        variant.selectedClass,
                                        active && checked
                                          ? "ring ring-offset-1"
                                          : "",
                                        !active && checked ? "ring-2" : "",
                                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                      )
                                    }
                                  >
                                    <RadioGroup.Label
                                      as="span"
                                      className="sr-only"
                                    >
                                      {variant.color}
                                    </RadioGroup.Label>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        variant.class,
                                        "h-8 w-8 rounded-full border border-black border-opacity-10"
                                      )}
                                    />
                                  </RadioGroup.Option>
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-row">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    {product &&
                      product.variants &&
                      uniqueSizes &&
                      uniqueSizes.map((variant, index) => (
                        <div key={index}>
                          {variant.size && (
                            <div className="mt-10">
                              {/* <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                  Size guide
                                </div>
                              </div> */}

                              <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                                className="mt-4"
                              >
                                <RadioGroup.Label className="sr-only">
                                  Choose a size
                                </RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                  <RadioGroup.Option
                                    key={variant.size}
                                    value={variant.size}
                                    disabled={!variant.size}
                                    className={({ active }) =>
                                      classNames(
                                        variant.inStock
                                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                                        active ? "ring-2 ring-indigo-500" : "",
                                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="span">
                                          {variant.size}
                                        </RadioGroup.Label>
                                        {variant.inStock ? (
                                          <span
                                            className={classNames(
                                              active ? "border" : "border-2",
                                              checked
                                                ? "border-indigo-500"
                                                : "border-transparent",
                                              "pointer-events-none absolute -inset-px rounded-md"
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                          >
                                            <svg
                                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line
                                                x1={0}
                                                y1={100}
                                                x2={100}
                                                y2={0}
                                                vectorEffect="non-scaling-stroke"
                                              />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                {product.stock > 0 ? (
                  <button
                    onClick={(e) => handleCart(e)}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Out Of Stock
                  </div>
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product.warrantyInformation}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.shippingInformation}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.availabilityStatus}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Dimensions
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product.dimensions.width}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.dimensions.height}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.dimensions.depth}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
