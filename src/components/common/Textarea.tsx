type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
import React from 'react'

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`block rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100 ${
        className || ''
      }`}
      {...props}
    ></textarea>
  )
})
