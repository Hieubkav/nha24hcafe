// "use client";

// import React, { useState } from 'react';
// import Image from "next/image";
// import { motion, AnimatePresence, easeOut } from 'framer-motion';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import cafeData from "../../../../../data/nha24h.json";

// const getPublicImage = (image: { local: string; alt: string; role: string; name: string }) => {
//     if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
//     return `/nha24h/${image.name}`;
// };

// const fadeInUp = { 
//     initial: { opacity: 0, y: 30 }, 
//     whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } 
// };

// const staggerContainer = { 
//     whileInView: { transition: { staggerChildren: 0.1 } } 
// };

// const SpacesSection = () => {
//     const spaceImages = {
//         meet: cafeData.images.find(img => img.name === "khong-gian-chinh-cau-thang-01.jpg"),
//         study: cafeData.images.find(img => img.name === "khu-may-tinh-va-tu-do-01.jpg"),
//         relax: cafeData.images.find(img => img.name === "tran-den-va-cay-xanh-01.jpg"),
//     }
    
//     const [activeTab, setActiveTab] = useState("study");
    
//     return (
//         <motion.section 
//             id="spaces" 
//             className="bg-zinc-950 py-24 sm:py-32"
//             initial="initial"
//             whileInView="whileInView"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={staggerContainer}
//         >
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//                 <motion.div 
//                     className="mx-auto max-w-2xl lg:text-center" 
//                     variants={fadeInUp}
//                 >
//                     <h2 className="text-base font-semibold leading-7 text-amber-400">KHÔNG GIAN ĐA DẠNG</h2>
//                     <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
//                         Mỗi Góc Nhỏ, Một Trải Nghiệm
//                     </p>
//                 </motion.div>
                
//                 <motion.div variants={fadeInUp}>
//                     <Tabs 
//                         defaultValue={activeTab} 
//                         onValueChange={setActiveTab} 
//                         className="mt-16"
//                     >
//                         <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-zinc-900/80 border-zinc-800">
//                             <TabsTrigger value="study" className="data-[state=inactive]:text-neutral-400">
//                                 Góc Học Tập
//                             </TabsTrigger>
//                             <TabsTrigger value="meet" className="data-[state=inactive]:text-neutral-400">
//                                 Phòng Họp
//                             </TabsTrigger>
//                             <TabsTrigger value="relax" className="data-[state=inactive]:text-neutral-400">
//                                 Góc Thư Giãn
//                             </TabsTrigger>
//                         </TabsList>
                        
//                         <div className="mt-8 relative overflow-hidden">
//                             <AnimatePresence mode="wait">
//                                 <motion.div 
//                                     key={activeTab} 
//                                     initial={{ opacity: 0, x: 20 }} 
//                                     animate={{ opacity: 1, x: 0 }} 
//                                     exit={{ opacity: 0, x: -20 }} 
//                                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                                 >
//                                     {activeTab === "study" && spaceImages.study && (
//                                         <SpaceTabContent 
//                                             image={spaceImages.study} 
//                                             title="Góc Học Tập & Làm Việc" 
//                                             description="Khu vực bàn dài lý tưởng cho việc học nhóm hoặc làm việc độc lập, với đầy đủ ánh sáng và không gian yên tĩnh." 
//                                         />
//                                     )}
//                                     {activeTab === "meet" && spaceImages.meet && (
//                                         <SpaceTabContent 
//                                             image={spaceImages.meet} 
//                                             title="Phòng Họp Chuyên Nghiệp" 
//                                             description="Phòng họp riêng tư, miễn phí, được trang bị đầy đủ để buổi thảo luận của bạn diễn ra hiệu quả nhất." 
//                                         />
//                                     )}
//                                     {activeTab === "relax" && spaceImages.relax && (
//                                         <SpaceTabContent 
//                                             image={spaceImages.relax} 
//                                             title="Góc Thư Giãn Ấm Cúng" 
//                                             description="Nơi bạn có thể thả mình trên những chiếc ghế sofa êm ái, đọc sách hoặc trò chuyện cùng bạn bè." 
//                                         />
//                                     )}
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>
//                     </Tabs>
//                 </motion.div>
//             </div>
//         </motion.section>
//     )
// }

// const SpaceTabContent = ({ 
//     image, 
//     title, 
//     description 
// }: { 
//     image: { local: string; alt: string; role: string; name: string }, 
//     title: string, 
//     description: string 
// }) => (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//         <div className="relative h-96 lg:h-[450px] w-full rounded-xl overflow-hidden yellow-edge-effect">
//             <Image 
//                 src={getPublicImage(image)} 
//                 alt={image.alt} 
//                 fill 
//                 className="object-cover" 
//             />
//         </div>
//         <div className="text-white">
//             <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
//             <p className="mt-4 text-lg text-neutral-300">{description}</p>
//         </div>
//     </div>
// )

// export default SpacesSection;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import cafeData from "../../../../../data/nha24h.json";

const getPublicImage = (image: { local: string; alt: string; role: string; name: string }) => {
  if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
  return `/nha24h/${image.name}`;
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = { whileInView: { transition: { staggerChildren: 0.1 } } };

const SpacesSection = () => {
  const spaceImages = {
    meet: cafeData.images.find((img) => img.name === "khong-gian-chinh-cau-thang-01.jpg"),
    study: cafeData.images.find((img) => img.name === "khu-may-tinh-va-tu-do-01.jpg"),
    relax: cafeData.images.find((img) => img.name === "tran-den-va-cay-xanh-01.jpg"),
  };

  const [activeTab, setActiveTab] = useState<"study" | "meet" | "relax">("study");

  return (
    <motion.section
      id="spaces"
      className="bg-zinc-950 py-24 sm:py-32"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div className="mx-auto max-w-2xl lg:text-center" variants={fadeInUp}>
          <h2 className="text-base font-semibold leading-7 text-amber-400">KHÔNG GIAN ĐA DẠNG</h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Mỗi Góc Nhỏ, Một Trải Nghiệm
          </p>
        </motion.div>

        {/* isolate để z-index hoạt động tách biệt, TabsList nổi hẳn lên */}
        <motion.div variants={fadeInUp} className="mt-16 relative isolate">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="relative isolate"
          >
            <TabsList
              className="relative z-50 grid w-full grid-cols-1 sm:grid-cols-3
                         bg-zinc-900/80 border-zinc-800 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
            >
              <TabsTrigger value="study" className="data-[state=inactive]:text-neutral-400">
                Góc Học Tập
              </TabsTrigger>
              <TabsTrigger value="meet" className="data-[state=inactive]:text-neutral-400">
                Phòng Họp
              </TabsTrigger>
              <TabsTrigger value="relax" className="data-[state=inactive]:text-neutral-400">
                Góc Thư Giãn
              </TabsTrigger>
            </TabsList>

            <div className="mt-16 md:mt-8 relative z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {activeTab === "study" && spaceImages.study && (
                    <SpaceTabContent
                      image={spaceImages.study}
                      title="Góc Học Tập & Làm Việc"
                      description="Khu vực bàn dài lý tưởng cho việc học nhóm hoặc làm việc độc lập, với đầy đủ ánh sáng và không gian yên tĩnh."
                    />
                  )}
                  {activeTab === "meet" && spaceImages.meet && (
                    <SpaceTabContent
                      image={spaceImages.meet}
                      title="Phòng Họp Chuyên Nghiệp"
                      description="Phòng họp riêng tư, miễn phí, được trang bị đầy đủ để buổi thảo luận của bạn diễn ra hiệu quả nhất."
                    />
                  )}
                  {activeTab === "relax" && spaceImages.relax && (
                    <SpaceTabContent
                      image={spaceImages.relax}
                      title="Góc Thư Giãn Ấm Cúng"
                      description="Nơi bạn có thể thả mình trên những chiếc ghế sofa êm ái, đọc sách hoặc trò chuyện cùng bạn bè."
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.section>
  );
};

const SpaceTabContent = ({
  image,
  title,
  description,
}: {
  image: { local: string; alt: string; role: string; name: string };
  title: string;
  description: string;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
    {/* wrapper ảnh: không bắt pointer ở mobile để không “đè” tab */}
    <div
      className="relative w-full overflow-hidden rounded-xl yellow-edge-effect
                 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[450px]
                 z-10 pointer-events-none sm:pointer-events-auto"
    >
      <Image
        src={getPublicImage(image)}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>

    <div className="text-white">
      <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 text-lg text-neutral-300">{description}</p>
    </div>
  </div>
);

export default SpacesSection;
