function classNames(name) {
    let hasOwn = {}.hasOwnProperty;
    let classes = [];
    for (let i = 0; i < arguments.length; i++) {
        let args = arguments[i];
        if (!args) continue;
        let argType = typeof args;
        if (argType === "string" || argType === "number") {
            classes.push(args);
        } else if (Array.isArray(arg) && arg.length) {
            let inner = classNames.apply(null, arg);//将数组里的元素一个个传进来
            if (inner) {
                classes.push(inner);
            }
        }else if(argType==='object'){
            for(let key in arg){
                if(hasOwn.call(arg,key) && arg[key]){
                    classes.push(key);
                }
            }
        }
    }
    console.log()
    return classes.filter(Boolean).join(' ')
}

export default classNames;