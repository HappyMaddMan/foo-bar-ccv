fetch("https://foo-bar-ccv.herokuapp.com")
	.then (response => response.json())
	.then (data => {

		// console.log(data.taps)

		var bar = document.getElementById("bar")
		var bartenders = document.getElementById("bartenders")
		var queue = document.getElementById("queue")
		var serving = document.getElementById("serving")
		var storage = document.getElementById("storage")
		var taps = document.getElementById("taps")

		// bar fetch
		const bar_content = `
			<h6>${data.bar.name}</h6>
			<h6>${data.bar.closingTime}</h6>
		`
		bar.innerHTML += bar_content

		// bartender fetch
		for (var i = 0; i < data.bartenders.length; i++) {
			// console.log(data.bartenders[i])
			var row_bartenders =   `<tr>
									    <td>${data.bartenders[i].name}</td>
									    <td>${data.bartenders[i].status}</td>
									    <td>${data.bartenders[i].statusDetail}</td>
									    <td>${data.bartenders[i].usingTap}</td>
									    <td>${data.bartenders[i].servingCustomer}</td>
									    <br>
								    </tr>`;
			bartenders.innerHTML += row_bartenders;
		}

		// queue fetch
		for (var i = 0; i < data.queue.length; i++) {
			// console.log("new")
			// console.log(data.queue[i].id)
			// console.log(data.queue[i].order)
			// console.log(data.queue[i].startTime)
			

			var row_queue =    `<tr>
								   <td>${data.queue[i].id}</td>
								   <td>${data.queue[i].order}</td>
								   <td>${data.queue[i].startTime}</td>
								   <br>
							    </tr>`;
			queue.innerHTML += row_queue;
		}


		// serving fetch
		for (var i = 0; i < data.serving.length; i++) {
			// console.log("new")
			// console.log(data.serving[i].id)
			// console.log(data.serving[i].order)
			// console.log(data.serving[i].startTime)
			

			var row_serving =  `<tr>
								   <td>${data.serving[i].id}</td>
								   <td>${data.serving[i].startTime}</td>
								   <td>${data.serving[i].order}</td>
								   <br>
							    </tr>`;
			serving.innerHTML += row_serving;
		}


		// storage fetch
		for (var i = 0; i < data.storage.length; i++) {
			// console.log(data.storage[i])

			var row_storage =  `<tr>
									<td>${data.storage[i].name}</td>
									<td>${data.storage[i].amount}</td>
								</tr>`
			storage.innerHTML += row_storage;
		}


		// taps storage
		for (var i = 0; i < data.taps.length; i++) {
			// console.log(data.taps[i])

			var row_taps = `<tr>
								<td>${data.taps[i].id}</td>
								<td>${data.taps[i].level}</td>
								<td>${data.taps[i].capacity}</td>
								<td>${data.taps[i].beer}</td>
								<td>${data.taps[i].inUse}</td>
							</tr>`
			taps.innerHTML += row_taps;
		}
	})


let orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', function(e) {

	e.preventDefault();

	let serializedForm = Object.fromEntries(new FormData(e.target));
	
	console.log(serializedForm);

});

function sendOrderToServer(orderData) {



	// Make the AJAX POST request
	fetch("https://foo-bar-ccv.herokuapp.com/order", {
	  method: 'POST',
	  body: orderData,
	  headers: {
	  	"Content-Type": "application/json"
	  },
	})
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));



}
// var string = 
function activate(n){
	const elem = document.getElementById("beer"+n)
	if (elem.classList.contains("active")) {
		elem.classList.remove("active");
	}
	else{
		elem.classList.add("active");
	}
}
