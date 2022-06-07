/*
  Script : utils.js 
  
     - Kanap Trace / Alert functions 
     - LocalStoarage functions
     - Node.js functions 

*/ 



/* ============================================================================= */
/*             LocalStorage functions                                            */ 
/* ============================================================================= */


/* ============================================================================= */
/*           Kanap alert  function                                               */ 
/* ============================================================================= */


function kanap_alert (msg){
    alert (msg);
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

let current_level = 1;   /* default value is 0 */ 



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

