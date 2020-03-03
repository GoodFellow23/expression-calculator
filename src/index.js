function eval() {
    // Do not use eval!!!
    return;
}
//" 20 * 60 + 9 - (  89 * 95 * 3 * (  44 - 51 - 11 - (  62 + 69 - 22 + 21  ) * 9  ) / 50  ) - (  94 - 70 / 29 / 7  ) "
function expressionCalculator(expr) {
    let openBC=0;
    let closeBC=0;
    expr = Array.isArray(expr) ? expr : expr.match(/((\d\d|\d)|\+|\/|\(|\)|\-|\*)/mg).map( el => Number.isInteger(parseInt(el)) ? parseInt(el) : el);
        
           openBC = expr.lastIndexOf("(");
           closeBC = expr.indexOf(")",openBC);        

         if ((openBC != -1 && closeBC == -1) || (openBC == -1 && closeBC != -1)) throw new Error("ExpressionError: Brackets must be paired");
         if (openBC == -1 && closeBC == -1 ) {            
                while (expr.length !=1 ) {
                    if (expr.indexOf("/") != -1) {
                        if(expr[expr.indexOf("/")+1] == 0) throw new Error("TypeError: Division by zero.");
                        expr.splice(expr.indexOf("/")-1, 3, expr[expr.indexOf("/")-1] / expr[expr.indexOf("/")+1]);
                    } 
                    else if (expr.indexOf("*") != -1) {
                        expr.splice(expr.indexOf("*")-1, 3, expr[expr.indexOf("*")-1] * expr[expr.indexOf("*")+1]);
                    }
                    else if (expr.indexOf("-") != -1) {
                        expr.splice(expr.indexOf("-")-1, 3, expr[expr.indexOf("-")-1] - expr[expr.indexOf("-")+1]);
                    } 
                    else if (expr.indexOf("+") != -1) {
                        expr.splice(expr.indexOf("+")-1, 3, expr[expr.indexOf("+")-1] + expr[expr.indexOf("+")+1]);
                    }
                }
                return expr[0];
        }
        else expr.splice(openBC, closeBC - openBC + 1, expressionCalculator(expr.slice(openBC + 1, closeBC )))
        return expressionCalculator(expr);
}

module.exports = {
    expressionCalculator
}