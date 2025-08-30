import { useEffect, useRef, useState } from 'react';
import './Introduction.css';

class DigitWheel {
  private root: HTMLElement;
  private strip: HTMLElement;
  value: number;
  _animatingWrap: boolean = false;
  _justWrapped: boolean = false;

  constructor(root: HTMLElement, initial: number) {
    this.root = root;
    this.strip = root.querySelector('.strip')!;
    this.value = initial;  // Remove the modulo to keep exact value
    const frag = document.createDocumentFragment();
    // Create cells 0-9 plus an extra 0
    for (let i = 0; i <= 10; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = String(i % 10);
      frag.appendChild(cell);
    }
    this.strip.appendChild(frag);
    this.setTransition(false);
    this.updateTransform();
  }

  setTransition(enable: boolean) {
    this.strip.style.transition = enable ? `transform var(--speed) cubic-bezier(.2,.7,.2,1)` : 'none';
  }

  updateTransform() {
    const index = this._animatingWrap ? 10 : this.value;
    // Get the actual cell height instead of using the container height
    const cellHeight = this.strip.querySelector('.cell')?.clientHeight || this.root.clientHeight;
    console.log('Transform values:', { index, cellHeight, value: this.value });
    this.strip.style.transform = `translateY(${-index * cellHeight}px)`;
  }

  setSpeed(ms: number) {
    this.root.style.setProperty('--speed', ms + 'ms');
  }

  stepUp(): boolean {
    if (this.value === 9) {
      this._animatingWrap = true;
      this._justWrapped = true;
      this.value = 0;
    } else {
      this._animatingWrap = false;
      this.value += 1;
    }
    this.updateTransform();
    return this.value === 0;
  }
}

export interface IntroductionProps {
  onComplete: () => void;
}

export function Introduction({ onComplete }: IntroductionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const wheelsRef = useRef<DigitWheel[]>([]);
  const startYear = 2000;
  const endYear = new Date().getFullYear(); // Get current year (2025)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Calculate animation parameters
    const TOTAL_YEARS = endYear - startYear;
    const TOTAL_ANIMATION_TIME = 3000; // 3 seconds for the whole animation
    const MS_PER_YEAR = TOTAL_ANIMATION_TIME / TOTAL_YEARS;
    const HOLD_AT_END = prefersReduced ? 250 : 3500; // Longer pause at the end
    
    console.log('Animation setup:', {
      startYear,
      endYear,
      TOTAL_YEARS,
      MS_PER_YEAR,
      TOTAL_ANIMATION_TIME
    });

    // Initialize wheels after a short delay to ensure DOM is ready
    setTimeout(() => {
      const digits = document.querySelectorAll('.digit');
      if (digits.length !== 4) {
        console.error('Expected 4 digit elements, found:', digits.length);
        return;
      }
      // Force start at 2000
      const startDigits = String(startYear).split('').map(Number);
      console.log('Starting with digits:', startDigits);
      
      // Clear any existing content
      digits.forEach(digit => {
        const strip = digit.querySelector('.strip');
        if (strip) strip.innerHTML = '';
      });

      // Create new wheels
      wheelsRef.current = Array.from(digits).map((el, i) => {
        const wheel = new DigitWheel(el as HTMLElement, startDigits[i]);
        wheel.setTransition(false);
        wheel.updateTransform();
        requestAnimationFrame(() => wheel.setTransition(true));
        return wheel;
      });
      
      // Start animation only after wheels are initialized
      runSpinner();
    }, 100);

    let currentYear = startYear;
    let startTs: number | null = null;

    function easeInCubic(t: number) { return t * t * t; }

    function setSpeed() {
      wheelsRef.current.forEach(w => w.setSpeed(MS_PER_YEAR));
      return MS_PER_YEAR;
    }

    function incrementOnce() {
      // First check if we should increment
      if (currentYear >= endYear) {
        console.log('Preventing increment at year:', currentYear);
        return;
      }

      const wheels = wheelsRef.current;
      const nextYear = currentYear + 1;
      console.log('Incrementing to:', nextYear);

      // Set the digits directly for the next year
      const digits = String(nextYear).padStart(4, '0').split('').map(Number);
      wheels.forEach((wheel, i) => {
        wheel.value = digits[i];
        wheel.updateTransform();
      });
      
      currentYear = nextYear;
    }

    function finish() {
      const roller = document.getElementById('roller');
      if (roller) roller.classList.add('pulse');
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, HOLD_AT_END);
    }

    function runSpinner() {
      if (prefersReduced) {
        finish();
        return;
      }

      function tick() {
        if (currentYear >= endYear) {
          console.log('Finishing at year:', currentYear);
          finish();
          return;
        }

        const speed = setSpeed();
        console.log(`Year Check - Current: ${currentYear}, Next: ${currentYear + 1}, Target: ${endYear}, Speed: ${speed}ms`);
        
        incrementOnce();
        setTimeout(tick, speed);
      }
      requestAnimationFrame(tick);
    }

  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash grain" role="dialog" aria-modal="true" aria-label="Intro animation">
      <div className="ring" aria-hidden="true"></div>

      <div className="year-wrap" aria-live="polite" aria-label="Spinning year odometer">
        <div className="roller" id="roller" aria-hidden="false">
          <div className="digit" data-place="thousands"><div className="strip"></div></div>
          <div className="digit" data-place="hundreds"><div className="strip"></div></div>
          <div className="digit" data-place="tens"><div className="strip"></div></div>
          <div className="digit" data-place="ones"><div className="strip"></div></div>
        </div>
        <div className="label">Spinning up the timeline…</div>
      </div>

      <button className="skip btn" onClick={() => {
        setIsVisible(false);
        onComplete();
      }}>Skip</button>
    </div>
  );
}