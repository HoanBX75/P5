
const  trace_file = '= confirmation.js : ';

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
/*    LocalStorage Functions                                                     */
/* ============================================================================= */

function setCommandeToLocalStorage (orderId, contact_firstname, contact_lastname)
{
    let commande = {
        orderId:orderId,
        firstName:  contact_firstname,
        lastName: contact_lastname
    }
    localStorage.setItem( "commande" , commande);
}



function getCommandeFromLocalStorage ()
{
    let s_commande = localStorage.getItem( "commande");
    let o_commande = JSON.parse (s_commande);

    trace_object ('getCommandeFromLocalStorage()', o_commande);
    return o_commande;
}


function getCommandeOrderIdFromLocalStorage ()
{
    let commande = getCommandeFromLocalStorage ();
    trace_object ('getCommandeOrderIdFromLocalStorage()', commande.orderId);
    return commande.orderId;
}



/* ============================================================================= */
/*    LocalStorage Functions                                                     */
/* ============================================================================= */
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries
let params = new URL(document.location).searchParams;
let param_orderid = params.get("id");
let localStorage_orderid = getCommandeOrderIdFromLocalStorage();
trace_line();
trace ('main /  param orderId =  ' , param_orderid );
trace ('main /  FromLocalStorage OrderId  ', localStorage_orderid);

/*  write order Id in dom */ 
const nbOrder = document.getElementById("orderId");
nbOrder.innerHTML = param_orderid;

if (param_orderid == localStorage_orderid)
{
    trace ('main /  param orderId ==  localStorage_orderid ',  param_orderid + '== '  + localStorage_orderid );
    localStorage.clear() 
}
else 
{
    trace ('main /  param orderId !=  localStorage_orderid ', param_orderid + '!= '  + localStorage_orderid  );
    alert ("Unexpected error / bad order Id");
}



