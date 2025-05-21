let productList = [];

fetch('carsandvans.json')
  .then(res => res.json())
  .then(data => productList = data)
  .catch(err => console.error('JSON load error:', err));

const input = document.getElementById('search');
const suggestionsBox = document.getElementById('suggestions');
const resultBox = document.getElementById('search-results');

input.addEventListener('input', function () {
  const val = this.value.toLowerCase();
  suggestionsBox.innerHTML = '';
  resultBox.innerHTML = '';
  if (val.length < 2) {
    suggestionsBox.style.display = 'none';
    resultBox.style.display = 'none';
    return;
  }

  const matches = productList.filter(item => item.name.toLowerCase().includes(val));
  
  if (matches.length === 0) {
    suggestionsBox.innerHTML = '<div class="suggestion-item">No match found</div>';
  } else {
    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerText = item.name;
      div.onclick = () => showResult(item);
      suggestionsBox.appendChild(div);
    });
  }
  suggestionsBox.style.display = 'block';
});

function showResult(item) {
  input.value = item.name;
  suggestionsBox.style.display = 'none';
  resultBox.innerHTML = `
    <div style="background: #fff; border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
      <img src="${item.image}" alt="${item.name}" style="width: 100%; max-width: 250px;">
      <h3>${item.name}</h3>
      <p>Type: ${item.type}</p>
      <p>Member Price: ${item.member_price}</p>
      <p>Casual Price: ${item.casual_price}</p>
    </div>
  `;
  resultBox.style.display = 'block';
}
