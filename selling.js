document.querySelector('.btn').addEventListener('click', add);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/246d64e417e249ac8347c88f35cf5d8e/sellingDetails')
        .then((res) => {
            console.log(res);
            var child = 0;
            for (let i = 0; i < res.data.length; i++) {
                show(res.data[i]);
                let value = res.data[i];
                child += parseInt(value.price);
            }
            const parentNode1 = document.querySelector('#total');
            parentNode1.innerHTML += child
        })
        .catch((err) => console.log(err))
})

function show(detail) {
    const parentNode = document.querySelector('#details');
    const childHtml = `<li id=${detail.price}> ${detail.price} ${detail.product}
    <button onclick = deleteInfo('${detail._id}')>delete</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHtml;
}

function deleteInfo(detailId) {
    axios.delete(`https://crudcrud.com/api/246d64e417e249ac8347c88f35cf5d8e/sellingDetails/${detailId}`)
        .then((res) => {
            console.log(res);
            removeInfo(detailId)
        })
        .catch((err) => console.log(err))
}

function removeInfo(detailId) {
    const parentNode = document.querySelector('#details');
    const chilNodeToBeDeleted = document.querySelector(detailId);
    if (chilNodeToBeDeleted) {
        parentNode.removeChild(chilNodeToBeDeleted)
    }
}

function add(e) {
    e.preventDefault();

    const price = document.querySelector('#sellPrice').value;
    const product = document.querySelector('#product').value;

    const obj = {
        price,
        product
    }

    axios.post('https://crudcrud.com/api/246d64e417e249ac8347c88f35cf5d8e/sellingDetails', obj)
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
}


