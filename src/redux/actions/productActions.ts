interface Product {
  id: number;
  name: string;
}


export const fetchProductsSuccess = (products: Product[]) => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchProductsFailure = (error: string) => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: error,
});

export const addProduct = (product: Product) => ({
  type: "ADD_PRODUCT",
  payload: product,
});

export const updateProduct = (product: Product) => ({
  type: "UPDATE_PRODUCT",
  payload: product,
});

export const deleteProduct = (productId: number) => ({
  type: "DELETE_PRODUCT",
  payload: productId,
});
export const filterSearch = (productName: string) => ({
  type: 'FILTER_PRODUCT',
  payload: productName,
});
