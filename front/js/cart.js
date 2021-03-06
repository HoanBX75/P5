/*
  Script : cart.js 
  The cart.js  goal is to display  the cart content  
  and display it  in the cart.html page.
  Besides, Three listener handlers : 
     - delete an  order article 
     - update an order  article quantity
     - send the order (done via a post requet )  
*/


const scriptName = 'cart.js';

/* =======================================================================================  */

/*
    -------------------------------------------------------
    Function name : addlistenerToForm ()
    Description :  function does the following : 
                     Get the cart from LocalStorage  
                     for each cart item 
                        - Build the dom article item
                        - Register the Change listener on the item  
                        - Register the Delete  listener on the item  

     -  This function contains the handler  :
           - when clicking the COMMANDER button : 
                it will post  the command with the contact details 
                                             and product ids 
           -  if the post is ok 
                 then
                   store contact and order details in the local storage  
                   goto the confirmation page with orderId



                
    -------------------------------------------------------
*/


function addlistenerToForm() {
    const  funcName = "addlistenerToForm()";
    trace_function_line(level_3);
  

    let dom_formCommander = document.getElementById("order");
    trace_msg  (level_1, scriptName, funcName, 'begin' );

    dom_formCommander.addEventListener("click", function(evt) {

        /* ******************************* */
        /* LISTENER  COMMMANDER BUTTON     */ 
        /* ******************************* */

        evt.preventDefault();
        trace_line(level_1);
        trace_msg  (level_1, scriptName, funcName, 'FORM BUTTON LISTENER' );

        let l_cart = getCartFromLocalStorage();
        if  (l_cart.length == 0) {
            trace_msg (level_1, scriptName, funcName,
                          " Pas de commande, votre panier est vide ! ");

            kanap_alert (" Pas de commande, votre panier est vide ! ");
            return ;
        }

        let l_formFirstName = document.getElementById("firstName").value;
        let l_formLastName = document.getElementById("lastName").value;
        let l_formAdress = document.getElementById("address").value;
        let l_formCity = document.getElementById("city").value;
        let l_formEmail = document.getElementById("email").value;

        trace_msg  (level_2, scriptName, funcName, 'l_formFirstName = ' + l_formFirstName);
        trace_msg  (level_2, scriptName, funcName, 'l_formLastName = ' + l_formLastName);
        trace_msg  (level_2, scriptName, funcName, 'l_formAdress = ' + l_formAdress);
        trace_msg  (level_2, scriptName, funcName, 'l_formCity = ' + l_formCity);
        trace_msg  (level_2, scriptName, funcName, 'l_formEmail = ' + l_formEmail);

   /*
    https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
    */

        let l_form_err = " "; 
       //  let  regName = /^[a-zA-Z]+ [a-z??A-Z]+$/;
       let  regName = /^[ a-zA-Z0-9'????????????????????????????????????????????????????????????????????????????????????????????????????????????????????._\s -]+$/g;
         let valid = true;

        if(!regName.test(l_formFirstName)){
            if (!valid) l_form_err = l_form_err +", ";
            trace_msg  (level_1, scriptName, funcName, 'Error : firstname ' );
            valid = false;
            document.getElementById("firstNameErrorMsg").innerHTML = `"${l_formFirstName} n'est pas valide !"`
            l_form_err =   l_form_err + "Pr??nom";     
        }   
        else {
            document.getElementById("firstNameErrorMsg").innerHTML = "";
        }

        regName = /^[ a-zA-Z0-9'????????????????????????????????????????????????????????????????????????????????????????????????????????????????????._\s -]+$/g;
        if(!regName.test(l_formLastName)){
            if (!valid) l_form_err = l_form_err +", ";
            trace_msg  (level_1, scriptName, funcName, 'Error : Lastname ' );
            valid = false;
            l_form_err =   l_form_err + "Nom";   
            document.getElementById("lastNameErrorMsg").innerHTML = `"${l_formLastName} n'est pas valide !"`
        }  
        else {
            document.getElementById("lastNameErrorMsg").innerHTML = "";
        }
        
        regName = /^[ a-zA-Z0-9'????????????????????????????????????????????????????????????????????????????????????????????????????????????????????._\s -]+$/g;
        if(!regName.test(l_formCity)){
            if (!valid) l_form_err = l_form_err +",";
            trace_msg  (level_1, scriptName, funcName, 'Error : city ' );
            valid = false;
            l_form_err =   l_form_err + "Ville ";  
            document.getElementById("cityErrorMsg").innerHTML = `"${l_formCity} n'est pas valide !"`
        }  
        else {
            document.getElementById("cityErrorMsg").innerHTML = "";
        }

        regName = /^[ a-zA-Z0-9'????????????????????????????????????????????????????????????????????????????????????????????????????????????????????._\s -]+$/g;
        if(!regName.test(l_formAdress)){
            if (!valid) l_form_err = l_form_err +",";
            trace_msg  (level_1, scriptName, funcName, 'Error : adress ' );
            valid = false;
            l_form_err =   l_form_err + "Adresse"; 
            document.getElementById("addressErrorMsg").innerHTML = `"${l_formAdress} n'est pas valide !"`
        }  
        else {
            document.getElementById("addressErrorMsg").innerHTML = "";
        }

        
        let regEmail = /^[a-zA-Z0-9????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/g;
        if(!regEmail.test(l_formEmail)){
            if (!valid) l_form_err = l_form_err +", ";
            trace_msg  (level_1, scriptName, funcName, 'Error : Email ' );
            l_form_err =   l_form_err + "Email"; 

            valid = false;
            document.getElementById("emailErrorMsg").innerHTML = `"${l_formEmail} n'est pas valide !"`
        }  
        else {
            document.getElementById("emailErrorMsg").innerHTML = "";
        }

        if (!valid ) {
            
            kanap_alert (" SVP, v??rifier les valeurs correspondantes ?? :  " +   l_form_err);
            return;
        }
       
        

        let l_form_contact = {
            firstName: l_formFirstName,
            lastName: l_formLastName,
            address: l_formAdress,
            city: l_formCity,
            email: l_formEmail
        }
         
        trace_object  (level_1, scriptName, funcName, 'Contact form' , l_form_contact);


        /* Check the product ids in the order   */
        let product_ids = [];
        

        for (let cart_item of l_cart){
            trace_object  (level_1, scriptName, funcName, 'Order - cart items id ', cart_item.id);
            product_ids.push(cart_item.id);
        }

        trace_object  (level_1, scriptName, funcName, ' order  product ids  ', product_ids);
        let contact = l_form_contact;
        let products = product_ids;
        let o_post_body  = {contact, products};
        let s_post_body  = JSON.stringify(o_post_body);
        trace_object  (level_1, scriptName, funcName, 'Order POST  body =  ', s_post_body);


        /* 
            Pour les routes POST, l???objet contact envoy?? au serveur doit contenir les champs firstName,
            lastName, address, city et email. Le tableau des produits envoy?? au back-end doit ??tre un
            array de strings product-ID. Les types de ces champs et leur pr??sence doivent ??tre valid??s
            avant l???envoi des donn??es au serveur

            exports.orderProducts = (req, res, next) => {
            if (!req.body.contact ||
                !req.body.contact.firstName ||
                !req.body.contact.lastName ||
                !req.body.contact.address ||
                !req.body.contact.city ||
                !req.body.contact.email ||
                !req.body.products) {
                return res.status(400).send(new Error('Bad request!'));
            }

        */

     
          let post_order_url = getNodeServerURL_Order ();
          let url_getAll =   getNodeServerURL_AllProducts (); 
           trace_object (level_1, scriptName, funcName, 'post url  ', post_order_url);

/*  -----------------------------------------------------------------    */
/*  Checking that the Cart item price has not changed                   */   
/*  -----------------------------------------------------------------    */

        /*  *************** */
        /*  HTTP  GET ALL   */
        /*  ************** */

 

     fetch (url_getAll).then(function(res) {

    /* 1. Callback to handle AllProducts response */ 

    trace_line(level_1);
    trace_object (level_1, scriptName, funcName,' CallBack 1  http  GET All response', res);
 
      if (res.ok) {
        return res.json();
      }
      else 
      {
        throw 'Error ' + res.status + ' ' + res.statusText  +  ' url = ' + url;
       }
      
    })
    .then(function(value) {
 
     /* 2. Callback to handle body  response (json) */ 
 
     trace_object (level_1, scriptName, funcName,' CallBack 2 http GET http  GET All (json)', value);
 

      
       // Loop on the cart 
       // ==================

      trace_line(level_2);
      let isPriceChanged = false;
      for (let cart_item of l_cart){
        trace_function_line (level_2);
        trace_object  (level_1, scriptName, funcName, 'Order - cart item id ', cart_item.id);
        trace_object  (level_1, scriptName, funcName, 'Order - cart item price ', cart_item.prix);

        let l_prod = value.find ( prod  => prod._id == cart_item.id);
        trace_object  (level_1, scriptName, funcName, 'prod found  id ', l_prod);
       
        // test si le prix de l'item du panier est different de celui du backend 
        if (l_prod.price != cart_item.prix)  {
            cart_item.prix = l_prod.price;
            isPriceChanged = true;
       }
      } // end of loop 

    trace_line(level_2);

    // Test si un prix a ??t?? chang?? 
    if (isPriceChanged) {
          // Change the cart items with the new  prices  and refresh the cart page 
          trace_msg  (level_1, scriptName, funcName, 'Prices have changed  ');
          setCartToLocalStorage (l_cart);
          displayCartPage ();

          throw 'Les prix Kanap ont chang??.\n' 
          + 'Merci de revalider votre panier avec les nouveaux tarifs et commander.\n ';
          
           return ("NOK");
    }
    else {
       // No price change 
       trace_msg  (level_1, scriptName, funcName, 'Prices have Not changed  ');
    }

      return ("OK");
     
    })
 .then ( resall => {
    
    trace_object (level_1, scriptName, funcName, 'resall ', resall);
         
/*  -----------------------------------------------------------------    */
/*  Getting the Order Id                                                */   
/*  -----------------------------------------------------------------    */



      /*  ********** */
        /*  HTTP  POST  */
        /*  ********** */

        fetch(post_order_url , {
            method: "POST",
            body: s_post_body,
            headers: {
                'content-type' : "application/json",
            }   
        }).then (res => {


            if (res.ok) {

                /* CALL BACK RESPONSE  OK */ 
           
                trace_line (level_1);
                trace_object (level_1, scriptName, funcName, 'ORDER POST   RESPONSE (OK)', res);
                return res.json();
              }
              else {
                /* CALL BACK RESPONSE  NOK */ 
                  trace_line (level_1);
                  trace_object (level_1, scriptName, funcName, ' ORDER POST  RESPONSE (NOK)', res);
                 
                  throw 'Erreur : la commande ne peut etre effectu??e . ';
                  return;
              }

        }).then((data) => {
       /* ************************* */
        /*  POST CALL BACK     */ 
        /* ************************* */

            trace_line (level_1);
            trace_object (level_1, scriptName, funcName, 'ORDER POST 2 RESPONSE (OK)', data);        

            let orderId = data.orderId
            trace_object (level_1, scriptName, funcName, 'POST  OK -   orderId = ', orderId);

            let contact_firstname = l_formFirstName ;
            let contact_lastname = l_formLastName ;

            /* store in the Local storage  the order ID */
            /* ----------------------------------------- */ 

            setCommandeToLocalStorage (orderId, contact_firstname, contact_lastname);


            trace_object (level_1, scriptName, funcName, ' contact  = ',  
                     contact_firstname + '_' +contact_firstname );

/* -------------------------------------------------------------------  */            
/* Go the confirmation page                                            */ 
/* -------------------------------------------------------------------  */            
            l_url =  `./confirmation.html?id=${orderId}` ;
            trace_object (level_1, scriptName, funcName, 'loading confirmation page ', l_url);


             window.location.replace(l_url);

        }).catch((error) =>{
       /* ************************* */
        /*  POST CALL BACK  NOK     */ 
        /* ************************* */

            trace_error(level_1, scriptName, funcName, error, 'Post cannot be done to order');
            kanap_alert (error); 
        });

    }) /* then du fetch all */ 
    .catch(function(err) {
 
        /* Display an alert if error is detected */
   
        let err_msg = ' Kanap message : '
        trace_error (level_0, scriptName, funcName, err, 
                      err_msg);
        kanap_alert (err_msg + '\n' + err);
   
      });



    /* */
    });   // end click command button  listener 
    trace_msg  (level_1, scriptName, funcName, 'end' );
}

/*
async  function check_prices ()
{
     return "good ";
} 
*/

/*
    -------------------------------------------------------
    Function name : displayCartItems ()
    Description :  function does the following : 
                     Get the cart from LocalStorage  
                     for each cart item 
                        - Build the dom article item
                        - Register the Change listener on the item  
                         - Register the Delete  listener on the item  
    -------------------------------------------------------
*/

function displayCartItems()
{
   
    const  funcName = 'displayCartItems()';
    let l_total_price = 0;
    trace_function_line (level_2)
  

    /* Get Cart from Storage */ 

    let l_cart  = getCartFromLocalStorage ();
    trace_object (level_1, scriptName, funcName,  'Cart', l_cart );

    let  l_cart_items = document.getElementById('cart__items');
     
    /* Remove existing dom items */
    /* ------------------------- */

    trace_msg (level_1, scriptName, funcName,  'removing existing articles in DOM ');
    let element =   l_cart_items;
     while (element.firstChild) {
          element.removeChild(element.firstChild);
     }


    if (l_cart.length <= 0) {
        trace_msg (level_1, scriptName, funcName,  'cart is empty ');
    }
    else {



        /* Loop on cart items */
        /* ------------------ */

        for ( let l_cart_item  of  l_cart) {

          
            trace_object (level_4, scriptName, funcName,  'cart_item', l_cart_item );

        /* **************** */
        /*   DOM ARTICLE    */ 
        /* **************** */          


            /* 1.article */
            let new_article = document.createElement('article');
            new_article.classList.add('cart__item');
            new_article.setAttribute('data-id', l_cart_item.id);
            new_article.setAttribute('data-color', l_cart_item.color);

            /* 1.1  cart__item__img (div) */
            /* ========================== */            
            let new_div1 = document.createElement('div');
            new_div1.classList.add('cart__item__img');

            /* 1.1.1  img */
            let new_div1_img = document.createElement('img');
            new_div1_img.setAttribute('src', l_cart_item.imageSrc);
            new_div1_img.setAttribute('alt', l_cart_item.imageAlt);

            new_div1.append (new_div1_img);
            new_article.append (new_div1);

            /* 1.2 . cart__item__content */ 
            /* ========================== */

            let new_div2 = document.createElement('div');
            new_div2.classList.add('cart__item__content');

            /* 1.2.1   cart__item__content__description */
            /* ---------------------------------------- */
            let new_div2_description = document.createElement('div');
            new_div2_description.classList.add('cart__item__content__description');

            /* 1.2.1.1 nom produit  */
            let new_div2_desc_name = document.createElement('h2');
            new_div2_desc_name.innerText = l_cart_item.name;
            /* 1.2.1.2 color   */
            let new_div2_desc_color = document.createElement('p');
            new_div2_desc_color.innerText = l_cart_item.color;
            /* 1.2.1.2 price    */
            let new_div2_desc_price  = document.createElement('p');
            new_div2_desc_price.innerText = l_cart_item.prix + ' ???';

            new_div2_description.append (new_div2_desc_name);
            new_div2_description.append (new_div2_desc_color);
            new_div2_description.append (new_div2_desc_price);            

            new_div2.append (new_div2_description);

            /* 1.2.2   cart__item__content__settings */
            /* ------------------------------------- */
            let new_div2_settings = document.createElement('div');
            new_div2_settings.classList.add('cart__item__content__settings');

            /* 1.2.2.1   cart__item__content__settings__quantity */
            let new_div2_settings_quantity = document.createElement('div');
            new_div2_settings_quantity.classList.add('cart__item__content__settings__quantity');
            let new_div2_settings_quantity_p = document.createElement('p');
            new_div2_settings_quantity_p.innerText = "Qt?? : " ;

            let new_div2_settings_quantity_input = document.createElement('input');
            new_div2_settings_quantity_input.classList.add('itemQuantity');
            new_div2_settings_quantity_input.setAttribute('type', "number");
            new_div2_settings_quantity_input.setAttribute('name', "itemQuantity");
            new_div2_settings_quantity_input.setAttribute('min', 1);
            new_div2_settings_quantity_input.setAttribute('max', 100);
            new_div2_settings_quantity_input.setAttribute('value', l_cart_item.quantite);

            new_div2_settings_quantity.append (new_div2_settings_quantity_p);
            new_div2_settings_quantity.append (new_div2_settings_quantity_input);
            new_div2_settings.append (new_div2_settings_quantity);

        /* **************************** */
        /*   CHANGE  LISTENER quantity */ 
        /* *************************** */

        new_div2_settings_quantity_input.addEventListener('change', (event) => {

            trace_line(level_1);
            const l_cart_item_id = l_cart_item.id;
            const l_cart_item_color = l_cart_item.color;  
            const l_dom_element =  new_div2_settings_quantity_input;
            let new_quantity = event.target.value;
            const old_quantity = l_cart_item.quantite;
            
            trace_object  (level_4, scriptName, funcName,  'change_quantity  new value ',  event.target.value);
            trace_object  (level_4, scriptName, funcName,  'change_quantity  old value ',  old_quantity);


             if (new_quantity == 0 )  {
                 /* if the quantity is equal to 0 then delete the element  */ 
                 trace_msg  (level_4, scriptName, funcName, 'removing the article as the quantity is 0');
                 removeCartItemFromLocalStorage (l_cart_item_id, l_cart_item_color);
             }
             else 
             {
                updateCartItemQuantityFromLocalStorage (l_cart_item_id, l_cart_item_color, new_quantity);
             }

           
            displayCartItems();
            displayTotalPrice();
                        /* XXXXXXXXXXXXXXXX  rafraichir la page 
                         document.location.reload();
                        */
            
        });


            /* 1.2.2.2  cart__item__content__settings__delete */
            let new_div2_settings_supprimer = document.createElement('div');
            new_div2_settings_supprimer.classList.add('cart__item__content__settings__delete');

            let new_div2_settings_supprimer_p = document.createElement('p');           
            new_div2_settings_supprimer_p.classList.add('deleteItem');
            new_div2_settings_supprimer_p.innerText = "Supprimer";

        /* ************************* */
        /*   DELETE LISTENER item    */ 
        /* ************************* */

         new_div2_settings_supprimer_p.addEventListener ('click', (event) => {
            trace_line(level_1);
             trace_msg  (level_4, scriptName, funcName,  'DELETE ITEM listener ');
             const l_cart_item_id = l_cart_item.id;
             const l_cart_item_color = l_cart_item.color;  
             const l_dom_element =  new_div2_settings_supprimer_p;
             trace_object  (level_4, scriptName, funcName, 'DELETE ITEM listener -  l_cart_item_id id  ',  l_cart_item_id );
             trace_object  ( level_4, scriptName, funcName, 'DELETE ITEM listener -  l_cart_item_color ',  l_cart_item_color );
             trace_object ( level_4, scriptName, funcName, 'DELETE ITEM listener -  l_dom_element ',  l_dom_element );

             /* No need :
             const l_art = l_dom_element.closest('article');
             trace_object ( 'dom_displayCartItems () closet ',  l_art );
             */
            /* update local storage XXXXX  */
            removeCartItemFromLocalStorage (l_cart_item_id, l_cart_item_color);
          
            displayCartItems();
            displayTotalPrice();
          
            /* XXXXXXXXXXXXXXXX  rafraichir la page 
              document.location.reload();
            */

         });

            new_div2_settings_supprimer.append(new_div2_settings_supprimer_p);
            new_div2_settings.append (new_div2_settings_supprimer);
            
            new_div2.append (new_div2_description);
            new_div2.append (new_div2_settings);

            new_article.append (new_div1);
            new_article.append (new_div2);
            l_cart_items.append (new_article);

    

        }
        /* end of Loop on cart items */

    }
   

}


/*
    -------------------------------------------------------
    Function name : displayTotalPrice ()
    Description :  function does the following : 
                     - Get the cart tot price  from LocalStorage  
    -------------------------------------------------------
*/


function displayTotalPrice()
{
    const  funcName = 'displayTotalPrice()';
    trace_function_line(level_1);
    let totalPrice = getTotalPriceFromLocalStorage ();
    trace_object (level_1, scriptName, funcName, 'totalPrice', totalPrice);
    let  l_dom_totalPrice = document.getElementById('totalPrice');
    l_dom_totalPrice.innerText = totalPrice;
}



/*
    -------------------------------------------------------
    Function name : displayCartPage ()
    Description : 
        - display the cart items 
        - display the total price   
        - add Listener to the form 
    -------------------------------------------------------
*/


function displayCartPage() {
    const  funcName = 'displayCartPage()';
    trace_object (level_1, scriptName, funcName, 'page', window.location.href);
    displayCartItems ();
    displayTotalPrice();
    addlistenerToForm ();
    
}

/*
  https://www.w3schools.com/js/js_window_location.asp
*/


/* =======================================================================================  */

trace_line(level_1);
trace_msg (level_1, scriptName, 'main', 'begin');
displayCartPage ();
trace_msg (level_1, scriptName, 'main', 'end');
/* =======================================================================================  */
