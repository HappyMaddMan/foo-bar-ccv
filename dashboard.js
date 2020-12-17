function dashboardManager() {
	return{
		barName: "",
		barClosingTime: "",
		beerDetails:[],
		bartenders:[],
		serving:[],
		queue: [],
		maxQueueSlots: 4,
		sampleImages: [
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			"https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		],
		init(){

			fetch("https://foo-bar-ccv.herokuapp.com/beertypes")
				.then (response => response.json())
				.then (dataType => {
					this.beerDetails = dataType;
				})

			this.updateBarStatus();
		},
		updateBarStatus(){
			setInterval(() => {
				fetch("https://foo-bar-ccv.herokuapp.com")
					.then (response => response.json())
					.then (data => {
						this.barName = data.bar.name;
						this.barClosingTime = data.bar.closingTime.slice(0,-3);
						this.bartenders = data.bartenders;
						this.serving = data.serving;
						this.queue = data.queue;
						this.bartenders.forEach( bartender => {
							bartender.currentOrder = {};
							if (bartender.servingCustomer) {
								// get the details of the current order that this bartender is serving
								bartender.currentOrder = this.serving.filter( customer => customer.id == bartender.servingCustomer )[0].order;
								// console.log(bartender.currentOrder) //The list of beers

								// Group (and count) duplicate beers in bartender's current order
								bartender.currentOrder = bartender.currentOrder.reduce(function(accumulator, currentBeer) {
								  accumulator[currentBeer] = (accumulator[currentBeer] || 0) + 1;
								  return accumulator;
								}, {});

							}
						})
					})
			}, 500);
		},
		getOrderTime(customerId,serving){
			if (customerId) {
				for (var i = 0; i <= serving.length; i++) {
					// serving[i]
					if (customerId == serving[i].id) {
						const date = new Date(serving[i].startTime)
						let minutes = date.getMinutes();
						if (minutes<10) {
							minutes = `0${minutes}`
						}
						return(`${date.getHours()}:${minutes}`);
					}
				}
			}
		},
		isOverflown() {
			const div = document.getElementById("queueGrid")
			return div.scrollWidth>clientWidth
		  	// return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
		},
		
	}
}