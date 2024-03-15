import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const createProduct = createAsyncThunk("createProducts" , async(data , {rejectWithValue})=>{
    console.log("create Data", data)
    const FetchDataWithApi = await fetch("http://localhost:5000/products",{
        method:"POST",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify(data)
    })
    try{
        const result = await  FetchDataWithApi.json()
        return result
    }catch(error){
        return rejectWithValue(error)
    }
})

// read Data
export const showProduct = createAsyncThunk(
    "showProduct",
    async (args, { rejectWithValue }) => {
        console.log("Read Data",args)
      const FetchDataWithApi = await fetch(
        "http://localhost:5000/products"
      );
  
      try {
        const result = await FetchDataWithApi.json();
        console.log(result);
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


// updateData 
export const updateProduct = createAsyncThunk("updateProduct" ,async(data, {rejectWithValue})=>{
    console.log("update Data", data)
    const FetchedDatawithApi = await fetch(`http://localhost:5000/products/${data._id}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })
    try{
        const result = await FetchedDatawithApi.json()
        console.log(result)
        return(result)
    }catch(error){
        return  rejectWithValue(error)
    }
})

//Deleate Data 
export const  deleteProduct = createAsyncThunk("Deleate Data" , async(_id, {rejectWithValue})=>{
    // console.log("Delete Data", data)
    const FetchDatawithApi = await fetch(`http://localhost:5000/products/${_id}`,{
        method:"DELETE",
        headers:{
            "content-type" : "application/json"
        },
      
    })
    try{
        const result = await  FetchDatawithApi.json()
        console.log(result)
        return (result)
    }catch(error){
        return rejectWithValue(error)
    }
})

export const productDetail = createSlice({
    name: "productDetail",
    initialState: {
      products: [],
      loading: false,
      error: null,
      searchData: [],
    },
  
    reducers: {
      searchproduct: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;
      },
    },
  
    extraReducers: (builder) => {
      builder
      //   .addCase(fetchTeams.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(fetchTeams.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.Teams = action.payload;
      //   })
      //   .addCase(fetchTeams.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload.message;
      //   })
        .addCase(createProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(showProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(showProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(showProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(deleteProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.products.findIndex((team) => team._id === action.payload._id);
          state.products.splice(index, 1);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(updateProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.products.findIndex((team) => team._id === action.payload._id);
          state.products[index] = action.payload;
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
  });
  
  export default productDetail.reducer;
  export const selectProductById = (_id) => (state) =>
    state.productDetail.products.find((ele) => ele._id === _id);
  
  export const { searchproduct } = productDetail.actions;
  
