import React from 'react'

const images = [
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_113443_Original_ociqkl.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721223/20221026_151152_Original_jl41gs.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_145237_Original_jrwbhe.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721223/20221025_154328_Original_ggbbyw.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20221026_151152_Original_1_nn5qc9.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_152032_Original_phjvgw.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972560/26_ashleigh_sJHUDn_fvqvaa.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972559/25_alexandra_sJHUDn_rxxl4s.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972557/19_iona_sJHUDn_q8hdsj.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972556/13_mount_st_sJHUDn_jm9joo.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972555/11_tara_court_sJHUDn_ygj6yl.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972562/39_meadowview_sJHUDn_uxczlk.jpg",
    completionDays: 7
  }
]

// CSS-based infinite scroll carousel component
function ScrollCarousel() {
  const CarouselRow = ({ direction, animationDuration = "60s" }) => (
    <div className="relative overflow-hidden whitespace-nowrap">
      <div 
        className={`inline-flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{ 
          animationDuration: animationDuration,
          willChange: 'transform'
        }}
      >
        {/* Render images twice for seamless loop */}
        {[...images, ...images].map(({ title, thumbnail, completionDays }, index) => (
          <div
            key={index}
            className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] group flex-shrink-0"
          >
            <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 bg-gray-200">
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${thumbnail}`);
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-base font-semibold mb-1 tracking-wide uppercase">{title}</h3>
                <p className="text-xs font-light tracking-wider">
                  {completionDays} days to complete
                </p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-orange-500/0 transition-all duration-300 group-hover:bg-orange-500/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 py-12">
        {/* First row - scrolling left */}
        <CarouselRow direction="left" animationDuration="80s" />
        
        {/* Second row - scrolling right */}
        <CarouselRow direction="right" animationDuration="70s" />
      </div>
    </div>
  )
}

export default ScrollCarousel