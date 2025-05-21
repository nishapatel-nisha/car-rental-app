// car-rental-app/js/reservation.js
document.addEventListener("DOMContentLoaded", () => {
    const vin = localStorage.getItem("selectedCar");
    if (!vin) {
      document.getElementById("carInfo").textContent = "Please select a car first.";
      return;
    }
  
    fetch("data/cars.json")
      .then(res => res.json())
      .then(data => {
        const car = data.cars.find(c => c.vin === vin);
        if (!car) return;
  
        const info = document.getElementById("carInfo");
        info.innerHTML = `
          <h2>${car.brand} ${car.carModel} (${car.yearOfManufacture})</h2>
          <p>${car.description}</p>
          <p>Price per day: $${car.pricePerDay}</p>
        `;
  
        if (car.available) {
          document.getElementById("reservationForm").style.display = "block";
          setupForm(car.pricePerDay);
        } else {
          info.innerHTML += "<p style='color:red;'>Car is no longer available.</p>";
        }
      });
  });
  
  function setupForm(pricePerDay) {
    const form = document.getElementById("reservationForm");
    const inputs = form.querySelectorAll("input");
    const submitBtn = document.getElementById("submitBtn");
    const totalPrice = document.getElementById("totalPrice");
  
    form.addEventListener("input", () => {
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) valid = false;
      });
  
      const days = parseInt(document.getElementById("days").value);
      if (valid && days > 0) {
        totalPrice.textContent = `Total Price: $${days * pricePerDay}`;
        submitBtn.disabled = false;
      } else {
        totalPrice.textContent = "";
        submitBtn.disabled = true;
      }
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Reservation placed successfully! (Simulated)");
      form.reset();
      localStorage.removeItem("selectedCar");
      window.location.href = "index.html";
    });
  }
  
  function cancelReservation() {
    localStorage.removeItem("selectedCar");
    window.location.href = "index.html";
  }
  