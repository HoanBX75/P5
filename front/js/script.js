/*
  The script.js  goal is to fetch a list of products 
  and displayed them in the index page (items section).
*/


const scriptName = 'scripts.js';



/*
    -------------------------------------------------------
    Function name : buildDocumentProduct ()
    Description :  function that sends an http request 
                   to get all Kanap products. 
    Input Parameters : 
               - id : product id
               - name : product name 
               - description : product description 
               -  price : product price 
               - colors : array of  product color  
               - imageUrl : product image url 
               -   altTxt : product image text 
    Returns : dom  product item  
            : null if an error occurs 

    The product  Dom item related to the product follows this schema  :

          <a href="./product.html?id=42">
          <article>
            <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">Kanap name1</h3>
            <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
          </article>
          </a> 

    -------------------------------------------------------
*/


function buildDocumentProduct(id, altTxt, colors, description,imageUrl, name, price)
{

    const  funcName = "buildDocumentProduct()";
    trace_object (level_4, scriptName, funcName, 'product id ', id);

    let new_a = document.createElement('a');
    new_a.setAttribute('href','./product.html?id=' + id);

    let new_article = document.createElement('article');

    let new_img = document.createElement('img');
    new_img.setAttribute('src', imageUrl);
    new_img.setAttribute('alt', altTxt);
    new_article.append (new_img);

    let new_h3 = document.createElement('h3');
    new_h3.classList.add('productName');
    new_h3.innerText = name;
    new_article.append (new_h3);

    let new_p = document.createElement('p');
    new_p.classList.add('productDescription');
    new_p.innerText = description;
    new_article.append (new_p);

    new_a.append (new_article);

    return (new_a);
}


/*
    -------------------------------------------------------
    Function name : addProductToDocumentSectionItems ()
    Description :  function that  inserts product item into the html 
                  items section : 
                  
                   <section class="items" id="items"> 
                   
                   </section>

     Parameter : 
            dom_product_item : product item to insert in dom        
    -------------------------------------------------------
*/

function addProductToDocumentSectionItems (dom_product_item)
{
  const  funcName = "addProductToDocumentSectionItems()";
  trace_object (level_4, scriptName, funcName, ' html DOM product', dom_product_item);

    let  items = document.getElementById('items');
    items.append (dom_product_item);
} 

/*
    -------------------------------------------------------
    Function name : checkProdValues ()
    Description :  function checks product values 
    Returns    if ok returns null 
               if error returns an error string message 
    -------------------------------------------------------
*/


function checkProdValues (prod)
{
   
    if (prod.altTxt == null ) { return ("Bad product image alternate text ");}
    if (prod._id ==  null) {  return ("Bad product id "); }
    if ( prod.colors == null ) { return ("Missing product colors");}
    if ( prod.description ==  null  ) {   return ('Bad product description  ');  }
    if (prod.imageUrl ==  null) { return ('Bad product image url  ');    }
    if (prod.name == null ) {   return ('Bad product price ');    }
    if (prod.price <=  0) {   return ('Bad product price ')}
    return null;
}

/*
    -------------------------------------------------------
    Function name : displayAllProducts ()
    Description :  function does the following :  
                        - sends an http request 
                            to get all Kanap products  
                         - add them to the dom to display them .
    -------------------------------------------------------
*/


function displayAllProducts ()
{
  /* 1. Get Node Server Url to get all the  Kanamp products */ 

    const  funcName = "displayAllProducts()";
    let url =   getNodeServerURL_AllProducts ();

    trace_object (level_1, scriptName, funcName, 'url', url);

    
  /* 2. Sends http request to get all Knap results */ 

  
    let promise_fetch = fetch (url).then(function(res) {

       /* 3. Callback to handle AllProducts response */ 

      trace_line(level_1);
      trace_object (level_1, scriptName, funcName,' CallBack http response', res);

        if (res.ok) {
          return res.json();
        }
        else 
        {
          throw 'Error ' + res.status + ' ' + res.statusText  +  ' url = ' + url;
         }
        
      })
      .then(function(value) {

  /* 4. Callback to handle body  response (json) */ 

       trace_object (level_1, scriptName, funcName,' CallBack body response (json)', value);
 
       
        /* 4.1 Loop for each product */ 

        for (let prod of value) 
        {
            /* 4.1.1 build a DOM element  for the product */

            trace_function_line (level_2);
            trace_object (level_4, scriptName, funcName,' Product Item', prod );

           let errmsg  =  checkProdValues (prod);
           if (errmsg != null ) {
            trace_error (level_0, scriptName, funcName, "Product Values Error ", errmsg);
               throw errmsg;
           }
           let prod_item = buildDocumentProduct(prod._id, 
                                             prod.altTxt, 
                                             prod.colors, 
                                             prod.description,
                                             prod.imageUrl, 
                                             prod.name, 
                                             prod.price);

            /* 4.1.2 Insert the Product DOM element in the Document Section Items  */ 

            addProductToDocumentSectionItems (prod_item);
        }
        trace_object (level_1, scriptName, funcName,'  number of products displayed ', value.length);


      })
       .catch(function(err) {

        /* Display an alert if error is detected */

        let err_msg = 'Error occurs when getting all Kanap products'
        trace_error (level_0, scriptName, funcName, err, 
                      err_msg);
        kanap_alert (err_msg + '\n' + err);

      });

      trace_object (level_1, scriptName, funcName, 'fetch promise', promise_fetch);
      return (promise_fetch);
}



/* ===============================================================================  */

trace_line(level_1);
trace_msg (level_1, scriptName, 'main', 'begin');
displayAllProducts ();
trace_msg (level_1, scriptName, 'main', 'end');

