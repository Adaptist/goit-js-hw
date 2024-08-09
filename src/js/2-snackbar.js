// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Отримуємо значення з форми
    const delay = this.delay.value;
    const state = this.state.value;
  
    // Створюєм promise
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  
    // Выконуємо обробку promice
    promise
    .then((delay) => {
      iziToast.success({
        title: "success",
        message: `✅ Fulfilled promise in ${delay}ms`
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "error",
        message: `❌ Rejected promise in ${delay}ms`
      });
    });
  });