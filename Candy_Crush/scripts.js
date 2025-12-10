document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const score_display = document.getElementById('score')
    const width = 8
    const divs = []
    let score = 0
    score_display.innerHTML = score

    const candy_colors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]
    // create Board
    function create_board() {
        for (let i = 0; i < width*width; i++) {
            const div = document.createElement('div');
            div.setAttribute('draggable', true)
            div.setAttribute('id',i)
            let random_color = Math.floor(Math.random() * candy_colors.length)
            div.style.backgroundImage = candy_colors[random_color]
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
    colorBeingDragged = this.style.backgroundImage
    divIDBeingDragged = parseInt(this.id)
}

function dragOver(e){
    e.preventDefault();
}
function dragLeave(){
    this.style.backgroundImage = ''
}
function dragEnter(e){
    e.preventDefault()
}

function dragDrop(){
    colorBeingReplaced = this.style.backgroundImage
    divIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    divs[divIDBeingDragged].style.backgroundImage = colorBeingReplaced

}

function dragEnd(){
    // valid moves in the game
    let valid_moves = [
        divIDBeingDragged -1,
        divIDBeingDragged - width,
        divIDBeingDragged + 1,
        divIDBeingDragged + width
    ]

    let valid_move = valid_moves.includes(divIdBeingReplaced)

    if (divIdBeingReplaced && valid_move) {
        divIdBeingReplaced =null
    }else if(divIdBeingReplaced && !valid_move) {
        divs[divIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        divs[divIDBeingDragged].style.backgroundImage = colorBeingDragged
    }else divs[divIDBeingDragged].style.backgroundImage = colorBeingDragged
}

// make candy drop down when some has been deleted
function move_candy_down() {
    for ( i = 0; i < 55; i++) {
        if (divs[i + width].style.backgroundImage === '') {
            divs[i + width].style.backgroundImage = divs[i].style.backgroundImage
            divs[i].style.backgroundImage = ''
            const first_row = [0,1,2,3,4,5,6,7]
            const is_first_row = first_row.includes(i)
            if (is_first_row && divs[i].style.backgroundImage === '') {
                let random_color = Math.floor(Math.random() * candy_colors.length)
                divs[i].style.backgroundImage = candy_colors[random_color]
            }
        }
    }
}


// checking for matches in the game Row by Column
// checking for row for three
function checking_row_for_three() {
    for (let i = 0; i < 61; i++){
        let row_for_three = [i, i+1, i+2]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        const not_valid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if (not_valid.includes(i)) continue

        if (row_for_three.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 3
            score_display.innerHTML = score
            row_for_three.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

// checking for column for three
function checking_column_for_three() {
    for (let i = 0; i < 47; i++){
        let column_for_three = [i, i+width, i+width*2]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        if (column_for_three.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 3
            score_display.innerHTML = score
            column_for_three.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

// checking for row for four
function checking_row_for_four() {
    for (let i = 0; i < 60; i++){
        let row_for_four = [i, i+1, i+2,i+3]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        const not_valid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if (not_valid.includes(i)) continue

        if (row_for_four.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 4
            score_display.innerHTML = score
            row_for_four.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

// checking for column for four
function checking_column_for_four() {
    for (let i = 0; i < 47; i++){
        let column_for_four = [i, i+width, i+width*2, i+width*3]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        if (column_for_four.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 4
            score_display.innerHTML = score
            column_for_four.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

// checking for row for five
function checking_row_for_five() {
    for (let i = 0; i < 59; i++){
        let row_for_five = [i, i+1, i+2,i+3,i+4]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        const not_valid = [4,5,6,7,12,13,14,15,20,21,22,23,27,29,30,31,36,37,38,39,44,45,46,47,54,53,54,55]
        if (not_valid.includes(i)) continue

        if (row_for_five.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 5
            score_display.innerHTML = score
            row_for_five.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

// checking for column for five
function checking_column_for_five() {
    for (let i = 0; i < 47; i++){
        let column_for_five = [i, i+width, i+width*2, i+width*3, i+width*4]
        let decided_color = divs[i].style.backgroundImage
        const is_empty = divs[i].style.backgroundImage === ""

        if (column_for_five.every(index => divs[index].style.backgroundImage === decided_color && !is_empty)) {
            score += 5
            score_display.innerHTML = score
            column_for_five.forEach(index => {
                divs[index].style.backgroundImage = ''
            })
        }
    }
}

window.setInterval(function() {
    move_candy_down()
    checking_row_for_three()
    checking_column_for_three()
    checking_row_for_four()
    checking_column_for_four()
    checking_row_for_five()
    checking_column_for_five()

}, 100)

})