import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  addProductAsync,
  fetchBrandAsync,
  fetchCategoryAsync,
  fetchProductByIdAsync,
  resetSelectedProduct,
  selectBrand,
  selectCategory,
  selectProduct,
  updateProductByIdAsync,
} from "../../products/productSlice";

function AdminProductEditForm() {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const brand = useSelector(selectBrand);
  const category = useSelector(selectCategory);

  const product = useSelector(selectProduct);
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

  // const handleCancel = () => {
  //   return <Navigate to="/admin/home" replace={true}></Navigate>;
  // };
  return (
    <div>
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
        className="bg-white px-12 py-12 mt-12"
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Edit Your Product
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter the details below
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title", {
                    required: "title is required",
                  })}
                  id="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="discountPercentage"
                  {...register("discountPercentage", {
                    required: "discountPercentage is required",
                    min: 0,
                    max: 100,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="price"
                  id="price"
                  {...register("price", {
                    required: "price is required",
                    min: 0,
                    max: 10000,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("stock", {
                    required: "stock is required",
                    min: 0,
                  })}
                  id="stock"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: "brand is required",
                  })}
                >
                  <option>--choose brand--</option>
                  {brand.map((b) => (
                    <option value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: "category is required",
                  })}
                >
                  <option>--choose category--</option>
                  {category.map((c) => (
                    <option value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("thumbnail", {
                    required: "thumbnail is required",
                  })}
                  id="thubmnail   "
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image1", {
                    required: "image1 is required",
                  })}
                  id="image1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image2", {
                    required: "image2 is required",
                  })}
                  id="image2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image3", {
                    required: "image3 is required",
                  })}
                  id="image3"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image4"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 4
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image4", {
                    required: "image4 is required",
                  })}
                  id="image4"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image5"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 5
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image5", {
                    required: "image4 is required",
                  })}
                  id="image5"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          {product && params.id && (
            <button
              onClick={handleDelete}
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {product && params.id ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductEditForm;
