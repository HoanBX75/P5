
/*
  Script : confirmation.js 
  The confirmation.js goal is to acknowledge an order defined by 
  an order id passes as a parameter to the confirmation.html page.
  The confirmation.html is invoked via an order button of the cart.html page.
  Ths order id is validated by checking the one that has been in the localStorage 
  by the cart.js  java script.
*/ 


const scriptName = 'confirmation.js';

/* =======================================================================================  */

/*
    -------------------------------------------------------
    Function name : handleOrderconfirmation ()
    Description :  function does the following : 
                     Get the orderId from url and localstorage   
                     If the  url orderId is equal to localstorage  uid 
                     then validation is ok 
                     else order is not valid

    -------------------------------------------------------
*/

function  handleOrderconfirmation ()
{
    let funcName =  'handleOrderconfirmation';
/* Get id parameter from url */ 

let params = new URL(document.location).searchParams;
let param_orderid = params.get("id");
trace_object  (level_1, scriptName, funcName, "param_orderid" , param_orderid );

if  (param_orderid == null) {
    kanap_alert ("La commande est non validée : mauvais identifiant de commande. ");
    return;
}

/* Get Order  id parameter from LocalStorage  */ 
let localStorage_orderid = getCommandeOrderIdFromLocalStorage();
trace_object  (level_1, scriptName, funcName,  'localStorage_orderid', localStorage_orderid);
if  (localStorage_orderid == null) {
    kanap_alert ("La commande est non validée : mauvais identifiant interne de commande. ");
    return;
}

if (param_orderid == localStorage_orderid)
{
    trace_msg (level_1, scriptName, funcName,  param_orderid + '== '  + localStorage_orderid );
    /*  write order Id in dom */ 
    
    let cmd =   getCommandeFromLocalStorage ();
    let msg =  `<br> <br>  A bientôt  ${cmd.firstName} !` ;
    /*
     msg =  `<br> <br>  Un mail de confirmation est envoyé à  ${cmd.firstName} !` ;
    */
     const nbOrder = document.getElementById("orderId");
    nbOrder.innerHTML = param_orderid + msg ;

    
     localStorage.clear() 
}
else 
{
     trace_msg (level_1, scriptName, funcName,  param_orderid + '!= '  + localStorage_orderid  );
     kanap_alert ("La commande est non validée :  identifiant de commande incohérent. ");
}
}
/* ======================================================================================================== */

trace_line(level_1);
trace_msg (level_1, scriptName, 'main', 'begin');
handleOrderconfirmation ();
trace_msg (level_1, scriptName, 'main', 'end');

/* =======================================================================================  */





