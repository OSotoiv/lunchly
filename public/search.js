const searchInput = document.querySelector('#searchInput')
const searchForm = document.querySelector('#searchForm')
const customerList = document.querySelector('#customerList');

searchInput.addEventListener('input', searchCustomers);
searchForm.addEventListener('submit', searchCustomers)

function searchCustomers(e) {
    e.preventDefault;
    const inputValue = searchInput.value;
    fetch(`/search?q=${inputValue}`)
        .then(res => res.json())
        .then(data => showCustomers(data))
        .catch(err => alert(err.message))
}

function showCustomers(data) {
    if (data.sorry) {
        return alert('No Customer Found')
    } else {
        customerList.innerHTML = "";
        data.customers.forEach(customer => {
            customerList.innerHTML += `<li><a href="/${customer.id}/">${customer.firstName} ${customer.lastName}</a></li>`;
        })
    }
}