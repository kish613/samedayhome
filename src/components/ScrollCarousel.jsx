import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import { useState } from "react"

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
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/82_grange_sJHUDn_gnfawl.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972572/6_welland_sJHUDn_qebjhf.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972564/16_berryfield_2_sJHUDn_ii39ya.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972554/110_hillaries_sJHUDn_anrvh2.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972553/1_booth_sJHUDn_jlke5x.jpg",
    completionDays: 7
  }
]

const velocity = [0.3, -0.3]

function ScrollCarousel() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 py-12">
        {velocity.map((v, index) => (
          <div key={index} className="w-full">
            <ScrollVelocity velocity={v}>
            {images.map(({ title, thumbnail, completionDays }, imgIndex) => {
              const [isLoading, setIsLoading] = useState(true);
              
              return (
                <div
                  key={`image-${index}-${imgIndex}`}
                  className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] group"
                >
                  <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 bg-gray-200">
                    {/* Loading skeleton */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                    )}
                    
                    <img
                      src={thumbnail}
                      alt={title}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      onLoad={() => setIsLoading(false)}
                      onError={(e) => {
                        console.error(`Failed to load image: ${thumbnail}`);
                        setIsLoading(false);
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Cpath d="M150 100 L200 50 L250 100 L250 150 L150 150 Z" fill="%23d1d5db"/%3E%3Crect x="180" y="110" width="40" height="40" fill="%23e5e7eb"/%3E%3Ctext x="200" y="200" text-anchor="middle" font-family="Arial" font-size="14" fill="%239ca3af"%3EProperty Image%3C/text%3E%3C/svg%3E';
                        e.target.className = 'h-full w-full object-cover object-center';
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
              );
            })}
            </ScrollVelocity>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollCarousel