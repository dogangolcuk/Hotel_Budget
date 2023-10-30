import React from 'react'

const SoftwareProperties = (props) => {
  // eslint-disable-next-line react/prop-types
  const { icon, title, description } = props
  return (
    <div className="price">
      <div className="service-icon">{icon}</div>
      <h5 className="mt-4">{title}</h5>
      <p>{description}</p>
      {/* <a href="#" className="custom-link">
        <span>Bilgi</span>
        <i>
          <ArrowRight />
        </i>
      </a> */}
    </div>
  )
}

export default SoftwareProperties
