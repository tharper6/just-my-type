// Hide the uppercase keyboard
$('#keyboard-upper-container').hide();



let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0;                                                                                  // all of these variables are grabbed at the page load
let currentSentence = sentences[sentenceIndex]
let letterIndex = 0;
let currentLetter = currentSentence[letterIndex]
let startTime = Date.now();
let errorCount = 0;

$('#sentence').text(currentSentence);                                                                   // show current sentence on top of page
$('#target-letter').text(currentLetter)                                                                 // show current letter under sentence

$('body').keydown(function (e) {
    if (e.which === 16) {                                                                               // show/hide keyboards when clicking shift
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
})

$('body').keyup(function (e) {
    $('.highlight').removeClass('highlight')                                                            // keyup to remove each highlight
    if (e.which === 16) {                                                                               // show/hide keyboards when clicking off shift
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
})

$('body').keypress(function (e) {                                                                        // add highlight for each keypress
    $('#' + e.which).addClass('highlight')
    $('#yellow-block').css('left', '+=17.5px')                                                           // make yellow block move with every click
    checkWrongorRight(e);
    adjustTargetLetter(e);
})

function checkWrongorRight(e) {
    if (e.which === currentSentence.charCodeAt(letterIndex)) {
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>')
    } else {
        errorCount++;
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>')
    }
}

function adjustTargetLetter(e) {
    letterIndex++;
    if (letterIndex >= currentSentence.length) {
        resetSentence();
        return;
    }
    currentLetter = currentSentence[letterIndex]
    $('#target-letter').text(currentLetter)
}

function resetSentence() {
    sentenceIndex++;
    if (sentenceIndex >= sentences.length) {
        endGame();
        return;
    }
    currentSentence = sentences[sentenceIndex]
    $('#sentence').text(currentSentence);
    $('#yellow-block').css('left', '17.5px')
    letterIndex = 0;
    currentLetter = currentSentence[letterIndex]
    $('#target-letter').text(currentLetter)
    $('#feedback').empty();                                                                  //empty the glyphicon when resetting sentence (emtpy container, not item)
}

function endGame() {

    let endTime = Date.now();                                                               //date.now will not be grabbed until endGame function starts
    let words = 54
    let minutes = (endTime - startTime) / 1000 / 60;                                         //endtime - starttime will get us time played in ms. divide by 1000 turns it into sec. divide by 60 turns into min.
    let wpm = (words % minutes) - (2 * errorCount)

    $('#feedback').empty();
    $('#yellow-block').hide();
    $('#target-letter').text('WPM:' + wpm)
    $('#sentence')
        .text('Game Over!')
        .css('text-align', 'center')
        .append('<button id="restart">Restart</button>')
    $('#restart').click(function () {                                                        //reset game
        location.reload()
    })

}





// letterIndex++;
// currentLetter = currentSentence[letterIndex]
// $('#target-letter').text(currentLetter)

