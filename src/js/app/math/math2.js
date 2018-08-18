class Math2 {

    static random() {
        if (arguments.length > 2) {
            return 0;
        }
        switch (arguments.length) {
            case 0:
                return Math.random();
            case 1:
                return Math.round(Math.random() * arguments[0]);
            case 2:
                var min = arguments[0];
                var max = arguments[1];
                return Math.round(Math.random() * (max - min) + min);
        }
    }
}

export {Math2 as default}