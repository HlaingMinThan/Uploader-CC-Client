export default function middlewarePipeline(context,middlewares,index) {
    let nextMiddleware = middlewares[index];
    if(!nextMiddleware){
        return context.next;
    }
    return params => {
        if(params) {
            context.next(params)
        }
        nextMiddleware({
            ...context,
            next : middlewarePipeline(context,middlewares,index+1)
        });
    }
}