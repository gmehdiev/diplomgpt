'use client'

export const ConnectionState = ({ isConnected }: {isConnected: boolean})  => {
    return <p>State: { '' + isConnected }</p>;
  }