const dogsURL = 'http://localhost:3000/pups';

function getDogs() {
    fetch(dogsURL)
    .then (res => res.json())
    .then (data => buildDogs(data))
    .catch (error => console.log(error))
}
getDogs();

function buildDogs(dogObj) {
    const dogBar = document.getElementById('dog-bar')
    dogObj.forEach(dog => {
        let dogSpan = document.createElement('span');
        dogSpan.innerText = dog.name;
        dogSpan.id = dog.id;
        const dogInfo = document.getElementById('dog-info');
        const dogName = document.createElement('h2');
        const dogImg = document.createElement('img');
        let goodBadBtn = document.createElement('button');
        dogSpan.addEventListener('click', (e) => {
            dogInfo.innerHTML = '';
            goodBadBtn.className = 'btn'
            dogName.innerText = e.target.innerText;
            dogImg.src = dog.image;
            dogInfo.appendChild(dogImg);
            dogInfo.appendChild(dogName);
            dogInfo.appendChild(goodBadBtn);
            if (dog.isGoodDog === true) {
                goodBadBtn.innerText = 'Good Dog!';
                goodBadBtn.className = 'trueBtn';
            }
            else {
                goodBadBtn.innerText = 'Bad Dog!';
                goodBadBtn.className = 'falseBtn';
            }
        })
        goodBadBtn.addEventListener('click', (event) => patchGoodBad(event.path, dogSpan.id))
        dogBar.appendChild(dogSpan)
    })
}

function patchGoodBad(event, id) {
    let boolean;
    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify()
    })
    .then(r => r.json())
    .then(data => {
        if(data.status === false) {
            data.status = true;
            event.innerText = 'Good Dog!';
            event.className = 'trueBtn';
        }
        else {
            data.status = false;
            event.target.innerText = 'Bad Dog!';
            event.target.className = 'falseBtn';
        }
    })
    .catch(error => console.log(error))
}




