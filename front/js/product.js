/*
  Script : product.js 
  The product.js  goal is to add an article to the 
  cart / or update the quantity  of an existing article in the cart
  from the product.html page  . 
  The product.html takes an input paramater that is a product id (id).
  The product id will be used to fetch details related to this product.
  The article is identifed by  and  id and a color.
*/

/* =======================================================================================  */

const scriptName = 'product.js';

let prod_id =  -1;
let prod_altTxt =  '';
let prod_colors =  [];
let prod_description =  '';
let prod_imageUrl =  '';
let prod_name =  '';
let prod_price =  -1;


/* =======================================================================================  */

/*
    -------------------------------------------------------
    Function name : findCartItemByIdAndColor ()

    Description : this function  searches in the cart  
    if an item exists with given  id AND color  attributes

    Parameter : 
       cart_items a table 
       id : prod id 
       color : color of the product 

    Returns  
       null if not found 
       the cart item if found 
         

 
    -------------------------------------------------------
*/


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


/*
    -------------------------------------------------------
    Function name : addToCart ()
    Description : this function  searches in local storage if this article 
    already exists in the cart;
    If it exists then  update the quantity of the article 
    If it does not then add the article to the cart 
   
    The cart is stored in LocalStorage 

    Parameter : article attributes

    Returns  
       the final updated quantity of the article if the article exists  
       0 if the article does not exist 
          
 
    -------------------------------------------------------
*/

function addToCart  (p_id,
    p_color, 
    p_quantite, 
    p_prix, p_name, p_desc, p_imageSrc, p_imageAlt)
{
    const  funcName = "addToCart()";
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



    trace_function_line (level_2);
    trace_object (level_1, scriptName, funcName, 'prod_item', prod_item);

     /* 1. 0Get the cart from LocalStorage */ 
      /* ---------------------------------  */
     let l_cart  = getCartFromLocalStorage ();
     trace_object (level_1, scriptName, funcName, 'cart', l_cart);

     /* 2. Search Item from Cart */
      /* ----------------------  */
     let l_cart_item = findCartItemByIdAndColor (l_cart, p_id, p_color);

     if ( l_cart_item == null) {
        /* 3.1 add Item to cart */ 
       /* ---------------------  */
        trace_msg (level_1, scriptName, funcName, " Item not found in Cart -> adding item to Cart ");
         l_cart.push (prod_item);
         setCartToLocalStorage (l_cart);
         return (0);
     }
     else {
      
        /* 3.2 updating (incrementing) the exsiting item 's quanntity */ 
        /* ---------------------------------------------------------  */
        trace_object (level_1, scriptName, funcName, 'Item found in Cart ', l_cart_item);
     
        let quantity_res = parseInt(l_cart_item.quantite) +  parseInt (prod_item.quantite);
        l_cart_item.quantite = quantity_res;
        setCartToLocalStorage (l_cart);
        trace_object (level_1, scriptName, funcName, 'the item quantity is now ', l_cart_item.quantite);

        return (l_cart_item.quantite);
     }

}


/*
    -------------------------------------------------------
    Function name : cb_addToCart ()
    Parameter 
        event  : event 
    Description :  function that handles  click on 'ajouter au panier'  
       - Get color, quantity from the dom 
       - Check the color, quantity values 
       - Add to the Cart in  LocalStorage
    -------------------------------------------------------
*/


function cb_addToCart (event)
{
    const  funcName = "cb_addToCart()";
    trace_line (level_2);
  
    trace_object (level_1, scriptName, funcName, 'event request ', event);

    /* Product id */ 
    trace_object (level_1, scriptName, funcName, 'product_id ', prod_id);
    
   
    if (prod_id == null ){
        trace_error (level_1, scriptName, funcName, ' bad product_id ', prod_id);
        kanap_alert ('bad product_id');
        return;
      
    }
    else 
    {
        if (prod_id == -1) {
            trace_error (level_1, scriptName, funcName, ' bad product_id ', prod_id);
            kanap_alert ('bad product_id');
        return;
        }
    }
  

    /* 1. Get Quantity from Dom */
     /* -----------------------  */
    let quantity_elt = document.getElementById ('quantity');
    let chosen_quantity = quantity_elt.value;
    trace_object (level_1, scriptName, funcName, 'chosen quantity  ', chosen_quantity);
     let i_chosen_quantity =  parseInt (chosen_quantity);
     trace_object (level_1, scriptName, funcName, 'i chosen quantity  ', i_chosen_quantity);

    /* 1. Get Color */ 
     /* ----------  */
    let elt_colors = document.getElementById ('colors');
    let chosen_color = elt_colors[elt_colors.selectedIndex].value;

   
    trace_object (level_1, scriptName, funcName, 'selected  color  ', chosen_color);

    /* 3. Checkings  :  id, colors, quantity */ 
     /* ------------------------------------  */
   let alert_msg="";
   if (chosen_color == ""  ) {
           alert_msg = alert_msg + "SVP, choisissez une couleur";
           trace_error (level_1, scriptName, funcName, ' Error: ', 'color not chosen ');
    } 
    
    if (i_chosen_quantity <= 0  || i_chosen_quantity > 100) {
         alert_msg = alert_msg + "\nSVP, choisissez un nombre d'article entre 1 et 100";
         trace_error (level_1, scriptName, funcName, ' quantity   bad value ', i_chosen_quantity);
    } 
    if (alert_msg !=''){
         
          alert (alert_msg);
          return;
    }
    
    /* 4. add to the Cart in  LocalStorage */ 
     /* ---------------------------------  */
    let article_quantity = addToCart (prod_id,
               chosen_color, 
               i_chosen_quantity, 
                prod_price, prod_name, prod_description, prod_imageUrl, prod_altTxt);


    let msg = null;
    if   (article_quantity == 0)
    { 
      msg =  `Le produit  ${prod_name} de couleur ${chosen_color} a été ajouté au panier.` + '\n' +
      `Le nombre d\'articles est : ${i_chosen_quantity}` ;
   
    }   
    else 
    {
       msg =   `Le nombre d\'articles ajouté est : ${i_chosen_quantity} . \n` + 
       `Le nombre d\'articles pour  le produit ${prod_name} de couleur ${chosen_color} est maintenant : ${article_quantity}` ;
    }     
    kanap_alert (msg);
}




/*
    -------------------------------------------------------
    Function name : dom_setProduct ()
    Parameter 
       id : product id  
       price : product price
       altTxt, colors, description,imageUrl, name ... 
    Description :  function does the following :  
                        -  writes a product item in the product.html page 
in the article 

          <article>
            <div class="item__img">
              <!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
            </div>

            ...
          </article>

    -------------------------------------------------------
*/

function dom_setProduct(id, altTxt, colors, description,imageUrl, name, price)
{
    const  funcName = "dom_setProduct()";
    
    trace_object (level_1, scriptName, funcName, 'Product id  ', id);
    trace_object (level_1, scriptName, funcName, 'prod_id  ', prod_id);
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
        trace_object (level_1, scriptName, funcName, 'Color', color);
    
     let new_color_option = document.createElement('option');
     new_color_option.setAttribute('name', color);
     new_color_option.innerText = color; 
     item__colors.append (new_color_option);
    }

}


/*
    -------------------------------------------------------
    Function name : http_getProductById ()
    Parameter 
        prod_id : product id 
    Description :  function does the following :  
                        - fetch  Product datails the backend 
                         - register listener to the handle the response of the request 
    -------------------------------------------------------
*/


function http_getProductById (prod_id)
{
    const  funcName = "http_getProductById()";
    let url = getNodeServerURL_Product (prod_id);
    trace_object (level_1, scriptName, funcName, 'send request ', url);

    let prom = fetch (url).then(function(res) {
        if (res.ok) {

          /* CALL BACK RESPONSE */ 
     
          trace_line (level_1);
          trace_object (level_1, scriptName, funcName, 'CALL BACK RESPONSE (OK)', res);
          return res.json();
        }
        else {
            trace_line (level_1);
            trace_object (level_1, scriptName, funcName, 'CALL BACK RESPONSE (NOK)', res);
            kanap_alert ('Erreur : le produit demandé ne peut être obtenu. '); 
            return;
        }
      })
      .then(function(prod) {
      
        /* CALL BACK RESPONSE */ 

        /* 1.2 get product from response  */  

        trace_object  (level_1, scriptName, funcName, ' CALL BACK RESPONSE : product details',  prod);       

        /* Product */
        trace_object  (level_1, scriptName, funcName, ' CALL BACK RESPONSE : prod._id',  prod._id);       

            prod_id =  prod._id;
            prod_altTxt =  prod.altTxt;
            prod_colors =  prod.colors;
            prod_description =  prod.description;
            prod_imageUrl =  prod.imageUrl;
            prod_name =  prod.name;
            prod_price =  prod.price;



         /* 1.2 Set Product to DOM product page */
         let item = dom_setProduct(prod_id, 
                  prod_altTxt, prod_colors, prod_description,prod_imageUrl, prod_name, prod_price);

 
        
      })
       .catch(function(err) {
             // Erreur dans la réponse 
        trace_object  ('http_getProductById()  /  CB Erreur  ' ,  err );
        
      
      });
      
    
      trace_object (level_1, scriptName, funcName, 'Request sent, Promise ', prom);
}


/*
    -------------------------------------------------------
    Function name : displayProduct ()
    Description :  function does the following :  
                        - get Product Id  from the request 
                        - sends an http request 
                            to get Product datails   
                         - add it to the dom and  display it .
                         - register listener to the button 'ajouter au panier'
    -------------------------------------------------------
*/

function displayProduct ()
{
    const  funcName = "displayProduct()";

   
    /* 1. Get  id   from http request  */ 
    /* ------------------------------  */

    trace_object (level_1, scriptName, funcName, 'Input Http Request', window.location.href);
    let params = new URL(document.location).searchParams;
     prod_id = params.get("id");
    trace_object (level_1, scriptName, funcName, 'Input Product id', prod_id);

   if (prod_id == null ) {
       kanap_alert ("Erreur : la requête ne contient pas d\' identifiant d\'article. ");
       trace_error(level_1, scriptName, funcName, 'Input Product id', prod_id);
       return;
   }
   else {
       if  (prod_id == '')
       {
        kanap_alert ("Erreur : la requête ne contient pas d\' identifiant d\'article. ");
        trace_error(level_1, scriptName, funcName, 'Input Product id', prod_id);
        return;
       }
   }

    /* 2.  Get Product details from backend */ 
     /* ------------------------------------  */

   let pr = http_getProductById (prod_id);


   /* 3.  Register cb_addToCart()  listener */
   /* ------------------------------------  */

   trace_object (level_1, scriptName, funcName, 'addListener to Button Ajouter au Panier', 'cb_addToCart');
   const btn = document.getElementById("addToCart");
   btn.addEventListener('click', cb_addToCart);

   
}

/* =======================================================================================  */

trace_line(level_1);
trace_msg (level_1, scriptName, 'main', 'begin');
displayProduct ();
trace_msg (level_1, scriptName, 'main', 'end');

/* =======================================================================================  */



