const inputText = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');

searchButton.addEventListener('click', function () {
    const search = inputText.value;

    //empty search field handel
    if (search === '') {
        errorDiv.innerText = 'Search field can not be empty!';
        return;
    }
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
                console.log(data);
            }, 1500);
        })
        .finally(() => {
            inputText.value = '';
        });
});