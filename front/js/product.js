let api_host = 'localhost';
let api_port = '3000';
let api_products = 'api/products'


let prod_id =  -1;
let prod_altTxt =  '';
let prod_colors =  [];
let prod_description =  '';
let prod_imageUrl =  '';
let prod_name =  '';
let prod_price =  -1;

const  trace_file = '= product.js : ';


/* ============================================================================= */
function trace_line()
{
    console.log ('===============================================');
}
function trace (trace_where, trace_log) 
{
    console.log (trace_file +  trace_where + ' : '  + trace_log );
}
function trace_object  (trace_where, trace_object ) 
{
    console.log (trace_file +  trace_where + ' : ',trace_object  );
}
/* ============================================================================= */

function setCartToLocalStorage (cart_items)
{
    let cart = JSON.stringify(cart_items)
    localStorage.setItem( "cart" , cart);
}

function getCartFromLocalStorage ()
{
    let cart_items = null;
    let s_cart = localStorage.getItem("cart");
 
   
    if  (s_cart == null) {
        cart_items = new  Array ();
        trace ("getCartFromLocalStorage() ", 'create cart in local storage ');
        setCartToLocalStorage (cart_items);
    } 
    else {
        trace ("getCartFromLocalStorage() ", ' cart found in local storage ');
        trace_object  ("getCartFromLocalStorage() ", s_cart );
        cart_items = JSON.parse (s_cart);
    }
    trace_object  ('getCartFromLocalStorage () cart_items ',  cart_items );
    return (cart_items);
}


/* =======================================================================================  */
function dom_setProduct(id, altTxt, colors, description,imageUrl, name, price)
{
    
    trace ('dom_setProduct() product id', id)
   
 
    /*  Image */ 
     let item__img = document.querySelector("div.item__img");
     let new_img = document.createElement('img');
     new_img.setAttribute('src', imageUrl);
     new_img.setAttribute('alt', altTxt);
     item__img.append (new_img);

     /*  Price */
    let item__price = document.getElementById("price");
    item__price.innerText = price;

     /*  Description  */
     let item__description = document.getElementById("description");
     item__description.innerText = description;

     /* colors */ 
     let item__colors = document.getElementById("colors");

    for (let color of colors )
    {
      trace ('dom_setProduct() color ', color)
     let new_color_option = document.createElement('option');
     new_color_option.setAttribute('name', color);
     new_color_option.innerText = color; 
     item__colors.append (new_color_option);
    }

}

/* =======================================================================================  */
 function http_getProductById (api_host, api_port, api_products,  id)
{
    trace_line ();
    let url = 'http://' + api_host + ':' +  api_port + '/' +  api_products  + '/' +  id;  
    trace_object  ('http_getProductById()  / backend url request : ' ,  url );


    let prom = fetch (url).then(function(res) {
        if (res.ok) {
          /* get response CALL BACK */ 
          trace_object  ('http_getProductById()  /  CB response  ' ,  res );
          return res.json();
        }
      })
      .then(function(prod) {
        /* get product from response CALL BACK  */  
        trace_object  ('http_getProductById()  /  CB response  product  ' ,  prod);       

        /* Product */
         prod_id =  prod._id;
         prod_altTxt =  prod.altTxt;
         prod_colors =  prod.colors;
         prod_description =  prod.description;
         prod_imageUrl =  prod.imageUrl;
         prod_name =  prod.name;
         prod_price =  prod.price;
         
         /* Set Product to DOM product page */
         let item = dom_setProduct(prod_id, prod_altTxt, prod_colors, prod_description,prod_imageUrl, prod_name, prod_price);
            /* addProductToDocumentSectionItems (item) */
        
      })
       .catch(function(err) {
             // Erreur dans la réponse 
        trace_object  ('http_getProductById()  /  CB Erreur  ' ,  err );
        
      
      });
      
      trace_object  ('http_getProductById()  / end  promise ' ,  prom );
      
}



/* =======================================================================================  */

function findCartItemByIdAndColor (cart_items, id, color)
 {
    let found = null;
    if (cart_items == null )
    {
        return found;
    }
    if (cart_items.length  == 0 )
    {
        return found;
    }

    found = cart_items.find(element => element.color  == color 
                                    &&  element.id == id   );
    return found;
 }
/* =======================================================================================  */

function addToCart  (p_id,
    p_color, 
    p_quantite, 
    p_prix, p_name, p_desc, p_imageSrc, p_imageAlt)
{
    let prod_item = {
        id: p_id,
        color:  p_color,
        quantite:  p_quantite,
        prix:   p_prix,
        name:  p_name,
        description:   p_desc,
        imageSrc:   p_imageSrc,
        imageAlt: p_imageAlt
    };
    trace_line ();
    trace_object  ('addToCart ()  prod_item = ', prod_item  );

     /* Get the cart from LocalStorage */ 
     let l_cart  = getCartFromLocalStorage ();
     trace_object  ('addToCart ()  l_cart = ', l_cart  );

     /* Search Item from Cart */
     let l_cart_item = findCartItemByIdAndColor (l_cart, p_id, p_color);

     if ( l_cart_item == null) {
     

        /* add Item to cart */ 
        trace ('cb_addToCart () ', " Item not found in Cart -> adding item to Cart " );
         l_cart.push (prod_item);
         setCartToLocalStorage (l_cart);

     }
     else {
      
        /* updating (incrementing) the exsiting item 's quanntity */ 
        trace_object  ('cb_addToCart ()  Item found in Cart ', l_cart_item );
        trace ('cb_addToCart ()  updating the item quantity ', prod_item.quantite );
        let quantity_res = parseInt(l_cart_item.quantite) +  parseInt (prod_item.quantite);
        l_cart_item.quantite = quantity_res;
        setCartToLocalStorage (l_cart);
     }

}
/* =======================================================================================  */

function cb_addToCart (event)
{
    trace_line ();
    trace ('cb_addToCart () ', event );
  
    /* Product id */ 
    trace ('cb_addToCart () :  prod_id', prod_id ); 
   
    if (prod_id == ''){
        trace ('cb_addToCart ()' , 'bad product id ');
    }
  

    /* 1. Get Quantity from Dom */
    let quantity_elt = document.getElementById ('quantity');
    chosen_quantity = quantity_elt.value;
    trace ('cb_addToCart () : chosen quantity '  ,   chosen_quantity);

    /* 1. Get Color */ 

    let elt_colors = document.getElementById ('colors');
    let chosen_color = elt_colors[elt_colors.selectedIndex].value;

    trace  ('cb_addToCart () : selected  color = '  ,   chosen_color);

    /* 3. Checkings  :  id, colors, quantity */ 
   let alert_msg="";
   if (chosen_color == ""  ) {
           alert_msg = alert_msg + "SVP Choisissez une couleur";
           trace ('cb_addToCart () : ', 'color not chosen ');
    } 

    if (chosen_quantity <= 0  || chosen_quantity > 100) {
         alert_msg = alert_msg + "\nSVP Choisissez un nombre d'article entre 1 et 100";
         trace ('cb_addToCart () : ', 'quantity  bad value  ');
    } 
    if (alert_msg !=''){
         
          alert (alert_msg);
          return;
    }
    
    /* 4. add to LocalStorage */ 
    
    addToCart (prod_id,
               chosen_color, 
               chosen_quantity, 
                prod_price, prod_name, prod_description, prod_imageUrl, prod_altTxt);

}


/* =======================================================================================  */

trace_line();

/* 1. Get  id   from http request  */ 
trace_object  ('main / http request ' , window.location.href);

let  parts = window.location.href.split('?');
let params = parts [1];
let searchParams  = new URLSearchParams(params);
let id = searchParams.get('id');                 
trace ('main /article id ', id);

/* 2.  Get Product details from backend */ 

let pr = http_getProductById (api_host, api_port, api_products,  id);


/* 3.  Register addToCart listener */

const btn = document.getElementById("addToCart");
btn.addEventListener('click', cb_addToCart);


/* 
console.log ('product.js part 0  =  ' , parts [0]);
console.log ('product.js part 1 =  ' , parts [1]);
 https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams 
 */