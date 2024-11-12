import './Loader.css'

const Loader = () => {
  return (
    <div className="loader w-full fixed h-full top-0 left-0 z-50 bg-dimBlack bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin" />
    </div>
  )
}

export default Loader