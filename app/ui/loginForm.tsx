"use client"; // 클라이언트 컴포넌트로 렌더링

import { lusitana } from "@/app/ui/fonts"; // 커스텀 폰트 가져오기
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"; // Heroicons의 아웃라인 아이콘 가져오기
import { ArrowRightIcon } from "@heroicons/react/20/solid"; // Heroicons의 솔리드 아이콘 가져오기
import { Button } from "@/app/ui/button"; // 버튼 컴포넌트 가져오기
import { useActionState } from "react"; // 액션 상태를 관리하는 훅 가져오기
import { authenticate } from "@/app/lib/actions"; // 인증 함수 가져오기
import { useSearchParams } from "next/navigation"; // URL의 검색 매개변수를 읽는 훅 가져오기

export default function LoginForm() {
  // 로그인 폼 컴포넌트 정의
  const searchParams = useSearchParams(); // URL 검색 매개변수 가져오기
  const callbackUrl = searchParams.get("callbackUrl") || "/ui/dashboard"; // 콜백 URL 설정 (기본값: "/ui/dashboard")
  const [errorMessage, formAction, isPending] = useActionState(
    // 액션 상태 관리
    authenticate, // 인증 함수
    undefined // 초기 상태
  );

  return (
    <form action={formAction} className="space-y-3">
      {" "}
      {/* 폼 태그 */}
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {" "}
        {/* 폼 컨테이너 */}
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          {" "}
          {/* 제목 */}
          Please log in to continue. {/* 로그인 요청 메시지 */}
        </h1>
        <div className="w-full">
          {" "}
          {/* 입력 필드 컨테이너 */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email {/* 이메일 입력 필드 라벨 */}
            </label>
            <div className="relative">
              {" "}
              {/* 이메일 입력 필드 */}
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address" // 이메일 입력 안내 텍스트
                required // 필수 입력 필드
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />{" "}
              {/* 이메일 아이콘 */}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password {/* 비밀번호 입력 필드 라벨 */}
            </label>
            <div className="relative">
              {" "}
              {/* 비밀번호 입력 필드 */}
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password" // 비밀번호 입력 안내 텍스트
                required // 필수 입력 필드
                minLength={6} // 최소 입력 길이 6자
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />{" "}
              {/* 비밀번호 아이콘 */}
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />{" "}
        {/* 숨겨진 입력 필드로 콜백 URL 전달 */}
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {" "}
          {/* 로그인 버튼 */}
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />{" "}
          {/* 버튼 텍스트와 아이콘 */}
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && ( // 에러 메시지가 있을 경우 표시
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />{" "}
              {/* 에러 아이콘 */}
              <p className="text-sm text-red-500">{errorMessage}</p>{" "}
              {/* 에러 메시지 텍스트 */}
            </>
          )}
        </div>
      </div>
    </form>
  );
}
