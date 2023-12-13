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
            let random_color = Math.floor(Math.random() * candy_colors.length)
            div.style.backgroundColor = candy_colors[random_color]
            grid.appendChild(div);
            divs.push(div)
        }
    }

create_board()

})