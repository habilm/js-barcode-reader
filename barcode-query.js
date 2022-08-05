function readBarcode(data, onError=function(){
        errorSound = new Audio("/assets/sounds/error.mp3");
        errorSound.play();
    }){
        let lastKeyEnter = 0
        let barcode = "";
        
        $(document).on("keydown",function(e){
            barcode.length >= 2 && $(e.target).is(":input") && $(e.target).val("") && $(document).find(":input").blur();
            let currentTime = e.timeStamp;
            let difference = currentTime - lastKeyEnter;
            let which = e.which;
            lastKeyEnter = currentTime;
            
            if(barcode.length > 1 && e.which==13){
                if(barcode.length <= 9){
                    onError();
                    data("");
                }else{
                    data(barcode);
                }
                barcode = "";
                return false;
            }
            if(( which >=48 && which <= 57) && (difference < 20 || barcode.length==0) ){
                barcode = barcode+""+e.key;
            }else{
                barcode = "";
            }
        })
    }
