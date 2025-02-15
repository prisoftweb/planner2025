import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Chip from '../providers/Chip';

import { ITimeLineProject } from '@/interfaces/Projects';

export default function TimelineComponent({timeLine}: {timeLine: ITimeLineProject[]}) {
  console.log('time line => ', timeLine);

  return(
    <ol className="relative border-s border-gray-400 dark:border-gray-700 ml-10">                  
        {timeLine.map((t) => (
          <li className="mb-10 ms-6" key={t._id}>            
            <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img className="rounded-full shadow-lg" src={t.conditionstatus?.user?.photo || '/img/users/default.jpg' } alt="user"/>
            </span>
            {/* <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex dark:bg-gray-700 dark:border-gray-600"> */}
            <div className="items-center justify-between px-10 bg-white dark:bg-gray-700 dark:border-gray-600">
              {/* <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Bonnie moved <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">Funny Group</span></div> */}
              <Chip label={t.conditionstatus.condition.name} color={t.conditionstatus.condition.color} width='w-40' />
             <p>{t.conditionstatus.date.substring(0, 10)}</p>
            </div>
        </li>
        ))}
    </ol>
  )

  // return (
  //   <Timeline>
  //     {timeLine.map((t) => (
  //       <TimelineItem key={t._id}>
  //         <TimelineOppositeContent
  //           sx={{ m: 'auto 0' }}
  //           align="right"
  //           variant="body2"
  //           color="text.secondary"
  //         >          
  //         </TimelineOppositeContent>
  //         <TimelineSeparator>
  //           <TimelineConnector />
  //           <TimelineDot className='w-12 h-12' color="primary" variant="outlined">
  //             {/* <FastfoodIcon /> */}
  //             {/* <Image alt='user' src={'/img/users/default.jpg'} className='rounded-full' width={100} height={100} /> */}
  //             {/* <Image alt='user' src={t.conditionstatus?.user?.photo || '/img/users/default.jpg' } className='rounded-full' width={100} height={100} /> */}
  //             {/* <Image alt='user' src={'https://docs-adminweb.s3.us-east-1.amazonaws.com/project-photo-1714701327143.png'} className='rounded-full' width={100} height={100} /> */}
  //             <img src={t.conditionstatus?.user?.photo || '/img/users/default.jpg' } alt="user" className='rounded-full w-full h-full' />
  //           </TimelineDot>
  //           <TimelineConnector />
  //         </TimelineSeparator>
  //         <TimelineContent sx={{ py: '12px', px: 2 }}>
  //           <Typography variant="h6" component="span">
  //             <Chip label={t.conditionstatus.condition.name} color={t.conditionstatus.condition.color} />
  //           </Typography>
  //           <Typography>{t.conditionstatus.date.substring(0, 10)}</Typography>
  //         </TimelineContent>
  //       </TimelineItem>
  //     ))}
  //   </Timeline>
  // );
}

// export default function TimelineComponent({timeLine}: {timeLine: ITimeLineProject[]}) {
//   return (
//     <Timeline>
//       <TimelineItem>
//         <TimelineOppositeContent
//           sx={{ m: 'auto 0' }}
//           align="right"
//           variant="body2"
//           color="text.secondary"
//         >
//           9:30 am
//         </TimelineOppositeContent>
//         <TimelineSeparator>
//           <TimelineConnector />
//           <TimelineDot className='w-12 h-12' color="primary" variant="outlined">
//             {/* <FastfoodIcon /> */}
//             <Image alt='user' src={'/img/users/default.jpg'} className='rounded-full' width={100} height={100} />
//           </TimelineDot>
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//           <Typography variant="h6" component="span">
//             <Chip label='Iniciado' color='#00f' />
//           </Typography>
//           {/* <Typography>Because you need strength</Typography> */}
//           <Typography>{new Date().toISOString().substring(0, 10)}</Typography>
//         </TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineOppositeContent
//           sx={{ m: 'auto 0' }}
//           variant="body2"
//           color="text.secondary"
//         >
//           10:00 am
//         </TimelineOppositeContent>
//         <TimelineSeparator>
//           <TimelineConnector />
//           <TimelineDot color="primary">
//             <LaptopMacIcon />
//           </TimelineDot>
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//           <Typography variant="h6" component="span">
//             Code
//           </Typography>
//           <Typography>Because it&apos;s awesome!</Typography>
//         </TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineConnector />
//           <TimelineDot color="primary" variant="outlined">
//             <HotelIcon />
//           </TimelineDot>
//           <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//           <Typography variant="h6" component="span">
//             Sleep
//           </Typography>
//           <Typography>Because you need rest</Typography>
//         </TimelineContent>
//       </TimelineItem>
//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
//           <TimelineDot color="secondary">
//             <RepeatIcon />
//           </TimelineDot>
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent sx={{ py: '12px', px: 2 }}>
//           <Typography variant="h6" component="span">
//             Repeat
//           </Typography>
//           <Typography>Because this is the life you love!</Typography>
//         </TimelineContent>
//       </TimelineItem>
//     </Timeline>
//   );
// }
