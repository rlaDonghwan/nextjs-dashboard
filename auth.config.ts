import type { NextAuthConfig } from "next-auth"; // NextAuth 설정 타입을 가져옴

export const authConfig = {
  pages: {
    signIn: "/login", // 로그인 페이지 경로
    signOut: "/logout", // 로그아웃 페이지 경로
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 사용자가 인증되었는지 확인하는 콜백
      const isLoggedIn = !!auth?.user; // 사용자가 로그인했는지 여부 확인
      console.log("isLoggedIn", isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith("/ui/dashboard"); // 대시보드 경로에 있는지 확인
      if (isOnDashboard) {
        // 대시보드 경로에 있을 경우
        if (isLoggedIn) return true; // 로그인 상태면 접근 허용
        return false; // 로그인 상태가 아니면 접근 차단
      } else if (isLoggedIn) {
        // 대시보드 외 경로에 있고 로그인 상태일 경우
        return Response.redirect(new URL("/ui/dashboard", nextUrl)); // 대시보드로 리다이렉트
      }
      return true; // 그 외의 경우 접근 허용
    },
  },
  providers: [], // 인증 제공자 설정 (현재 비어 있음)
} satisfies NextAuthConfig; // NextAuthConfig 타입을 만족하는지 확인
