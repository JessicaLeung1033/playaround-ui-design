import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Hello Kitty SVG ───────────────────────────────────────────────────
function HelloKittySVG({ mood, size = 220 }) {
  const eyeY = mood === 'sleepy' ? 108 : 105
  const eyeShape = mood === 'sleepy'
    ? <>
        <ellipse cx="86" cy={eyeY} rx="8" ry="4" fill="#1a1a1a"/>
        <ellipse cx="134" cy={eyeY} rx="8" ry="4" fill="#1a1a1a"/>
      </>
    : mood === 'excited'
    ? <>
        <circle cx="86" cy={eyeY} r="9" fill="#1a1a1a"/>
        <circle cx="88" cy={eyeY-2} r="3" fill="white"/>
        <circle cx="134" cy={eyeY} r="9" fill="#1a1a1a"/>
        <circle cx="136" cy={eyeY-2} r="3" fill="white"/>
      </>
    : <>
        <circle cx="86" cy={eyeY} r="7" fill="#1a1a1a"/>
        <circle cx="88" cy={eyeY-2} r="2.5" fill="white"/>
        <circle cx="134" cy={eyeY} r="7" fill="#1a1a1a"/>
        <circle cx="136" cy={eyeY-2} r="2.5" fill="white"/>
      </>

  const noseColor = mood === 'sad' ? '#c08090' : '#FFB7C5'

  return (
    <svg width={size} height={size} viewBox="0 0 220 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 8px 24px rgba(255,105,180,0.25))'}}>
      {/* Ears */}
      <ellipse cx="62" cy="58" rx="28" ry="32" fill="white"/>
      <ellipse cx="62" cy="58" rx="16" ry="20" fill="#FFB7C5"/>
      <ellipse cx="158" cy="58" rx="28" ry="32" fill="white"/>
      <ellipse cx="158" cy="58" rx="16" ry="20" fill="#FFB7C5"/>

      {/* Head */}
      <ellipse cx="110" cy="118" rx="82" ry="78" fill="white"/>
      <ellipse cx="110" cy="118" rx="80" ry="76" fill="white"/>

      {/* Bow */}
      <g>
        <path d="M148 62 Q165 48 178 58 Q165 68 148 62Z" fill="#FF1744"/>
        <path d="M148 62 Q165 76 178 66 Q165 56 148 62Z" fill="#FF4569"/>
        <path d="M132 62 Q115 48 102 58 Q115 68 132 62Z" fill="#FF1744"/>
        <path d="M132 62 Q115 76 102 66 Q115 56 132 62Z" fill="#FF4569"/>
        <circle cx="140" cy="62" r="7" fill="#FF1744"/>
        <circle cx="140" cy="62" r="4" fill="#FF6384"/>
      </g>

      {/* Eyes */}
      <g style={{animation: 'blink 4s infinite'}}>
        {eyeShape}
      </g>

      {/* Nose */}
      <ellipse cx="110" cy="120" rx="6" ry="4" fill={noseColor}/>

      {/* Whiskers */}
      <line x1="40" y1="118" x2="95" y2="122" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="40" y1="128" x2="95" y2="128" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="40" y1="138" x2="95" y2="132" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="125" y1="122" x2="180" y2="118" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="125" y1="128" x2="182" y2="128" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="125" y1="132" x2="180" y2="138" stroke="#ccc" strokeWidth="1.5"/>

      {/* Body */}
      <ellipse cx="110" cy="200" rx="58" ry="28" fill="white"/>
      <rect x="52" y="178" width="116" height="32" rx="20" fill="white"/>

      {/* Overalls detail */}
      <ellipse cx="110" cy="188" rx="30" ry="18" fill="#FFD6E8"/>

      {/* Mood extra: zzz for sleepy */}
      {mood === 'sleepy' && <>
        <text x="165" y="90" fill="#aaa" fontSize="14" fontWeight="bold">z</text>
        <text x="178" y="76" fill="#bbb" fontSize="18" fontWeight="bold">z</text>
        <text x="194" y="58" fill="#ccc" fontSize="22" fontWeight="bold">Z</text>
      </>}
      {/* Mood extra: sparkles for excited */}
      {mood === 'excited' && <>
        <text x="20" y="80" fontSize="18">✨</text>
        <text x="185" y="95" fontSize="14">⭐</text>
      </>}
      {/* Mood extra: sweat for hungry */}
      {mood === 'hungry' && <>
        <ellipse cx="165" cy="98" rx="5" ry="8" fill="#a0d8ef" opacity="0.8"/>
        <ellipse cx="165" cy="104" rx="3" ry="5" fill="#7ec8e3" opacity="0.8"/>
      </>}
    </svg>
  )
}

// ─── Stat Bar ──────────────────────────────────────────────────────────
function StatBar({ label, value, color, icon }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:13, fontWeight:700, color:'#c2607a' }}>{icon} {label}</span>
        <span style={{ fontSize:12, fontWeight:600, color:'#d47a90' }}>{Math.round(value)}%</span>
      </div>
      <div style={{ background:'#ffd6e8', borderRadius:20, height:12, overflow:'hidden' }}>
        <div style={{
          width: `${value}%`,
          height:'100%',
          background: value > 60 ? color : value > 30 ? '#FFB347' : '#FF6B6B',
          borderRadius:20,
          transition:'width 0.6s ease',
          background: `linear-gradient(90deg, ${color}, ${color}cc)`
        }}/>
      </div>
    </div>
  )
}

// ─── Action Button ─────────────────────────────────────────────────────
function ActionBtn({ label, icon, onClick, disabled, color = '#FF69B4' }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={() => { if(!disabled) { setPressed(true); setTimeout(()=>setPressed(false),200); onClick(); }}}
      disabled={disabled}
      style={{
        padding:'10px 20px',
        borderRadius:30,
        border:'none',
        background: disabled ? '#f5c6d8' : `linear-gradient(135deg, ${color}, ${color}bb)`,
        color: disabled ? '#d4a0b0' : 'white',
        fontFamily:'Nunito',
        fontWeight:800,
        fontSize:14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: pressed ? 'scale(0.93)' : 'scale(1)',
        transition:'transform 0.1s, box-shadow 0.2s',
        boxShadow: disabled ? 'none' : '0 4px 14px rgba(255,105,180,0.35)',
        display:'flex', alignItems:'center', gap:6
      }}
    >{icon} {label}</button>
  )
}

// ─── Mini Game: Catch the Strawberries ──────────────────────────────────
const GAME_W = 420, GAME_H = 320
const ITEMS = ['🍓','🍰','🍭','🌸','⭐','🎀']

function MiniGame({ onClose, onWin }) {
  const [items, setItems] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameOver, setGameOver] = useState(false)
  const [caughtEffects, setCaughtEffects] = useState([])
  const nextId = useRef(0)
  const intervalRef = useRef(null)
  const timerRef = useRef(null)

  const spawnItem = useCallback(() => {
    const id = nextId.current++
    const x = Math.random() * (GAME_W - 60) + 10
    const emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)]
    setItems(prev => [...prev, { id, x, emoji, caught: false }])
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id))
    }, 2200)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(spawnItem, 700)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          clearInterval(timerRef.current)
          setGameOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { clearInterval(intervalRef.current); clearInterval(timerRef.current); }
  }, [])

  const catchItem = (id, x) => {
    setItems(prev => prev.map(i => i.id === id ? {...i, caught:true} : i))
    setScore(s => s + 1)
    const eid = nextId.current++
    setCaughtEffects(prev => [...prev, {id: eid, x}])
    setTimeout(() => setCaughtEffects(prev => prev.filter(e => e.id !== eid)), 600)
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 300)
  }

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(255,20,100,0.18)', backdropFilter:'blur(4px)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:100,
      animation:'slideUp 0.3s ease'
    }}>
      <div style={{
        background:'linear-gradient(160deg, #fff5f9, #ffe8f4)',
        borderRadius:28, padding:28, width: GAME_W+40,
        boxShadow:'0 20px 60px rgba(255,50,120,0.25)',
        border:'3px solid #FFB7C5'
      }}>
        {/* Header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
          <div style={{fontWeight:900, fontSize:18, color:'#e0457a'}}>🎮 Catch the Goodies!</div>
          <div style={{display:'flex', gap:16, alignItems:'center'}}>
            <span style={{fontWeight:800, color:'#FF69B4', fontSize:15}}>⭐ {score}</span>
            <span style={{fontWeight:800, color: timeLeft<6?'#ff3355':'#c2607a', fontSize:15}}>⏱ {timeLeft}s</span>
            <button onClick={onClose} style={{background:'#FFD6E8', border:'none', borderRadius:20, padding:'4px 12px', cursor:'pointer', fontWeight:700, color:'#e0457a'}}>✕</button>
          </div>
        </div>

        {/* Game area */}
        <div style={{
          width: GAME_W, height: GAME_H,
          background:'linear-gradient(180deg, #fff0f8, #ffd6e8)',
          borderRadius:20, position:'relative', overflow:'hidden',
          border:'2px solid #FFB7C5', cursor:'crosshair'
        }}>
          {/* Decorative bg dots */}
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{
              position:'absolute', borderRadius:'50%', background:'#FFD6E888',
              width: 30+i*10, height: 30+i*10,
              left: `${(i*137)%90}%`, top: `${(i*79)%80}%`,
              pointerEvents:'none'
            }}/>
          ))}

          {items.map(item => (
            <div key={item.id}
              onClick={() => !item.caught && catchItem(item.id, item.x)}
              style={{
                position:'absolute', left: item.x, top: -20,
                fontSize: 32, cursor: item.caught ? 'default' : 'pointer',
                animation: item.caught ? 'caught 0.3s ease forwards' : 'starFall 2.2s linear forwards',
                userSelect:'none', zIndex:2
              }}>{item.emoji}</div>
          ))}

          {caughtEffects.map(e => (
            <div key={e.id} style={{
              position:'absolute', left: e.x, top: 40,
              fontSize:20, pointerEvents:'none',
              animation:'heartPop 0.6s ease forwards'
            }}>✨</div>
          ))}

          {gameOver && (
            <div style={{
              position:'absolute', inset:0, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              background:'rgba(255,240,250,0.92)', borderRadius:20
            }}>
              <div style={{fontSize:60}}>{score >= 10 ? '🎀' : score >= 5 ? '⭐' : '🌸'}</div>
              <div style={{fontWeight:900, fontSize:24, color:'#e0457a', marginTop:8}}>
                {score >= 10 ? 'Amazing!' : score >= 5 ? 'Great job!' : 'Keep trying!'}
              </div>
              <div style={{fontWeight:700, fontSize:16, color:'#c2607a', marginTop:4}}>Score: {score} goodies caught!</div>
              <div style={{display:'flex', gap:12, marginTop:20}}>
                <button onClick={() => { onWin(score); onClose(); }} style={{
                  background:'linear-gradient(135deg,#FF69B4,#FF1744)', color:'white',
                  border:'none', borderRadius:25, padding:'10px 24px',
                  fontFamily:'Nunito', fontWeight:800, fontSize:14, cursor:'pointer',
                  boxShadow:'0 4px 14px rgba(255,50,100,0.4)'
                }}>Claim Reward 🎀</button>
                <button onClick={onClose} style={{
                  background:'#FFD6E8', color:'#e0457a',
                  border:'none', borderRadius:25, padding:'10px 24px',
                  fontFamily:'Nunito', fontWeight:800, fontSize:14, cursor:'pointer'
                }}>Close</button>
              </div>
            </div>
          )}
        </div>

        {!gameOver && (
          <div style={{textAlign:'center', marginTop:12, color:'#c2607a', fontSize:13, fontWeight:600}}>
            Click the falling goodies to catch them! 🍓
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Floating emoji effects ────────────────────────────────────────────
function FloatingEffect({ emoji, x, y }) {
  return (
    <div style={{
      position:'fixed', left: x, top: y, fontSize:28, pointerEvents:'none',
      animation:'heartPop 1s ease forwards', zIndex:200
    }}>{emoji}</div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────
function App() {
  const savedState = (() => {
    try { return JSON.parse(localStorage.getItem('hk-buddy') || '{}') } catch { return {} }
  })()

  const [hunger, setHunger] = useState(savedState.hunger ?? 72)
  const [happiness, setHappiness] = useState(savedState.happiness ?? 85)
  const [energy, setEnergy] = useState(savedState.energy ?? 60)
  const [showGame, setShowGame] = useState(false)
  const [effects, setEffects] = useState([])
  const [kittyAnim, setKittyAnim] = useState('float')
  const [message, setMessage] = useState("Hello! I'm so happy you're here! 🎀")
  const [xp, setXp] = useState(savedState.xp ?? 0)
  const [confetti, setConfetti] = useState([])
  const nextEff = useRef(0)

  // Derived mood
  const mood = energy < 25 ? 'sleepy' : hunger < 25 ? 'hungry' : happiness > 80 ? 'excited' : happiness < 35 ? 'sad' : 'happy'

  // Save state
  useEffect(() => {
    localStorage.setItem('hk-buddy', JSON.stringify({ hunger, happiness, energy, xp }))
  }, [hunger, happiness, energy, xp])

  // Slow stat decay
  useEffect(() => {
    const t = setInterval(() => {
      setHunger(h => Math.max(0, h - 0.4))
      setHappiness(hp => Math.max(0, hp - 0.2))
      setEnergy(e => Math.max(0, e - 0.3))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Auto message
  useEffect(() => {
    if (mood === 'hungry') setMessage("I'm so hungry... can you feed me? 🍓")
    else if (mood === 'sleepy') setMessage("I'm getting sleepy... zzz 💤")
    else if (mood === 'sad') setMessage("I feel lonely... play with me? 🥺")
    else if (mood === 'excited') setMessage("I'm SO happy right now! ✨")
  }, [mood])

  const spawnEffect = (emoji) => {
    const id = nextEff.current++
    const x = window.innerWidth/2 + (Math.random()-0.5)*120
    const y = window.innerHeight/2 - 60
    setEffects(prev => [...prev, {id, emoji, x, y}])
    setTimeout(() => setEffects(prev => prev.filter(e => e.id !== id)), 1000)
  }

  const spawnConfetti = () => {
    const items = [...Array(18)].map((_,i) => ({
      id: i, color: ['#FF69B4','#FFB7C5','#FF1744','#FFF','#FFD700'][i%5],
      x: Math.random()*100, delay: Math.random()*0.8
    }))
    setConfetti(items)
    setTimeout(() => setConfetti([]), 2500)
  }

  const feed = () => {
    if (hunger >= 98) { setMessage("I'm full! Thank you! 💕"); return }
    setHunger(h => Math.min(100, h+22))
    setHappiness(h => Math.min(100, h+8))
    setXp(x => x+5)
    setMessage("Yummy! That's delicious! 🍓")
    setKittyAnim('bounce')
    spawnEffect('🍓')
    setTimeout(()=>setKittyAnim('float'),1000)
  }

  const pet = () => {
    setHappiness(h => Math.min(100, h+18))
    setXp(x => x+3)
    setMessage("Purrrr... that feels so nice! 💕")
    setKittyAnim('wiggle')
    spawnEffect('💕')
    setTimeout(()=>setKittyAnim('float'),1200)
  }

  const sleep = () => {
    if (energy >= 98) { setMessage("I'm full of energy! Let's play! ✨"); return }
    setEnergy(e => Math.min(100, e+35))
    setMessage("Ahh, a nice nap! Feeling refreshed! 💤")
    spawnEffect('💤')
  }

  const handleWin = (score) => {
    const bonus = score * 3
    setHappiness(h => Math.min(100, h + 20 + bonus/5))
    setXp(x => x + bonus)
    setMessage(`That was SO fun! You caught ${score} goodies! 🎀`)
    setKittyAnim('bounce')
    spawnConfetti()
    spawnEffect('🎉')
    setTimeout(()=>setKittyAnim('float'),1500)
  }

  const level = Math.floor(xp / 50) + 1
  const xpPct = (xp % 50) / 50 * 100

  const moodLabels = {
    happy: '😊 Happy',
    hungry: '😣 Hungry',
    sleepy: '😴 Sleepy',
    excited: '🤩 Excited',
    sad: '🥺 Sad'
  }

  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'linear-gradient(135deg, #FFE8F4 0%, #FFF0FA 40%, #FFD6EC 100%)',
      position:'relative', overflow:'hidden', padding:20
    }}>
      {/* Background decoration */}
      {[...Array(12)].map((_,i) => (
        <div key={i} style={{
          position:'absolute', borderRadius:'50%',
          background: i%2===0 ? '#FFB7C515' : '#FF69B412',
          width: 80+i*40, height: 80+i*40,
          left:`${(i*83)%95}%`, top:`${(i*61)%90}%`,
          pointerEvents:'none'
        }}/>
      ))}

      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} style={{
          position:'fixed', left:`${c.x}%`, top:'-20px',
          width:10, height:10, background:c.color, borderRadius:2,
          animation:`confetti 2s ${c.delay}s ease forwards`,
          zIndex:150, pointerEvents:'none'
        }}/>
      ))}

      {/* Floating effects */}
      {effects.map(e => <FloatingEffect key={e.id} {...e}/>)}

      {/* Main card */}
      <div style={{
        background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)',
        borderRadius:36, padding:'32px 36px', maxWidth:480, width:'100%',
        boxShadow:'0 24px 60px rgba(255,80,140,0.18), 0 0 0 2px #FFD6E8',
        animation:'slideUp 0.5s ease', position:'relative', zIndex:1
      }}>
        {/* Title */}
        <div style={{textAlign:'center', marginBottom:6}}>
          <div style={{fontSize:26, fontWeight:900, color:'#e0457a', letterSpacing:'-0.5px'}}>
            🎀 Hello Kitty Buddy
          </div>
          <div style={{fontSize:12, color:'#d47a90', fontWeight:600}}>
            Level {level} Friend &nbsp;•&nbsp; XP: {xp} / {level*50}
          </div>
          {/* XP bar */}
          <div style={{background:'#FFD6E8', borderRadius:10, height:6, margin:'6px auto 0', width:'60%'}}>
            <div style={{width:`${xpPct}%`, height:'100%', background:'linear-gradient(90deg,#FF69B4,#FF1744)', borderRadius:10, transition:'width 0.6s'}}/>
          </div>
        </div>

        {/* Kitty */}
        <div style={{display:'flex', justifyContent:'center', margin:'18px 0 10px',
          animation: kittyAnim==='bounce' ? 'bounce 0.8s ease' : kittyAnim==='wiggle' ? 'wiggle 0.7s ease' : 'float 3s ease-in-out infinite'
        }}>
          <HelloKittySVG mood={mood} size={200}/>
        </div>

        {/* Speech bubble */}
        <div style={{
          background:'#FFF', borderRadius:20, padding:'10px 18px', margin:'0 auto 18px',
          maxWidth:320, textAlign:'center', position:'relative',
          boxShadow:'0 4px 14px rgba(255,100,160,0.14)', border:'2px solid #FFD6E8',
          fontSize:14, fontWeight:700, color:'#c2607a', lineHeight:1.4
        }}>
          {message}
          <div style={{
            position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
            width:0, height:0, borderLeft:'10px solid transparent',
            borderRight:'10px solid transparent', borderBottom:'10px solid #FFD6E8'
          }}/>
        </div>

        {/* Stats */}
        <div style={{background:'#fff5f9', borderRadius:20, padding:'16px 20px', marginBottom:18, border:'2px solid #FFE8F4'}}>
          <StatBar label="Hunger" value={hunger} color="#FF6B6B" icon="🍓"/>
          <StatBar label="Happiness" value={happiness} color="#FF69B4" icon="💕"/>
          <StatBar label="Energy" value={energy} color="#9B59B6" icon="⚡"/>
        </div>

        {/* Actions */}
        <div style={{display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center'}}>
          <ActionBtn label="Feed" icon="🍓" onClick={feed} color="#FF6B6B"/>
          <ActionBtn label="Pet" icon="💕" onClick={pet} color="#FF69B4"/>
          <ActionBtn label="Nap" icon="💤" onClick={sleep} color="#9B59B6"/>
          <ActionBtn label="Play!" icon="🎮" onClick={() => setShowGame(true)} color="#FF1744"/>
        </div>

        {/* Mood badge */}
        <div style={{textAlign:'center', marginTop:14}}>
          <span style={{
            background:'#FFD6E8', color:'#e0457a', borderRadius:20,
            padding:'4px 14px', fontSize:12, fontWeight:700
          }}>
            Mood: {moodLabels[mood]}
          </span>
        </div>
      </div>

      {showGame && <MiniGame onClose={() => setShowGame(false)} onWin={handleWin}/>}
    </div>
  )
}

export default App
