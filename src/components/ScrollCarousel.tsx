import React from 'react'

const images = [
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_113443_Original_ociqkl.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/dji_mimo_20220913_124418_16_1663597550044_photo_jmswwh.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_145237_Original_jrwbhe.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754393933/32_edited_nas2lo.png",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/82_grange_sJHUDn_gnfawl.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_152032_Original_phjvgw.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/18_weston_ave_Ckrv5c_uc7irw.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043483/123_berridge_Ckrv5c_u6umll.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972556/13_mount_st_sJHUDn_jm9joo.jpg",
    completionDays: 7
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972566/68_stourbridge_sJHUDn_qvef0w.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972562/39_meadowview_sJHUDn_uxczlk.jpg",
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
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056402/2_lf47ji.jpg",
    completionDays: 6
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/dji_mimo_20220913_124418_16_1663597550044_photo_jmswwh.jpg",
    completionDays: 8
  },
  {
    title: "Recently Purchased",
    thumbnail: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754393933/32_edited_nas2lo.png",
    completionDays: 7
  }
]

export default function ScrollCarousel() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-12">
        {images.map(({ title, thumbnail, completionDays }, idx) => (
          <div
            key={`image-${idx}`}
            className="relative h-[10rem] w-[15rem] md:h-[12rem] md:w-[18rem] xl:h-[16rem] xl:w-[24rem] flex-shrink-0 group"
          >
            <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 bg-gray-200">
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  const fallbackImages = [
                    "https://res.cloudinary.com/dmns9ystn/image/upload/v1753869658/dji_mimo_20220913_124418_16_1663597550044_photo_jmswwh.jpg",
                    "https://res.cloudinary.com/dmns9ystn/image/upload/v1754393933/32_edited_nas2lo.png",
                    "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/82_grange_sJHUDn_gnfawl.jpg",
                    "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043485/18_weston_ave_Ckrv5c_uc7irw.jpg",
                    "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972574/5_bela_sJHUDn_ej77zi.jpg"
                  ];
                  const img = e.target as HTMLImageElement;
                  const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                  img.src = randomFallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-base font-semibold mb-1 tracking-wide uppercase">{title}</h3>
                <p className="text-xs font-light tracking-wider">{completionDays} days to complete</p>
              </div>
              <div className="absolute inset-0 bg-orange-500/0 transition-all duration-300 group-hover:bg-orange-500/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
