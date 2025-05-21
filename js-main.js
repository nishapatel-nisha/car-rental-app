// car-rental-app/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  let cars = [];

  fetch("data/cars.json")
    .then(res => res.json())
    .then(data => {
      cars = data.cars;
      displayCars(cars);
    });

  const searchBox = document.getElementById("searchBox");
  const filterType = document.getElementById("filterType");
  const filterBrand = document.getElementById("filterBrand");

  searchBox.addEventListener("input", () => filterAndSearch(cars));
  filterType.addEventListener("change", () => filterAndSearch(cars));
  filterBrand.addEventListener("change", () => filterAndSearch(cars));
});

function displayCars(cars) {
  const grid = document.getElementById("carGrid");
  grid.innerHTML = "";
  cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "carCard";
    card.innerHTML = `
      <img src="${car.image}" alt="${car.carModel}" />
      <h3>${car.brand} ${car.carModel} (${car.yearOfManufacture})</h3>
      <p>${car.description}</p>
      <p><strong>$${car.pricePerDay}/day</strong></p>
      <button ${!car.available ? "disabled" : ""} onclick="selectCar('${car.vin}')">
        ${car.available ? "Rent" : "Unavailable"}
      </button>
    `;
    grid.appendChild(card);
  });
}

function filterAndSearch(cars) {
  const keyword = document.getElementById("searchBox").value.toLowerCase();
  const type = document.getElementById("filterType").value;
  const brand = document.getElementById("filterBrand").value;

  const filtered = cars.filter(car => {
    const matchKeyword = car.carType.toLowerCase().includes(keyword) ||
      car.brand.toLowerCase().includes(keyword) ||
      car.carModel.toLowerCase().includes(keyword) ||
      car.description.toLowerCase().includes(keyword);

    const matchType = type === "" || car.carType === type;
    const matchBrand = brand === "" || car.brand === brand;

    return matchKeyword && matchType && matchBrand;
  });

  displayCars(filtered);
}

function selectCar(vin) {
  localStorage.setItem("selectedCar", vin);
  window.location.href = "reservation.html";
}
