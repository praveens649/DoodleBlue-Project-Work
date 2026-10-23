import React from 'react'

export function PageContainer({ className = '', ...props }) {
  return <div className={`page-container ${className}`} {...props} />
}
