import React, { useMemo } from 'react';
import './App.css';
import inikaPhoto from './Inika.PNG';

function App() {
  const confettiData = useMemo(() => {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa502', '#a29bfe', '#6c5ce7'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  return (
    <>
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

        <div className="photo-frame">
          <div className="photo-glow"></div>
          <img src={inikaPhoto} alt="Inika - Birthday Celebrant" className="birthday-photo" loading="eager" />
          <div className="photo-sparkles">
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
          </div>
        </div>

        <h1 className="title-main">HAPPY BIRTHDAY!</h1>
        <div className="name">Inika!</div>

        <div className="divider"></div>

        <p className="message">
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

        <div className="hearts-container">
          <span className="heart">🐱</span>
          <span className="heart">✨</span>
          <span className="heart">😺</span>
          <span className="heart">🎈</span>
          <span className="heart">🐾</span>
          <span className="heart">✨</span>
          <span className="heart">😸</span>
        </div>

        <p className="sparkle-line">
          You're literally the best! 💯
        </p>

        <div className="divider"></div>

        <p className="message">
          I hope your day is filled with:<br />
          🎂 All the cake you can eat<br />
          🎁 Amazing presents<br />
          😂 Non-stop laughter<br />
          🐱 And all the good vibes you deserve! 😺
        </p>

        <p className="message accent-text">
          🎊 Let's make this year absolutely EPIC! 🎊
        </p>

        <div className="divider"></div>

        <div className="special-section">
          <p className="special-title">What makes you special:</p>
          <div className="special-list">
            <div className="special-item">🐱 Your incredible energy</div>
            <div className="special-item">😺 Your amazing sense of humor</div>
            <div className="special-item">🐾 Your kindness and warmth</div>
            <div className="special-item">😸 Your ability to light up any room</div>
          </div>
        </div>

        <div className="divider"></div>

        <p className="message memory-text">
          Thank you for being such an incredible friend<br />
          and for all the amazing moments we've shared together! 🐱😺
        </p>

        <div className="signature">
          Have an amazing day, bestie! 🐱<br />
          <span className="signature-sub">Your forever friend 😺</span>
        </div>
      </div>
    </>
  );
}

export default App;

