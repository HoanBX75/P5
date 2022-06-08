
const  trace_file = '= config.js : ';
const scriptName = 'config..js';

/* ============================================================================= */
/*
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
*/

/* ============================================================================= */

function resetConfig (event){
  trace_line();
  trace ('resetConfig', 'debut');
  let cart_items = new  Array ();
  localStorage.clear();
  localStorage.setItem( "cart" ,JSON.stringify(cart_items));
  localStorage.setItem("site", "coucou");
} 
/* ============================================================================= */

function getCartItems () {  
    let s_cart = localStorage.getItem( "cart");
    let o_cart_items = JSON.parse (s_cart);
    return (o_cart_items);
}


 /* ============================================================================= */

function dumpPanier (event){
    trace_line();
    trace ('dumpPanier()', 'debut');
    
    /*
    let site = localStorage.getItem("site");
    console.log ('s_site = ' +  site);
    */

    let cart = localStorage.getItem( "cart");
    let o_cart = JSON.parse (cart);
    console.log ('o_cart (object) = '  ,   o_cart );
    console.log ('s_cart (string) = '  +   cart );
    

    let commande  = localStorage.getItem( "commande ");

    trace ('dumpPanier', 'fin');



  } 



/* ============================================================================= */

  function cb_addPanier (event){
    trace_line();
    trace ('cb_addPanier()', 'debut');     
  
    let s_cart = localStorage.getItem( "cart");
    let o_cart_items = JSON.parse (s_cart);


   let prod_id =  document.getElementById ("prod_id");
   let prod_color_select =  document.getElementById ("prod_color"); 

   if (prod_color_select.selectedIndex == 0) 
   {
      alert ("SVP, choisissez une couleur");
      return;
   }
   let prod_quantite =  document.getElementById ("prod_quantite");    
   let prod_prix =  document.getElementById ("prod_prix");   
   let prod_name =  document.getElementById ("prod_name");
   let prod_description =  document.getElementById ("prod_description");    
   let prod_imageSrc =  document.getElementById ("prod_imageSrc");    
   let prod_imageAlt =  document.getElementById ("prod_imageAlt");    


   let prod_id_value  = prod_id.value; 
   /* console.log ("prod_color_select", prod_color_select); */
   let prod_color_value  = prod_color_select.options [prod_color_select.selectedIndex].value;
   let prod_quantite_value  = prod_quantite.value;
   let prod_prix_value  =  prod_prix.value;
   let prod_name_value  = prod_name.value;
   let prod_description_value  = prod_description.value;
   let prod_imageSrc_value  = prod_imageSrc.value; 
   let prod_imageAlt_value  = prod_imageAlt.value;

   let prod_item = {
       id: prod_id_value,
       color:  prod_color_value,
       quantite:  prod_quantite_value,
       prix:   prod_prix_value,
       name:  prod_name_value,
       description:   prod_description_value,
       imageSrc:   prod_imageSrc_value,
       imageAlt: prod_imageAlt_value
   };

   trace_object  ("cb_addPanier () prod_item = ", prod_item);

   o_cart_items.push (prod_item);
   let s_cart_items = JSON.stringify(o_cart_items);
   localStorage.setItem( "cart", s_cart_items);
   trace ('cb_addPanier()', 'fin');
  }    

 /* ============================================================================= */
 function findPanierByIdAndColor (cart_items, id, color)
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
/* ============================================================================= */
 
 function cb_setTraceLevel (event){
 /*
    trace_line();

    trace ('cb_setTraceLevel()', 'debut');     
  */
    trace_line(level_3);
    let select_trace_level =  document.getElementById ("select_trace_level"); 

   
    let traceLevel_value  = select_trace_level.options [select_trace_level.selectedIndex].value;
   /*
    trace  ("cb_setTraceLevel : traceLevel value = ", traceLevel_value);
   */
    setConfigTraceLevelToLocalStorage (traceLevel_value);

/*
    trace ('cb_setTraceLevel()', 'fin');
  */
    return traceLevel_value;   
 }



 /* ============================================================================= */

 function cb_removePanier (event){
    let removed_item;
    trace_line();
    trace ('cb_removePanier()', 'debut');     
  
    let prod_id =  document.getElementById ("remove_prod_id");
    let prod_color_select =  document.getElementById ("remove_prod_color"); 
    let remove_result = document.getElementById ("remove_result");

    let prod_id_value  = prod_id.value; 
    /* console.log ("prod_color_select", prod_color_select);
    https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value

    
    
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    
    for( var i = 0; i < arr.length; i++){ 
    
        if ( arr[i] === 5) { 
    
            arr.splice(i, 1); 
        }
    
    }
    
    //=> [1, 2, 3, 4, 6, 7, 8, 9, 0]



    */
    let prod_color_value  = prod_color_select.options [prod_color_select.selectedIndex].value;
 
    
    trace ('cb_removePanier() id:color',  prod_id_value + ':' + prod_color_value); 

    remove_result.innerText = "Undefined";
   
    let o_cart_items = getCartItems()
    let o_item =  findPanierByIdAndColor (o_cart_items, prod_id_value, prod_color_value);
    trace_object  ('cb_removePanier()  o_item ',   o_item );
     
    if (o_item != null)   {
        
    }

    

    trace ('cb_removePanier()', 'fin');
    return (o_item);  
 }
  /* ============================================================================= */



/*
let elt_reset = document.getElementById ("resetPanier");
elt_reset.addEventListener ("click", resetConfig);
let elt_dump = document.getElementById ("dumpPanier");
elt_dump.addEventListener ("click", dumpPanier);
let elt_add = document.getElementById ("addPanier");
elt_add.addEventListener ("click", cb_addPanier);
*/

let elt_find = document.getElementById ("setTraceLevel");
elt_find.addEventListener ("click", cb_setTraceLevel);

/*
let elt_remove = document.getElementById ("removePanier");
elt_remove.addEventListener ("click", cb_removePanier);


trace (' ',  'fin');

*/