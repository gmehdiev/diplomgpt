'use client'

import { ProxyInterface, useSendProxyMutation } from "@/lib/api/proxy";
import { useForm } from "react-hook-form";

export default function Proxy() {
    const [sendProxy] = useSendProxyMutation()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ProxyInterface>();
    const onSubmit = (data: any) => sendProxy(data);

    return (
        <main>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px'
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="api key"
                        {...register("apiKey")} />
                    <input type="text" placeholder="ip"
                        {...register("proxyAddress")} />
                    <input type="text" placeholder="port"
                        {...register("proxyPort")} />
                    <input type="text" placeholder="login"
                        {...register("proxyUsername")} />
                    <input type="text" placeholder="password"
                        {...register("proxyPassword")} />
                    <button type="submit">send</button>
                </form>


            </div>

        </main>
    );
}
