// Array with select options
const workType = ['Sviluppo Backend', 'Sviluppo Frontend', 'Analisi Progettuale']

// Assign the select at a new variable
let formSelectElement = document.getElementById('select')

let workTypeOptions = ""

//Cycle the array for expanding the variable workTypeOptions with the select options
for (let i = 0; i < workType.length; i++) {
   workTypeOptions += `
   <option value="${i}">${workType[i]}</option>
   `;
}

//Inject the options in the select HTML
formSelectElement.innerHTML += workTypeOptions

//Assign the form to a variable
const formElement = document.getElementById('form')
console.log(formElement)

//Fixed Hours and salary variable and assign the totalPrice area in the HTML page to a variable
const hours = 10
const backendSalary = 20.50
const frontendSalary = 15.30
const analysisSalary = 33.60
let total
let totalPrice = document.getElementById('totalPrice')

//Function to calculate total price of the work
function calculateTotal() {
   if (formSelectElement.value === '0') {
      total = parseFloat(hours * backendSalary).toFixed(2)
   } else if (formSelectElement.value === '1') {
      total = parseFloat(hours * frontendSalary).toFixed(2)
   } else if (formSelectElement.value === '2') {
      total = parseFloat(hours * analysisSalary).toFixed(2)
   }
   console.log(total)
   return total
}

//Function to verify if user had used a valid coupon
function applyCoupon() {
   const validCoupons = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
   const couponElement = document.getElementById('codicePromo')
   if (couponElement.value === "") {
      console.log("Nessun coupon inserito")
      couponElement.classList.remove('is-invalid')
      couponElement.classList.remove('is-valid')
   } else if (validCoupons.includes(couponElement.value)) {
      console.log('Coupon attivato')
      couponElement.classList.remove('is-invalid')
      couponElement.classList.add('is-valid')
      total = parseFloat(total * 0.75).toFixed(2)
      console.log(total)
   } else {
      console.log('Coupon non valido')
      couponElement.classList.remove('is-valid')
      couponElement.classList.add('is-invalid')
      return total
   }
}

//Detect click on submit button from the user
formElement.addEventListener('submit', function(event) {
   event.preventDefault()
   console.log('Form Inviato')
   totalPrice.innerHTML = `
   <h5>Prezzo Finale</h5>
   `
   const formValidation = document.querySelectorAll(".to-validate")
   console.log(formValidation)
   let formIsValid = true
   
   formValidation.forEach(element => {
      if (element.type === 'checkbox') {
         if (!element.checked) {
            element.classList.add('is-invalid');
            formIsValid = false
         } else {
            element.classList.remove('is-invalid');
         }
      } else if (element.type === 'email') {
         // Controllo se il campo email è vuoto o se il formato non è valido
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Espressione regolare per email

         if (element.value.trim() === "" || !emailPattern.test(element.value)) {
            element.classList.add('is-invalid');
            formIsValid = false
         } else {
            element.classList.remove('is-invalid');
         }
      } else {
         // Per tutti gli altri campi, verifica che non siano vuoti
         if (element.value.trim() === "") {
            element.classList.add('is-invalid');
            formIsValid = false
         } else {
            element.classList.remove('is-invalid');
         }
      }
   })

   if (!formIsValid) {
      return;
   }

   calculateTotal()
   applyCoupon()
   
   // Split total in array so it can be printed in the DOM with separated integers and decimal parts
   const totalArray = total.split(".")
   console.log(totalArray)
   totalPrice.innerHTML = `
   <h5>Prezzo Finale</h5>
   <span class="text-dark fw-bolder fs-4">€${totalArray[0]}</span><span class="text-muted fw-lighter">,${totalArray[1]}</span>
   `
});