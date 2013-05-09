// this is the code to either render a template or spit out json

/** check_res_accept
 *
 * params
 *    obj : an object.  must have
 *
 *      'template': the template to render (we're going to just
 *                  asssume this is an express app, mmkay?)
 *      'response': an object to either send to the client directly,
 *                  or to the template for rendering
 *
 *    req : the standard request object
 *    res : the standard response object
 *    next: the standard next object
 *
 */

function check_res_accept(obj,req,res,next){
    if(req.accepts('json')==='json'){
        return res.json(obj.response)
    }
    // still here, need to render
    return res.render(obj.template,obj.response)
}
module.exports=check_res_accept
