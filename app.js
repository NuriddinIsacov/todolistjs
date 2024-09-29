const data = JSON.parse(localStorage.getItem('tasks')) || []

const renderData = () => {
    const cards = document.querySelector('.cards')
    cards.innerHTML = ''

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach((task, index) =>{

        cards.innerHTML += `
            <div class="card" >
                <div class="card-btns">
                    <img src="./imgs/Pencil.png" alt="" index="${index}" onclick='clickEditBtn(event)'>
                    <img src="./imgs/remove.png" alt="" index="${index}" onclick='deleteTask(event)'>
                </div>
                <div class="card-title">${task.title}</div>
                <div class="card-description">${task.description}</div>
                <div class="card-data_author">
                    <div class="card-data">${task.dedline}</div>
                    <div class="card-author">${task.user}</div>
                </div>
            </div>
        `
    })
}

renderData()

const deleteTask = (e) =>{
    const index = e.target.getAttribute('index')

    let data = JSON.parse(localStorage.getItem('tasks')) || []

    data.splice(index, 1)

    localStorage.setItem('tasks', JSON.stringify(data))
    renderData()
}


const addBtn = document.querySelector('.add-btn')

const clickAddBtn = () =>{
    // console.log('tugma bosildi');
    
    let containerModal = document.createElement('div')
    containerModal.className = 'container-modal'

    let modal = document.createElement('div')
    modal.className = 'modal'

    let closeBtn = document.createElement('div')
    closeBtn.className = 'close-btn'
    closeBtn.setAttribute('onclick', 'closeModal()')
    closeBtn.innerHTML = `
        <img src="./imgs/remove.png" alt="">
    `

    let title = document.createElement('div')
    title.className = 'modal-title'
    title.textContent = 'Yangi topshiriq'

    let titleInp = document.createElement('input')
    titleInp.setAttribute('type', 'text')
    titleInp.setAttribute('id', 'title')
    titleInp.setAttribute('placeholder', 'Sarlavha')

    let descriptionInp = document.createElement('input')
    descriptionInp.setAttribute('type', 'text')
    descriptionInp.setAttribute('id', 'description')
    descriptionInp.setAttribute('placeholder', "Batafsil ma'lumot")

    let dedlineInp = document.createElement('input')
    dedlineInp.setAttribute('type', 'date')
    dedlineInp.setAttribute('id', 'dedline')
    dedlineInp.setAttribute('placeholder', 'Dedline')

    let selectUser = document.createElement('select')
    selectUser.setAttribute('name', 'xodim')
    selectUser.setAttribute('id', 'user')
    
    selectUser.innerHTML = `
    <option value="default">Xodim tanlang</option>
    <option value="Ochilov">Ochilov Javohir</option>
    <option value="Hamidov">Hamidov Bahrom</option>
    `
    console.log(selectUser);
    
    let modalBtn = document.createElement('button')
    modalBtn.textContent ="Qo'shish"
    modalBtn.className = 'modal-btn'
    modalBtn.setAttribute('onclick', 'addData()')

    modal.appendChild(closeBtn)
    modal.appendChild(title)
    modal.appendChild(titleInp)
    modal.appendChild(descriptionInp)
    modal.appendChild(dedlineInp)
    modal.appendChild(selectUser)
    modal.appendChild(modalBtn)
    containerModal.appendChild(modal)

    document.body.appendChild(containerModal)
}

const clickEditBtn = (e) =>{
    const taskIndex = e.target.getAttribute('index')
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
     let task = tasks[taskIndex]
     
    let containerModal = document.createElement('div')
    containerModal.className = 'container-modal'

    let modal = document.createElement('div')
    modal.className = 'modal'

    let closeBtn = document.createElement('div')
    closeBtn.className = 'close-btn'
    closeBtn.setAttribute('onclick', 'closeModal()')
    closeBtn.innerHTML = `
        <img src="./imgs/remove.png" alt="">
    `

    let title = document.createElement('div')
    title.className = 'modal-title'
    title.textContent = "Ma'lumotlarni tahrirlash"

    let titleInp = document.createElement('input')
    titleInp.setAttribute('type', 'text')
    titleInp.setAttribute('id', 'title')
    titleInp.setAttribute('placeholder', 'Sarlavha')
    titleInp.value = task.title

    let descriptionInp = document.createElement('input')
    descriptionInp.setAttribute('type', 'text')
    descriptionInp.setAttribute('id', 'description')
    descriptionInp.setAttribute('placeholder', "Batafsil ma'lumot")
    descriptionInp.value = task.description

    let dedlineInp = document.createElement('input')
    dedlineInp.setAttribute('type', 'date')
    dedlineInp.setAttribute('id', 'dedline')
    dedlineInp.setAttribute('placeholder', 'Dedline')
    dedlineInp.value = task.dedline

    let selectUser = document.createElement('select')
    selectUser.setAttribute('name', 'xodim')
    selectUser.setAttribute('id', 'user')
    selectUser.value = task.user
    
    selectUser.innerHTML = `
    <option value="default">Xodim tanlang</option>
    <option value="Ochilov">Ochilov Javohir</option>
    <option value="Hamidov">Hamidov Bahrom</option>
    `
    console.log(selectUser);
    
    let modalBtn = document.createElement('button')
    modalBtn.textContent ="Tahrirlash"
    modalBtn.className = 'modal-btn'
    modalBtn.setAttribute('onclick', `editData(${taskIndex})`)

    modal.appendChild(closeBtn)
    modal.appendChild(title)
    modal.appendChild(titleInp)
    modal.appendChild(descriptionInp)
    modal.appendChild(dedlineInp)
    modal.appendChild(selectUser)
    modal.appendChild(modalBtn)
    containerModal.appendChild(modal)

    document.body.appendChild(containerModal)   
}

const editData = (index) =>{
    if(!confirm("Ma'lumotlarni tahrirlashga aminmisiz?"))
        return false

    const inps = document.querySelectorAll('.modal input, .modal select')
    const obj = {}
    inps.forEach(element =>{
        obj[element.id] = element.value
    })
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks[index] = obj

    
    closeModal()
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // data = JSON.parse(localStorage.getItem('tasks')) || []
    renderData()
}



const addData = ()=>{
    const inps = document.querySelectorAll('.modal input, .modal select')
    const obj = {}
    inps.forEach(element =>{
        obj[element.id] = element.value
    })
    
    data.push(obj)
    
    closeModal()
    localStorage.setItem('tasks', JSON.stringify(data))
    // data = JSON.parse(localStorage.getItem('tasks')) || []
    renderData()


    console.log(data);
    
}



const closeModal = () =>{
    const containerModal = document.querySelector('.container-modal')
    document.body.removeChild(containerModal)
}