// Array with select options
const workType = ['Sviluppo Backend', 'Sviluppo Frontend', 'Analisi Progettuale']

// Assign the select at a new variable
let formSelectElement = document.getElementById('select')

workTypeOptions = ""

//Cycle the array for expanding the variable workTypeOptions with the select options
for (let i = 0; i < workType.length; i++) {
   workTypeOptions += `
   <option value="${i}">${workType[i]}</option>
   `;
}

//Inject the options in the select HTML
formSelectElement.innerHTML += workTypeOptions

formElement = document.getElementById('form')
console.log(formElement)

formElement.addEventListener('submit', function(event) {
   event.preventDefault()
   console.log('Form Inviato')
   const formValidation = document.querySelectorAll(".to-validate")
   console.log(formValidation)
   
   formValidation.forEach(element => {
      if (element.type === 'checkbox') {
         if (!element.checked) {
            element.classList.add('is-invalid');
         } else {
            element.classList.remove('is-invalid');
         }
      } else if (element.type === 'email') {
         // Controllo se il campo email è vuoto o se il formato non è valido
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Espressione regolare per email

         if (element.value.trim() === "" || !emailPattern.test(element.value)) {
            element.classList.add('is-invalid');
         } else {
            element.classList.remove('is-invalid');
         }
      } else {
         // Per tutti gli altri campi, verifica che non siano vuoti
         if (element.value.trim() === "") {
            element.classList.add('is-invalid');
         } else {
            element.classList.remove('is-invalid');
         }
      }
   });
});

