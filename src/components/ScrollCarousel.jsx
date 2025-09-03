import { ScrollVelocity } from "@/components/ui/scroll-velocity"

const images = [
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_113443_Original_ociqkl.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_145237_Original_jrwbhe.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_152032_Original_phjvgw.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972556/13_mount_st_sJHUDn_jm9joo.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1520637836862-4d197d17c973?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972562/39_meadowview_sJHUDn_uxczlk.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop&auto=format&q=80",
    completionDays: 7
  }
]

const velocity = [0.2, -0.2]

function ScrollCarousel() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 py-12">
        {velocity.map((v, index) => (
          <div key={index} className="w-full">
            <ScrollVelocity velocity={v}>
            {images.map(({ title, thumbnail, completionDays }, imgIndex) => (
              <div
                key={`image-${index}-${imgIndex}`}
                className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] group"
              >
                <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 bg-gray-200">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    onError={(e) => {
                      const fallbackImages = [
                        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop&auto=format&q=80",
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&auto=format&q=80",
                        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&auto=format&q=80",
                        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format&q=80",
                        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&h=400&fit=crop&auto=format&q=80"
                      ];
                      const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                      e.target.src = randomFallback;
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
            </ScrollVelocity>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollCarousel