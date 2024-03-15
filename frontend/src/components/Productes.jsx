import React from "react"
import styled from "styled-components";
import { useDispatch , useSelector } from "react-redux"
import { showProduct } from "../features/products/productSlice"
import { productDetail } from "../features/products/productSlice"
import { incrementPoints } from "../features/points/pointsSlice";
import Swal from "sweetalert2";
const Productes=()=>{
    const dispatch = useDispatch()
    const {products , loading } = useSelector((state)=> state.products)
    const points =useSelector((state) => state.points.value);
    console.log("hritik Products" , products)
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    React.useEffect(()=>{
        dispatch(showProduct())
        dispatch(incrementPoints())
    },[])

    const handleBuyProduct = (product) => {
      if(points > product.price){
      Swal.fire({
        title: "Do you want to buy " + product.name + "?",
        showCancelButton: true,
        confirmButtonText: "Buy",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire( product.name + " has been successfully purchased!", {
            icon: "success",
          });
        }
      });
    }else{
      Swal.fire( product.name + " you can not purchase this product , you dont have enough points !", {
        icon: "failed",
      });
    }
    };

    if (loading) {
        return <h1>Loading</h1>;
      }
    
    return(
     <>
    

<BlockSection className="text-gray-600 body-font">
      <div className="container-fluid px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">

          {products?.map((ele)=>{
            return(
              <>
              
          <div className="lg:w-1/4 md:w-1/2 p-4 width30" key={ele?._id}
          onClick={() => handleBuyProduct(ele)}
          >
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center block"
                src={ele?.images}
                style={{justifyContent:"center" , alignItems:"center"}}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
               {ele?.name}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
               {ele?.category}
              </h2>
              <p className="mt-1">${ele?.price}</p>
            </div>
          </div>
          </>
            )
          })}
    
        </div>
      </div>
    </BlockSection>


        </>
    )
}
export default Productes

const BlockSection = styled.section`
  .container {
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }


  .lg\:w-1\/4 {
    width: 25%;
  }

  .md\:w-1\/2 {
    width: 50%;
  }

  .p-4 {
    padding: 1rem;
  }

  .w-full {
    width: 100%;
  }

  .width30 {
    width: 30%;
  }

  .block {
    display: block;
  }

  .relative {
    position: relative;
  }

  .h-48 {
    height: 12rem;
  }

  .rounded {
    border-radius: 0.25rem;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .object-cover {
    object-fit: cover;
  }

  .object-center {
    object-position: center;
  }

  .text-gray-500 {
    color: #6b7280;
  }

  .text-xs {
    font-size: 0.75rem;
  }

  .tracking-widest {
    letter-spacing: 0.125em;
  }

  .title-font {
    font-family: var(--font-family-sans);
  }

  .mb-1 {
    margin-bottom: 0.25rem;
  }

  .text-gray-900 {
    color: #111827;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .mt-1 {
    margin-top: 0.25rem;
  }
`;