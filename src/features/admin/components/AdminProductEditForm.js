import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProductAsync,
  fetchBrandAsync,
  fetchCategoryAsync,
  fetchProductByIdAsync,
  resetSelectedProduct,
  selectBrand,
  selectCategory,
  selectProduct,
  selectProductListStatus,
  updateProductByIdAsync,
} from "../../products/productSlice";
import { Grid } from "react-loader-spinner";

function AdminProductEditForm() {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const brand = useSelector(selectBrand);
  const category = useSelector(selectCategory);

  const product = useSelector(selectProduct);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchBrandAsync());
    dispatch(fetchCategoryAsync());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(resetSelectedProduct());
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (product && params.id) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("discountPercentage", product.discountPercentage);
      setValue("price", product.price);
      setValue("rating", product.rating);
      setValue("stock", product.stock);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("thumbnail", product.thumbnail);
      setValue("image1", product.images[0]);
      setValue("image2", product.images[1]);
      setValue("image3", product.images[2]);
      setValue("image4", product.images[3]);
      setValue("image5", product.images[4]);
    }
  }, [product, setValue, params.id]);

  const handleDelete = () => {
    dispatch(updateProductByIdAsync({ ...product, deleted: "true" }));
  };

  return (
    <div>
      {status === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      )}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          let newImages = [
            data.image1,
            data.image2,
            data.image3,
            data.image4,
            data.image5,
          ];

          delete data["image1"];
          delete data["image2"];
          delete data["image3"];
          delete data["image4"];
          delete data["image5"];

          const updatedProduct = { ...data, images: newImages };
          console.log(updatedProduct);
          if (params.id) {
            dispatch(
              updateProductByIdAsync({
                ...updatedProduct,
                rating: product.rating,
                id: product.id,
              })
            );
            reset();
          } else {
            dispatch(addProductAsync({ ...updatedProduct, rating: 0 }));
            reset();
          }
        })}
        className={`bg-white px-4 py-6 mt-6 ml-4 rounded-md shadow-md ${
          status === "loading" ? "blur" : ""
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Your Product
        </h2>
        <p className="mt-2 text-sm text-gray-600">Enter the details below</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              id="title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              id="description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-gray-900"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              {...register("discountPercentage", {
                required: "Discount Percentage is required",
                min: 0,
                max: 100,
              })}
              id="discountPercentage"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: 0,
                max: 10000,
              })}
              id="price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-900"
            >
              Stock
            </label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required", min: 0 })}
              id="stock"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-900"
            >
              Brand
            </label>
            <select
              {...register("brand", { required: "Brand is required" })}
              id="brand"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>-- Choose Brand --</option>
              {brand.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              id="category"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>-- Choose Category --</option>
              {category.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-900"
            >
              Thumbnail
            </label>
            <input
              type="text"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              id="thumbnail"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image1"
              className="block text-sm font-medium text-gray-900"
            >
              Image 1
            </label>
            <input
              type="text"
              {...register("image1", { required: "Image 1 is required" })}
              id="image1"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image2"
              className="block text-sm font-medium text-gray-900"
            >
              Image 2
            </label>
            <input
              type="text"
              {...register("image2", { required: "Image 2 is required" })}
              id="image2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image3"
              className="block text-sm font-medium text-gray-900"
            >
              Image 3
            </label>
            <input
              type="text"
              {...register("image3", { required: "Image 3 is required" })}
              id="image3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image4"
              className="block text-sm font-medium text-gray-900"
            >
              Image 4
            </label>
            <input
              type="text"
              {...register("image4", { required: "Image 4 is required" })}
              id="image4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image5"
              className="block text-sm font-medium text-gray-900"
            >
              Image 5
            </label>
            <input
              type="text"
              {...register("image5", { required: "Image 5 is required" })}
              id="image5"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button className="text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
            Reset
          </button>
          {product && params.id && (
            <button
              onClick={handleDelete}
              type="button"
              className="text-sm font-medium text-white bg-red-600 hover:bg-red-500 border border-transparent rounded-md py-2 px-4 inline-flex items-center justify-center focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:ring-offset-2 focus:ring-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 border border-transparent rounded-md py-2 px-4 inline-flex items-center justify-center focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:ring-offset-2 focus:ring-indigo-600"
          >
            {product && params.id ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductEditForm;
