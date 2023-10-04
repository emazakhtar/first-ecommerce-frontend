import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useAlert } from "react-alert";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

function AdminProductEditForm() {
  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const brand = useSelector(selectBrand);
  const category = useSelector(selectCategory);
  const alert = useAlert();
  const product = useSelector(selectProduct);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();
  const params = useParams();

  const [variantFields, setVariantFields] = useState([
    { color: "", size: "", stock: "" },
  ]);

  const addVariantField = () => {
    setVariantFields([...variantFields, { color: "", size: "", stock: "" }]);
  };

  const removeVariantField = (index) => {
    const updatedVariants = [...variantFields];
    updatedVariants.splice(index, 1);
    setVariantFields(updatedVariants);
  };

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
      // product.colors.map((color) => setValue("colors", true));
    }
  }, [product, setValue, params.id]);

  const handleDelete = () => {
    dispatch(
      updateProductByIdAsync({
        product: { ...product, deleted: "true" },
        alert,
      })
    );
  };

  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
    },
    {
      name: "Blue",
      class: "bg-blue-600",
      selectedClass: "ring-blue-600",
      id: "blue",
    },
    {
      name: "Green",
      class: "bg-green-600",
      selectedClass: "ring-green-600",
      id: "green",
    },
    {
      name: "Yellow",
      class: "bg-yellow-600",
      selectedClass: "ring-yellow-600",
      id: "yellow",
    },
    {
      name: "Orange",
      class: "bg-orange-600",
      selectedClass: "ring-orange-600",
      id: "orange",
    },
    {
      name: "Red",
      class: "bg-red-600",
      selectedClass: "ring-red-600",
      id: "red",
    },
  ];
  const sizes = [
    { name: "XXS", inStock: false, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];

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

          let updatedProduct = { ...data, images: newImages };

          // if (updatedProduct.colors) {
          //   updatedProduct.colors = updatedProduct.colors.map((color) =>
          //     colors.find((clr) => clr.id === color)
          //   );
          // }

          // if (updatedProduct.sizes) {
          //   updatedProduct.sizes = updatedProduct.sizes.map((size) =>
          //     sizes.find((sz) => sz.id === size)
          //   );
          // }
          if (updatedProduct.variants) {
            for (let i = 0; i < updatedProduct.variants.length; i++) {
              for (let j = 0; j < colors.length; j++) {
                if (updatedProduct.variants[i].color === colors[j].id) {
                  updatedProduct.variants[i] = {
                    ...updatedProduct.variants[i],
                    id: colors[j].id,
                    class: colors[j].class,
                    selectedClass: colors[j].selectedClass,
                    inStock: true,
                    stock: +updatedProduct.variants[i].stock,
                  };
                }
              }
            }
          }

          console.log(updatedProduct);

          if (params.id) {
            dispatch(
              updateProductByIdAsync({
                product: {
                  ...updatedProduct,
                  rating: product.rating,
                  id: product.id,
                },
                alert,
              })
            );
            reset();
          } else {
            dispatch(
              addProductAsync({
                product: { ...updatedProduct, rating: 0 },
                alert,
              })
            );
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
          {/* <div>
            <label
              htmlFor="sizes"
              className="block text-sm font-medium text-gray-900"
            >
              Sizes
            </label>
            <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {sizes.map((size, index) => (
                <>
                  <input
                    {...register("sizes")}
                    key={index}
                    value={size.id}
                    type="checkbox"
                  ></input>
                  {size.name}
                </>
              ))}
            </div>
          </div> */}
          {/* <div>
            <label
              htmlFor="colors"
              className="block text-sm font-medium text-gray-900"
            >
              Colors
            </label>
            <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {colors.map((color, index) => (
                <>
                  <input
                    {...register("colors")}
                    key={index}
                    value={color.id}
                    type="checkbox"
                  ></input>
                  {color.name}
                </>
              ))}
            </div>
          </div> */}
          <div className="mt-6">
            <label
              htmlFor="variants"
              className="block text-sm font-medium text-gray-900"
            >
              Variants
            </label>
            <div className="mt-1">
              {variantFields.map((variant, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <Controller
                    name={`variants[${index}].color`}
                    control={control}
                    defaultValue={variant.color}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Color"
                        {...field}
                        className="col-span-1 w-full px-2 py-1 border rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  />
                  <Controller
                    name={`variants[${index}].size`}
                    control={control}
                    defaultValue={variant.size}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Size-S,M,L,XL"
                        {...field}
                        className="col-span-1 w-full px-2 py-1 border rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  />
                  <Controller
                    name={`variants[${index}].stock`}
                    control={control}
                    defaultValue={variant.stock}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Stock"
                        {...field}
                        className="col-span-1 w-full px-2 py-1 border rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeVariantField(index)}
                    className="mt-1 col-span-3 text-red-600 hover:text-red-800"
                  >
                    Remove Variant
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addVariantField}
                className="px-2 py-1 text-sm font-medium text-gray-900 bg-indigo-100 border rounded-md border-indigo-300 hover:bg-indigo-200"
              >
                Add Variant
              </button>
            </div>
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
