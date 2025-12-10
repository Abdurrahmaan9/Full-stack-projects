# Candy Crush Game Information

## Summary
This is a browser-based implementation of a Candy Crush style game using vanilla JavaScript, HTML, and CSS. The game features a grid-based board where players can drag and drop candies to create matches of three or more in a row or column. When matches are found, the candies are removed, the player earns points, and new candies fall from the top to fill the empty spaces.

## Structure
- **index.html**: Main HTML file that defines the game structure
- **scripts.js**: Contains all game logic and functionality
- **styles.css**: Defines the visual styling of the game
- **images/**: Directory containing candy and background images

## Language & Runtime
**Language**: JavaScript (ES6), HTML5, CSS3
**Build System**: None (vanilla web project)
**Package Manager**: None

## Main Components

### Game Board
- 8x8 grid of candy elements
- Created dynamically using JavaScript
- Each candy is represented by a div with a background image

### Game Logic
- **Candy Generation**: Random candy colors assigned at game start
- **Drag and Drop**: Implementation using HTML5 drag and drop API
- **Match Detection**: Functions to check for matches of 3, 4, or 5 candies
- **Scoring System**: Points awarded based on match length
- **Gravity Effect**: Candies fall down to fill empty spaces

### User Interface
- Score display at the top
- Game board with draggable candy elements
- Visual feedback during gameplay

## Key Files

### HTML (index.html)
- Basic structure with score board and grid container
- Links to CSS and JavaScript files

### JavaScript (scripts.js)
- **Event Listeners**: DOMContentLoaded, drag events
- **Game Initialization**: create_board() function
- **Drag Functionality**: dragStart, dragEnd, dragDrop, etc.
- **Match Detection**: checking_row_for_three(), checking_column_for_three(), etc.
- **Game Loop**: setInterval for continuous game updates

### CSS (styles.css)
- Game board styling with semi-transparent background
- Grid layout for candy positioning
- Responsive design elements

## Assets
**Candy Images**:
- red-candy.png
- blue-candy.png
- green-candy.png
- yellow-candy.png
- orange-candy.png
- purple-candy.png

**Background**:
- candy-crush-background-2.png

## Game Mechanics
- Players can only swap adjacent candies
- Matches are automatically detected and removed
- Score increases based on match length (3, 4, or 5)
- Game continuously checks for matches every 100ms
- New candies are generated at the top when matches are cleared