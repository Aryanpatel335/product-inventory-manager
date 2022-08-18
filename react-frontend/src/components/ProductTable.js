import React, {useState, useEffect} from 'react'


import { NavBar } from './NavBar';
export const ProductTable = () => {
    const [dataBaseProducts, setDataBaseProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentObj, setCurrentObj] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const [productname, setproductname] = useState('');
    const [category, setCateogry] = useState('');
    const [saleprice, setSalePrice] = useState('');
    const [searchVal ,setSearchVal] = useState('');
    //for ordering load affect
    const [orderload, setOrderLoad] = useState(false);
    const [clickProductId, setClickedProductId] = useState('');
    useEffect(() => {
      setLoading(true);

      fetch('/products')
        .then(response => response.json())
        .then(body=> {
          setDataBaseProducts(body._embedded.productList)
          setSearchProducts(body._embedded.productList)
          //setSearchProducts(body)
          setLoading(false);
        })

    }, []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const updateContentObj = {productname, category,saleprice}
        await fetch(`/products/${currentObj.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateContentObj)
        }
        )
        
        fetch('/products')
        .then(response => response.json())
        .then(body=> {
          setDataBaseProducts(body._embedded.productList)
          setSearchProducts(body._embedded.productList)
          setLoading(false);
        })
        
        
        setShowUpdate(false);
        setproductname('');
        setCateogry('');
        setSalePrice('');
        setCurrentObj({});
    }

    // if (loading) {
    //   return (<div class="spinner-border text-primary" role="status">
        
    // </div>)
    // }
    const handleClick = async (e,product)=>{
        if (e.target.id === "update") {
          setproductname(product.productname);
          setCateogry(product.category);
          setSalePrice(product.saleprice);
          setCurrentObj(product);
          setShowUpdate(true);
        }
        else{

          setClickedProductId(product.id);
          
          await fetch(`/products/${product.id}/order`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }
        ).then(setOrderLoad(true));
        

        }


        fetch('/products')
        .then(response => response.json())
        .then(body=> {
          setDataBaseProducts(body._embedded.productList)
          setSearchProducts(body._embedded.productList)
          setOrderLoad(false)
          //setSearchProducts(body)
          setLoading(false);
        })


    }
    const handleSearch = (e) =>{
      e.preventDefault();
      
      setSearchProducts(dataBaseProducts.filter(product=> product.productname.toLowerCase().includes(searchVal.toLowerCase())));
      
    }
    const clearSearch = () =>{
      setSearchVal('');
      setLoading(true);
      fetch('/products')
        .then(response => response.json())
        .then(body=> {
          setDataBaseProducts(body._embedded.productList)
          setSearchProducts(body._embedded.productList)
          
          setLoading(false);
        })
    }
   
    
    return (
        <div className="App">
          <NavBar/>
          
          <h1 className='mb-4'>Inventory</h1>
          
          
            <div className='container'>
    <form onSubmit={handleSearch} >
  
      <div className="form-outline mb-2">
        
        <label className="form-label" >
          <input type="text" id="productname" class="form-control" value={searchVal} onChange={e=>{setSearchVal(e.target.value)}}  placeholder="Product Name" />
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-3">Search</button>
    </form>
      {searchVal && (<button className="btn btn-warning" onClick={()=>clearSearch()}>Clear</button>)}
    </div>
    { showUpdate &&(
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter productname:
            <input type="text" name="productname" value={productname} onChange={e=>{setproductname(e.target.value)}}/>
          </label>
          <label>
            Enter Category:
            <input type="text" name="category" value={category} onChange={e=>{setCateogry(e.target.value)}} />
          </label>
          <label>
            Enter Saleprice:
            <input type="text" name="saleprice" value={saleprice} onChange={e=>{setSalePrice(e.target.value)}} />
          </label>


          <input type="submit" value="Submit" />


        </form>
    </div>)}
            
    { loading &&(
            <div class="spinner-border text-primary" role="status">
        
            </div>
          )}
          <table className="table">
          
              <thead>
                <tr>
                  <th scope="col">id</th>
                  
                  
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Sale Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
    
                </tr>
              </thead>
              <tbody>
                {searchProducts.map(g=>(
                    <tr key={g.id}>

                      <th scope="row">{g.id}</th>


                      <td>{g.productname}</td>
                      <td>{g.category}</td>
                  
                      <td>{g.saleprice}</td>
                      <td>{g.status}</td>
                      <td>{orderload && g.id === clickProductId ? 
                      (
                        <div class="spinner-border text-primary" role="status">
                        
                        </div>
                      )
                      : 
                        (
                          <>
                           {g.status !== "ORDER_IN_PROGRESS" && (<button id="order" class="bg-success" onClick={(e)=>handleClick(e,g)}>Order</button>)}
                           <button id="update" onClick={(e)=>handleClick(e,g)}>Update</button>                          
                          </>
                        )
                      }
                      
                      </td>

                    </tr>
                  ))
                
                }
                         
              </tbody>
          </table>
          
          
        </div>
      );
}
