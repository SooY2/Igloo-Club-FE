import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr(),
  ],
  define: {
    global: {}, // 이 부분을 추가
  },
  server: {
    proxy: {
      '/stomp': {
        target: 'https://seunghan.shop/stomp',
        changeOrigin: true,
        ws: true, // WebSocket 프로토콜 지원
        secure: false, // HTTPS를 사용하는 경우 true로 설정
      },
    },
  },
});
