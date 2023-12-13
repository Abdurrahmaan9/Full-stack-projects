document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const divs = []


    const candy_colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
        'purple'
    ]
    // create Board
    function create_board() {
        for (let i = 0; i < width*width; i++) {
            const div = document.createElement('div');
            div.setAttribute('draggable', true)
            div.setAttribute('id',i)
            let random_color = Math.floor(Math.random() * candy_colors.length)
            div.style.backgroundColor = candy_colors[random_color]
            grid.appendChild(div);
            divs.push(div)
        }
    }

create_board()

// draging the candys 
let colorBeingDragged
let colorBeingReplaced
let divIDBeingDragged
let divIdBeingReplaced

divs.forEach(div => div.addEventListener('dragstart', dragStart))
divs.forEach(div => div.addEventListener('dragend', dragEnd))
divs.forEach(div => div.addEventListener('dragover', dragOver))
divs.forEach(div => div.addEventListener('dragenter', dragEnter))
divs.forEach(div => div.addEventListener('dragleave', dragLeave))
divs.forEach(div => div.addEventListener('drop', dragDrop))

function dragStart(){
    colorBeingDragged = this.style.backgroundColor
    divIDBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragStart')
}

function dragOver(e){
    e.preventDefault();
    console.log(this.id, 'dragover')
}
function dragLeave(){
    console.log(this.id, 'dragleave')
}
function dragEnter(){
    console.log(this.id, 'dragenter')
}

function dragDrop(){
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundColor
    divIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    divs[divIDBeingDragged].style.backgroundColor = colorBeingReplaced

}

function dragEnd(){
    console.log(this.id, 'dragend')
}


})