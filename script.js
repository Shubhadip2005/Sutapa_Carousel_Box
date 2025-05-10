/*--------------------
Vars
--------------------*/
let progress = 0
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

 // Create sparkles
const container = document.getElementById('sparkle-container');
const colors = ['#ff69b4', '#ff8fba', '#ffb6c1', '#ffc0cb', '#ffffff', '#ffe9e9'];

// Create background glow effects
for (let i = 0; i < 8; i++) {
    createGlow();
}

// Create sparkles
for (let i = 0; i < 80; i++) {
    createSparkle();
}

// Create hearts
for (let i = 0; i < 20; i++) {
    createHeart();
}

function createGlow() {
    const glow = document.createElement('div');
    glow.classList.add('glow');
    
    const size = Math.random() * 200 + 100;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 8 + 4;
    
    glow.style.width = `${size}px`;
    glow.style.height = `${size}px`;
    glow.style.left = `${left}%`;
    glow.style.top = `${top}%`;
    glow.style.setProperty('--duration', `${duration}s`);
    
    container.appendChild(glow);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random positioning
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Random size (1-4px)
    const size = Math.random() * 3 + 1;
    
    // Random animation duration (2-8s)
    const duration = Math.random() * 6 + 2;
    
    // Random opacity (0.3-1)
    const opacity = Math.random() * 0.7 + 0.3;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    sparkle.style.setProperty('--duration', `${duration}s`);
    sparkle.style.setProperty('--opacity', opacity);
    
    // Delay animation start randomly
    sparkle.style.animationDelay = `${Math.random() * duration}s`;
    
    container.appendChild(sparkle);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random positioning
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Random size for heart (4-12px)
    const size = Math.random() * 8 + 4;
    
    // Random animation duration (5-12s)
    const duration = Math.random() * 7 + 5;
    
    // Random opacity (0.5-1)
    const opacity = Math.random() * 0.5 + 0.5;
    
    // Random movement direction
    const translateX = (Math.random() * 40 - 20) + 'px';
    const translateY = (Math.random() * -30 - 10) + 'px'; // Move upward
    
    // Random heart color
    const color = colors[Math.floor(Math.random() * (colors.length - 1))]; // Skip white
    
    // Apply styles
    heart.style.left = `${left}%`;
    heart.style.top = `${top}%`;
    heart.style.setProperty('--size', `${size}px`);
    heart.style.setProperty('--duration', `${duration}s`);
    heart.style.setProperty('--opacity', opacity);
    heart.style.setProperty('--translate-x', translateX);
    heart.style.setProperty('--translate-y', translateY);
    heart.style.background = color;
    
    // Apply the same color to the pseudo-elements
    heart.style.boxShadow = `0 0 ${size/2}px ${color}`;
    
    // Delay animation start randomly
    heart.style.animationDelay = `${Math.random() * duration}s`;
    
    container.appendChild(heart);
    
    // Style the pseudo-elements (heart shapes)
    const style = document.createElement('style');
    style.textContent = `
        #${heart.id}:before, #${heart.id}:after {
            background: ${color};
        }
    `;
    document.head.appendChild(style);
}

// Add special sparkles at intervals
setInterval(() => {
    const specialSparkle = document.createElement('div');
    specialSparkle.classList.add('sparkle');
    
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() * 5 + 3; // Larger size
    const duration = Math.random() * 2 + 1; // Faster animation
    
    specialSparkle.style.left = `${left}%`;
    specialSparkle.style.top = `${top}%`;
    specialSparkle.style.width = `${size}px`;
    specialSparkle.style.height = `${size}px`;
    specialSparkle.style.backgroundColor = '#ffffff';
    specialSparkle.style.boxShadow = `0 0 ${size * 3}px #ffffff, 0 0 ${size * 6}px #ff69b4`;
    specialSparkle.style.setProperty('--duration', `${duration}s`);
    specialSparkle.style.setProperty('--opacity', '1');
    
    container.appendChild(specialSparkle);
    
    // Remove after animation completes
    setTimeout(() => {
        specialSparkle.remove();
    }, duration * 1000);
}, 200);

// Create new floating hearts occasionally
setInterval(() => {
    const floatingHeart = document.createElement('div');
    floatingHeart.classList.add('heart');
    
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 8; // Bigger hearts
    const duration = Math.random() * 5 + 7;
    const opacity = Math.random() * 0.6 + 0.4;
    
    const translateX = (Math.random() * 60 - 30) + 'px';
    const translateY = (Math.random() * -100 - 50) + 'px'; // Move upward
    
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];
    
    floatingHeart.style.left = `${left}%`;
    floatingHeart.style.bottom = '0';
    floatingHeart.style.setProperty('--size', `${size}px`);
    floatingHeart.style.setProperty('--duration', `${duration}s`);
    floatingHeart.style.setProperty('--opacity', opacity);
    floatingHeart.style.setProperty('--translate-x', translateX);
    floatingHeart.style.setProperty('--translate-y', translateY);
    floatingHeart.style.background = color;
    floatingHeart.style.boxShadow = `0 0 ${size/2}px ${color}`;
    
    container.appendChild(floatingHeart);
    
    // Style the pseudo-elements
    const style = document.createElement('style');
    style.textContent = `
        #${floatingHeart.id}:before, #${floatingHeart.id}:after {
            background: ${color};
        }
    `;
    document.head.appendChild(style);
    
    // Remove after animation completes
    setTimeout(() => {
        floatingHeart.remove();
        style.remove();
    }, duration * 1000);
}, 500);
