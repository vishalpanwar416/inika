import React, { useMemo, useState, useEffect, useRef } from 'react';
import './App.css';
import inikaPhoto from './Inika.PNG';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [photoClicked, setPhotoClicked] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [burstConfetti, setBurstConfetti] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [pageEffect, setPageEffect] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [friendshipDays, setFriendshipDays] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isElevenEleven, setIsElevenEleven] = useState(false);

  const confettiData = useMemo(() => {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa502', '#a29bfe', '#6c5ce7'];
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  const starsData = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }));
  }, []);

  const shootingStarsData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: i * 3 + Math.random() * 2,
      duration: 1.5 + Math.random() * 1.5,
      angle: -45 + (Math.random() * 30 - 15), // Vary angle between -60 and -30 degrees
      distance: 300 + Math.random() * 200 // Vary distance
    }));
  }, []);

  const sparklesData = useMemo(() => {
    const cuteEmojis = ['🌸', '🌺', '🌼', '🌻', '🦋', '🌈', '💝', '🎀', '🍰', '🧁', '🍓', '🍒', '🌷', '💐', '🌹'];
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      shape: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 4,
      moveX: (Math.random() - 0.5) * 200, // Random horizontal movement
      moveY: (Math.random() - 0.5) * 200  // Random vertical movement
    }));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('transitioning', isTransitioning);
    document.body.classList.toggle('page-celebration', pageEffect);
  }, [isDarkMode, isTransitioning, pageEffect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let nextBirthday = new Date(now.getFullYear(), 10, 16); // November 16 (month is 0-indexed)

      if (now > nextBirthday) {
        nextBirthday = new Date(now.getFullYear() + 1, 10, 16);
      }

      const diff = nextBirthday - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate friendship days from October 25, 2024
  useEffect(() => {
    const friendshipStart = new Date('2024-10-25'); // October 25, 2024
    const now = new Date();
    const diffTime = Math.abs(now - friendshipStart);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setFriendshipDays(diffDays);
  }, []);

  // Welcome message with loading animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress <= 100) {
        setLoadingProgress(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowWelcome(false);
        }, 500);
      }
    }, 40); // 40ms * 50 = 2000ms for loading, then fade out

    return () => clearInterval(interval);
  }, []);

  // Update time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      setCurrentTime(timeString);
      setIsElevenEleven(timeString === '11:11');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = () => {
    setPhotoClicked(true);
    setPageEffect(true);

    // Generate floating hearts - reduced count for subtlety
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      left: 50 + (Math.random() - 0.5) * 40,
      animationDelay: i * 0.15
    }));
    setHearts(newHearts);

    // Generate confetti burst - fewer pieces, smaller size
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa502', '#a29bfe', '#6c5ce7', '#ff9ff3', '#54a0ff'];
    const newConfetti = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i + 1000,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (360 / 25) * i,
      velocity: 80 + Math.random() * 100,
      size: 5 + Math.random() * 5
    }));
    setBurstConfetti(newConfetti);

    setTimeout(() => {
      setPhotoClicked(false);
      setHearts([]);
      setBurstConfetti([]);
      setPageEffect(false);
    }, 2500);
  };

  const handlePhotoDoubleClick = () => {
    // Create fireworks effect
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa502', '#a29bfe', '#6c5ce7', '#ff9ff3', '#54a0ff', '#feca57'];
    const newFireworks = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i + 2000,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (360 / 60) * i,
      velocity: 150 + Math.random() * 100,
      size: 6 + Math.random() * 6
    }));
    setFireworks(newFireworks);

    setTimeout(() => {
      setFireworks([]);
    }, 2500);
  };

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 0);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday Inika!',
          text: 'Check out this special birthday card for Inika! 🎂🐱',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! 📋');
    }
  };

  const handleDownload = () => {
    // Take a screenshot using html2canvas would require library
    // For now, let's just open print dialog
    window.print();
  };


  return (
    <>
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-message">
            <div className="welcome-name-container">
              <span className="welcome-name-letter" style={{ animationDelay: '0s' }}>I</span>
              <span className="welcome-name-letter" style={{ animationDelay: '0.1s' }}>n</span>
              <span className="welcome-name-letter" style={{ animationDelay: '0.2s' }}>i</span>
              <span className="welcome-name-letter" style={{ animationDelay: '0.3s' }}>k</span>
              <span className="welcome-name-letter" style={{ animationDelay: '0.4s' }}>a</span>
              <span className="welcome-cat" style={{ animationDelay: '0.5s' }}>🐱</span>
            </div>
            <p className="welcome-subtitle">Loading your special day...</p>
            <div className="loading-container">
              <div className="loading-cats">
                <span className="loading-cat" style={{ animationDelay: '0s' }}>🐱</span>
                <span className="loading-cat" style={{ animationDelay: '0.2s' }}>😺</span>
                <span className="loading-cat" style={{ animationDelay: '0.4s' }}>😸</span>
                <span className="loading-cat" style={{ animationDelay: '0.6s' }}>🐾</span>
              </div>
              <div className="loading-bar-container">
                <div className="loading-bar" style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <p className="loading-percentage">{loadingProgress}%</p>
            </div>
          </div>
        </div>
      )}

      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {isDarkMode && (
        <>
          <div className={`time-display ${isElevenEleven ? 'eleven-eleven' : ''}`}>
            {currentTime}
            {isElevenEleven && <span className="wish-emoji">✨</span>}
          </div>
          <div className="moon"></div>
          <div className="stars-container" aria-hidden="true">
            {starsData.map((star) => (
              <div
                key={star.id}
                className="star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`
                }}
              ></div>
            ))}
            {shootingStarsData.map((shootingStar) => {
              const angleRad = (shootingStar.angle * Math.PI) / 180;
              const endX = shootingStar.distance * Math.cos(angleRad);
              const endY = shootingStar.distance * Math.sin(angleRad);
              return (
                <div
                  key={`shooting-${shootingStar.id}`}
                  className="shooting-star"
                  style={{
                    left: `${shootingStar.left}%`,
                    top: `${shootingStar.top}%`,
                    animationDelay: `${shootingStar.delay}s`,
                    animationDuration: `${shootingStar.duration}s`,
                    '--end-x': `${endX}px`,
                    '--end-y': `${endY}px`,
                    '--angle': `${shootingStar.angle}deg`
                  }}
                ></div>
              );
            })}
          </div>
        </>
      )}

      {!isDarkMode && (
        <div className="sparkles-container" aria-hidden="true">
          {sparklesData.map((sparkle) => (
            <div
              key={sparkle.id}
              className="day-sparkle"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                '--move-x': `${sparkle.moveX}px`,
                '--move-y': `${sparkle.moveY}px`
              }}
            >
              {sparkle.shape}
            </div>
          ))}
        </div>
      )}

      <div className="floating-elements" aria-hidden="true">
        <div className="float-item">🐱</div>
        <div className="float-item">✨</div>
        <div className="float-item">😺</div>
        <div className="float-item">🎊</div>
        <div className="float-item">💫</div>
        <div className="float-item">🐾</div>
        <div className="float-item">⭐</div>
        <div className="float-item">🎁</div>
        <div className="float-item">😸</div>
        <div className="float-item">🎂</div>
      </div>

      <div className="confetti-container" aria-hidden="true">
        {confettiData.map((confetti) => (
          <div
            key={confetti.id}
            className="confetti"
            style={{
              left: `${confetti.left}%`,
              animationDelay: `${confetti.delay}s`,
              animationDuration: `${confetti.duration}s`,
              backgroundColor: confetti.color
            }}
          ></div>
        ))}
      </div>

      <div className="container">
        <div className="cat-emoji cat-left">🐱</div>
        <div className="cat-emoji cat-right">😺</div>

        <div className={`photo-frame ${photoClicked ? 'photo-bounce' : ''}`} onClick={handlePhotoClick} onDoubleClick={handlePhotoDoubleClick}>
          <div className="photo-glow"></div>
          <img src={inikaPhoto} alt="Inika - Birthday Celebrant" className="birthday-photo" loading="eager" />
          <div className="photo-sparkles">
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
          </div>
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.animationDelay}s`
              }}
            >
              💖
            </div>
          ))}
          {burstConfetti.map((piece) => (
            <div
              key={piece.id}
              className="burst-confetti"
              style={{
                '--angle': `${piece.angle}deg`,
                '--velocity': `${piece.velocity}px`,
                '--size': `${piece.size}px`,
                backgroundColor: piece.color
              }}
            ></div>
          ))}
          {fireworks.map((piece) => (
            <div
              key={piece.id}
              className="firework"
              style={{
                '--angle': `${piece.angle}deg`,
                '--velocity': `${piece.velocity}px`,
                '--size': `${piece.size}px`,
                backgroundColor: piece.color
              }}
            ></div>
          ))}
        </div>

        <h1 className="title-main">HAPPY BIRTHDAY!</h1>
        <div className="name">Inika!</div>

        <div className="divider"></div>

        <div className={`friendship-badge reveal-section ${visibleSections.has(0) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[0] = el)}>
          <p className="friendship-text">
            🎊 {friendshipDays} Days of Amazing Friendship! 🎊
          </p>
        </div>

        <p className={`message reveal-section ${visibleSections.has(1) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[1] = el)}>
          <span className="emoji-decoration">🐱</span>
          Yo bestie! Another year older, another year cooler!
          <span className="emoji-decoration">😺</span><br />
          <br />
          It's been more than a year of our friendship,<br />
          and every moment has been absolutely incredible! 🐾<br />
          <br />
          You're honestly one of the most amazing people I know,<br />
          and I'm so lucky to have you as my best friend! 😸<br />
          <br />
          Can't wait to see what amazing things<br />
          this year has in store for you! 🎊
        </p>

        <div className={`hearts-container reveal-section ${visibleSections.has(2) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[2] = el)}>
          <span className="heart">🐱</span>
          <span className="heart">✨</span>
          <span className="heart">😺</span>
          <span className="heart">🎈</span>
          <span className="heart">🐾</span>
          <span className="heart">✨</span>
          <span className="heart">😸</span>
        </div>

        <p className={`sparkle-line reveal-section ${visibleSections.has(3) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[3] = el)}>
          You're literally the best! 💯
        </p>

        <div className="divider"></div>

        <p className={`message reveal-section ${visibleSections.has(4) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[4] = el)}>
          I hope your day is filled with:<br />
          🎂 All the cake you can eat<br />
          🎁 Amazing presents<br />
          😂 Non-stop laughter<br />
          🐱 And all the good vibes you deserve! 😺
        </p>

        <p className={`message accent-text reveal-section ${visibleSections.has(5) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[5] = el)}>
          🎊 Let's make this year absolutely EPIC! 🎊
        </p>

        <div className="divider"></div>

        <div className={`special-section reveal-section ${visibleSections.has(6) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[6] = el)}>
          <p className="special-title">What makes you special:</p>
          <div className="special-list">
            <div className="special-item">🐱 Your incredible energy</div>
            <div className="special-item">😺 Your amazing sense of humor</div>
            <div className="special-item">🐾 Your kindness and warmth</div>
            <div className="special-item">😸 Your ability to light up any room</div>
          </div>
        </div>

        <div className="divider"></div>

        <div className={`surprise-section reveal-section ${visibleSections.has(7) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[7] = el)}>
          <p className="surprise-title">💝 A Little Surprise for You 💝</p>
          <p className="surprise-message">
            Today isn't just about celebrating another year,<br />
            it's about celebrating YOU - the amazing person you are!<br />
            <br />
            Every laugh, every adventure, every moment with you<br />
            has made my life so much brighter! 🌟<br />
            <br />
            Here's to another year of being absolutely incredible! 🎉
          </p>
        </div>

        <div className="divider"></div>

        <p className={`message memory-text reveal-section ${visibleSections.has(8) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[8] = el)}>
          Thank you for being such an incredible friend<br />
          and for all the amazing moments we've shared together! 🐱😺
        </p>

        <div className={`signature reveal-section ${visibleSections.has(9) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[9] = el)}>
          Have an amazing day, bestie! 🐱<br />
          <span className="signature-sub">Your forever friend 😺</span>
        </div>

        <div className={`countdown-container reveal-section ${visibleSections.has(10) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[10] = el)}>
          <p className="countdown-title">Next Birthday Countdown 🎂</p>
          <div className="countdown-boxes">
            <div className="countdown-box">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{countdown.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{countdown.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{countdown.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>

        <div className={`action-buttons reveal-section ${visibleSections.has(9) ? 'visible' : ''}`} ref={(el) => (sectionRefs.current[9] = el)}>
          <button className="action-button share-button" onClick={handleShare}>
            <span className="button-icon">📤</span>
            Share Card
          </button>
          <button className="action-button download-button" onClick={handleDownload}>
            <span className="button-icon">🖨️</span>
            Print Card
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

