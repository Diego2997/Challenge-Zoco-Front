export const Drawer = ({ children, open, isMobile, onClose }) => {
  return (
    <>
 
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm
          transition-all duration-300 ease-in-out z-50
          ${isMobile
            ? open
              ? "w-full translate-x-0" 
              : "w-full -translate-x-full"
            : open
            ? "w-60"
            : "w-16"
          }
        `}
      >
        {children}
      </div>
    </>
  );
};