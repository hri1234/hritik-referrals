import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {Link , useNavigate} from "react-router-dom"
import { createProduct } from '../features/products/productSlice'
import Swal from 'sweetalert2'
function ProductForm() {
  const [product , setProduct] = useState({name:"" , price : "" , quantity:"" , category:"" , images:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelChangesData = (event)=>{
      const {name , value} = event.target
      setProduct({...product ,[name]:value})
  }
  const handelSubmitData =(event)=>{
    event.preventDefault()
    const AllFormDataReplace = {name:product.name , price:product.price , quantity:product.quantity , category:product.category , images:product.images}
    dispatch(createProduct(AllFormDataReplace))
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${AllFormDataReplace.name} "s data has been Updated.`,
      showConfirmButton: false,
      timer: 2000
  });
    navigate("/ProductForm");

  }
  return (
  <>
<form onSubmit={handelSubmitData}>
  {/* 2 column grid layout with text inputs for the first and last names */}
  <div className="row mb-4">
    <div className="col">
      <div data-mdb-input-init="" className="form-outline">
        <input type="text" id="form3Example1" className="form-control"
        name='name'
        value={product.name}
        onChange={handelChangesData} />
        <label className="form-label" htmlFor="form3Example1">
         Product name
        </label>
      </div>
    </div>
    <div className="col">
      <div data-mdb-input-init="" className="form-outline">
        <input type="text" id="form3Example2" className="form-control" 
        name='price'
        value={product.price}
        onChange={handelChangesData}/>
        <label className="form-label" htmlFor="form3Example2">
         Product Price
        </label>
      </div>
    </div>
  </div>
  {/* Email input */}
  <div data-mdb-input-init="" className="form-outline mb-4">
    <input type="text" id="form3Example3" className="form-control" 
    name='quantity'
    value={product.quantity}
    onChange={handelChangesData}/>
    <label className="form-label" htmlFor="form3Example3">
    product quanity
    </label>
  </div>
  {/* Password input */}
  <div data-mdb-input-init="" className="form-outline mb-4">
    <input type="text" id="form3Example4" className="form-control" 
    name='category'
    value={product.category}
    onChange={handelChangesData}/>
    <label className="form-label" htmlFor="form3Example4">
    Product category
    </label>
  </div>
  <div data-mdb-input-init="" className="form-outline mb-4">
    <input type="text" id="form3Example4" className="form-control" placeholder='enter only images url'
    name='images'
    value={product.images}
    onChange={handelChangesData}/>
    <label className="form-label" htmlFor="form3Example4" placeholder='enter only product images url'>
    Product images
    </label>
  </div>
  {/* Checkbox */}
  <div className="form-check d-flex justify-content-center mb-4">
    <input
      className="form-check-input me-2"
      type="checkbox"
      defaultValue=""
      id="form2Example33"
      defaultChecked=""
    />
    <label className="form-check-label" htmlFor="form2Example33">
      Subscribe to our newsletter
    </label>
  </div>
  {/* Submit button */}
  <button
    data-mdb-ripple-init=""
    type="submit"
    className="btn btn-primary btn-block mb-4"
  >
    Add Products
  </button>
  {/* Register buttons */}
 
</form>

  </>
  )
}

export default ProductForm
