/*
  Script : utils.js 
  
     - Kanap Trace / Alert functions 
     - LocalStoarage functions
     - Node.js functions 

*/ 


/* ============================================================================= */
/*           Kanap Trace functions                                               */ 
/* ============================================================================= */

const trace_prefix = " == ";
const error_prefix = "!!!!! " ; 
const level_0 = 0; 
const level_1 = 1; 
const level_2 = 2; 
const level_3 = 3; 
const level_4 = 4;

let current_level = 5;   /* default value is 0 */ 



function getTraceLevel  ()
{
    return current_level ;
}
function trace_function_line(level)
{
   if (level <= getTraceLevel  ()) 
   {
    console.log ('-------');
   }
    
}

function trace_line(level)
{
    if (level <= getTraceLevel  ()) 
    {
        console.log ('===============================================');
    }
    
}
function trace_msg (level, script, where, msg) 
{
    if (level <= getTraceLevel  ()) 
    {
        console.log (trace_prefix + script + ' : ' +  where  + ' : '  + msg  );
    }
    
}
function trace_object  (level, script, where, msg, p_object ) 
{
    if (level <= getTraceLevel  ()) 
    {
        console.log (trace_prefix + script + ' : ' +  where  + ' = '  + msg + ' = ', p_object);
    }
  
}

function trace_error (level, script, where, error, msg ) 
{
  
    console.log (error_prefix + script + ' : ' +  where  + ' : '  + msg  );
    console.log (error_prefix + script + ' : ' +  where  + ' : ',  error  );
}



/* ============================================================================= */
/*           Kanap alert  function                                               */ 
/* ============================================================================= */


function kanap_alert (msg){
    alert (msg);
}



/* ============================================================================= */
/*             Node Server                                                       */ 
/* ============================================================================= */



function getNodeServerURL () 
{
  let api_host = 'localhost';
  let api_port = '3000';
  let url =  'http://' + api_host + ':' +  api_port ;
  return (url);
}

function getNodeServerURL_AllProducts ()
{
  let url =   getNodeServerURL() + '/api/products'  ; 
  return url;
}

function  getNodeServerURL_Product (prod_id)
{
    let url =   getNodeServerURL() + '/api/products'  + '/' + prod_id; 
    return url;
}

function getNodeServerURL_Order ()
{
    let url =   getNodeServerURL() + '/api/products' + '/order'  ; 
    return url;
}

/* ============================================================================= */
/*             LocalStorage functions                                            */ 
/* ============================================================================= */


function setCartToLocalStorage (cart_items)
{
    let cart = JSON.stringify(cart_items);
    const  funcName = "setCartToLocalStorage()";
    trace_object  (level_1, scriptName, funcName, 'Cart items  ', cart_items );
    localStorage.setItem( "cart" , cart);
}

function getCartFromLocalStorage ()
{
    const  funcName = "getCartFromLocalStorage()";
    let cart_items = null;
    let s_cart = localStorage.getItem("cart");
  
   
    if  (s_cart == null) {
        cart_items = new  Array ();
        trace_msg (level_1, scriptName, funcName, 'Create cart in LocalStorage');
        setCartToLocalStorage (cart_items);
    } 
    else {
        trace_msg (level_1, scriptName, funcName, 'Cart found in LocalStorage'); 
        cart_items = JSON.parse (s_cart);
    }
  /*
    trace_object  (level_4, scriptName, funcName, 'Cart items  ', cart_items );
    */
    return (cart_items);
}


function getTotalPriceFromLocalStorage ()
{ 
    const  funcName = "getTotalPriceFromLocalStorage()";
    let l_total_price = 0;
    let l_cart  = getCartFromLocalStorage ();
    
    trace_object  (level_1, scriptName, funcName, 'Cart length  ', l_cart.length );
    for ( let l_cart_item  of  l_cart) {
            // calculate the total 
            let l_cart_item_total_price  = l_cart_item.prix *  l_cart_item.quantite;
            l_total_price = l_total_price + l_cart_item_total_price;

    }
  
    trace_object  (level_1, scriptName, funcName, 'l_total_price ', l_total_price );
    return l_total_price;
}



/* ===================== */

function removeCartItemFromLocalStorage (item_id, item_color)
{
    const  funcName = "removeCartItemFromLocalStorage()";
    trace_object (level_1, scriptName, funcName, "item_id item_color ", item_id + '_' + item_color);
    let old_cart_items = getCartFromLocalStorage ();
    let new_cart_items = old_cart_items.filter(el => el.color != item_color || el.id != item_id );
    setCartToLocalStorage (new_cart_items);
    trace_object  (level_1, scriptName, funcName, "new_cart_items", new_cart_items);
}

function updateCartItemQuantityFromLocalStorage (item_id, item_color,item_quantity)
{
    const  funcName = "updateCartItemQuantityFromLocalStorage()";

    trace_object  (level_1, scriptName, funcName,  "itemid color ",  item_id  +  '_' +  item_color)

    trace_object (level_1, scriptName, funcName,   "item_quantity ", item_quantity);


    let cart_items = getCartFromLocalStorage ();
    let cart_item = cart_items.find(el => el.color == item_color && el.id == item_id );
    cart_item.quantite = item_quantity;
    setCartToLocalStorage (cart_items);
    trace_object  (level_1, scriptName, funcName, 'cart_items', cart_items);
}



function setCommandeToLocalStorage (orderId, contact_firstname, contact_lastname)
{
    let commande = {
        orderId:orderId,
        firstName:  contact_firstname,
        lastName: contact_lastname
    }
    localStorage.setItem( "commande" , JSON.stringify (commande));
}

function getCommandeFromLocalStorage ()
{
    let s_commande = localStorage.getItem( "commande");
    return JSON.parse (s_commande);
}

