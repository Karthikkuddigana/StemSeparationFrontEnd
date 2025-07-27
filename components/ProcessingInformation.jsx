import React from 'react'

export default function ProcessingInformation({processingState}) {
  return (
     <div className='bg-black text-white p-10 rounded'>
        {
            processingState=="Pending"?<ul>
            <li>Ready to process your audio file...</li>
            <li>Select a separation mode and click "Separate Stems"</li>
            </ul>: <></>
        }
        {
            processingState=="Uploading"?<ul>
            <li>Uploading your files....</li>
            </ul>: <></>
        }
        {
            processingState=="Processed"?<ul>
            <li>Files are processed successfully, redirecting to the seperated stems</li>
            </ul>: <></>
        }
        {
            processingState=="Failure"?<ul>
            <li>There is some unexpected error encountered !!!1</li>
            <li>Please upload your files and select the number of stems to try again !!!!</li>
            </ul>: <></>
        }
        
                       
     </div>
  )
}
