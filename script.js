document.addEventListener('DOMContentLoaded', () => {

    //  HOME PAGE: Start Explore Button
    // Navigate to Deep Dive page when "Start Exploring" button is clicked

 
  const startExplore = document.getElementById('startExplore');
  if (startExplore) {
    startExplore.addEventListener('click', () => {
      window.location.href = 'deepdive.html';
    });
  }


  // This script displays a simple time-based greeting in the <p> element with id="greeting"
  const greeting = document.getElementById('greeting');
if (greeting) {
  const hour = new Date().getHours();

     // Display a greeting based on the time of day
  if (hour < 12) greeting.textContent = "Good morning, young scientist! 🌞";
  else if (hour < 18) greeting.textContent = "Good afternoon, explorer! ☀️";
  else greeting.textContent = "Good evening! 🌙";
}


    //  QUIZ FUNCTIONALITY

  window.checkAnswer = function(answer, quizNumber) {
    const result = document.getElementById('result' + quizNumber);
    if (!result) return;

    if (answer === 'correct') {
      result.textContent = 'Correct!';
      result.style.color = 'green';
    } else {
      result.textContent = 'Try again!';
      result.style.color = 'red';
    }
  };


    //  PERFUME ACTIVITY
  
  const items = document.querySelectorAll('.item');
  const bottle = document.getElementById('bottle');
  const resultText = document.getElementById('perfumeResult');
  const doneBtn = document.getElementById('doneBtn');
  const resetBtn = document.getElementById('resetBtn');
  const sparklesContainer = document.getElementById('sparkles');
  const magicAudio = document.getElementById('magicAudio');

  let addedIngredients = [];

  
    // To Drag & Drop / Tap Ingredients

  items.forEach(item => {
    if (!item) return;

    // Drag start
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.id);
    });

    // Tap/click support (mobile)
    item.addEventListener('click', () => {
      if (!addedIngredients.includes(item.id)) {
        addedIngredients.push(item.id);
        updateBottle();
      }
    });
  });

  // Bottle dropzone
  if (bottle) {
    bottle.addEventListener('dragover', e => {
      e.preventDefault();
      bottle.style.background = '#f0f8ff';
    });

    bottle.addEventListener('dragleave', () => {
      bottle.style.background = '#ffffff';
    });

    bottle.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      if (id && !addedIngredients.includes(id)) {
        addedIngredients.push(id);
        updateBottle();
      }
      bottle.style.background = '#ffffff';
    });
  }

 
    //  Update bottle display

  function updateBottle() {
    if (!bottle) return;

    bottle.innerHTML = '';
    if (addedIngredients.length === 0) {
      bottle.innerHTML = '<p>Drop ingredients here</p>';
    } else {
      addedIngredients.forEach(ing => {
        const img = document.createElement('img');
        img.src = `images/${ing}.png`;
        img.alt = ing;
        img.className = 'item';
        img.style.width = '50px';
        img.style.margin = '5px';
        bottle.appendChild(img);
      });
    }

    if (resultText) {
      resultText.textContent = addedIngredients.length > 0 ?
        `You added: ${addedIngredients.join(', ')}` : '';
    }
  }

  
   // Done Button
   // show congratulatory message after clicking done button

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      if (addedIngredients.length === 0) {
        if (resultText) {
          resultText.textContent = 'Add some ingredients first!';
          resultText.style.color = '#b93a3a';
        }
        return;
      }

      // Random congratulatory message for users
      const messages = [
        "🎉 WOHOO! You created a cool perfume!",
        "✨ Amazing! Your fragrance is unique!",
        "🌸 Well done! A perfect mix of scents!",
        "🌟 Wow! You are a perfume master!",
        "💐 Fantastic! Your custom perfume is ready!"
      ];
      if (resultText) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        resultText.textContent = msg;
        resultText.style.color = '#0b5345';
      }
    });
  }

 
    //  Reset Button and results
 
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      addedIngredients = [];
      updateBottle();
      if (resultText) resultText.textContent = '';
      if (sparklesContainer) sparklesContainer.innerHTML = '';
      if (magicAudio) {
        magicAudio.pause();
        magicAudio.currentTime = 0;
      }
    });
  }


  // Initialize bottle
  updateBottle();

});

