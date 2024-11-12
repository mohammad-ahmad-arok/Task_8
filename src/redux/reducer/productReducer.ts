interface Product {
  id: number;
  name: string;
}

interface ProductState {
  products: Product[];
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  error: null,
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, error: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "FILTER_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) =>
        {
          console.log(product.name);
          console.log(action.payload)
          product.name.toLowerCase().includes(action.payload.name)
        }
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export { productReducer };
