(function executeRule(current, previous /*null when async*/ ) {
    // getNum and setNum demonstrate JavaScript Closure
    var x = 7;

    function numFunc() {
        var x = 10;
        return {
            getNum: function() {
                gs.info( x + ' getNum: function() {');
                return x;
            },
            setNum: function(newNum) {
                x = newNum;
                gs.info(x + ' setNum: function(newNum) {');
            }
        };
    }
    var callFunc = numFunc();
    callFunc.getNum();
    callFunc.setNum(2);
    callFunc.getNum();

})(current, previous);