/*
  Script : utils.js 
  Common utilities used in the Kanap Java scripts.
     - Kanap Trace / Alert functions 
     - LocalStorage functions
     - Node.js functions 

*/ 


/* ======================*/
/* config  LocalStorage */
/* ===================== */


function setConfigToLocalStorage (p_traceLevel, p_api_host, p_api_port)
{
    const funcName = "setConfigToLocalStorage()"; 
    let l_config = {
        traceLevel: p_traceLevel,
        api_host:  p_api_host,
        api_port: p_api_port
    };
    /*
    trace_object (level_1, scriptName, funcName, 'config', l_config);
    */
    localStorage.setItem( "config" , JSON.stringify (l_config));
    return (l_config);
}

function getConfigFromLocalStorage ()
{   
    const funcName = "getConfigFromLocalStorage()"; 
    let o_config = null;
    let s_config = localStorage.getItem( "config");
    
    
     if (s_config != null)
     {
       /*
        trace_msg  (level_1, scriptName, funcName, 'config exists ');
        */
        o_config = JSON.parse (s_config);
    
     }
     else 
     {  
         /*
        trace_msg  (level_1, scriptName, funcName, 'Create default config ');
        */
        let default_traceLevel = 0;
        let default_api_host   =  'localhost';
        let default_api_port = 3000;
        o_config = setConfigToLocalStorage (default_traceLevel,
                                            default_api_host, 
                                            default_api_port);
     }

   /*
    trace_object (level_1, scriptName, funcName, 'config', o_config);
   */
    return (o_config);
}



function setConfigTraceLevelToLocalStorage ( p_traceLevel)
{
    const funcName = "setConfigTraceLevelToLocalStorage()";
    /*
    trace_object (level_1, scriptName, funcName, 'p_traceLevel', p_traceLevel);
    */
    let l_config = getConfigFromLocalStorage();

    l_api_host = l_config.api_host ; 
    l_api_port = l_config.api_port ;
    l_config = setConfigToLocalStorage (p_traceLevel, l_api_host, l_api_port);
    /*
    trace_object (level_1, scriptName, funcName, 'config', l_config);
    trace_object (level_1, scriptName, funcName, 'current_level', current_level);
    */
    current_level = p_traceLevel;
    return p_traceLevel;
}

function getConfigTraceLevelFromLocalStorage ()
{
    const funcName = "getConfigTraceLevelFromLocalStorage()";
    let l_config = getConfigFromLocalStorage();
    let l_traceLevel = l_config.traceLevel;
 /*    trace_object (level_1, scriptName, funcName, 'traceLevel', l_traceLevel); */ 
    return l_traceLevel;
}




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
/* 
let current_level =  0;   default value is 0 
*/ 



function getTraceLevel  ()
{
    let current_level = getConfigTraceLevelFromLocalStorage ();
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

/*
  For Kanap, 
  the Localstorage is used to store 
     - cart 
     - commande  
     - config 
        trace_level 
        api_host 
        api_port 

*/ 



/* ================= */
/* Cart  Storage     */
/* ================ */


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
  
    trace_object  (level_4, scriptName, funcName, 's_cart  ', s_cart );

   
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
       verification du prix du canapé 
       XXXX
    */ 

  /*     
       trace_object  (level_4, scriptName, funcName, 'Cart items  ', cart_items );


       for (let l_cart_item of cart_items )
       {
          trace_line ();
           trace_msg  (level_4, scriptName, funcName, 'before  XXXXXXXXXXXX   ' );
       
           getFromBackend_ItemPrice(l_cart_item).then (
              price => {
                trace_object  (level_4, scriptName, funcName, ' Item_price  ', price );
              }
           );
           trace_msg  (level_4, scriptName, funcName, 'after  YYYYYYYYYYY  ' );
           trace_line ();
       }
*/
       

  
    return (cart_items);
}

 


async  function  getFromBackend_ItemPrice  (cart_item) 
{
    console.log ("==============================================================");
    const  funcName = "getFromBackend_ItemPrice()";
    trace_object  (level_1, scriptName, funcName, ' l_cart_item', cart_item );
    let prod_id = cart_item.id;
    let url = getNodeServerURL_Product (prod_id);

    trace_msg  (level_4, scriptName, funcName, '  await fetch begin  ' );
    let response = null;
    let prod = null;
    try {
     response = await fetch(url);
    }
    catch (e) {
        console.error('meaningOfLife() a rapporté une erreur:', e);
    }
    trace_msg  (level_4, scriptName, funcName, '  await json begin  ' );
    try {
         prod = await response.json();
        }
        catch (e) {
            console.error('meaningOfLife() a rapporté une erreur:', e);
        }
  

    trace_object  (level_1, scriptName, funcName, 'prod  id  ', prod._id );
    trace_object  (level_1, scriptName, funcName, 'prod  id  ', prod.price );
    console.log ("==============================================================");
    return (prod.price);
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

/* ==================*/
/* commmande storage */
/* ================= */

function setCommandeToLocalStorage (orderId, contact_firstname, contact_lastname)
{
    const funcName = "setCommandeToLocalStorage()"; 
    let commande = {
        orderId:orderId,
        firstName:  contact_firstname,
        lastName: contact_lastname
    }
    trace_object (level_1, scriptName, funcName, 'commande', commande);
    localStorage.setItem( "commande" , JSON.stringify (commande));
}

function getCommandeFromLocalStorage ()
{
    const funcName = "getCommandeFromLocalStorage()"; 
    let s_commande = localStorage.getItem( "commande");
    let o_commande = JSON.parse (s_commande);
    trace_object (level_1, scriptName, funcName, 'commande', o_commande);
    return o_commande;
}


function getCommandeOrderIdFromLocalStorage ()
{
    const funcName = "getCommandeOrderIdFromLocalStorage()"; 
    let orderId = null;
    let commande = getCommandeFromLocalStorage ();
    if (commande == null) {
        return null;
    }    
    else {
        orderId = commande.orderId;
    }
    trace_object (level_1, scriptName, funcName, 'order id ', orderId);
    return commande.orderId;
}




