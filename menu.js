function barMenu() {

    return {
        orderItems: [
            // {name: "El Hefe", amount: 2},
            // {name: "GitHop", amount: 1}
        ],
        beers: [
          // {name: 'El Hefe'},
          // {name: 'Fairy Tale Ale'},
          // {name: 'GitHop'},
          // {name: 'Hollaback Lager'},
          // {name: 'Hoppily Ever After'},
          // {name: 'Mowintime'},
          // {name: 'Row 26'},
          // {name: 'Ruined Childhood'},
          // {name: 'Sleighride'},
          // {name: 'Steampunk'},
        ],
        openModal: false,
        modalBeer: { 
            name: 'dummyBeer', 
            category: "dummy",
            pouringSpeed: 5,
            popularity: 1,
            alc: 5.4,
            label: "row26.png",
            description: {
                aroma: "dummy",
                appearance: "dummy",
                flavor: "dummy",
                mouthfeel: "dummy",
                overallImpression: "dummy"
            },
        },
        checkout: false,


        invalidName: false,
        invalidNameMessage: "",
        invalidCardName: false,
        invalidCardNameMessage: "",
        invalidEmail: false,
        invalidEmailMessage: "",
        invalidCardNo: false,
        invalidCardNoMessage: "",
        invalidCardCvv: false,
        invalidCardCvvMessage: "",
        invalidDate: false,
        invalidDateMessage: "",

        init() {
            fetch("https://foo-bar-ccv.herokuapp.com/beertypes")
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    this.beers = data;
                    this.modalBeer = data[0];
                })
        },
        addBeer(beer) {
            // Search in orderItems array to see if we already have this beer
            let foundBeer = false;
            this.orderItems.forEach( orderItem => { 
                // If we have the beer in the orderItems array, increase the amount by one
                if (orderItem.name == beer) {
                    orderItem.amount++;
                    foundBeer = true;
                }
            })

            // if we didn't find the bear in orderItems already add it to the array
            if (!foundBeer) {
                this.orderItems.push({ name: beer, amount: 1 })
            }
        },
        removeBeer(beer) {
            this.orderItems.forEach( (orderItem, index) => { 
                if (orderItem.name == beer) {
                    orderItem.amount--;
                    // If it's the last beer, remove it from the orderItems array
                    if (orderItem.amount <= 0) {
                        this.orderItems.splice(index, 1);
                    }
                }
            })
        },
        clearOrderItems() {
            this.orderItems = [];
        },

        submitOrder() {
            // validate name is required
            let formIsValid = true

            const name_user = document.getElementById("name").value;
            if (!name_user) {
                this.invalidName = true;
                formIsValid = false;
                this.invalidNameMessage = "This field is required!";
            }
            else {
                this.invalidName = false;
            }

            // validate email is required
            const email = document.getElementById("email").value;
            if (!email) {
                this.invalidEmail = true;
                formIsValid = false;
                this.invalidEmailMessage = "This field is required!";
            }
            // validate email has the format
            else if (!isEmail(email)) {
                this.invalidEmail = true;
                formIsValid = false;
                this.invalidEmailMessage = "Please enter a valid email!";
            }
            else{
                this.invalidEmail = false;
            }
            function isEmail(email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            }

            // delete spaces in card_no
            const card_no = document.getElementById("ccn").value.replace(/\s+/g, '');
            // validate card no. is required
            if (!card_no) {
                this.invalidCardNo = true;
                formIsValid = false;
                this.invalidCardNoMessage = "Please enter a valid card number!";
            }
            // validate card no. has the format
            else if(isNaN(card_no)){
                this.invalidCardNo = true;
                formIsValid = false;
                this.invalidCardNoMessage = "Wrong credit card number!";
            }
            else if(card_no.length != 16){
                this.invalidCardNo = true;
                formIsValid = false;
                this.invalidCardNoMessage = "It seems you forgot some numbers in your card number!";
            }
            else{
                this.invalidCardNo = false;
            }
            


            // console.log(card_no.split(""))
            // console.log(card_no.split("").join(" "))
            
            // document.getElementById("ccn").each(function() {
            //     if (card_no.length > 0) { 
            //     var newcard_no;
            //     newcard_no = `${card_no.substr(0, 4)} ${card_no.substr(4, 4)} ${card_no.substr(8, 4)} ${card_no.substr(12)}`
            //     console.log(newcard_no);
            // }
            //     var elem = document.querySelector(this);
            //     elem.data('oldVal', elem.value);
            //     elem.bind("propertychange change click keyup input paste", function(event){
            //         if (elem.data('oldVal') != elem.value) {
            //             elem.data('oldVal', elem.value);
            //             document.getElementById("ccn").value = mewcard_no;
            //         }       
            //     });
            //  });



            //validate card name is required
            const card_name = document.getElementById("card_name").value;
            if (!card_name) {
                this.invalidCardName = true;
                formIsValid = false;
                this.invalidCardNameMessage = "This field is required!";
            }
            else {
                this.invalidCardName = false;
            }

            // validate card expriation date is required
            const time = new Date();
            const card_time = new Date(document.getElementById("year").value, document.getElementById("month").value, 1);
            if (time>card_time) {
                this.invalidDate = true;
                formIsValid = false;
                this.invalidDateMessage = "Please get a valid card!"
            }
            else{
                this.invalidDate = false;
            }
            
            
            // validate card expriation date is in the future


            // validate cvv is required
            const card_cvv = document.getElementById("cvv").value.replace(/\s+/g, '');
            if (!card_cvv) {
                this.invalidCardCvv = true;
                formIsValid = false;
                this.invalidCardCvvMessage = "Please enter a valid card number!";
            }
            else if(isNaN(card_cvv)){
                this.invalidCardCvv = true;
                formIsValid = false;
                this.invalidCardCvvMessage = "Wrong credit card number!";
            }
            // validate cvv has 3 digits
            else if(card_cvv.length != 3){
                this.invalidCardCvv = true;
                formIsValid = false;
                this.invalidCardCvvMessage = "It seems you forgot some numbers in your card number!";
            }
            else{
                this.invalidCardCvv = false;
            }
            // if from is not valid show the errors



            // if form is valid send AJAX request

            // display server message


            // console.log(`formIsValid = ${formIsValid}`)
            if (formIsValid) {
                fetch("https://foo-bar-ccv.herokuapp.com/order", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.orderItems),
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status == 200) {
                        this.clearOrderItems()
                        const msg = `Your order has been registered and you have the following ID ${result.id}. You can follow your order by that ID`;
                        console.log(result.id)
                        // orderPopUp(msg);

                        this.openPopUp = true;
                        this.msgResult = msg;
                    }
                    else {
                        // Something went wrong

                        // orderPopUp(result.message)
                        // alert(result.message)
                        const msg = `We are sorry, Something went wrong: ${result.message}`;
                        // orderPopUp(msg);
                        this.openPopUp = true;
                        this.msgResult = msg;
                    }
                })
                .catch(error => console.log('error', error));
                // {"message":"We are not serving: GitHop right now!","status":500}
                // {"message":"added","status":200,"id":30}
            }
        },
        beerModal(beer) {
            console.log(beer.name);
            this.openModal = true;
            this.modalBeer = beer;
        },
        // checkout modal
        openPopUp: false,
        msgResult: "nada",
        orderPopUp(msg){
            this.openPopUp = true;
            this.msgResult = msg;
        },
    }
}