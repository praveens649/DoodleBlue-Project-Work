import React from 'react'

export function Spinner({ label = 'Loading' }) {
  return <span className="inline-flex items-center gap-2 text-sm text-muted" role="status"><span className="size-4 animate-spin rounded-full border-2 border-border border-t-brand motion-reduce:animate-none" aria-hidden="true" />{label}</span>
}
