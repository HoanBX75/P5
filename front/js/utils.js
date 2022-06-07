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
  
    trace_object  (level_1, scriptName, funcName, 'Cart items  ', cart_items );
    return (cart_items);
}


