//document.getElementByID("count-el").innerText = 5


function countDown()
{
    count +=  1;
    countEl.innerText = count
    console.log("Button clicked ! " + count)
}

function save() {
    console.log(count)
}
