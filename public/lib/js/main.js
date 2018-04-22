const btnSave = document.querySelector('#btnSave');
const btnResetDB = document.querySelector('#btnResetDB');
const productName = document.querySelector('#productName');
const productCode = document.querySelector('#productCode');
const productPackSize = document.querySelector('#productPackSize');
const productQuantity = document.querySelector('#productQuantity');
const productBBDate = document.querySelector('#productBBDate');
const productDropNumber = document.querySelector('#productDropNumber');
const productDropShelf = document.querySelector('#productDropShelf');
const dbKey = 'stockr';
const addItems = document.querySelector('.addItems');
const stockList = document.querySelector('.stockList');
let items = JSON.parse(localStorage.getItem(dbKey));
if (items === null) {
	items = [];
	localStorage.setItem(dbKey, items);
	populateList(items);	
}

populateList(items);

function addItem(e) {
  e.preventDefault();
  const item = {
    name : productName.value,
    barcode : productCode.value,
    packSize : productPackSize.value,
    quantity : productQuantity.value,
    expires : productBBDate.value,
    dropNumber : productDropNumber.value,
    dropShelf : productDropShelf.value
  };
  items.push(item);
  console.log(items);
  populateList(items);
  saveToLocalStorage(items);
  this.reset();
}

function populateList(items) {
	let parentDiv = document.querySelector('.stockItemsList');

	for(let i in items){
		let today = new Date();
		let todayDate = Date.parse(today);
		let expireDate = Date.parse(items[i].expires);
		let timeDiff = expireDate - todayDate;
		let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		const expiresBuffer = 10;


		if (daysDiff <= expiresBuffer) {
			let newDiv = document.createElement('div');
			newDiv.setAttribute('class', 'card');
			newDiv.innerHTML = `
			<div class="cardName">${items[i].name}</div>
			<div class="cardBarcode">${items[i].barcode}</div>
			<div class="cardUnits">${items[i].packSize * items[i].quantity} Units</div>
			<div class="cardExpires">${items[i].expires}</div>
			<div class="cardDays">In ${daysDiff} Days</div>
			`;
			parentDiv.appendChild(newDiv);
		}
	}
}

function saveToLocalStorage(items) {
	console.log('Saving to local');
	localStorage.setItem(dbKey, JSON.stringify(items));	
}

function getFromLocalStorage(items) {
	items = JSON.parse(localStorage.getItem(dbKey));
	console.log(`Items fetched`);
	populateList(items);
}

addItems.addEventListener('submit', addItem);


