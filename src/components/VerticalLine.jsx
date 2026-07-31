const VerticalLine = ({ className = '', ...props }) => {
  return (
    <div 
        className={`w-px bg-neutral-200 ${className}`.trim()}
        {...props} 
    />
  )
}

export default VerticalLine;
