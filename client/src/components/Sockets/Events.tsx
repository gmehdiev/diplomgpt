'use client'

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react"



export const  Events = ({ events }: {events: any}) => {
    return  <ul>
      {
        events.map((event: any, index: any) =>
          <li key={ index }>{ event }</li>
        )
      }
      </ul>
    
  }