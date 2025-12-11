import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Chi Paga il Caffè?',
				short_name: 'Caffè',
				description: 'Il gioco dove chi indovina paga il caffè!',
				theme_color: '#1a1a2e',
				background_color: '#1a1a2e',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: '/icon-192.svg',
						sizes: '192x192',
						type: 'image/svg+xml'
					},
					{
						src: '/icon-512.svg',
						sizes: '512x512',
						type: 'image/svg+xml'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp3}']
			}
		})
	]
});
