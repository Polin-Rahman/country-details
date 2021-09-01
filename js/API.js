const inputText = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');
const countryContainer = document.getElementById('country-container');
const countryDetails = document.getElementById("country-details");

searchButton.addEventListener('click', function () {
    const search = inputText.value;

    //empty search field handel
    if (search === '') {
        errorDiv.innerText = 'Search field can not be empty!';
        return;
    }

    //clear
    countryContainer.innerHTML = '';
    countryDetails.innerHTML = '';

    const url = `https://restcountries.eu/rest/v2/name/${search}`;

    //showing spinner
    spinner.classList.remove('d-none');

    //fetch url
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add('d-none');
                showData(data);
            }, 1500);
        })
        .finally(() => {
            inputText.value = '';
        });
});

function showData(dataArray) {
    // error handel
    if (dataArray.status === 404) {
        errorDiv.innerText = 'No result found!'
    }
    else {
        errorDiv.innerText = '';
    }
    // country details show
    dataArray.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
                    <div class="rounded overflow-hidden border p-2">
                        <img src="${item.flag}" class="w-100" alt="" />
                    </div>
                    <div class="
                        py-2
                        d-flex
                        justify-content-between
                        align-items-center
                        d-md-block
                        text-md-center
                      ">
                        <h1>${item.name}</h1>
                        <p>${item.altSpellings}</p>
                        <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-secondary">Learn More</button>
                    </div>
        `;
        countryContainer.appendChild(div);
    });
}

function showDetails(alpha3Code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
        .then(res => res.json())
        .then(data => {
            countryDetails.innerHTML = `
        <div class="col-md-12">
            <h1>${data.name}</h1>
            <p>Capital: ${data.capital}</p>
            <p>Region: ${data.region}</p>
            <p>Population: ${data.population}</p>
            <p>Language: ${data.languages[0].nativeName}</p>
            <p>Timezones: ${data.timezones[0]}</p>
            <p>Currency Name: ${data.currencies[0].name}</p>
            <p>Currency Symbol: ${data.currencies[0].symbol}</p>
        </div>
      `;
        })
}