import { IsString } from 'class-validator';

export class ProxyDto {
    @IsString()
    apiKey: string;
    @IsString()
    proxyAddress: string;
    @IsString()
    proxyPort: string;
    @IsString()
    proxyUsername: string;
    @IsString()
    proxyPassword: string;
}
