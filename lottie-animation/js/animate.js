 
//  set container varable for animation
 let animatedMonster = document.getElementById("animatedMonster");

//  let toggle = 0;

//  load in animation with lottie
 let monster =
    bodymovin.loadAnimation({
          container: animatedMonster,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: "https://lottie.host/c9c56251-2e2b-4d9b-b935-3422493c39d0/unrUfGW0lq.json"
        });

        // animated monster
            // excited frames
        animatedMonster.addEventListener("click", function() {
            monster.playSegments([30,70], true);
        });

            // sad frames
        animatedMonster.addEventListener("mouseleave", function() {
            monster.playSegments([105,220], true);
        });

            // shrug
        animatedMonster.addEventListener("mouseenter", function() {
             monster.playSegments([240,300], true);
         });

        // event listener for toggle
        varable1.addEventListener('click', function() {
            if( c == 0 ) {
              VARIABLENAME.playSegments([1,60], true);
              c = c + 1;
      
            } else {
              VARIABLENAME.playSegments([80,120], true);
              c = 0;
            }
         });