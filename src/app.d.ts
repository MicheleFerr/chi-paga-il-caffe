/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

declare module 'virtual:pwa-info' {
	export const pwaInfo: {
		webManifest: {
			href: string;
			useCredentials: boolean;
		};
	} | undefined;
}

declare module 'virtual:pwa-register' {
	export function registerSW(options?: {
		immediate?: boolean;
		onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
		onRegisterError?: (error: Error) => void;
		onOfflineReady?: () => void;
		onNeedRefresh?: () => void;
	}): (reloadPage?: boolean) => Promise<void>;
}

declare global {
	namespace App {}
}

export {};
