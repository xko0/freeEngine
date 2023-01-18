import React from 'react'
import Typography from '@mui/material/Typography';
import "./banner.css"

export default function Banner() {
  return (
    <section className="hero">
      <div className="content">
      <Typography variant="h2" sx={{fontFamily: 'monospace'}}>
        Free Engine
      </Typography>
      <Typography variant="body2" sx={{fontFamily: 'monospace'}}>
        Trouvez des freelances parmis toutes les marketplaces disponnibles. Facilement et au même endroit.
      </Typography>
      </div>
      <div className="waves"></div>
    </section>
  )
}
