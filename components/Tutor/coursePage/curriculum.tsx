import React from 'react'
import Image from 'next/image';

const Curriculum = () => {
    const topics = [
        "Topic 1: (Topic Title)",
        "Topic 2: (Topic Title)",
        "Topic 3: (Topic Title)",
        "Topic 4: (Topic Title)",
        "Topic 5: (Topic Title)",
        "Topic 6: (Topic Title)",
        "Topic 7: (Topic Title)",
        "Topic 8: (Topic Title)",
      ];
  return (
    <div>
        {topics.map((topic, index) => (
          <div
            key={index}
            className="relative w-full bg-[#E7E8EA] px-8 pt-1 pb-7 "
          >
            <div
              className="relative w-full h-[90px] mt-10"
              style={{ backgroundImage: `url("/cake.svg")` }}
            >
              <div className="absolute inset-0 bg-[#1a1b1ab0] flex items-center justify-between px-4">
                <h1 className="text-white">{topic}</h1>
                <div className="flex items-center justify-center">
                  <div className="w-[100px] h-7 mr-5 bg-white flex items-center justify-center gap-2 font-semi-bold p-2">
                    <Image src="/pluss.svg" alt="plus" width={10} height={10} />
                    <h1 className="text-[15px]">Content</h1>
                  </div>
                  <Image src="/drop.svg" alt="plus" width={15} height={15} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Curriculum