const HorizontalLine = ({ className = '', ...props }) => {
  return (
    <div 
        className={`h-px bg-neutral-200 ${className}`.trim()}
        {...props} 
    />
  )
}

export default HorizontalLine;
