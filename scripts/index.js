import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Konfiguracija baze. Potrebno je dodati VITE_FIREBASE_DATABASE_URL u environment varijablu ili u .env file. Za Vite je važno da ispred varijable dodate VITE_.
const appSettings = {
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}

// Inicijalizacija Firebase aplikacije(baze)
const app = initializeApp(appSettings)
// Dohvaćanje baze sa Firebase aplikacije
const database = getDatabase(app)
// Dohvaćanje reference na todoList unutar baze 
const todoListInDB = ref(database, "todoList")

// Dohvaćanje input field elementa u kojem korisnik unosi novi todo item
const inputFieldEl = document.getElementById("input-field")
// Dohvaćanje button elementa kojim se dodaje novi todo item
const addButtonEl = document.getElementById("add-button")
// ul element u koji ćemo dodavati todo iteme
const todoListEl = document.getElementById("todo-list")

// Event listener koji se aktivira kada korisnik klikne na button element
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    // Provjeravam da li je input field prazan
    if (inputValue === "") 
        {
            // Ako je prazan, korisniku se prikazuje toast notifikacija s greškom
			Toastify({
				text: "Greška! Polje ne može biti prazno!",
				duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #AC485A, #432000)",
                  },
			}).showToast();
            // Izlazim iz funkcije i ne dodajem item u todo listu
            return
        }

    // Ako je input field popunjen, dodajem novi item u todo listu (firebase bazu)
    push(todoListInDB, inputValue)
    // Čistim sadržaj input fielda
    clearInputFieldEl()
})

onValue(todoListInDB, function(snapshot) {
    // Provjeravam da li postoji bilo kakav item u todo listi
    // Ako postoji, dohvaćam sve iteme iz baze i prikazujem ih u todo listi
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearTodoListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToTodoListEl(currentItem)
        }    
    } else {
        // Inače, ako ne postoji niti jedan item u todo listi, prikazujem korisniku poruku da nema itema
        todoListEl.innerHTML = "Nema taskova za danas... pokreni se i dodaj nešto 😆"
    }
})

/**
 * Čisti todo list element postavljanjem innerHTML-a na prazan string.
 */
function clearTodoListEl() {
    todoListEl.innerHTML = ""
}

/**
 * Čisti vrijednost input polja postavljanjem na prazan string.
 */
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

/**
 * Dodaje Todo item u na listu.
 * 
 * @param {Array} item - Array koji sadrži ID i vrijednost todo itema.
 */
function appendItemToTodoListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `todoList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    todoListEl.append(newEl)
}