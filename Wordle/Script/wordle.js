window.onload= function(){
    let board = document.getElementById('board');
    let button = document.getElementById('submit');
    let input = document.getElementById('guess');
    const refreshButton = document.getElementById('refreshButton');


    let words = [
        'apple', 'sword', 'plane', 'heart', 'stone',
        'blaze', 'crisp', 'flint', 'grape', 'dream',
        'laugh', 'dance', 'frost', 'ghost', 'ocean',
        'craft', 'faith', 'pride', 'teach', 'sharp',
        'quick', 'broad', 'click', 'light', 'twist',
        'sunny', 'shiny', 'float', 'batch', 'break',
        'clear', 'chime', 'claim', 'fleet', 'crowd',
        'score', 'stock', 'train', 'olive', 'berry',
        'mango', 'peach', 'quiet',
        ];  // List of final words
    let currentWordIndex = 0;  // Track the current word index

    let finalWord = words[currentWordIndex];;
    let tries = 0;
    function generate(){
        board.innerHTML = '';
        for(let i = 0 ;i < 6;i++)
            {
                let row = document.createElement('div');
                row.classList = 'boardRow';
                for(let j = 0 ; j < 5; j++)
                {
                    let cell = document.createElement('div');
                    cell.classList = 'cell';
                    cell.setAttribute('data-row', i);
                    cell.setAttribute('data-column', j);
                    row.append(cell);
                }
                board.append(row);
            }
    }
    generate();
    
    function takeAction() {
        let guessWord = input.value.toUpperCase();

        if(tries > 5){
            alert("You already lost");
            return;
        }

        if(guessWord.length == 5)
        {
            for(let i = 0; i< 5 ; i++)
            {
                let cell = document.querySelector(`[data-row="${tries}"][data-column="${i}"]`);
                cell.innerHTML = guessWord[i];
                if(guessWord[i] == finalWord[i].toUpperCase()){
                    //green
                    cell.style.backgroundColor = "#3d9144";
                }
                else
                {
                    if(finalWord.toUpperCase().indexOf(guessWord[i]) < 0)
                    {
                        //red
                        cell.style.backgroundColor = 'grey';

                    }
                    else
                    {
                    //yellow
                    cell.style.backgroundColor = '#d4a93d';

                    }
                }
                
            }
            tries++;
        }
        if(guessWord === finalWord.toUpperCase())
        {
            alert("You won!");
        }
        else{
            if(tries == 6)
                {
                    alert("You lost! The ward was " + words[currentWordIndex].toUpperCase() + ".");
                }
        }
        
        input.value= '';

        
    }

    function resetGame() {
        tries = 0;
        currentWordIndex = (currentWordIndex + 1) % words.length;  // Cycle to the next word
        finalWord = words[currentWordIndex];  // Update the final word
        generate();  // Reset the board
        input.value = '';  // Clear the input field
        input.focus();  // Automatically focus on the input field
    }


    button.addEventListener('click', takeAction)

    input.addEventListener('keydown', function(event) {
        // Check if the Enter key (key code 13) is pressed
        if (event.key === 'Enter') {
            takeAction()
        }
    });

    document.getElementById('refreshButton').addEventListener('click', resetGame);

    document.getElementById('guess').focus();

}

