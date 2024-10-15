// for loading API data
const loadFunction = () => {
    document.getElementById('loding').style.display = 'block'
    setTimeout(() => {
        allPetsAPI()
    }, 2200)
}

loadFunction()
//category API
const petCategoriesAPI = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    categoriesSection(data.categories)
}
petCategoriesAPI()

//active btn backgroun color
const activeBtnBg = () => {
    const button = document.getElementsByClassName('category-btn')
    for (const btn of button) {
        btn.classList.remove('bg-[#0E7A81]');
        btn.classList.remove('rounded-3xl', 'text-white');
        btn.classList.add('rounded-xl',)
    }
    return button;
}
//category section
const petCategoryAPI = (categoryId) => {
    document.getElementById('loding').style.display = 'block';
    document.getElementById('show-all-pets').classList.add('hidden');

    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`)
            .then(res => res.json())
            .then(d => {
                activeBtnBg();
                const btn = document.getElementById(`btn-${categoryId}`);
                btn.classList.add('bg-[#0E7A81]', 'text-white');
                btn.classList.add('rounded-3xl')

                document.getElementById('loding').style.display = 'none';
                document.getElementById('show-all-pets').classList.remove('hidden');

                if (categoryId === 'birds') {
                    document.getElementById('show-all-pets').classList.remove('grid');
                } else {
                    document.getElementById('show-all-pets').classList.add('grid');
                }

                showAllPets(d.data, categoryId);
            })
            .catch(err => {
                console.error('Error fetching category data:', err);

                document.getElementById('loding').style.display = 'none';
                document.getElementById('show-all-pets').classList.remove('hidden');
            });
    }, 2200);
};


// category btn
const categoriesSection = (categorie) => {
    const section = document.getElementById('pet-category')
    categorie.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('flex', 'justify-center')
        div.innerHTML = `
        <button id="btn-${item.category}" onclick="petCategoryAPI('${item.category}')" 
        class="flex justify-center items-center space-x-2 w-[12rem] h-16 border
        rounded-md cursor-pointer my-1 category-btn">
        <img class="w-10" src=${item.category_icon}/>
        <h1 class="font-extrabold text-xl">${item.category}</h1>
        </button>
        `
        section.append(div)
    });    
}

//show all pets 
const allPetsAPI = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    showAllPets(data.pets)
    document.getElementById('loding').style.display = 'none';  
}

const showAllPets = (petsData) => {    
    const petContainer = document.getElementById('show-all-pets');
    petContainer.innerHTML = ''
    if(petsData.length === 0){
        petContainer.innerHTML = `
        <div class="grid place-items-center">
        <h1 class="text-center font-bold text-3xl">No Information Available</h1>
        <img src="https://srec.ac.in/themes/frontend/images/no_data.jpg" alt="">
        </div>
        `
        petContainer.classList.remove('grid');
    }
    else{
        petContainer.classList.add('grid');
    }
    petsData.forEach(pet => {
        const petDiv = document.createElement('div');
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet; // Ensure you're extracting the id
        petDiv.innerHTML = `
            <div class="mx-2 mb-5 p-4 border rounded-xl space-y-1 bg-[#1313131A] shadow-sm">
                <img class="rounded-md h-[180px]" src=${image}>
                <h1 class="font-extrabold text-xl text-black">${pet_name}</h1>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-grip-horizontal"></i>
                        <p class="text-gray-500">Breed: ${breed ? breed : 'Not Available'}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-calendar-alt"></i>
                        <p class="text-gray-500">Birth: ${date_of_birth ? new Date(date_of_birth).getFullYear() : 'Not Available'}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-mars"></i>
                        <p class="text-gray-500">Gender: ${gender ? gender : 'Not Available'}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-dollar-sign"></i>
                        <p class="text-gray-500">Price: ${price ? price : 'Not Available'}$</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="btn hover:bg-btnBg" onclick="likeBtnHandel('${image}')">
                        <i class="fa-regular fa-thumbs-up fa-2xl"></i>
                    </button>
                    <button id="btn-${petId}" onclick="showAddopModal('${petId}')" class="btn hover:bg-btnBg hover:text-white">Adopt</button>
                    <button onclick="loadDetailsAPI('${petId}')" class="btn hover:bg-btnBg hover:text-white">Details</button> <!-- Use the correct ID -->
                </div>
            </div>
        `;
        petContainer.append(petDiv);
    });
    
}
// allPetsAPI()


// click like btn and add the images in right side
const likeBtnHandel = (img) => {
    const imgShow = document.getElementById('show-images')
    const newImg = document.createElement('div')
    newImg.innerHTML = `
        <img class="rounded-md" src=${img} />
    `
    imgShow.append(newImg)
}


// show modal depend on the details btn
const loadDetailsAPI = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    modalData(data.petData)
}
const modalData = (item) => {
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = `
        <div class="space-y-2">
        <img class="h-[250px] w-full rounded-md" src=${item.image}/>
        <h1 class="font-extrabold text-xl text-black">${item.pet_name}</h1>
        </div>
     <section class="space-y-2 grid grid-cols-5 my-4">
    <div class="col-span-3 space-y-2">
        <div class="flex items-center space-x-2">
            <i class="fas fa-grip-horizontal"></i>
            <p class="text-gray-500">Breed: ${item.breed ? item.breed : 'Not Available'}</p>
        </div>
        <div class="flex items-center space-x-2">
            <i class="fas fa-mars"></i>
            <p class="text-gray-500">Gender: ${item.gender ? item.gender : 'Not Available'}</p>
        </div>
        <div class="flex items-center space-x-2">
            <i class="fa-solid fa-syringe"></i>
            <p class="text-gray-500">Vaccinated status: ${item.vaccinated_status ? item.vaccinated_status : 'Not Available'}</p>
        </div>
    </div>
        <div class="col-span-2 space-y-2"> 
            <div class="flex items-center space-x-2">
            <i class="fas fa-calendar-alt"></i>
            <p class="text-gray-500">Birth: ${item.date_of_birth ? new Date(item.date_of_birth).getFullYear() : 'Not Available'}</p>
            </div>
            <div class="flex items-center space-x-2">
            <i class="fas fa-dollar-sign"></i>
            <p class="text-gray-500">Price: ${item.price}$</p>
            </div>
        </div>
    </section>
        <div class="border-b-2"></div>
        <h1 class="text-xl font-bold">Details Information</h1>
        <p class="text-sm my-3">${item.pet_details}</p>
    `
    document.getElementById('my_modal_1').showModal()    
}

// adoption btn

const showAddopModal = (id) => {
    const modalDiv = document.getElementById('addop-modal');
    modalDiv.innerHTML = `
        <i class="fa-solid fa-hands-holding fa-lg"></i>        
        <h1 class="text-4xl font-extrabold text-black">Congrates</h1>
        <p>Adption Process is Start For Your Pet</p>
        <h1 id="counter-text" class="font-extrabold text-7xl">3</h1>
    `
    const btnTextChange = document.getElementById(`btn-${id}`)
        btnTextChange.innerText = 'Adopted'
        btnTextChange.classList.add('bg-gray-500', 'text-white','cursor-not-allowed');
        btnTextChange.disabled = true;
    const modalContent = document.getElementById('my_modal_3')
    modalContent.showModal()
    setTimeout(() => {
        modalContent.close()
    }, 3200);

    //loading the counter
    let countInnerText = document.getElementById('counter-text')
    let count = 3;
    const countNumber = () => {
        count = 3;
        countInnerText.innerHTML = count;

        let interval = setInterval(() => {
            count--
            countInnerText.innerHTML = count;
            if(count <=0){
                clearInterval(interval)
            }
        }, 1000)
    }
    countNumber()
}


const sortPetsByPrice = (data) => {
    return data.sort((a, b) => b.price - a.price);
}

document.getElementById('sort-by-price').addEventListener('click', async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data =await res.json();
    const sortPets = sortPetsByPrice(data.pets)
    showAllPets(sortPets)
})
