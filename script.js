   
        // --- Anti-Inspect Script ---
        // Disables right-clicking to prevent context menu.
       // document.addEventListener('contextmenu', event => event.preventDefault());

        // Disables common keyboard shortcuts for developer tools.
       // document.addEventListener('keydown', event => {
          //  if (event.keyCode == 123) { // F12
              //  event.preventDefault();
           // } else if (event.ctrlKey && event.shiftKey && event.key === 'I') { // Ctrl+Shift+I
              //  event.preventDefault();
           // } else if (event.ctrlKey && event.shiftKey && event.key === 'J') { // Ctrl+Shift+J
             //   event.preventDefault();
           // } else if (event.ctrlKey && event.key === 'U') { // Ctrl+U
             //   event.preventDefault();
          //  }
      //  });


        // --- Mouse Glow Effect Script ---
        // Self-executing function to avoid polluting the global scope.
        (() => {
            const devCursor = document.getElementById('developer-cursor');
            const glowCursor = document.getElementById('glow-cursor');

            // Don't run the script if the elements aren't on the page.
            if (!devCursor || !glowCursor) return;

            // Center the developer cursor initially.
            const cursorWidth = devCursor.offsetWidth;
            const cursorHeight = devCursor.offsetHeight;

            // Update positions on mouse move.
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    // The developer cursor has a slight delay handled by CSS.
                    devCursor.style.left = `${e.clientX - cursorWidth / 2}px`;
                    devCursor.style.top = `${e.clientY - cursorHeight / 2}px`;
                    
                    // The glow cursor has a more noticeable delay.
                    glowCursor.style.left = `${e.clientX}px`;
                    glowCursor.style.top = `${e.clientY}px`;
                });
            }, { passive: true }); // Performance optimization

            // Add click animation class on mouse down.
            document.addEventListener('mousedown', () => {
                devCursor.classList.add('clicked');
            });

            // Remove click animation class on mouse up.
            document.addEventListener('mouseup', () => {
                devCursor.classList.remove('clicked');
            });
        })();
    






        // --- Floating WhatsApp Button Script ---

          document.addEventListener("DOMContentLoaded", () => {
    // Check if GSAP is loaded
    if (window.gsap) {
      const btn = ".floating-whatsapp-btn";
      
      // 1. Initial "pop-in" animation
      gsap.to(btn, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 1.5 // Wait 1.5s after page load
      });

      // 2. Subtle pulse animation timeline
      const pulseTimeline = gsap.timeline({ 
        repeat: -1, // Repeat indefinitely
        repeatDelay: 4, // Wait 4 seconds between each pulse
        delay: 3 // Start this animation 3s after page load
      });
      
      pulseTimeline.to(btn, { 
        scale: 1.1, 
        duration: 0.3,
        ease: "power1.inOut" 
      })
      .to(btn, { 
        scale: 1, 
        duration: 0.3,
        ease: "power1.inOut"
      })
      .to(btn, { 
        scale: 1.1, 
        duration: 0.3,
        ease: "power1.inOut",
        delay: 0.1
      })
      .to(btn, { 
        scale: 1, 
        duration: 0.3,
        ease: "power1.inOut"
      });

    } else {
      // Fallback if GSAP isn't loaded: just show the button
      const btnEl = document.querySelector(".floating-whatsapp-btn");
      if (btnEl) {
        btnEl.style.opacity = "1";
        btnEl.style.transform = "scale(1)";
      }
    }
  });



  
  
// --- About Section Animation Script ---

(function() {
    'use strict';
    
    function initAboutAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') {
            console.error('GSAP libraries not loaded');
            return;
        }

        gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, ScrambleTextPlugin);

        // Custom eases for premium feel
        CustomEase.create("smooth", "0.4, 0, 0.2, 1");
        CustomEase.create("bounce", "0.68, -0.55, 0.265, 1.55");

        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        const imageColumn = aboutSection.querySelector('.image-column');
        const drawPath = aboutSection.querySelector('#draw-path');
        const subtitle = aboutSection.querySelector('#about-subtitle');
        const title = aboutSection.querySelector('#about-title');
        const description = aboutSection.querySelector('#about-description');
        const statsGrid = aboutSection.querySelector('.stats-grid');
        const statItems = aboutSection.querySelectorAll('.stat-item');
        const floatingShapes = aboutSection.querySelectorAll('.floating-shape');

        let titleSplit, descriptionSplit;
        let animationStarted = false;
        let flashInterval;

        // Random Word Flash Effect - Ultra Fast & Working
        function startRandomWordFlash() {
            if (!description) return;
            
            const originalHTML = description.innerHTML;
            
            function getTextNodes(node) {
                const textNodes = [];
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
                let currentNode;
                while (currentNode = walker.nextNode()) {
                    if (currentNode.textContent.trim()) {
                        textNodes.push(currentNode);
                    }
                }
                return textNodes;
            }
            
            function flashWord() {
                // Get all text content
                const textNodes = getTextNodes(description);
                const allWords = [];
                
                textNodes.forEach(node => {
                    const words = node.textContent.trim().split(/\s+/);
                    words.forEach(word => {
                        if (word.length > 5 && !['years', 'experience', 'website', 'websites', 'clients'].includes(word.toLowerCase())) {
                            allWords.push(word);
                        }
                    });
                });
                
                if (allWords.length === 0) return;
                
                const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                const currentHTML = description.innerHTML;
                
                // Create regex that matches the word
                const regex = new RegExp(`\\b(${randomWord})\\b`, 'i');
                const flashedHTML = currentHTML.replace(regex, '<span class="word-flash">$1</span>');
                
                description.innerHTML = flashedHTML;
                
                setTimeout(() => {
                    description.innerHTML = originalHTML;
                }, 350);
            }
            
            // Initial rapid sequence
            const timings = [200, 450, 750, 1100, 1500, 1950];
            timings.forEach(time => {
                setTimeout(flashWord, time);
            });
            
            // Continue with regular intervals
            setTimeout(() => {
                flashInterval = setInterval(flashWord, Math.random() * 2000 + 1800);
            }, 2500);
        }

        // Main Animation Timeline
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 65%',
                toggleActions: 'play none none none',
                onEnter: function() {
                    if (animationStarted) return;
                    animationStarted = true;
                    
                    if (!titleSplit && title) {
                        titleSplit = new SplitText(title, { type: "chars", charsClass: "char" });
                        
                        // Find and style ONLY the 'O' in "Rejaul"
                        const titleText = title.textContent;
                        const RejaulMatch = titleText.match(/Rejaul/i);
                        
                        if (RejaulMatch) {
                            const RejaulStartIndex = RejaulMatch.index;
                            const RejaulEndIndex = RejaulStartIndex + 6; // Length of "Rejaul"
                            
                            let charCount = 0;
                            titleSplit.chars.forEach((char) => {
                                const charText = char.textContent;
                                // Skip whitespace in counting
                                if (charText.trim() === '') return;
                                
                                // Check if this character is within Rejaul range and is 'O'
                                if (charText.toUpperCase() === 'O' && 
                                    charCount >= RejaulStartIndex && 
                                    charCount < RejaulEndIndex) {
                                    char.classList.add('special-o-border');
                                }
                                charCount++;
                            });
                        }
                    }
                    
                    if (!descriptionSplit && description) {
                        descriptionSplit = new SplitText(description, { type: "lines", linesClass: "line" });
                    }
                    
                    startAnimations();
                    
                    // Start flash effect immediately after description reveals
                    setTimeout(startRandomWordFlash, 2500);
                }
            }
        });

        function startAnimations() {
            const tl = gsap.timeline();

            // 1. Floating shapes intro
            tl.to(floatingShapes, {
                duration: 2,
                opacity: 0.12,
                scale: 1,
                ease: 'power2.out',
                stagger: 0.3
            }, 0);

            // Continuous floating
            floatingShapes.forEach((shape, i) => {
                gsap.to(shape, {
                    y: i % 2 === 0 ? 40 : -40,
                    x: i % 2 === 0 ? -20 : 20,
                    duration: 5 + i,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true
                });
            });

            // 2. Image reveal with 3D rotation
            tl.to(imageColumn, {
                duration: 1.8,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                ease: 'smooth'
            }, 0.2);

            // 3. SVG border draw (using DrawSVGPlugin)
            tl.fromTo(drawPath, 
                { drawSVG: "0%" },
                { 
                    drawSVG: "100%",
                    duration: 3,
                    ease: 'power1.inOut'
                }, 0.5);

            // 4. Subtitle with scramble effect
            tl.to(subtitle, {
                duration: 1,
                opacity: 1,
                x: 0,
                ease: 'bounce'
            }, 1);

            // Optional: Scramble subtitle text
            if (ScrambleTextPlugin) {
                tl.to(subtitle, {
                    duration: 0.8,
                    scrambleText: {
                        text: subtitle.textContent,
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        revealDelay: 0.3
                    }
                }, 1.2);
            }

            // 5. Title characters cascade
            if (titleSplit && titleSplit.chars) {
                tl.to(titleSplit.chars, {
                    duration: 1.4,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    ease: 'expo.out',
                    stagger: {
                        each: 0.025,
                        from: "start"
                    }
                }, 1.5);
            }

            // 6. Description lines reveal
            if (descriptionSplit && descriptionSplit.lines) {
                descriptionSplit.lines.forEach((line, i) => {
                    const inner = line.children[0];
                    if (inner) {
                        tl.to(inner, {
                            duration: 1.2,
                            opacity: 1,
                            y: '0%',
                            ease: 'smooth'
                        }, 2 + (i * 0.12));
                    }
                });
            }

            // 7. Stats grid entrance with enhanced visibility
            tl.to(statsGrid, {
                duration: 1.2,
                opacity: 1,
                y: 0,
                ease: 'power2.out'
            }, 2.5);

            // 8. Individual stat items with 3D flip effect
            tl.from(statItems, {
                duration: 1.2,
                y: 80,
                opacity: 0,
                scale: 0.7,
                rotationX: -60,
                transformOrigin: "center bottom",
                stagger: {
                    each: 0.2,
                    ease: "back.out(1.7)"
                },
                ease: 'expo.out',
                clearProps: "all" // Clear transforms after animation
            }, 2.8);

            // 9. Animated counters with enhanced effects
            statItems.forEach((item, i) => {
                const numberEl = item.querySelector('.stat-number');
                const labelEl = item.querySelector('.stat-label');
                const target = parseInt(numberEl.getAttribute('data-target'));
                const hasSuffix = numberEl.textContent.includes('+');
                
                // Ensure visibility
                gsap.set([numberEl, labelEl], { opacity: 1, visibility: 'visible' });
                
                // Counter animation with random variation
                tl.to({value: 0}, {
                    duration: 2.8,
                    value: target,
                    ease: 'expo.out',
                    onUpdate: function() {
                        const val = Math.floor(this.targets()[0].value);
                        numberEl.textContent = hasSuffix ? val + '+' : val;
                    },
                    onComplete: function() {
                        // Final pulse effect
                        gsap.to(numberEl, {
                            scale: 1.1,
                            duration: 0.3,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.inOut'
                        });
                    }
                }, 3.3 + (i * 0.2));
                
                // Label fade in
                tl.from(labelEl, {
                    duration: 0.8,
                    opacity: 0,
                    y: 10,
                    ease: 'power2.out'
                }, 3.5 + (i * 0.2));
            });
        }

        // Parallax on scroll
        gsap.to(imageColumn, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            },
            y: -60,
            ease: 'none'
        });

        // Magnetic hover on image (desktop)
        if (window.innerWidth > 992) {
            const wrapper = imageColumn.querySelector('.about-image-wrapper');
            const img = wrapper.querySelector('.about-image');
            
            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                
                gsap.to(img, {
                    duration: 0.5,
                    x: x * 15,
                    y: y * 15,
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });
            
            wrapper.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'elastic.out(1, 0.4)'
                });
            });
        }

        // Cleanup
        window.addEventListener('beforeunload', () => {
            if (flashInterval) clearInterval(flashInterval);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAboutAnimation);
    } else {
        initAboutAnimation();
    }
})();




// --- Contact Form Submission Script ---

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending...';

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = 'Thanks! Your message has been sent.';
      statusEl.style.color = '#10b981';
    } else {
      const data = await res.json().catch(()=> ({}));
      statusEl.textContent = data.errors
        ? data.errors.map(e=>e.message).join(', ')
        : 'Oops! Something went wrong.';
      statusEl.style.color = '#ef4444';
    }
  } catch (_) {
    statusEl.textContent = 'Network error. Please try again.';
    statusEl.style.color = '#ef4444';
  }
});





// Back-to-top visibility + action
// (function () {
//   const btn = document.getElementById('backToTop');
//   if (!btn) return;

//   const toggle = () => {
//     if (window.scrollY > 400) btn.classList.add('show');
//     else btn.classList.remove('show');
//   };
//   window.addEventListener('scroll', toggle, { passive: true });
//   toggle();

//   btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
// })();


