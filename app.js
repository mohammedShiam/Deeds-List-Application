class UI {
    constructor() {

        this.deedsInput = document.querySelector('#deeds-submit-form')
        this.deedsName = document.querySelector('#inputName')
        this.deedsTime = document.querySelector('#inputTime')
        this.deedsStatus = document.querySelector('#inputStatus')
        this.successMsg = document.querySelector('#success-msg')
        this.errorMsg = document.querySelector('#error-msg')
        this.deedsListSection = document.querySelector('#deeds-list')
        this.output = document.querySelector('#left-section')
        this.deedsListArray = []
        this.deedsId = 0

    }

    // Submit deeds
    submitDeeds() {

        // Deeds Valus
        const deedsName = this.deedsName.value
        const deedsTime = this.deedsTime.value
        const deedsStatus = this.deedsStatus.value

        if (deedsName == '' || deedsTime == '' || deedsStatus == '') {
            this.errorMsg.classList.remove('d-none')
            this.errorMsg.innerHTML = `Input field can not be empty.`

            const self = this;
            setTimeout(() => {
                self.errorMsg.classList.add('d-none')
            }, 3000);
        } else {

            // Display Block Deeds Section
            this.output.classList.remove('d-none')

            // TODO: Remove Comment
            // remove input value
            // this.deedsName.value = ''
            // this.deedsTime.value = ''
            // this.deedsStatus.value = ''

            // Show Input
            const deeds = {
                id: this.deedsId,
                name: deedsName,
                time: deedsTime,
                status: deedsStatus
            }
            this.deedsListArray.push(deeds)
            this.showInput(deeds)
            this.deedsId++;
        }
    }

    // Edit Deeds
    editDees(element) {
        const id = Number(element.dataset.id);
        const deeds = this.deedsListArray.filter(deeds => {
            return deeds.id == id
        })
        this.filupInputField(deeds)
        const tempElement = element.parentElement.parentElement.parentElement
        // Element Remove From Dom
        tempElement.remove()

        // Deeds remove form deeds array
        const tempList = this.deedsListArray.filter(deeds => {
            return Number(deeds.id) !== id
        })

        this.deedsListArray = tempList

    }

    // Trash Deeds
    trashDeeds(element) {
        const id = Number(element.dataset.id);
        const deeds = this.deedsListArray.filter(deeds => {
            return deeds.id == id
        })
        const tempElement = element.parentElement.parentElement.parentElement
        // Element Remove From Dom
        tempElement.remove()

        // Deeds remove form deeds array
        const tempList = this.deedsListArray.filter(deeds => {
            return Number(deeds.id) !== id
        })

        this.deedsListArray = tempList

    }


    // Display Input
    showInput(deeds) {

        const div = document.createElement('div')
        div.innerHTML =
            `<div class="col-12 d-flex justify-content-between">
            <p class="text-light">${deeds.name}</p>
            <p class="text-light">${deeds.time}</p>
            <p class="text-light">${deeds.status}</p>
            <div class="d-flex">
                <p class="text-light curser-pointer mr-2" data-id="${deeds.id}">
                    <i class="bi bi-pencil-square btn-anim"></i>
                </p>
                <p class="text-light curser-pointer" data-id="${deeds.id}">
                    <i class="bi bi-trash3 btn-anim"></i>
                </p>
          </div>
        `
        this.deedsListSection.appendChild(div)
    }

    // Fillup Input Fields
    filupInputField(deeds) {
        this.deedsName.value = deeds[0].name
        this.deedsTime.value = deeds[0].time
        this.deedsStatus.value = deeds[0].status
    }


}

// Event Listener
window.addEventListener('DOMContentLoaded', function () {

    // New instance of ui
    const ui = new UI();
    if (ui.deedsListArray.length > 0) {
        ui.output.classList.remove('d-none')
    }

    // Submit Deeds Input Listener
    ui.deedsInput.addEventListener('submit', function (event) {
        event.preventDefault()
        ui.submitDeeds()
    })

    // Click Edit & Trash Button
    ui.deedsListSection.addEventListener('click', function (event) {

        if (event.target.classList.contains('bi-pencil-square')) {
            ui.editDees(event.target.parentElement)
        } else if (event.target.classList.contains('bi-trash3')) {
            ui.trashDeeds(event.target.parentElement)
        }
    })

})