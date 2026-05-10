import { easeInOut, motion } from 'framer-motion';
import React from 'react'

type Props = {
  data: any;
  language: string;
}

const TextData = ({data, language}: Props) => {
  const isPersian = language === 'fa';
  const fontH1 = isPersian ? 'font-titr' : 'font-monument';
  const fontH5 = isPersian ? 'font-vazirMatn' : 'font-inter';
  const xPosition = language === 'fa' ? -200 : 200;

  return (
    <div className="flex-1 flex flex-col justify-center max-md:text-center">
        <motion.div initial={{opacity:0, x:xPosition, scale:0.5}} animate={{opacity:1, x:0, scale:1}} transition={{duration:0.6, ease:easeInOut, type:"spring"}}>
          <h1 className={`text-6xl ${fontH1}`}>{data.h1}</h1>
        </motion.div>
        <motion.div initial={{opacity:0, x:xPosition, scale:0}} animate={{opacity:1, x:0, scale:1}} transition={{duration:0.6, delay:0.3, ease:easeInOut, type:"spring"}}>
          <h5 className={`mt-16 mb-4 text-xl ${fontH5}`}>{data.h5}</h5>
        </motion.div>
    </div>
  )
}

export default TextData