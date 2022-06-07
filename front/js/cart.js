
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

const  trace_file = '= cart.js : ';

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
    localStorage.setItem( "commande" , JSON.stringify (commande));
}

function getCommandeFromLocalStorage ()
{
    let s_commande = localStorage.getItem( "commande");
    return JSON.parse (s_commande);
}


/* ===================== */

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
        cart_items = JSON.parse (s_cart);
    }
    trace_object  ('getCartFromLocalStorage () cart_items ',  cart_items );
    return (cart_items);
}
/* ===================== */

function removeCartItemFromLocalStorage (item_id, item_color)
{
    
    trace ("removeCartItemFromLocalStorage() ", item_id + '_' +item_color);
    let old_cart_items = getCartFromLocalStorage ();
    let new_cart_items = old_cart_items.filter(el => el.color != item_color || el.id != item_id );
    setCartToLocalStorage (new_cart_items);
    trace_object  ("removeCartItemFromLocalStorage() ", new_cart_items);
}

function updateCartItemQuantityFromLocalStorage (item_id, item_color,item_quantity)
{
    
    trace ("updateCartItemQuantityFromLocalStorage() ", item_id + '_' +item_color);
    trace ("updateCartItemQuantityFromLocalStorage()  item_quantity ", item_quantity);

    let cart_items = getCartFromLocalStorage ();
    let cart_item = cart_items.find(el => el.color == item_color && el.id == item_id );
    cart_item.quantite = item_quantity;
    setCartToLocalStorage (cart_items);
    trace_object  ("updateCartItemQuantityFromLocalStorage() ", cart_items);
}


/* ===================== */
function getTotalPriceFromLocalStorage ()
{ 
 
    let l_total_price = 0;
    let l_cart  = getCartFromLocalStorage ();
    trace ("getTotalPriceFromLocalStorage() cart length", l_cart.length);
    for ( let l_cart_item  of  l_cart) {
            // calculate the total 
            let l_cart_item_total_price  = l_cart_item.prix *  l_cart_item.quantite;
            l_total_price = l_total_price + l_cart_item_total_price;

    }
    trace ("getTotalPriceFromLocalStorage()  l_total_price", l_total_price);
    return l_total_price;
}

/* ============================================================================= */
/*  Dom functions                                                                */
/* ============================================================================= */


function dom_displayCartItems()
{
    trace  (' dom_displayCartItems()', 'debut');
    let l_cart  = getCartFromLocalStorage ();
    trace_object  ('dom_displayCartItems ()  l_cart = ', l_cart  );
    let l_total_price = 0;

    if (l_cart.length <= 0) {
        trace  (' dom_displayCartItems()', 'cart is empty ');
    }
    else {

        let  l_cart_items = document.getElementById('cart__items');
        /* Loop on cart items */
        for ( let l_cart_item  of  l_cart) {
            trace_object   (' dom_displayCartItems()  cart_item ', l_cart_item);
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
            new_div2_desc_price.innerText = l_cart_item.prix + ' €';

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
            new_div2_settings_quantity_p.innerText = "Qté : " ;

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
        /* LISTENER  CHANGE   quantity */ 
        /* *************************** */

        new_div2_settings_quantity_input.addEventListener('change', (event) => {
            trace_line ();
            const l_cart_item_id = l_cart_item.id;
            const l_cart_item_color = l_cart_item.color;  
            const l_dom_element =  new_div2_settings_quantity_input;
            let new_quantity = event.target.value;
            const old_quantity = l_cart_item.quantite;

            trace ( 'dom_displayCartItems () change_quantity  new value ',  event.target.value);
            trace ( 'dom_displayCartItems () change_quantity  old value ',  old_quantity);
            updateCartItemQuantityFromLocalStorage (l_cart_item_id, l_cart_item_color, new_quantity);
                        /* XXXXXXXXXXXXXXXX  rafraichir la page */
           document.location.reload();
        });


            /* 1.2.2.2  cart__item__content__settings__delete */
            let new_div2_settings_supprimer = document.createElement('div');
            new_div2_settings_supprimer.classList.add('cart__item__content__settings__delete');

            let new_div2_settings_supprimer_p = document.createElement('p');           
            new_div2_settings_supprimer_p.classList.add('deleteItem');
            new_div2_settings_supprimer_p.innerText = "Supprimer";

        /* ************************* */
        /* LISTENER  DELETE  item */ 
        /* ************************* */

         new_div2_settings_supprimer_p.addEventListener ('click', (event) => {
             trace_line ();
             trace ( 'dom_displayCartItems ()',  'supprimer_listener ');
             const l_cart_item_id = l_cart_item.id;
             const l_cart_item_color = l_cart_item.color;  
             const l_dom_element =  new_div2_settings_supprimer_p;
             trace ( 'dom_displayCartItems ()  l_cart_item_id id  ',  l_cart_item_id );
             trace ( 'dom_displayCartItems () l_cart_item_color ',  l_cart_item_color );
             trace_object ( 'dom_displayCartItems () l_dom_element ',  l_dom_element );

             /* No need :
             const l_art = l_dom_element.closest('article');
             trace_object ( 'dom_displayCartItems () closet ',  l_art );
             */
            /* update local storage XXXXX  */
            removeCartItemFromLocalStorage (l_cart_item_id, l_cart_item_color);
          
            dom_displayCartItems()
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

function dom_displayTotalPrice()
{
    let totalPrice = getTotalPriceFromLocalStorage ();
    trace ("dom_displayTotal() total_price ", totalPrice);
    let  l_dom_totalPrice = document.getElementById('totalPrice');
    l_dom_totalPrice.innerText = totalPrice;
}

/* ============================================================================= */
/*  COMMANDE   functions                                                                */
/* ============================================================================= */

// https://www.w3schools.com/js/js_window_location.asp


function cb_handleCommande (event){
    event.preventDefault();
  trace_line();
  trace ('cb_handleCommande() ', '');
  return (event.preventDefault());
}


function dom_listenToForm() {
    trace_line();
    trace ('dom_listenToForm() ', 'deb');
    let dom_formCommander = document.getElementById("order");
  
    dom_formCommander.addEventListener("click", function(evt) {

        /* ************************* */
        /* LISTENER  COMMMANDE    */ 
        /* ************************* */

       evt.preventDefault();
        trace_line();
        trace ('dom_listenToForm()  Commander  Listener ', 'deb');

        let l_formFirstName = document.getElementById("firstName").value;
        let l_formLastName = document.getElementById("lastName").value;
        let l_formAdress = document.getElementById("address").value;
        let l_formCity = document.getElementById("city").value;
        let l_formEmail = document.getElementById("email").value;

        let l_form_contact = {
            firstName: l_formFirstName,
            lastName: l_formLastName,
            address: l_formAdress,
            city: l_formCity,
            email: l_formEmail
        }
         
        trace_object  ('dom_listenToForm()  Commander Listener  contact ', l_form_contact);
        /* xhoan */
        let product_ids = [];
        let l_cart = getCartFromLocalStorage();
        if  (l_cart.length == 0) {
            trace_object  ('dom_listenToForm()  Commander Listener   ', " Pas de commande, votre panier est vide ! ");

            alert (" Pas de commande, votre panier est vide ! ");
            return ;
        }

        for (let cart_item of l_cart){
            trace ("listener", cart_item.id);
            product_ids.push(cart_item.id);
        }

        trace_object  ('dom_listenToForm()  Commander Listener  product ids  ', product_ids);
        let contact = l_form_contact;
        let products = product_ids;
        let o_post_body  = {contact, products};
        let s_post_body  = JSON.stringify(o_post_body);
        trace_object  ('dom_listenToForm()  Commander Listener  / HTTP POST  s_post_body ', s_post_body);

        /* 
            Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
            lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
            array de strings product-ID. Les types de ces champs et leur présence doivent être validés
            avant l’envoi des données au serveur

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

        fetch("http://localhost:3000/api/products/order"  , {
            method: "POST",
            body: s_post_body,
            headers: {
                'content-type' : "application/json",
            }   
        }).then (res => {
            return res.json();
        }).then((data) => {
       /* ************************* */
        /*  POST CALL BACK     */ 
        /* ************************* */


            let orderId = data.orderId
            trace_object  ('dom_listenToForm() /  Commande Listener  CALL BACK  fetch  OK -   orderId = ', orderId);
            let contact_firstname = l_formFirstName ;
            let contact_lastname = l_formLastName ;
            setCommandeToLocalStorage (orderId, contact_firstname, contact_lastname);
            trace_object  ('dom_listenToForm() /  Commande Listener  CALL BACK  fetch OK -   contact  = ',  
                     contact_firstname + '_' +contact_firstname );

            l_url =  `./confirmation.html?id=${orderId}` ;
           trace ('dom_listenToForm() /  Commande Listener / loading confirmation page ', l_url);

           /* go to the confirmation page */

           window.location.replace(l_url);

        }).catch((error) =>{
            console.log(error);
        });

    });
}

/* =======================================================================================  */
/* Main                                                                                     */
/* =======================================================================================  */

trace_line ();
trace_object  ('main / http request ' , window.location.href);

dom_displayCartItems ();
dom_displayTotalPrice();
dom_listenToForm ();

