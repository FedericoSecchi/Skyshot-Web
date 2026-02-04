import { assetPath } from '../utils/assetPath'

function Hero() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 20, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <h1>Outdoor visuals, <span>from above</span>.</h1>
        <p>From shore, boat or sky. You focus on riding—we do the rest.</p>
        <div className="hero__cta">
          <a className="btn" href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} aria-label="Book a session">
            Book a session
          </a>
          <a className="link" href="#work" onClick={(e) => handleSmoothScroll(e, '#work')} aria-label="View selected work">
            See work ↗
          </a>
        </div>
      </div>
      <div className="hero__media">
        <video
          muted
          autoPlay
          playsInline
          loop
          preload="auto"
          className="hero__video"
        >
          <source src={assetPath('video/sequence-01.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default Hero
